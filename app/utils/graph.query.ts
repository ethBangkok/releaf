export const FundTransaction = `query 
Transaction{
funderAddeds{
id
funder
amount
blockNumber
blockTimestamp
transactionHash
}
fundAddeds{
id
funder
amount
blockNumber
blockTimestamp
transactionHash
}
beneficiaryAddeds{
id
beneficiary
blockNumber
blockTimestamp
transactionHash
}
fundsDistributeds{
id
amount
blockNumber
blockTimestamp
transactionHash
}
}
`;

export const beneficiaryList = `query 
beneficiaryList {
  beneficiaryAddeds {
    transactionHash
    id
    beneficiary
    blockNumber
    blockTimestamp
  }
}
`;
