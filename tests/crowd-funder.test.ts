import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { CampaignAdded } from "../generated/schema"
import { CampaignAdded as CampaignAddedEvent } from "../generated/CrowdFunder/CrowdFunder"
import { handleCampaignAdded } from "../src/crowd-funder"
import { createCampaignAddedEvent } from "./crowd-funder-utils"

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
    let newCampaignAddedEvent = createCampaignAddedEvent(
      _campaignAddress,
      _creator,
      _category,
      _tags
    )
    handleCampaignAdded(newCampaignAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CampaignAdded created and stored", () => {
    assert.entityCount("CampaignAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CampaignAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_campaignAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CampaignAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CampaignAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_category",
      "Example string value"
    )
    assert.fieldEquals(
      "CampaignAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_tags",
      "[Example string value]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
