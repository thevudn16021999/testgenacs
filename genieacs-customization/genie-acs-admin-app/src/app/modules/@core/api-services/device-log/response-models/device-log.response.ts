export interface DeviceLog {
    DeviceId: string;
    TxThroughput: number;
    RxThroughput: number;
    BytesReceived: number;
    BytesReceivedAvgGap: number;
    BytesSent: number;
    BytesSentAvgGap: number;
    ClientConnectionNumber: number;
    Created: number;
}
