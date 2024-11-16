'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import * as PushAPI from '@pushprotocol/restapi';
import { Web3Provider } from '@ethersproject/providers';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import './PushChat.css';

interface ChatMessage {
  fromDID: string;
  toDID: string;
  messageContent: string;
  timestamp: number;
}

const PushChat: React.FC = () => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [pgpPrivateKey, setPgpPrivateKey] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize provider and get wallet details
  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        try {
          const web3Provider = new Web3Provider(window.ethereum);
          await web3Provider.send('eth_requestAccounts', []);
          const signer = web3Provider.getSigner();
          const address = await signer.getAddress();
          setProvider(web3Provider);
          setWalletAddress(address);
          setSigner(signer as  unknown as ethers.JsonRpcSigner);
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };
    initProvider();
  }, []);

  // Fetch chat history
  const fetchChatHistory = async () => {
    if (!walletAddress || !recipientAddress) return;

    try {
        // Ensure you've set up the private key for decryption if needed
        const chatHistory = await PushAPI.chat.history({
            account: walletAddress,
            threadhash: 'your-thread-hash', // Add the appropriate thread hash here
            toDecrypt: true,
            pgpPrivateKey,
            env: ENV.STAGING,
        });

        setChatHistory(chatHistory);
    } catch (err) {
        console.error('Error fetching chat history:', err);
    }

  };

  // Automatically fetch chat history every 10 seconds
  useEffect(() => {
    const interval = setInterval(fetchChatHistory, 10000);
    return () => clearInterval(interval);
  }, [walletAddress, recipientAddress]);

  // Fetch chat history on initial load
  useEffect(() => {
    fetchChatHistory();
  }, [walletAddress, recipientAddress]);

  // Function to send a message
  const sendMessage = async () => {
    if (!recipientAddress || !message || !signer) {
      alert('Please enter a message and recipient.');
      return;
    }

    try {
      await PushAPI.chat.send({
        messageContent: message,
        messageType: 'Text',
        receiverAddress: recipientAddress,
        signer,
        env: ENV.STAGING,
      });

      setMessage('');
      fetchChatHistory();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="chat-container">
      <h2>Push Chat Integration</h2>

      {/* Wallet Information */}
      <div className="chat-header">
        <p>Connected Wallet: {walletAddress}</p>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchChatHistory} className="fetch-btn">Fetch Chat History</button>
      </div>

      {/* Chat History */}
      <div className="chat-history">
        {chatHistory.length > 0 ? (
          chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.fromDID === walletAddress ? 'sent' : 'received'}`}>
              <div className="message-content">{msg.messageContent}</div>
              <div className="message-meta">
                <small>{new Date(msg.timestamp).toLocaleString()}</small>
              </div>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages found.</p>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="chat-input">
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-textarea"
        />
        <button onClick={sendMessage} className="send-btn">Send</button>
      </div>
    </div>
  );
};

export default PushChat;
