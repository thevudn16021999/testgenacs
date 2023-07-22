export interface DeviceProp {
    _object: boolean;
    _timestamp: string;
    _type: string;
    _value: string;
    _writable: boolean;
}

export interface DeviceWritableProp {
    _object: boolean;
    _writable: boolean;
}

export interface DeviceTimestampWritableProp {
    _timestamp: string;
    _object: boolean;
    _writable: boolean;
}

export interface DeviceTimestampProp {
    _object: boolean;
    _timestamp: string;
    _type: string;
    _value: string;
}

export interface DeviceIdInfo {
    _Manufacturer: string;
    _OUI: string;
    _ProductClass: string;
    _SerialNumber: string;
}
