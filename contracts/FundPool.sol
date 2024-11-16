// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Define the interface for the EPNS notification contract
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract Relief {
    address admin;
    mapping(address => bool) public treasurer;
    mapping(address => uint256) public fundDeposited;
    uint256 public minimumBalance = 1 wei; // Minimum staking balance
    address public pushCommAddress; // EPNS contract address for push notifications
    address public channelAddress; // Channel address from which notifications will be sent

    event FunderAdded(address funder, uint256 amount);
    event FundAdded(address funder, uint256 amount);

    // Set the push notification contract address during deployment
    constructor(address _deployer, address _pushCommAddress, address _channelAddress) {
        admin = _deployer;
        pushCommAddress = _pushCommAddress; // EPNS contract address
        channelAddress = _channelAddress; // Channel address for your notifications
    }

    // Register a new treasurer by staking a minimum balance
    function registerTreasurer(address walletaddress) public payable {
        require(msg.value >= minimumBalance, "Minimum staking balance not met");
        treasurer[walletaddress] = true;
        fundDeposited[walletaddress] = msg.value;

        // Send a notification to the treasurer upon successful registration
        sendNotification(walletaddress, "Treasurer registration successful", "You have successfully registered as a treasurer.");
        sendNotification(admin, "New Treasurer Registration", "New Treasurer registered successfully in the system");
        emit FunderAdded(walletaddress, msg.value);
    }

    // Deposit funds into the contract
    function depositFund() public payable {
        require(msg.value != 0, "Fund cannot be zero");
        fundDeposited[msg.sender] += msg.value;

        // Send a notification upon successful deposit
        sendNotification(msg.sender, "Fund deposit successful", "You have successfully deposited funds.");
        emit FundAdded(msg.sender, msg.value);
    }

    // Function to send push notifications
    function sendNotification(address recipient, string memory title, string memory body) internal {
        IPUSHCommInterface(pushCommAddress).sendNotification(
            channelAddress, // The channel address from which the notification is sent
            recipient, // The recipient of the notification
            bytes(
                string(
                    abi.encodePacked(
                        "0", // identity
                        "+", // separator
                        "3", // notification type: 3 (targeted notification)
                        "+", // separator
                        title, // notification title
                        "+", // separator
                        body // notification body
                    )
                )
            )
        );
    }

    // Optional: Fallback function to handle any incoming ETH
    receive() external payable {
        fundDeposited[msg.sender] += msg.value;
    }

    // Optional: Fallback function for invalid data calls
    fallback() external payable {
        fundDeposited[msg.sender] += msg.value;
    }
}
