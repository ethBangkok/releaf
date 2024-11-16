"use client";

import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Helper function to validate Ethereum addresses
const isValidEthereumAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export default function BeneficiaryPage() {
  const [newBeneficiary, setNewBeneficiary] = useState("");
  const [beneficiaries, setBeneficiaries] = useState<string[]>([]);
  const { toast } = useToast();

  const addBeneficiary = () => {
    if (isValidEthereumAddress(newBeneficiary)) {
      if (!beneficiaries.includes(newBeneficiary)) {
        setBeneficiaries([...beneficiaries, newBeneficiary]);
        setNewBeneficiary("");
        toast({
          title: "Beneficiary added",
          description:
            "The new beneficiary has been successfully added to the list.",
        });
      } else {
        toast({
          title: "Duplicate address",
          description:
            "This wallet address is already in the beneficiary list.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid address",
        description: "Please enter a valid Ethereum wallet address.",
        variant: "destructive",
      });
    }
  };

  const removeBeneficiary = (address: string) => {
    setBeneficiaries(beneficiaries.filter((b) => b !== address));
    toast({
      title: "Beneficiary removed",
      description: "The beneficiary has been removed from the list.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Beneficiary Management</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Beneficiary</CardTitle>
          <CardDescription>
            Enter the wallet address of the new beneficiary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addBeneficiary();
            }}
            className="flex space-x-2"
          >
            <Input
              placeholder="0x..."
              value={newBeneficiary}
              onChange={(e) => setNewBeneficiary(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Beneficiary
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Beneficiary List</CardTitle>
          <CardDescription>
            Current list of beneficiary wallet addresses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {beneficiaries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beneficiaries.map((address, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">{address}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeBeneficiary(address)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground">
              No beneficiaries added yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
