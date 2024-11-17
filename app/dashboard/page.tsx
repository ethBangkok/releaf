"use client";
import { useEffect, useState } from "react";
import {
  Bell,
  DollarSign,
  ExternalLink,
  Search,
  Users,
  Users2,
} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deployedPoolContractAddress,
} from "@/constants/config";
import { useProjectTransactions } from "../utils/subgraph.query";
import { BeneficiaryAdded } from "@/graph/generated/schema";
import { useBalance } from "wagmi";
import { useWriteFundPoolDistributeFunds } from "@/hooks/generated-contracts/fund-pool";
import { toast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { data } = useProjectTransactions();
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const balance = useBalance({
    address: deployedPoolContractAddress,
    query: {
      select: (data) => Number(String(data.value)),
    },
  });
  const gweiToEth = (amount) => {
    return Number(amount) / 1000000000;
  };

  useEffect(() => {
    if (data) {
      const { fundAddeds, funderAddeds,beneficiaryAddeds,fundsDistributeds } = data;
      const mergedTransactions = [...fundAddeds, ...funderAddeds,...beneficiaryAddeds,...fundsDistributeds];
      const sortedTransactions = mergedTransactions?.sort(
        (a, b) => Number(b.blockTimestamp) - Number(a.blockTimestamp)
      );
      
      setTotalBalance(gweiToEth(balance?.data));
      console.log(sortedTransactions);
      setTransactions(sortedTransactions);
    }
  }, [data,balance]);

  const disbursement = useWriteFundPoolDistributeFunds({
    mutation: {
      onError(error, variables, context) {
        toast({
          title: "Error Occured ",
        });
      },
      onSuccess(data, variables, context) {
        toast({
          title: "Successfully disbursed",
          description: "You can check the beneficiary wallet",
        });
      },
    },
  });

  const handleDisbursement = async () => {
    console.log("Disbursing to beneficiaries");
    await disbursement.writeContractAsync({
      address: deployedPoolContractAddress,
    });
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='flex items-center justify-between px-6 py-4 bg-white border-b'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
        <div className='flex items-center space-x-4'>
          <Button variant='ghost' size='icon'>
            <Bell className='h-5 w-5' />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/placeholder-avatar.jpg' alt='@johndoe' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    wallet address
                  </p>
                  <p className='text-xs leading-none text-muted-foreground'>
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
      <main className='flex-1 p-6 bg-gray-100'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Funding Pool Balance
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBalance} Eth</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{transactions.length}</div>
              <p className='text-xs text-muted-foreground'>
                All-time transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Unique Wallets
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {new Set([...transactions.map((t) => t.funder)]).size}
              </div>
              <p className='text-xs text-muted-foreground'>
                Interacted with the pool
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>
              <div className='flex justify-between items-center'>
                <p>Transaction History</p>

                <Button
                  disabled={disbursement.isPending}
                  onClick={handleDisbursement}
                  variant={"outline"}>
                  <Users2 />
                  Disburse to Beneficiaries
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              View all transactions in the funding pool
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Funder/Beneficiary</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.blockTimestamp}</TableCell>
                      <TableCell>
                        {transaction?.amount ? gweiToEth(transaction?.amount) +'ETH' :'N/A' } 
                        {/* {gweiToEth(transaction.amount)} ETH  */}
                      </TableCell>
                      <TableCell>{transaction?.funder || transaction?.beneficiary}</TableCell>
                      <TableCell>{transaction['__typename']}</TableCell>
                      <TableCell>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            window.open(
                              `https://eth-sepolia.blockscout.com/tx/${transaction.transactionHash}`,
                              "_blank"
                            )
                          }>
                          View <ExternalLink className='ml-2 h-4 w-4' />
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
