// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class CrowdFunder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CrowdFunder entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CrowdFunder must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CrowdFunder", id.toString(), this);
    }
  }

  static load(id: string): CrowdFunder | null {
    return changetype<CrowdFunder | null>(store.get("CrowdFunder", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get campaignCount(): BigInt | null {
    let value = this.get("campaignCount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set campaignCount(value: BigInt | null) {
    if (!value) {
      this.unset("campaignCount");
    } else {
      this.set("campaignCount", Value.fromBigInt(<BigInt>value));
    }
  }

  get trueAmount(): BigInt | null {
    let value = this.get("trueAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set trueAmount(value: BigInt | null) {
    if (!value) {
      this.unset("trueAmount");
    } else {
      this.set("trueAmount", Value.fromBigInt(<BigInt>value));
    }
  }

  get donationCount(): BigInt | null {
    let value = this.get("donationCount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set donationCount(value: BigInt | null) {
    if (!value) {
      this.unset("donationCount");
    } else {
      this.set("donationCount", Value.fromBigInt(<BigInt>value));
    }
  }

  get creatorCount(): BigInt | null {
    let value = this.get("creatorCount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set creatorCount(value: BigInt | null) {
    if (!value) {
      this.unset("creatorCount");
    } else {
      this.set("creatorCount", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class CampaignAdded extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CampaignAdded entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CampaignAdded must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CampaignAdded", id.toString(), this);
    }
  }

  static load(id: string): CampaignAdded | null {
    return changetype<CampaignAdded | null>(store.get("CampaignAdded", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get campaignAddress(): Bytes {
    let value = this.get("campaignAddress");
    return value!.toBytes();
  }

  set campaignAddress(value: Bytes) {
    this.set("campaignAddress", Value.fromBytes(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value!.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get category(): string {
    let value = this.get("category");
    return value!.toString();
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get tags(): string {
    let value = this.get("tags");
    return value!.toString();
  }

  set tags(value: string) {
    this.set("tags", Value.fromString(value));
  }

  get imageURI(): string {
    let value = this.get("imageURI");
    return value!.toString();
  }

  set imageURI(value: string) {
    this.set("imageURI", Value.fromString(value));
  }

  get funders(): Array<Bytes> {
    let value = this.get("funders");
    return value!.toBytesArray();
  }

  set funders(value: Array<Bytes>) {
    this.set("funders", Value.fromBytesArray(value));
  }

  get funderCount(): BigInt {
    let value = this.get("funderCount");
    return value!.toBigInt();
  }

  set funderCount(value: BigInt) {
    this.set("funderCount", Value.fromBigInt(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get isPublished(): boolean {
    let value = this.get("isPublished");
    return value!.toBoolean();
  }

  set isPublished(value: boolean) {
    this.set("isPublished", Value.fromBoolean(value));
  }
}

export class CampaignFunded extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CampaignFunded entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CampaignFunded must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CampaignFunded", id.toString(), this);
    }
  }

  static load(id: string): CampaignFunded | null {
    return changetype<CampaignFunded | null>(store.get("CampaignFunded", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get funder(): Bytes {
    let value = this.get("funder");
    return value!.toBytes();
  }

  set funder(value: Bytes) {
    this.set("funder", Value.fromBytes(value));
  }

  get fAmount(): BigInt {
    let value = this.get("fAmount");
    return value!.toBigInt();
  }

  set fAmount(value: BigInt) {
    this.set("fAmount", Value.fromBigInt(value));
  }

  get campaignAddress(): Bytes {
    let value = this.get("campaignAddress");
    return value!.toBytes();
  }

  set campaignAddress(value: Bytes) {
    this.set("campaignAddress", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class CampaignRemoved extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CampaignRemoved entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CampaignRemoved must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CampaignRemoved", id.toString(), this);
    }
  }

  static load(id: string): CampaignRemoved | null {
    return changetype<CampaignRemoved | null>(store.get("CampaignRemoved", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get campaignAddress(): Bytes {
    let value = this.get("campaignAddress");
    return value!.toBytes();
  }

  set campaignAddress(value: Bytes) {
    this.set("campaignAddress", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class CampaignShrunk extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CampaignShrunk entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CampaignShrunk must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CampaignShrunk", id.toString(), this);
    }
  }

  static load(id: string): CampaignShrunk | null {
    return changetype<CampaignShrunk | null>(store.get("CampaignShrunk", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get withdrawer(): Bytes {
    let value = this.get("withdrawer");
    return value!.toBytes();
  }

  set withdrawer(value: Bytes) {
    this.set("withdrawer", Value.fromBytes(value));
  }

  get wAmount(): Bytes {
    let value = this.get("wAmount");
    return value!.toBytes();
  }

  set wAmount(value: Bytes) {
    this.set("wAmount", Value.fromBytes(value));
  }

  get campaignAddress(): Bytes {
    let value = this.get("campaignAddress");
    return value!.toBytes();
  }

  set campaignAddress(value: Bytes) {
    this.set("campaignAddress", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class UserAdded extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UserAdded entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserAdded must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserAdded", id.toString(), this);
    }
  }

  static load(id: string): UserAdded | null {
    return changetype<UserAdded | null>(store.get("UserAdded", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get username(): string | null {
    let value = this.get("username");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set username(value: string | null) {
    if (!value) {
      this.unset("username");
    } else {
      this.set("username", Value.fromString(<string>value));
    }
  }

  get twitter(): string | null {
    let value = this.get("twitter");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set twitter(value: string | null) {
    if (!value) {
      this.unset("twitter");
    } else {
      this.set("twitter", Value.fromString(<string>value));
    }
  }

  get email(): string | null {
    let value = this.get("email");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set email(value: string | null) {
    if (!value) {
      this.unset("email");
    } else {
      this.set("email", Value.fromString(<string>value));
    }
  }

  get homeAddr(): string | null {
    let value = this.get("homeAddr");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set homeAddr(value: string | null) {
    if (!value) {
      this.unset("homeAddr");
    } else {
      this.set("homeAddr", Value.fromString(<string>value));
    }
  }

  get created(): Array<Bytes> {
    let value = this.get("created");
    return value!.toBytesArray();
  }

  set created(value: Array<Bytes>) {
    this.set("created", Value.fromBytesArray(value));
  }

  get backed(): Array<Bytes> {
    let value = this.get("backed");
    return value!.toBytesArray();
  }

  set backed(value: Array<Bytes>) {
    this.set("backed", Value.fromBytesArray(value));
  }

  get published(): Array<Bytes> {
    let value = this.get("published");
    return value!.toBytesArray();
  }

  set published(value: Array<Bytes>) {
    this.set("published", Value.fromBytesArray(value));
  }

  get totalRaised(): BigInt {
    let value = this.get("totalRaised");
    return value!.toBigInt();
  }

  set totalRaised(value: BigInt) {
    this.set("totalRaised", Value.fromBigInt(value));
  }

  get createdCount(): BigInt | null {
    let value = this.get("createdCount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdCount(value: BigInt | null) {
    if (!value) {
      this.unset("createdCount");
    } else {
      this.set("createdCount", Value.fromBigInt(<BigInt>value));
    }
  }

  get backedCount(): BigInt | null {
    let value = this.get("backedCount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set backedCount(value: BigInt | null) {
    if (!value) {
      this.unset("backedCount");
    } else {
      this.set("backedCount", Value.fromBigInt(<BigInt>value));
    }
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get pfp(): string | null {
    let value = this.get("pfp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set pfp(value: string | null) {
    if (!value) {
      this.unset("pfp");
    } else {
      this.set("pfp", Value.fromString(<string>value));
    }
  }
}

export class CampaignPublished extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CampaignPublished entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type CampaignPublished must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("CampaignPublished", id.toString(), this);
    }
  }

  static load(id: string): CampaignPublished | null {
    return changetype<CampaignPublished | null>(
      store.get("CampaignPublished", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }
}
