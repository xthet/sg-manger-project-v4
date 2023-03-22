import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  miiCampaignAdded,
  miiCampaignFunded,
  miiCampaignRemoved,
  miiCampaignShrunk,
  miiUserAdded,
  miiUserHomeAddrAdded
} from "../generated/mii/mii"

export function createmiiCampaignAddedEvent(
  _campaignAddress: Address,
  _creator: Address,
  _category: string,
  _tags: Array<string>
): miiCampaignAdded {
  let miiCampaignAddedEvent = changetype<miiCampaignAdded>(newMockEvent())

  miiCampaignAddedEvent.parameters = new Array()

  miiCampaignAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_campaignAddress",
      ethereum.Value.fromAddress(_campaignAddress)
    )
  )
  miiCampaignAddedEvent.parameters.push(
    new ethereum.EventParam("_creator", ethereum.Value.fromAddress(_creator))
  )
  miiCampaignAddedEvent.parameters.push(
    new ethereum.EventParam("_category", ethereum.Value.fromString(_category))
  )
  miiCampaignAddedEvent.parameters.push(
    new ethereum.EventParam("_tags", ethereum.Value.fromStringArray(_tags))
  )

  return miiCampaignAddedEvent
}

export function createmiiCampaignFundedEvent(
  _funder: Address,
  _campaignAddress: Address
): miiCampaignFunded {
  let miiCampaignFundedEvent = changetype<miiCampaignFunded>(newMockEvent())

  miiCampaignFundedEvent.parameters = new Array()

  miiCampaignFundedEvent.parameters.push(
    new ethereum.EventParam("_funder", ethereum.Value.fromAddress(_funder))
  )
  miiCampaignFundedEvent.parameters.push(
    new ethereum.EventParam(
      "_campaignAddress",
      ethereum.Value.fromAddress(_campaignAddress)
    )
  )

  return miiCampaignFundedEvent
}

export function createmiiCampaignRemovedEvent(
  _campaignAddress: Address
): miiCampaignRemoved {
  let miiCampaignRemovedEvent = changetype<miiCampaignRemoved>(newMockEvent())

  miiCampaignRemovedEvent.parameters = new Array()

  miiCampaignRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "_campaignAddress",
      ethereum.Value.fromAddress(_campaignAddress)
    )
  )

  return miiCampaignRemovedEvent
}

export function createmiiCampaignShrunkEvent(
  _withdrawer: Address,
  _campaignAddress: Address
): miiCampaignShrunk {
  let miiCampaignShrunkEvent = changetype<miiCampaignShrunk>(newMockEvent())

  miiCampaignShrunkEvent.parameters = new Array()

  miiCampaignShrunkEvent.parameters.push(
    new ethereum.EventParam(
      "_withdrawer",
      ethereum.Value.fromAddress(_withdrawer)
    )
  )
  miiCampaignShrunkEvent.parameters.push(
    new ethereum.EventParam(
      "_campaignAddress",
      ethereum.Value.fromAddress(_campaignAddress)
    )
  )

  return miiCampaignShrunkEvent
}

export function createmiiUserAddedEvent(
  _address: Address,
  _username: string,
  _twitter: string,
  _email: string,
  _sig: string
): miiUserAdded {
  let miiUserAddedEvent = changetype<miiUserAdded>(newMockEvent())

  miiUserAddedEvent.parameters = new Array()

  miiUserAddedEvent.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(_address))
  )
  miiUserAddedEvent.parameters.push(
    new ethereum.EventParam("_username", ethereum.Value.fromString(_username))
  )
  miiUserAddedEvent.parameters.push(
    new ethereum.EventParam("_twitter", ethereum.Value.fromString(_twitter))
  )
  miiUserAddedEvent.parameters.push(
    new ethereum.EventParam("_email", ethereum.Value.fromString(_email))
  )
  miiUserAddedEvent.parameters.push(
    new ethereum.EventParam("_sig", ethereum.Value.fromString(_sig))
  )

  return miiUserAddedEvent
}

export function createmiiUserHomeAddrAddedEvent(
  _userAddress: Address,
  _homeAddr: string
): miiUserHomeAddrAdded {
  let miiUserHomeAddrAddedEvent = changetype<miiUserHomeAddrAdded>(
    newMockEvent()
  )

  miiUserHomeAddrAddedEvent.parameters = new Array()

  miiUserHomeAddrAddedEvent.parameters.push(
    new ethereum.EventParam(
      "_userAddress",
      ethereum.Value.fromAddress(_userAddress)
    )
  )
  miiUserHomeAddrAddedEvent.parameters.push(
    new ethereum.EventParam("_homeAddr", ethereum.Value.fromString(_homeAddr))
  )

  return miiUserHomeAddrAddedEvent
}
