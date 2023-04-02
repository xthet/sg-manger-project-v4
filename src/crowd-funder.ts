import { BigInt, Bytes, store } from "@graphprotocol/graph-ts"
import {
  CampaignAdded as CampaignAddedEvent,
  CampaignFunded as CampaignFundedEvent,
  CampaignRemoved as CampaignRemovedEvent,
  CampaignShrunk as CampaignShrunkEvent,
  UserAdded as UserAddedEvent,
  CampaignPublished as CampaignPublishedEvent
} from "../generated/CrowdFunder/CrowdFunder"
import {
  CampaignAdded,
  CampaignFunded,
  CampaignRemoved,
  CampaignShrunk,
  UserAdded,
} from "../generated/schema"

export function handleCampaignAdded(event: CampaignAddedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._creator.toHexString())

  if(!campaignAdded){
    campaignAdded = new CampaignAdded(event.params._campaignAddress.toHexString())
    campaignAdded.funderCount = BigInt.fromString("0")
    campaignAdded.funders = new Array<Bytes>(0)
    campaignAdded.createdAt = event.block.timestamp
    campaignAdded.published = false
  }
  if(!userAdded){
    userAdded = new UserAdded(event.params._creator.toHexString())
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

export function handleCampaignFunded(event: CampaignFundedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._funder.toHexString())

  if(!userAdded){
    userAdded = new UserAdded(event.params._funder.toHexString())
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

export function handleCampaignRemoved(event: CampaignRemovedEvent): void {
  let id = event.params._campaignAddress.toHexString()
  store.remove("CampaignAdded", id)
}

export function handleCampaignShrunk(event: CampaignShrunkEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._withdrawer.toHexString())

  if(!userAdded){
    userAdded = new UserAdded(event.params._withdrawer.toHexString())
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

export function handleUserAdded(event: UserAddedEvent): void {
  let userAdded = UserAdded.load(event.params._address.toHexString())

  if(!userAdded){
    userAdded = new UserAdded(event.params._address.toHexString())
    userAdded.address = event.params._address
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.sig = event.params._sig
    userAdded.createdAt = event.block.timestamp
  }

  userAdded.address = event.params._address
  userAdded.username = event.params._username
  userAdded.twitter = event.params._twitter
  userAdded.email = event.params._email
  userAdded.sig = event.params._sig
  userAdded.homeAddr = event.params._homeAddress
  userAdded.createdAt = event.block.timestamp

  userAdded.save()
}

export function handleCampaignPublished(event: CampaignPublishedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  campaignAdded!.published = true
  campaignAdded!.save()
}