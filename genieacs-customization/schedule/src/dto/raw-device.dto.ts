export interface Root {
  _id: Id;
  VirtualParameters: VirtualParameters;
}

export interface Id {
  $oid: string;
}

export interface VirtualParameters {
  BytesReceived: BytesReceived;
  BytesSent: BytesSent;
  DownloadBOMTime: DownloadBomtime;
  DownloadDiagnosticsState: DownloadDiagnosticsState;
  DownloadEOMTime: DownloadEomtime;
  DownloadTotalBytesReceived: DownloadTotalBytesReceived;
  DownloadURL: DownloadUrl;
  HardwareVersion: HardwareVersion;
  IPV4Address: Ipv4Address;
  MACAddress: Macaddress;
  OUI: Oui;
  PPPoEACName: PppoEacname;
  RxThroughput: RxThroughput;
  SSID24G: Ssid24G;
  SSID5G: Ssid5G;
  SoftwareVersion: SoftwareVersion;
  TxThroughput: TxThroughput;
  UploadBOMTime: UploadBomtime;
  UploadDiagnosticsState: UploadDiagnosticsState;
  UploadEOMTime: UploadEomtime;
  UploadTestFileLength: UploadTestFileLength;
  UploadTotalBytesSent: UploadTotalBytesSent;
  UploadURL: UploadUrl;
  _object: boolean;
  AddressingType: AddressingType;
  _timestamp: Timestamp25;
}

export interface BytesReceived {
  _object: boolean;
  _timestamp: Timestamp;
  _type: string;
  _value: Value;
  _writable: boolean;
}

export interface Timestamp {
  $date: Date;
}

export interface Date {
  $numberLong: string;
}

export interface Value {
  $numberInt: string;
}

export interface BytesSent {
  _object: boolean;
  _timestamp: Timestamp2;
  _type: string;
  _value: Value2;
  _writable: boolean;
}

export interface Timestamp2 {
  $date: Date2;
}

export interface Date2 {
  $numberLong: string;
}

export interface Value2 {
  $numberInt: string;
}

export interface DownloadBomtime {
  _object: boolean;
  _timestamp: Timestamp3;
  _type: string;
  _value: Value3;
  _writable: boolean;
}

export interface Timestamp3 {
  $date: Date3;
}

export interface Date3 {
  $numberLong: string;
}

export interface Value3 {
  $date: Date4;
}

export interface Date4 {
  $numberLong: string;
}

export interface DownloadDiagnosticsState {
  _object: boolean;
  _timestamp: Timestamp4;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp4 {
  $date: Date5;
}

export interface Date5 {
  $numberLong: string;
}

export interface DownloadEomtime {
  _object: boolean;
  _timestamp: Timestamp5;
  _type: string;
  _value: Value4;
  _writable: boolean;
}

export interface Timestamp5 {
  $date: Date6;
}

export interface Date6 {
  $numberLong: string;
}

export interface Value4 {
  $date: Date7;
}

export interface Date7 {
  $numberLong: string;
}

export interface DownloadTotalBytesReceived {
  _object: boolean;
  _timestamp: Timestamp6;
  _type: string;
  _value: Value5;
  _writable: boolean;
}

export interface Timestamp6 {
  $date: Date8;
}

export interface Date8 {
  $numberLong: string;
}

export interface Value5 {
  $numberDouble: string;
}

export interface DownloadUrl {
  _object: boolean;
  _timestamp: Timestamp7;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp7 {
  $date: Date9;
}

export interface Date9 {
  $numberLong: string;
}

export interface HardwareVersion {
  _object: boolean;
  _timestamp: Timestamp8;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp8 {
  $date: Date10;
}

export interface Date10 {
  $numberLong: string;
}

export interface Ipv4Address {
  _object: boolean;
  _timestamp: Timestamp9;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp9 {
  $date: Date11;
}

export interface Date11 {
  $numberLong: string;
}

export interface Macaddress {
  _object: boolean;
  _timestamp: Timestamp10;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp10 {
  $date: Date12;
}

export interface Date12 {
  $numberLong: string;
}

export interface Oui {
  _object: boolean;
  _timestamp: Timestamp11;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp11 {
  $date: Date13;
}

export interface Date13 {
  $numberLong: string;
}

export interface PppoEacname {
  _object: boolean;
  _timestamp: Timestamp12;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp12 {
  $date: Date14;
}

export interface Date14 {
  $numberLong: string;
}

export interface RxThroughput {
  _object: boolean;
  _timestamp: Timestamp13;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp13 {
  $date: Date15;
}

export interface Date15 {
  $numberLong: string;
}

export interface Ssid24G {
  _object: boolean;
  _timestamp: Timestamp14;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp14 {
  $date: Date16;
}

export interface Date16 {
  $numberLong: string;
}

export interface Ssid5G {
  _object: boolean;
  _timestamp: Timestamp15;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp15 {
  $date: Date17;
}

export interface Date17 {
  $numberLong: string;
}

export interface SoftwareVersion {
  _object: boolean;
  _timestamp: Timestamp16;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp16 {
  $date: Date18;
}

export interface Date18 {
  $numberLong: string;
}

export interface TxThroughput {
  _object: boolean;
  _timestamp: Timestamp17;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp17 {
  $date: Date19;
}

export interface Date19 {
  $numberLong: string;
}

export interface UploadBomtime {
  _object: boolean;
  _timestamp: Timestamp18;
  _type: string;
  _value: Value6;
  _writable: boolean;
}

export interface Timestamp18 {
  $date: Date20;
}

export interface Date20 {
  $numberLong: string;
}

export interface Value6 {
  $date: Date21;
}

export interface Date21 {
  $numberLong: string;
}

export interface UploadDiagnosticsState {
  _object: boolean;
  _timestamp: Timestamp19;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp19 {
  $date: Date22;
}

export interface Date22 {
  $numberLong: string;
}

export interface UploadEomtime {
  _object: boolean;
  _timestamp: Timestamp20;
  _type: string;
  _value: Value7;
  _writable: boolean;
}

export interface Timestamp20 {
  $date: Date23;
}

export interface Date23 {
  $numberLong: string;
}

export interface Value7 {
  $date: Date24;
}

export interface Date24 {
  $numberLong: string;
}

export interface UploadTestFileLength {
  _object: boolean;
  _timestamp: Timestamp21;
  _type: string;
  _value: Value8;
  _writable: boolean;
}

export interface Timestamp21 {
  $date: Date25;
}

export interface Date25 {
  $numberLong: string;
}

export interface Value8 {
  $numberInt: string;
}

export interface UploadTotalBytesSent {
  _object: boolean;
  _timestamp: Timestamp22;
  _type: string;
  _value: Value9;
  _writable: boolean;
}

export interface Timestamp22 {
  $date: Date26;
}

export interface Date26 {
  $numberLong: string;
}

export interface Value9 {
  $numberDouble: string;
}

export interface UploadUrl {
  _object: boolean;
  _timestamp: Timestamp23;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp23 {
  $date: Date27;
}

export interface Date27 {
  $numberLong: string;
}

export interface AddressingType {
  _object: boolean;
  _timestamp: Timestamp24;
  _type: string;
  _value: string;
  _writable: boolean;
}

export interface Timestamp24 {
  $date: Date28;
}

export interface Date28 {
  $numberLong: string;
}

export interface Timestamp25 {
  $date: Date29;
}

export interface Date29 {
  $numberLong: string;
}
