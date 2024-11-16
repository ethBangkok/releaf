import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { FundAdded } from "../generated/schema"
import { FundAdded as FundAddedEvent } from "../generated/FundRaiser/FundRaiser"
import { handleFundAdded } from "../src/fund-raiser"
import { createFundAddedEvent } from "./fund-raiser-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let funder = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let newFundAddedEvent = createFundAddedEvent(funder, amount)
    handleFundAdded(newFundAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FundAdded created and stored", () => {
    assert.entityCount("FundAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FundAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "funder",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FundAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
