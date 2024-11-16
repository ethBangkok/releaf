"use client";
import { useState } from "react";
import { Bell, DollarSign, ExternalLink, Search, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const totalBalance = 1600000;

const transactionHistory = [
  {
    id: 1,
    date: "2023-06-01",
    amount: 50000,
    fromWallet: "0x1234...5678",
    toWallet: "0xABCD...EFGH",
  },
  {
    id: 2,
    date: "2023-06-02",
    amount: 25000,
    fromWallet: "0xABCD...EFGH",
    toWallet: "0x5678...9ABC",
  },
  {
    id: 3,
    date: "2023-06-03",
    amount: 75000,
    fromWallet: "0x9ABC...DEF0",
    toWallet: "0xABCD...EFGH",
  },
  {
    id: 4,
    date: "2023-06-04",
    amount: 10000,
    fromWallet: "0xABCD...EFGH",
    toWallet: "0xDEF0...1234",
  },
  {
    id: 5,
    date: "2023-06-05",
    amount: 30000,
    fromWallet: "0x5678...9ABC",
    toWallet: "0xABCD...EFGH",
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactionHistory.filter(
    (transaction) =>
      transaction.fromWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.toWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    wallet address
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    test@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Disconnect</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Funding Pool Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalBalance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Updated as of {new Date().toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {transactionHistory.length}
              </div>
              <p className="text-xs text-muted-foreground">
                All-time transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unique Wallets
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  new Set([
                    ...transactionHistory.map((t) => t.fromWallet),
                    ...transactionHistory.map((t) => t.toWallet),
                  ]).size
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Interacted with the pool
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              View all transactions in the funding pool
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>From Wallet</TableHead>
                    <TableHead>To Wallet</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        ${transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{transaction.fromWallet}</TableCell>
                      <TableCell>{transaction.toWallet}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(
                              `https://etherscan.io/tx/${transaction.id}`,
                              "_blank"
                            )
                          }
                        >
                          View <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
