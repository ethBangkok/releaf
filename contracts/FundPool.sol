// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Define the interface for the EPNS notification contract
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract Relief {
    address public admin;
    mapping(address => bool) public treasurer;
    mapping(address => uint256) public fundDeposited;
    uint256 public minimumBalance = 1 wei; // Minimum staking balance
    address public pushCommAddress; // EPNS contract address for push notifications
    address public channelAddress; // Channel address for notifications

    // Beneficiary structure
    struct Beneficiary {
        address wallet;
        uint256 allocatedAmount;
        bool isRegistered;
    }

    address[] public beneficiaryList; // Enumerable list of beneficiaries
    mapping(address => Beneficiary) public beneficiaries;

    event FunderAdded(address funder, uint256 amount);
    event FundAdded(address funder, uint256 amount);
    event BeneficiaryAdded(address beneficiary);
    event FundsDistributed(uint256 totalDistributed);

    // Constructor to initialize the contract
    constructor(address _deployer, address _pushCommAddress, address _channelAddress) {
        admin = _deployer;
        pushCommAddress = _pushCommAddress;
        channelAddress = _channelAddress;
    }

    // Modifier to restrict access to only the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Modifier to restrict access to only treasurers
    modifier onlyTreasurer() {
        require(treasurer[msg.sender], "Only a registered treasurer can perform this action");
        _;
    }

    // Register a new treasurer by staking a minimum balance
    function registerTreasurer(address walletAddress) public payable {
        require(msg.value >= minimumBalance, "Minimum staking balance not met");
        treasurer[walletAddress] = true;
        fundDeposited[walletAddress] = msg.value;

        // Send notification upon successful registration
        sendNotification(walletAddress, "Treasurer registration successful", "You have successfully registered as a treasurer.");
        sendNotification(admin, "New Treasurer Registration", "A new treasurer has been registered.");
        emit FunderAdded(walletAddress, msg.value);
    }

    // Deposit funds into the contract
    function depositFund() public payable {
        require(msg.value != 0, "Fund cannot be zero");
        fundDeposited[msg.sender] += msg.value;

        // Send notification upon successful deposit
        sendNotification(msg.sender, "Fund deposit successful", "You have successfully deposited funds.");
        emit FundAdded(msg.sender, msg.value);
    }

    // Function to add a beneficiary (only admin can do this)
    function addBeneficiary(address _wallet) public onlyAdmin {
        require(_wallet != address(0), "Invalid beneficiary address");
        require(!beneficiaries[_wallet].isRegistered, "Beneficiary already registered");

        beneficiaries[_wallet] = Beneficiary({
            wallet: _wallet,
            allocatedAmount: 0,
            isRegistered: true
        });
        beneficiaryList.push(_wallet);

        // Send notification for successful registration
        sendNotification(_wallet, "Beneficiary Registration", "You have been added as a beneficiary.");
        emit BeneficiaryAdded(_wallet);
    }

    // Function to distribute funds among all beneficiaries
    function distributeFunds() public onlyAdmin {
        uint256 totalBalance = address(this).balance;
        require(totalBalance > 0, "No funds available for distribution");
        require(beneficiaryList.length > 0, "No beneficiaries to distribute funds to");

        uint256 amountPerBeneficiary = totalBalance / beneficiaryList.length;

        // Distribute funds to each beneficiary
        for (uint256 i = 0; i < beneficiaryList.length; i++) {
            address beneficiary = beneficiaryList[i];
            (bool success, ) = beneficiary.call{value: amountPerBeneficiary}("");
            if (success) {
                beneficiaries[beneficiary].allocatedAmount += amountPerBeneficiary;
            }
        }

        emit FundsDistributed(totalBalance);
    }

    // Function to send push notifications
    function sendNotification(address recipient, string memory title, string memory body) internal {
        IPUSHCommInterface(pushCommAddress).sendNotification(
            channelAddress,
            recipient,
            bytes(
                string(
                    abi.encodePacked(
                        "0", // identity
                        "+", // separator
                        "3", // notification type: 3 (targeted notification)
                        "+", // separator
                        title,
                        "+", // separator
                        body
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

    // Get the number of registered beneficiaries
    function getBeneficiaryCount() public view returns (uint256) {
        return beneficiaryList.length;
    }

    // Get a beneficiary by index
    function getBeneficiaryByIndex(uint256 index) public view returns (address) {
        require(index < beneficiaryList.length, "Index out of bounds");
        return beneficiaryList[index];
    }
}
