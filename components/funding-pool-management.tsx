"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useAccount, useBalance, useChains } from "wagmi";
import { deployedPoolContractAddress } from "@/constants/config";

export function FundingPoolManagementComponent() {
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [error, setError] = useState("");

  const chains = useChains();
  console.log("chains", chains);

  const balance = useBalance({
    address: deployedPoolContractAddress,
    query: {
      select: (data) => Number(String(data.value)),
    },
  });
  console.log("balance", balance);

  const totalBalance = 100000;
  const availableBalance = balance?.data;
  const stakeRequired = 0.3;
  const currentFunding = 50000;

  const handleFundNow = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (Number(amount) > availableBalance) {
      setError("Amount exceeds available balance");
      return;
    }
    if (!network) {
      setError("Please select a network");
      return;
    }
    setError("");
    // Here you would typically handle the funding logic
    console.log(`Funding ${amount} on ${network}`);
  };

  const networkData = [
    { name: "Ethereum", value: 20000 },
    { name: "Polygon", value: 15000 },
    { name: "Binance Smart Chain", value: 15000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className='container mx-auto p-4 space-y-6'>
      <header className='text-center mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Funding Pool Management</h1>
        <p className='text-2xl font-semibold text-primary'>
          Total Pool Balance: ${totalBalance.toLocaleString()}
        </p>
      </header>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Add Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='amount'>Amount to Fund</Label>
                <Input
                  id='amount'
                  type='number'
                  placeholder='Enter amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  aria-describedby='amount-error'
                />
                {error && (
                  <p id='amount-error' className='text-sm text-red-500'>
                    {error}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='network'>Select Network</Label>
                <Select onValueChange={setNetwork}>
                  <SelectTrigger id='network'>
                    <SelectValue placeholder='Select network' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ethereum'>Ethereum</SelectItem>
                    <SelectItem value='polygon'>Polygon</SelectItem>
                    <SelectItem value='bsc'>Binance Smart Chain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Alert>
                <AlertTitle>Funding Information</AlertTitle>
                <AlertDescription>
                  <p>
                    Available Balance: $
                    {availableBalance?.toLocaleString() || "N/A"}
                  </p>
                  <p>Stake Required: ${stakeRequired.toLocaleString()}</p>
                </AlertDescription>
              </Alert>
              <Button className='w-full' onClick={handleFundNow}>
                Fund Now
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contribution Overview</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='mb-2'>Funding Progress</p>
              <Progress value={(currentFunding / totalBalance) * 100} />
              <p className='text-sm text-muted-foreground mt-1'>
                ${currentFunding.toLocaleString()} out of $
                {totalBalance.toLocaleString()}
              </p>
            </div>
            <div>
              <p className='mb-2'>Contributions by Network</p>
              <ChartContainer className='h-[200px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={networkData}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={80}
                      fill='#8884d8'
                      dataKey='value'>
                      {networkData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
