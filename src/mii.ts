import { BigInt, Bytes, store } from "@graphprotocol/graph-ts"
import {
  miiCampaignAdded as miiCampaignAddedEvent,
  miiCampaignFunded as miiCampaignFundedEvent,
  miiCampaignRemoved as miiCampaignRemovedEvent,
  miiCampaignShrunk as miiCampaignShrunkEvent,
  miiUserAdded as miiUserAddedEvent,
  miiUserHomeAddrAdded as miiUserHomeAddrAddedEvent
} from "../generated/mii/mii"
import {
  miiCampaignAdded,
  miiCampaignFunded,
  miiCampaignRemoved,
  miiCampaignShrunk,
  miiUserAdded,
  miiUserHomeAddrAdded
} from "../generated/schema"

export function handlemiiCampaignAdded(event: miiCampaignAddedEvent): void {
  let campaignAdded = miiCampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = miiUserAdded.load(event.params._creator.toHexString())

  if(!campaignAdded){
    campaignAdded = new miiCampaignAdded(event.params._campaignAddress.toHexString())
    campaignAdded.funderCount = BigInt.fromString("0")
    campaignAdded.funders = new Array<Bytes>(0)
    campaignAdded.createdAt = event.block.timestamp
  }
  if(!userAdded){
    userAdded = new miiUserAdded(event.params._creator.toHexString())
    userAdded.address = event.params._creator
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  campaignAdded.campaignAddress = event.params._campaignAddress
  campaignAdded.creator = event.params._creator
  campaignAdded.category = event.params._category
  campaignAdded.tags = event.params._tags

  let createdCmps = userAdded.created
  createdCmps.push(event.params._campaignAddress)
  userAdded.created = createdCmps

  userAdded.createdCount = userAdded.createdCount!.plus(BigInt.fromString("1"))

  userAdded.save()
  campaignAdded.save()
}

export function handlemiiCampaignFunded(event: miiCampaignFundedEvent): void {
  let campaignAdded = miiCampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = miiUserAdded.load(event.params._funder.toHexString())

  if(!userAdded){
    userAdded = new miiUserAdded(event.params._funder.toHexString())
    userAdded.address = event.params._funder
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  let cmpFunders = campaignAdded!.funders
  cmpFunders.push(event.params._funder)
  campaignAdded!.funders = cmpFunders

  campaignAdded!.funderCount.plus(BigInt.fromString("1"))

  let backers = userAdded.backed
  backers.push(event.params._campaignAddress)
  userAdded.backed = backers

  userAdded.backedCount = userAdded.backedCount!.plus(BigInt.fromString("1"))

  campaignAdded!.save()
  userAdded.save()
}

export function handlemiiCampaignRemoved(event: miiCampaignRemovedEvent): void {
  let id = event.params._campaignAddress.toHexString()
  store.remove("miiCampaignAdded", id)
}

export function handlemiiCampaignShrunk(event: miiCampaignShrunkEvent): void {
  let campaignAdded = miiCampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = miiUserAdded.load(event.params._withdrawer.toHexString())

  if(!userAdded){
    userAdded = new miiUserAdded(event.params._withdrawer.toHexString())
    userAdded.address = event.params._withdrawer
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  let cmpFunders = campaignAdded!.funders
  if(cmpFunders.includes(event.params._withdrawer)){
    const index = cmpFunders.indexOf(event.params._withdrawer)
    cmpFunders.splice(index, 1)
  }
  campaignAdded!.funders = cmpFunders

  campaignAdded!.funderCount.minus(BigInt.fromString("1"))

  let backers = userAdded.backed
  if(backers.includes(event.params._campaignAddress)){
    const index = backers.indexOf(event.params._campaignAddress)
    backers.splice(index, 1)
  }
  userAdded.backed = backers

  userAdded.backedCount = userAdded.backedCount!.minus(BigInt.fromString("1"))
  
  campaignAdded!.save()
  userAdded.save()
}

export function handlemiiUserAdded(event: miiUserAddedEvent): void {
  let userAdded = miiUserAdded.load(event.params._address.toHexString())

  if(!userAdded){
    userAdded = new miiUserAdded(event.params._address.toHexString())
    userAdded.address = event.params._address
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  userAdded.address = event.params._address
  userAdded.username = event.params._username
  userAdded.twitter = event.params._twitter
  userAdded.email = event.params._email
  userAdded.createdAt = event.block.timestamp

  userAdded.save()
}

export function handlemiiUserHomeAddrAdded(event: miiUserHomeAddrAddedEvent): void {
  let userAdded = miiUserAdded.load(event.params._userAddress.toHexString())
  if(!userAdded){
    userAdded = new miiUserAdded(event.params._userAddress.toHexString())
    userAdded.address = event.params._userAddress
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  userAdded.homeAddr = event.params._homeAddr
  userAdded.save()
}
