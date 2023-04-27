// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class CampaignAdded extends ethereum.Event {
  get params(): CampaignAdded__Params {
    return new CampaignAdded__Params(this);
  }
}

export class CampaignAdded__Params {
  _event: CampaignAdded;

  constructor(event: CampaignAdded) {
    this._event = event;
  }

  get _campaignAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _title(): string {
    return this._event.parameters[2].value.toString();
  }

  get _description(): string {
    return this._event.parameters[3].value.toString();
  }

  get _category(): string {
    return this._event.parameters[4].value.toString();
  }

  get _tags(): string {
    return this._event.parameters[5].value.toString();
  }
}

export class CampaignFunded extends ethereum.Event {
  get params(): CampaignFunded__Params {
    return new CampaignFunded__Params(this);
  }
}

export class CampaignFunded__Params {
  _event: CampaignFunded;

  constructor(event: CampaignFunded) {
    this._event = event;
  }

  get _funder(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _campaignAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _val(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class CampaignPublished extends ethereum.Event {
  get params(): CampaignPublished__Params {
    return new CampaignPublished__Params(this);
  }
}

export class CampaignPublished__Params {
  _event: CampaignPublished;

  constructor(event: CampaignPublished) {
    this._event = event;
  }

  get _campaignAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class CampaignRemoved extends ethereum.Event {
  get params(): CampaignRemoved__Params {
    return new CampaignRemoved__Params(this);
  }
}

export class CampaignRemoved__Params {
  _event: CampaignRemoved;

  constructor(event: CampaignRemoved) {
    this._event = event;
  }

  get _campaignAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class CampaignShrunk extends ethereum.Event {
  get params(): CampaignShrunk__Params {
    return new CampaignShrunk__Params(this);
  }
}

export class CampaignShrunk__Params {
  _event: CampaignShrunk;

  constructor(event: CampaignShrunk) {
    this._event = event;
  }

  get _withdrawer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _campaignAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _val(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class UserAdded extends ethereum.Event {
  get params(): UserAdded__Params {
    return new UserAdded__Params(this);
  }
}

export class UserAdded__Params {
  _event: UserAdded;

  constructor(event: UserAdded) {
    this._event = event;
  }

  get _address(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _username(): string {
    return this._event.parameters[1].value.toString();
  }

  get _twitter(): string {
    return this._event.parameters[2].value.toString();
  }

  get _email(): string {
    return this._event.parameters[3].value.toString();
  }

  get _homeAddress(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class CrowdFunder extends ethereum.SmartContract {
  static bind(address: Address): CrowdFunder {
    return new CrowdFunder("CrowdFunder", address);
  }

  campaignCounter(): BigInt {
    let result = super.call(
      "campaignCounter",
      "campaignCounter():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_campaignCounter(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "campaignCounter",
      "campaignCounter():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class AddCampaignCall extends ethereum.Call {
  get inputs(): AddCampaignCall__Inputs {
    return new AddCampaignCall__Inputs(this);
  }

  get outputs(): AddCampaignCall__Outputs {
    return new AddCampaignCall__Outputs(this);
  }
}

export class AddCampaignCall__Inputs {
  _call: AddCampaignCall;

  constructor(call: AddCampaignCall) {
    this._call = call;
  }

  get _title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _category(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _tags(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _goalAmount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _duration(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _imageURI(): string {
    return this._call.inputValues[6].value.toString();
  }
}

export class AddCampaignCall__Outputs {
  _call: AddCampaignCall;

  constructor(call: AddCampaignCall) {
    this._call = call;
  }
}

export class AddUserCall extends ethereum.Call {
  get inputs(): AddUserCall__Inputs {
    return new AddUserCall__Inputs(this);
  }

  get outputs(): AddUserCall__Outputs {
    return new AddUserCall__Outputs(this);
  }
}

export class AddUserCall__Inputs {
  _call: AddUserCall;

  constructor(call: AddUserCall) {
    this._call = call;
  }

  get _address(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _username(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _twitter(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _email(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _homeAddress(): string {
    return this._call.inputValues[4].value.toString();
  }
}

export class AddUserCall__Outputs {
  _call: AddUserCall;

  constructor(call: AddUserCall) {
    this._call = call;
  }
}

export class DonateToCampaignCall extends ethereum.Call {
  get inputs(): DonateToCampaignCall__Inputs {
    return new DonateToCampaignCall__Inputs(this);
  }

  get outputs(): DonateToCampaignCall__Outputs {
    return new DonateToCampaignCall__Outputs(this);
  }
}

export class DonateToCampaignCall__Inputs {
  _call: DonateToCampaignCall;

  constructor(call: DonateToCampaignCall) {
    this._call = call;
  }

  get _campaignAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DonateToCampaignCall__Outputs {
  _call: DonateToCampaignCall;

  constructor(call: DonateToCampaignCall) {
    this._call = call;
  }
}

export class PublishCampaignCall extends ethereum.Call {
  get inputs(): PublishCampaignCall__Inputs {
    return new PublishCampaignCall__Inputs(this);
  }

  get outputs(): PublishCampaignCall__Outputs {
    return new PublishCampaignCall__Outputs(this);
  }
}

export class PublishCampaignCall__Inputs {
  _call: PublishCampaignCall;

  constructor(call: PublishCampaignCall) {
    this._call = call;
  }

  get _campaignAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _upkeepCreator(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _linkToken(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class PublishCampaignCall__Outputs {
  _call: PublishCampaignCall;

  constructor(call: PublishCampaignCall) {
    this._call = call;
  }
}

export class RefundFromCampaignCall extends ethereum.Call {
  get inputs(): RefundFromCampaignCall__Inputs {
    return new RefundFromCampaignCall__Inputs(this);
  }

  get outputs(): RefundFromCampaignCall__Outputs {
    return new RefundFromCampaignCall__Outputs(this);
  }
}

export class RefundFromCampaignCall__Inputs {
  _call: RefundFromCampaignCall;

  constructor(call: RefundFromCampaignCall) {
    this._call = call;
  }

  get _campaignAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _collector(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RefundFromCampaignCall__Outputs {
  _call: RefundFromCampaignCall;

  constructor(call: RefundFromCampaignCall) {
    this._call = call;
  }
}

export class RemoveCampaignCall extends ethereum.Call {
  get inputs(): RemoveCampaignCall__Inputs {
    return new RemoveCampaignCall__Inputs(this);
  }

  get outputs(): RemoveCampaignCall__Outputs {
    return new RemoveCampaignCall__Outputs(this);
  }
}

export class RemoveCampaignCall__Inputs {
  _call: RemoveCampaignCall;

  constructor(call: RemoveCampaignCall) {
    this._call = call;
  }

  get _campaignAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveCampaignCall__Outputs {
  _call: RemoveCampaignCall;

  constructor(call: RemoveCampaignCall) {
    this._call = call;
  }
}
