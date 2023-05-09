import { BigInt, Bytes, store } from "@graphprotocol/graph-ts"
import {
  CampaignAdded as CampaignAddedEvent,
  CampaignFunded as CampaignFundedEvent,
  CampaignPublished as CampaignPublishedEvent,
  CampaignRemoved as CampaignRemovedEvent,
  CampaignShrunk as CampaignShrunkEvent,
  UserAdded as UserAddedEvent
} from "../generated/CrowdFunder/CrowdFunder"
import {
  CampaignAdded,
  UserAdded,
  CrowdFunder
} from "../generated/schema"

const cdf = "0xb3a2098Bc20B46C63f39485F618831645DE53703"

export function handleCampaignAdded(event: CampaignAddedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._creator.toHexString())
  let crowdFunder = CrowdFunder.load(cdf)
  if(!crowdFunder){
    crowdFunder = new CrowdFunder(cdf)
    crowdFunder.trueAmount = BigInt.fromString("0")
    crowdFunder.campaignCount = BigInt.fromString("0")
    crowdFunder.donationCount = BigInt.fromString("0")
    crowdFunder.creatorCount = BigInt.fromString("0")
  }
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
  campaignAdded.title = event.params._title
  campaignAdded.description = event.params._description
  campaignAdded.category = event.params._category
  campaignAdded.tags = event.params._tags
  campaignAdded.imageURI = event.params._imageURI

  let createdCmps = userAdded.created
  createdCmps.push(event.params._campaignAddress)
  userAdded.created = createdCmps
  // both published and drafts

  crowdFunder.campaignCount = crowdFunder.campaignCount!.plus(BigInt.fromString("1"))

  userAdded.save()
  campaignAdded.save()
  crowdFunder.save()
}

export function handleCampaignFunded(event: CampaignFundedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._funder.toHexString())
  let crowdFunder = CrowdFunder.load(cdf)
  if(!crowdFunder){
    crowdFunder = new CrowdFunder(cdf)
    crowdFunder.trueAmount = BigInt.fromString("0")
    crowdFunder.campaignCount = BigInt.fromString("0")
    crowdFunder.donationCount = BigInt.fromString("0")
    crowdFunder.creatorCount = BigInt.fromString("0")
  }

  if(!userAdded){
    userAdded = new UserAdded(event.params._funder.toHexString())
    userAdded.address = event.params._funder
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  crowdFunder.donationCount = crowdFunder.donationCount!.plus(BigInt.fromString("1"))
  crowdFunder.trueAmount = crowdFunder.trueAmount!.plus(event.params._val)

  if(!(campaignAdded!.funders.includes(event.params._funder))){
    // if not initially present in funders array (only unique funders)
    let cmpFunders = campaignAdded!.funders
    cmpFunders.push(event.params._funder)
    campaignAdded!.funders = cmpFunders

    campaignAdded!.funderCount = campaignAdded!.funderCount.plus(BigInt.fromString("1"))
  }

  if(!(userAdded.backed.includes(event.params._campaignAddress))){  
    let backers = userAdded.backed
    backers.push(event.params._campaignAddress)
    userAdded.backed = backers
    userAdded.backedCount = userAdded.backedCount!.plus(BigInt.fromString("1"))
  }  

  campaignAdded!.save()
  crowdFunder.save()
  userAdded.save()
}

export function handleCampaignRemoved(event: CampaignRemovedEvent): void {
  let id = event.params._campaignAddress.toHexString()
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let crowdFunder = CrowdFunder.load(cdf)
  if(!crowdFunder){
    crowdFunder = new CrowdFunder(cdf)
    crowdFunder.trueAmount = BigInt.fromString("0")
    crowdFunder.campaignCount = BigInt.fromString("0")
    crowdFunder.donationCount = BigInt.fromString("0")
    crowdFunder.creatorCount = BigInt.fromString("0")
  }
  // if(campaignAdded!.published){
  //   crowdFunder.campaignCount = crowdFunder.campaignCount!.minus(BigInt.fromString("1"))
  // }

  store.remove("CampaignAdded", id)
  crowdFunder.save()
}

export function handleCampaignShrunk(event: CampaignShrunkEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let userAdded = UserAdded.load(event.params._withdrawer.toHexString())
  let crowdFunder = CrowdFunder.load(cdf)

  if(!crowdFunder){
    crowdFunder = new CrowdFunder(cdf)
    crowdFunder.trueAmount = BigInt.fromString("0")
    crowdFunder.campaignCount = BigInt.fromString("0")
    crowdFunder.donationCount = BigInt.fromString("0")
    crowdFunder.creatorCount = BigInt.fromString("0")
  }
  
  if(!userAdded){
    userAdded = new UserAdded(event.params._withdrawer.toHexString())
    userAdded.address = event.params._withdrawer
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  if((campaignAdded!.funderCount.gt(BigInt.fromString("0"))) && (campaignAdded!.funders.includes(event.params._withdrawer))){
    // if funder in array and funders > 0
    campaignAdded!.funderCount = campaignAdded!.funderCount.minus(BigInt.fromString("1"))
  }

  let cmpFunders = campaignAdded!.funders
  if(cmpFunders.includes(event.params._withdrawer)){
    const index = cmpFunders.indexOf(event.params._withdrawer)
    cmpFunders.splice(index, 1)
  }
  campaignAdded!.funders = cmpFunders



  let backers = userAdded.backed
  if(backers.includes(event.params._campaignAddress)){
    const index = backers.indexOf(event.params._campaignAddress)
    backers.splice(index, 1)
  }
  userAdded.backed = backers

  if(userAdded.backedCount!.gt(BigInt.fromString("0"))){
    userAdded.backedCount = userAdded.backedCount!.minus(BigInt.fromString("1"))
  }
 
  crowdFunder.donationCount = crowdFunder.donationCount!.minus(BigInt.fromString("1"))
  crowdFunder.trueAmount = crowdFunder.trueAmount!.minus(event.params._val)

  campaignAdded!.save()
  crowdFunder.save()
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
    userAdded.createdAt = event.block.timestamp
  }

  userAdded.address = event.params._address
  userAdded.username = event.params._username
  userAdded.twitter = event.params._twitter
  userAdded.email = event.params._email
  userAdded.homeAddr = event.params._homeAddress
  userAdded.createdAt = event.block.timestamp
  userAdded.pfp = event.params._pfp

  userAdded.save()
}

export function handleCampaignPublished(event: CampaignPublishedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let crowdFunder = CrowdFunder.load(cdf)
  let userAdded = UserAdded.load(event.params._creator.toHexString())

  if(!userAdded){
    userAdded = new UserAdded(event.params._creator.toHexString())
    userAdded.address = event.params._creator
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.createdCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  if(!crowdFunder){
    crowdFunder = new CrowdFunder(cdf)
    crowdFunder.trueAmount = BigInt.fromString("0")
    crowdFunder.campaignCount = BigInt.fromString("0")
    crowdFunder.donationCount = BigInt.fromString("0")
    crowdFunder.creatorCount = BigInt.fromString("0")
  }

  if(campaignAdded){  
    campaignAdded.published = true
    campaignAdded.save()
  }

  if(userAdded.createdCount!.equals(BigInt.fromString("0"))){
    // on first publish
    crowdFunder.creatorCount = crowdFunder.creatorCount!.plus(BigInt.fromString("1"))
  }

  userAdded.createdCount = userAdded.createdCount!.plus(BigInt.fromString("1"))
  // only published

  crowdFunder.campaignCount = crowdFunder.campaignCount!.plus(BigInt.fromString("1"))

  crowdFunder.save()
  userAdded.save()
}