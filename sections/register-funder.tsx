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
  const [stakeAmount, setStakeAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleWalletConnect = () => {
    // Simulating wallet connection
    setIsWalletConnected(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted", { stakeAmount, name, email });
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
              <Label htmlFor="stake">Stake Amount (ETH)</Label>
              <Input
                id="stake"
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
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

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    About Staking
                  </h3>
                  <p className="mt-2 text-sm text-blue-700">
                    Staking is crucial for securing the network and showing your
                    commitment. Your staked amount will be locked for the
                    duration of your participation and will be returned along
                    with any earned rewards when you exit.
                  </p>
                </div>
              </div>
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
