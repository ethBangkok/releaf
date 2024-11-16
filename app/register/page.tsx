"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AMOUNT_TO_STAKE,
  deployedPoolContractAddress,
} from "@/constants/config";
import { useWriteFundPoolRegisterTreasurer } from "@/hooks/generated-contracts/fund-pool";
import { ConnectKitButton } from "connectkit";
import {
  useAccount,
  useChainId,
  useChains,
  useConnect,
  useWalletClient,
} from "wagmi";

export default function FunderRegistration() {
  const register = useWriteFundPoolRegisterTreasurer();
  const wallet = useConnect();
  console.log("wallet", wallet);
  const account = useAccount();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // wallet.connectAsync({
    //   connector: {
    // ) {
    //       return parameters.provider.request({
    //         method: "eth_requestAccounts",
    //       });
    //     },
    //   },
    // });
    await register.writeContractAsync({
      address: deployedPoolContractAddress,
      args: [account.address as `0x${string}`],
    });
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Funder Registration
          </CardTitle>
          <CardDescription className='text-center'>
            Join our Web3 funding community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='wallet'>Wallet Connection</Label>

              <ConnectKitButton />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='stake'>Amount to Stake (ETH)</Label>
              <Input
                id='stake'
                type='number'
                placeholder={"$ " + AMOUNT_TO_STAKE.toString()}
                value={AMOUNT_TO_STAKE}
                disabled
                // onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <Button type='submit' className='w-full'>
              Stake and Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
