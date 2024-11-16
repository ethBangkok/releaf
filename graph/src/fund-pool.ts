import {
  FundAdded as FundAddedEvent,
  FunderAdded as FunderAddedEvent,
  BeneficiaryAdded as BeneficiaryAddedEvent,
  FundsDistributed as FundsDistributedEvent
} from "../generated/FundPool/FundPool"
import { FundAdded, FunderAdded,BeneficiaryAdded, FundsDistributed } from "../generated/schema"

export function handleFundAdded(event: FundAddedEvent): void {
  let entity = new FundAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.funder = event.params.funder
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFunderAdded(event: FunderAddedEvent): void {
  let entity = new FunderAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.funder = event.params.funder
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeneficiaryAdded(event: BeneficiaryAddedEvent): void {
  let entity = new BeneficiaryAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beneficiary = event.params.beneficiary

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundsDistributed(event: FundsDistributedEvent): void {
  let entity = new FundsDistributed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.totalDistributed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
