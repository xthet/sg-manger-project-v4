import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { miiCampaignAdded } from "../generated/schema"
import { miiCampaignAdded as miiCampaignAddedEvent } from "../generated/mii/mii"
import { handlemiiCampaignAdded } from "../src/mii"
import { createmiiCampaignAddedEvent } from "./mii-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _campaignAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _category = "Example string value"
    let _tags = ["Example string value"]
    let newmiiCampaignAddedEvent = createmiiCampaignAddedEvent(
      _campaignAddress,
      _creator,
      _category,
      _tags
    )
    handlemiiCampaignAdded(newmiiCampaignAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("miiCampaignAdded created and stored", () => {
    assert.entityCount("miiCampaignAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "miiCampaignAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_campaignAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "miiCampaignAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "miiCampaignAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_category",
      "Example string value"
    )
    assert.fieldEquals(
      "miiCampaignAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_tags",
      "[Example string value]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
