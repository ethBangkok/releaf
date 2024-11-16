import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { FundAdded, FunderAdded } from "../generated/FundRaiser/FundRaiser"

export function createFundAddedEvent(
  funder: Address,
  amount: BigInt
): FundAdded {
  let fundAddedEvent = changetype<FundAdded>(newMockEvent())

  fundAddedEvent.parameters = new Array()

  fundAddedEvent.parameters.push(
    new ethereum.EventParam("funder", ethereum.Value.fromAddress(funder))
  )
  fundAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundAddedEvent
}

export function createFunderAddedEvent(
  funder: Address,
  amount: BigInt
): FunderAdded {
  let funderAddedEvent = changetype<FunderAdded>(newMockEvent())

  funderAddedEvent.parameters = new Array()

  funderAddedEvent.parameters.push(
    new ethereum.EventParam("funder", ethereum.Value.fromAddress(funder))
  )
  funderAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return funderAddedEvent
}
