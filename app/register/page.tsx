"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Wallet } from "lucide-react";

export default function FunderRegistration() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleWalletConnect = () => {
    // Simulating wallet connection
    setIsWalletConnected(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted", { amount, name, email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Funder Registration
          </CardTitle>
          <CardDescription className="text-center">
            Join our Web3 funding community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet Connection</Label>
              <Button
                type="button"
                variant={isWalletConnected ? "outline" : "default"}
                className="w-full"
                onClick={handleWalletConnect}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stake">Amount to donate</Label>
              <Input
                id="stake"
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!isWalletConnected}
            >
              Stake and Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
