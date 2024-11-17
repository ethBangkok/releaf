'use client'

import { useState, useEffect, useRef } from 'react'
import { AbiCoder, ethers } from 'ethers'
import * as PushAPI from '@pushprotocol/restapi'
import { Web3Provider } from '@ethersproject/providers'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import { Send, RefreshCw, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { toBytes, encodeAbiParameters, keccak256 } from 'viem'

interface ChatMessage {
  fromDID: string
  toDID: string
  messageContent: string
  timestamp: number
}

export function PushChat() {
  const [provider, setProvider] = useState<Web3Provider | null>(null)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [recipientAddress, setRecipientAddress] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [pgpPrivateKey, setPgpPrivateKey] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        try {
          setIsConnecting(true)
          const web3Provider = new Web3Provider(window.ethereum)
          await web3Provider.send('eth_requestAccounts', [])
          const signer = web3Provider.getSigner()
          const address = await signer.getAddress()
          setProvider(web3Provider)
          setWalletAddress(address)
          setSigner(signer as unknown as ethers.JsonRpcSigner)
          toast({
            title: 'Wallet Connected',
            description: 'Successfully connected to your wallet.',
          })
        } catch (error) {
          console.error('Error connecting wallet:', error)
          toast({
            title: 'Connection Error',
            description: 'Failed to connect to wallet. Please try again.',
            variant: 'destructive',
          })
        } finally {
          setIsConnecting(false)
        }
      } else {
        toast({
          title: 'Wallet Not Found',
          description: 'Please install MetaMask to use this application.',
          variant: 'destructive',
        })
      }
    }
    initProvider()
  }, [toast])

  const fetchChatHistory = async () => {
    if (!walletAddress || !recipientAddress) return
 // Initialize the AbiCoder
const abiCoder = new AbiCoder();

// Encode the addresses using the new AbiCoder and hash them with keccak256
const encodedData = abiCoder.encode(["address", "address"], [walletAddress, recipientAddress]);
const threadHash = keccak256(new Uint8Array(Buffer.from(encodedData.slice(2), 'hex')));

    try {
      setIsLoading(true)
      const chatHistory = await PushAPI.chat.history({
        account: walletAddress,
        threadhash: threadHash ,
        toDecrypt: true,
        pgpPrivateKey,
        env: ENV.STAGING,
      })
      setChatHistory(chatHistory)
      scrollToBottom()
    } catch (err) {
      console.error('Error fetching chat history:', err)
      toast({
        title: 'Error',
        description: 'Failed to fetch chat history. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(fetchChatHistory, 10000)
    return () => clearInterval(interval)
  }, [walletAddress, recipientAddress])

  useEffect(() => {
    fetchChatHistory()
  }, [walletAddress, recipientAddress])

  const sendMessage = async () => {
    if (!recipientAddress || !message || !signer) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter both a message and recipient address.',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsSending(true)
     const response =  await PushAPI.chat.send({
        messageContent: message,
        messageType: 'Text',
        receiverAddress: recipientAddress,
        signer,
        env: ENV.STAGING,
      })
      console.log('response', response)
      setMessage('')
      fetchChatHistory()
      toast({
        title: 'Message Sent',
        description: 'Your message was sent successfully.',
      })
    } catch (err) {
      console.error('Error sending message:', err)
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Push Chat</span>
          {isConnecting ? (
            <Button disabled variant="outline" size="sm">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Connecting Wallet
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={fetchChatHistory}
              disabled={isLoading || !walletAddress}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
        </CardTitle>
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground">
            Connected: {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not Connected'}
          </div>
          <Input
            placeholder="Enter recipient address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length > 0 ? (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.fromDID === walletAddress ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.fromDID === walletAddress
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="break-words">{msg.messageContent}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No messages yet
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="border-t p-4 space-y-4">
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
            />
            <div className="flex justify-end">
              <Button onClick={sendMessage} disabled={isSending || !walletAddress}>
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}