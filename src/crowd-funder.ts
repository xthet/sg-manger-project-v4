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
  CrowdFunder,
  CampaignFunded,
} from "../generated/schema"

const cdf = "0x2DCA668091323BCd8AE2DaD22fE62411578E5B21"

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
    campaignAdded.isPublished = false
  }
  if(!userAdded){
    userAdded = new UserAdded(event.params._creator.toHexString())
    userAdded.address = event.params._creator
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.totalRaised = BigInt.fromString("0")
    userAdded.totalDonated = BigInt.fromString("0")
    userAdded.publishedCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  campaignAdded.campaignAddress = event.params._campaignAddress
  campaignAdded.creator = userAdded.id
  campaignAdded.title = event.params._title
  campaignAdded.description = event.params._description
  campaignAdded.category = event.params._category
  campaignAdded.tags = event.params._tags
  campaignAdded.imageURI = event.params._imageURI

  let createdCmps = userAdded.created
  createdCmps.push(event.params._campaignAddress)
  userAdded.created = createdCmps
  // both published and drafts

  userAdded.save()
  campaignAdded.save()
  crowdFunder.save()
}

export function handleCampaignFunded(event: CampaignFundedEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let campaignFunded = CampaignFunded.load(event.transaction.from.toHexString())
  let i_funder = UserAdded.load(event.params._funder.toHexString())
  let i_creator = UserAdded.load(event.params._c_creator.toHexString())
  let crowdFunder = CrowdFunder.load(cdf)

  if(!campaignFunded){
    campaignFunded = new CampaignFunded(event.transaction.from.toHexString())
  }

  if(!crowdFunder){
    crowdFunder = new CrowdFunder(cdf)
    crowdFunder.trueAmount = BigInt.fromString("0")
    crowdFunder.campaignCount = BigInt.fromString("0")
    crowdFunder.donationCount = BigInt.fromString("0")
    crowdFunder.creatorCount = BigInt.fromString("0")
  }

  if(!i_funder){
    i_funder = new UserAdded(event.params._funder.toHexString())
    i_funder.address = event.params._funder
    i_funder.created = new Array<Bytes>(0)
    i_funder.backed = new Array<Bytes>(0)
    i_funder.totalRaised = BigInt.fromString("0")
    i_funder.totalDonated = BigInt.fromString("0")
    i_funder.publishedCount = BigInt.fromString("0")
    i_funder.backedCount = BigInt.fromString("0")
    i_funder.createdAt = event.block.timestamp
  }

  if(!i_creator){
    i_creator = new UserAdded(event.params._c_creator.toHexString())
    i_creator.address = event.params._c_creator
    i_creator.created = new Array<Bytes>(0)
    i_creator.backed = new Array<Bytes>(0)
    i_creator.totalRaised = BigInt.fromString("0")
    i_creator.totalDonated = BigInt.fromString("0")
    i_creator.publishedCount = BigInt.fromString("0")
    i_creator.backedCount = BigInt.fromString("0")
    i_creator.createdAt = event.block.timestamp
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

  // funder adds a new cmp to his backed array
  if(!(i_funder.backed.includes(event.params._campaignAddress))){  
    // if not initially present in backed array 
    let backers = i_funder.backed
    backers.push(event.params._campaignAddress)
    i_funder.backed = backers
    i_funder.backedCount = i_funder.backedCount!.plus(BigInt.fromString("1"))
  }
  i_funder.totalDonated = i_funder.totalDonated.plus(event.params._val)

  // cmp creator gains some funding
  i_creator.totalRaised = i_creator.totalRaised.plus(event.params._val)

  campaignAdded!.save()
  crowdFunder.save()
  i_creator.save()
  i_funder.save()
  campaignFunded.save()
}

export function handleCampaignRemoved(event: CampaignRemovedEvent): void {
  let id = event.params._campaignAddress.toHexString()
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())

  store.remove("CampaignAdded", id)
  campaignAdded!.save()
}

