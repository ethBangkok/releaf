import {
  FundAdded as FundAddedEvent,
  FunderAdded as FunderAddedEvent
} from "../generated/FundPool/FundPool"
import { FundAdded, FunderAdded } from "../generated/schema"

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
