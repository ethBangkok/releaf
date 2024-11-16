"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AMOUNT_TO_STAKE,
  AMOUNT_TO_STAKE_IN_ETH,
  deployedPoolContractAddress,
} from "@/constants/config";
import {
  useReadFundPoolTreasurer,
  useWriteFundPoolRegisterTreasurer,
} from "@/hooks/generated-contracts/fund-pool";
import { ConnectKitButton } from "connectkit";
import { useAccount, useBalance, useConnect } from "wagmi";
import { useCheckIfTreasurer } from "../utils/custom-contracts-calls";
import { useRouter } from "next/navigation";

export default function FunderRegistration() {
  const register = useWriteFundPoolRegisterTreasurer({
    mutation: {
      onError(error, variables, context) {
        console.log(error);
      },
      onSuccess(data, variables, context) {
        console.log(data);
      },
    },
  });
  const router = useRouter();
  const wallet = useConnect();
  console.log("wallet", wallet);
  const account = useAccount();
  const balance = useBalance({
    address: account?.address,
    query: {
      select(data) {
        return Number(String(data.value));
      },
    },
  });

  const isTreasurer = useCheckIfTreasurer();
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
    // await sendTransaction({
    //   to: deployedPoolContractAddress,
    //   value: AMOUNT_TO_STAKE,
    //   args: [account.address as `0x${string}`],
    // });
    await register.writeContractAsync({
      value: AMOUNT_TO_STAKE,
      args: [account.address as `0x${string}`],
      address: deployedPoolContractAddress,
    });
    // await register.writeContractAsync({
    //   address: deployedPoolContractAddress,
    //   args: [account.address as `0x${string}`],
    // });
    // Handle form submission here
    console.log("Form submitted");
  };

  const hasEnoughBalance =
    balance?.data !== undefined &&
    balance.data >= 0 &&
    balance.data <= AMOUNT_TO_STAKE;

  if (isTreasurer.data) {
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
            <p className='text-center text-blue-700'>
              You are already a funder
            </p>
          </CardContent>
          <CardFooter>
            <Button className='w-full' onClick={() => router.push("/")}>
              Go to home page
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

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
                value={String(AMOUNT_TO_STAKE)}
                disabled
                // onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>Your balance: {balance.data || "N/A"} </div>
            {hasEnoughBalance && (
              <p className='text-blue-700'>
                You do not have enough balance to stake and register
              </p>
            )}

            <Button
              disabled={!!hasEnoughBalance || register.isPending}
              type='submit'
              className='w-full'>
              Stake and Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