export function handleCampaignShrunk(event: CampaignShrunkEvent): void {
  let campaignAdded = CampaignAdded.load(event.params._campaignAddress.toHexString())
  let i_withdrawer = UserAdded.load(event.params._withdrawer.toHexString())
  let i_creator = UserAdded.load(event.params._c_creator.toHexString())
  let crowdFunder = CrowdFunder.load(cdf)

  if(!crowdFunder){
    crowdFunder = new CrowdFunder(cdf)
    crowdFunder.trueAmount = BigInt.fromString("0")
    crowdFunder.campaignCount = BigInt.fromString("0")
    crowdFunder.donationCount = BigInt.fromString("0")
    crowdFunder.creatorCount = BigInt.fromString("0")
  }
  
  if(!i_withdrawer){
    i_withdrawer = new UserAdded(event.params._withdrawer.toHexString())
    i_withdrawer.address = event.params._withdrawer
    i_withdrawer.created = new Array<Bytes>(0)
    i_withdrawer.backed = new Array<Bytes>(0)
    i_withdrawer.totalRaised = BigInt.fromString("0")
    i_withdrawer.totalDonated = BigInt.fromString("0")
    i_withdrawer.publishedCount = BigInt.fromString("0")
    i_withdrawer.backedCount = BigInt.fromString("0")
    i_withdrawer.createdAt = event.block.timestamp
  }

  if(!i_creator){
    i_creator = new UserAdded(event.params._c_creator.toHexString())
    i_creator.address = event.params._c_creator
    i_creator.created = new Array<Bytes>(0)
    i_creator.backed = new Array<Bytes>(0)
    i_creator.totalRaised = BigInt.fromString("0")
    i_creator.totalDonated = BigInt.fromString("0")
    i_creator.publishedCount = BigInt.fromString("0")
    i_creator.backedCount = BigInt.fromString("0")
    i_creator.createdAt = event.block.timestamp
  }

  if((campaignAdded!.funderCount.gt(BigInt.fromString("0"))) && (campaignAdded!.funders.includes(event.params._withdrawer))){
    // if funder in array and funders > 0
    campaignAdded!.funderCount = campaignAdded!.funderCount.minus(BigInt.fromString("1"))
  }

  // this cmp is no longer funded by withdrawer
  let cmpFunders = campaignAdded!.funders
  if(cmpFunders.includes(event.params._withdrawer)){
    const index = cmpFunders.indexOf(event.params._withdrawer)
    cmpFunders.splice(index, 1)
  }
  campaignAdded!.funders = cmpFunders

  // creator has lost some funding
  i_creator.totalRaised = i_creator.totalRaised.minus(event.params._val)

  // withdrawer no longer backs this cmp
  let backers = i_withdrawer.backed
  if(backers.includes(event.params._campaignAddress)){
    const index = backers.indexOf(event.params._campaignAddress)
    backers.splice(index, 1)
  }
  i_withdrawer.backed = backers

  if(i_withdrawer.backedCount!.gt(BigInt.fromString("0"))){
    i_withdrawer.backedCount = i_withdrawer.backedCount!.minus(BigInt.fromString("1"))
  }

  i_withdrawer.totalDonated = i_withdrawer.totalDonated.minus(event.params._val)
 
  crowdFunder.donationCount = crowdFunder.donationCount!.minus(BigInt.fromString("1"))
  crowdFunder.trueAmount = crowdFunder.trueAmount!.minus(event.params._val)

  campaignAdded!.save()
  crowdFunder.save()
  i_creator.save()
  i_withdrawer.save()
}

export function handleUserAdded(event: UserAddedEvent): void {
  let userAdded = UserAdded.load(event.params._address.toHexString())

  if(!userAdded){
    userAdded = new UserAdded(event.params._address.toHexString())
    userAdded.address = event.params._address
    userAdded.created = new Array<Bytes>(0)
    userAdded.backed = new Array<Bytes>(0)
    userAdded.totalRaised = BigInt.fromString("0")
    userAdded.totalDonated = BigInt.fromString("0")
    userAdded.publishedCount = BigInt.fromString("0")
    userAdded.backedCount = BigInt.fromString("0")
    userAdded.createdAt = event.block.timestamp
  }

  userAdded.address = event.params._address
  userAdded.username = event.params._username
  userAdded.email = event.params._email
  userAdded.shipAddr = event.params._shipAddress
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
    userAdded.totalRaised = BigInt.fromString("0")
    userAdded.totalDonated = BigInt.fromString("0")
    userAdded.publishedCount = BigInt.fromString("0")
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
    campaignAdded.isPublished = true
    campaignAdded.save()
  }

  if(userAdded.publishedCount!.equals(BigInt.fromString("0"))){
    // on first publish
    crowdFunder.creatorCount = crowdFunder.creatorCount!.plus(BigInt.fromString("1"))
  }

  userAdded.publishedCount = userAdded.publishedCount!.plus(BigInt.fromString("1"))
  // only published

  crowdFunder.campaignCount = crowdFunder.campaignCount!.plus(BigInt.fromString("1"))

  crowdFunder.save()
  userAdded.save()
}