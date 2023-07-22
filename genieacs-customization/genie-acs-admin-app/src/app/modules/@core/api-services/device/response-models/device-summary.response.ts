export interface DeviceSummaryResponse {
    'DeviceID.ID': DeviceIdId;
    InternetGatewayDevice: InternetGatewayDevice;
    'InternetGatewayDevice.DeviceInfo': InternetGatewayDeviceDeviceInfo;
    'InternetGatewayDevice.DeviceInfo.HardwareVersion': InternetGatewayDeviceDeviceInfoHardwareVersion;
    'InternetGatewayDevice.DeviceInfo.ProvisioningCode': InternetGatewayDeviceDeviceInfoProvisioningCode;
    'InternetGatewayDevice.DeviceInfo.SoftwareVersion': InternetGatewayDeviceDeviceInfoSoftwareVersion;
    'InternetGatewayDevice.DeviceInfo.SpecVersion': InternetGatewayDeviceDeviceInfoSpecVersion;
    'InternetGatewayDevice.DeviceSummary': InternetGatewayDeviceDeviceSummary;
    'InternetGatewayDevice.DownloadDiagnostics': InternetGatewayDeviceDownloadDiagnostics;
    'InternetGatewayDevice.DownloadDiagnostics.BOMTime': InternetGatewayDeviceDownloadDiagnosticsBomtime;
    'InternetGatewayDevice.DownloadDiagnostics.DSCP': InternetGatewayDeviceDownloadDiagnosticsDscp;
    'InternetGatewayDevice.DownloadDiagnostics.DiagnosticsState': InternetGatewayDeviceDownloadDiagnosticsDiagnosticsState;
    'InternetGatewayDevice.DownloadDiagnostics.DownloadURL': InternetGatewayDeviceDownloadDiagnosticsDownloadUrl;
    'InternetGatewayDevice.DownloadDiagnostics.EOMTime': InternetGatewayDeviceDownloadDiagnosticsEomtime;
    'InternetGatewayDevice.DownloadDiagnostics.EthernetPriority': InternetGatewayDeviceDownloadDiagnosticsEthernetPriority;
    'InternetGatewayDevice.DownloadDiagnostics.Interface': InternetGatewayDeviceDownloadDiagnosticsInterface;
    'InternetGatewayDevice.DownloadDiagnostics.ROMTime': InternetGatewayDeviceDownloadDiagnosticsRomtime;
    'InternetGatewayDevice.DownloadDiagnostics.TCPOpenRequestTime': InternetGatewayDeviceDownloadDiagnosticsTcpopenRequestTime;
    'InternetGatewayDevice.DownloadDiagnostics.TCPOpenResponseTime': InternetGatewayDeviceDownloadDiagnosticsTcpopenResponseTime;
    'InternetGatewayDevice.DownloadDiagnostics.TestBytesReceived': InternetGatewayDeviceDownloadDiagnosticsTestBytesReceived;
    'InternetGatewayDevice.DownloadDiagnostics.TotalBytesReceived': InternetGatewayDeviceDownloadDiagnosticsTotalBytesReceived;
    'InternetGatewayDevice.Firewall': InternetGatewayDeviceFirewall;
    'InternetGatewayDevice.IPPingDiagnostics': InternetGatewayDeviceIppingDiagnostics;
    'InternetGatewayDevice.LANDevice': InternetGatewayDeviceLandevice;
    'InternetGatewayDevice.LANDevice.1': InternetGatewayDeviceLandevice1;
    'InternetGatewayDevice.LANDevice.1.Hosts': InternetGatewayDeviceLandevice1Hosts;
    'InternetGatewayDevice.LANDevice.1.Hosts.Host': InternetGatewayDeviceLandevice1HostsHost;
    'InternetGatewayDevice.LANDevice.1.Hosts.Host.1': InternetGatewayDeviceLandevice1HostsHost1;
    'InternetGatewayDevice.LANDevice.1.Hosts.Host.1.Active': InternetGatewayDeviceLandevice1HostsHost1Active;
    'InternetGatewayDevice.LANDevice.1.Hosts.Host.1.AddressSource': InternetGatewayDeviceLandevice1HostsHost1AddressSource;
    'InternetGatewayDevice.LANDevice.1.Hosts.Host.1.HostName': InternetGatewayDeviceLandevice1HostsHost1HostName;
    'InternetGatewayDevice.LANDevice.1.Hosts.Host.1.IPAddress': InternetGatewayDeviceLandevice1HostsHost1Ipaddress;
    'InternetGatewayDevice.LANDevice.1.Hosts.Host.1.LeaseTimeRemaining': InternetGatewayDeviceLandevice1HostsHost1LeaseTimeRemaining;
    'InternetGatewayDevice.LANDevice.1.Hosts.Host.1.MACAddress': InternetGatewayDeviceLandevice1HostsHost1Macaddress;
    'InternetGatewayDevice.LANDevice.1.Hosts.HostNumberOfEntries': InternetGatewayDeviceLandevice1HostsHostNumberOfEntries;
    'InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig': InternetGatewayDeviceLandevice1LanethernetInterfaceConfig;
    'InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceNumberOfEntries': InternetGatewayDeviceLandevice1LanethernetInterfaceNumberOfEntries;
    'InternetGatewayDevice.LANDevice.1.LANHostConfigManagement': InternetGatewayDeviceLandevice1LanhostConfigManagement;
    'InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.IPInterface': InternetGatewayDeviceLandevice1LanhostConfigManagementIpinterface;
    'InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.IPInterface.1': InternetGatewayDeviceLandevice1LanhostConfigManagementIpinterface1;
    'InternetGatewayDevice.LANDevice.1.LANHostConfigManagement.IPInterface.1.IPInterfaceIPAddress': InternetGatewayDeviceLandevice1LanhostConfigManagementIpinterface1IpinterfaceIpaddress;
    'InternetGatewayDevice.LANDevice.1.LANWLANConfigurationNumberOfEntries': InternetGatewayDeviceLandevice1LanwlanconfigurationNumberOfEntries;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration': InternetGatewayDeviceLandevice1Wlanconfiguration;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1': InternetGatewayDeviceLandevice1Wlanconfiguration1;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.AutoChannelEnable': InternetGatewayDeviceLandevice1Wlanconfiguration1AutoChannelEnable;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BSSID': InternetGatewayDeviceLandevice1Wlanconfiguration1Bssid;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BasicAuthenticationMode': InternetGatewayDeviceLandevice1Wlanconfiguration1BasicAuthenticationMode;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BasicEncryptionModes': InternetGatewayDeviceLandevice1Wlanconfiguration1BasicEncryptionModes;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.BeaconType': InternetGatewayDeviceLandevice1Wlanconfiguration1BeaconType;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Channel': InternetGatewayDeviceLandevice1Wlanconfiguration1Channel;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Enable': InternetGatewayDeviceLandevice1Wlanconfiguration1Enable;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.IEEE11iAuthenticationMode': InternetGatewayDeviceLandevice1Wlanconfiguration1Ieee11iAuthenticationMode;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.IEEE11iEncryptionModes': InternetGatewayDeviceLandevice1Wlanconfiguration1Ieee11iEncryptionModes;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase': InternetGatewayDeviceLandevice1Wlanconfiguration1KeyPassphrase;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey': InternetGatewayDeviceLandevice1Wlanconfiguration1PreSharedKey;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID': InternetGatewayDeviceLandevice1Wlanconfiguration1Ssid;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Standard': InternetGatewayDeviceLandevice1Wlanconfiguration1Standard;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Status': InternetGatewayDeviceLandevice1Wlanconfiguration1Status;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.TransmitPower': InternetGatewayDeviceLandevice1Wlanconfiguration1TransmitPower;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.TransmitPowerSupported': InternetGatewayDeviceLandevice1Wlanconfiguration1TransmitPowerSupported;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WEPEncryptionLevel': InternetGatewayDeviceLandevice1Wlanconfiguration1WepencryptionLevel;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WEPKey': InternetGatewayDeviceLandevice1Wlanconfiguration1Wepkey;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WEPKeyIndex': InternetGatewayDeviceLandevice1Wlanconfiguration1WepkeyIndex;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WPAAuthenticationMode': InternetGatewayDeviceLandevice1Wlanconfiguration1WpaauthenticationMode;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WPAEncryptionModes': InternetGatewayDeviceLandevice1Wlanconfiguration1WpaencryptionModes;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.WPS': InternetGatewayDeviceLandevice1Wlanconfiguration1Wps;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_BSSDescEntry': InternetGatewayDeviceLandevice1Wlanconfiguration1XTpBssdescEntry;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_Band': InternetGatewayDeviceLandevice1Wlanconfiguration1XTpBand;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_Bandwidth': InternetGatewayDeviceLandevice1Wlanconfiguration1XTpBandwidth;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_NeighbourScanEnabled': InternetGatewayDeviceLandevice1Wlanconfiguration1XTpNeighbourScanEnabled;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_PreSharedKey': InternetGatewayDeviceLandevice1Wlanconfiguration1XTpPreSharedKey;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_RadiusServerIP': InternetGatewayDeviceLandevice1Wlanconfiguration1XTpRadiusServerIp;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_RadiusServerPassword': InternetGatewayDeviceLandevice1Wlanconfiguration1XTpRadiusServerPassword;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.X_TP_RadiusServerPort': InternetGatewayDeviceLandevice1Wlanconfiguration1XTpRadiusServerPort;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3': InternetGatewayDeviceLandevice1Wlanconfiguration3;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.AutoChannelEnable': InternetGatewayDeviceLandevice1Wlanconfiguration3AutoChannelEnable;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BSSID': InternetGatewayDeviceLandevice1Wlanconfiguration3Bssid;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BasicAuthenticationMode': InternetGatewayDeviceLandevice1Wlanconfiguration3BasicAuthenticationMode;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BasicEncryptionModes': InternetGatewayDeviceLandevice1Wlanconfiguration3BasicEncryptionModes;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.BeaconType': InternetGatewayDeviceLandevice1Wlanconfiguration3BeaconType;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.Channel': InternetGatewayDeviceLandevice1Wlanconfiguration3Channel;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.Enable': InternetGatewayDeviceLandevice1Wlanconfiguration3Enable;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.IEEE11iAuthenticationMode': InternetGatewayDeviceLandevice1Wlanconfiguration3Ieee11iAuthenticationMode;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.IEEE11iEncryptionModes': InternetGatewayDeviceLandevice1Wlanconfiguration3Ieee11iEncryptionModes;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.KeyPassphrase': InternetGatewayDeviceLandevice1Wlanconfiguration3KeyPassphrase;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.PreSharedKey': InternetGatewayDeviceLandevice1Wlanconfiguration3PreSharedKey;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.SSID': InternetGatewayDeviceLandevice1Wlanconfiguration3Ssid;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.Standard': InternetGatewayDeviceLandevice1Wlanconfiguration3Standard;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.Status': InternetGatewayDeviceLandevice1Wlanconfiguration3Status;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.TransmitPower': InternetGatewayDeviceLandevice1Wlanconfiguration3TransmitPower;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.TransmitPowerSupported': InternetGatewayDeviceLandevice1Wlanconfiguration3TransmitPowerSupported;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WEPEncryptionLevel': InternetGatewayDeviceLandevice1Wlanconfiguration3WepencryptionLevel;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WEPKey': InternetGatewayDeviceLandevice1Wlanconfiguration3Wepkey;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WEPKeyIndex': InternetGatewayDeviceLandevice1Wlanconfiguration3WepkeyIndex;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WPAAuthenticationMode': InternetGatewayDeviceLandevice1Wlanconfiguration3WpaauthenticationMode;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WPAEncryptionModes': InternetGatewayDeviceLandevice1Wlanconfiguration3WpaencryptionModes;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.WPS': InternetGatewayDeviceLandevice1Wlanconfiguration3Wps;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.X_TP_BSSDescEntry': InternetGatewayDeviceLandevice1Wlanconfiguration3XTpBssdescEntry;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.X_TP_Band': InternetGatewayDeviceLandevice1Wlanconfiguration3XTpBand;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.X_TP_Bandwidth': InternetGatewayDeviceLandevice1Wlanconfiguration3XTpBandwidth;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.X_TP_NeighbourScanEnabled': InternetGatewayDeviceLandevice1Wlanconfiguration3XTpNeighbourScanEnabled;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.X_TP_PreSharedKey': InternetGatewayDeviceLandevice1Wlanconfiguration3XTpPreSharedKey;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.X_TP_RadiusServerIP': InternetGatewayDeviceLandevice1Wlanconfiguration3XTpRadiusServerIp;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.X_TP_RadiusServerPassword': InternetGatewayDeviceLandevice1Wlanconfiguration3XTpRadiusServerPassword;
    'InternetGatewayDevice.LANDevice.1.WLANConfiguration.3.X_TP_RadiusServerPort': InternetGatewayDeviceLandevice1Wlanconfiguration3XTpRadiusServerPort;
    'InternetGatewayDevice.LANDeviceNumberOfEntries': InternetGatewayDeviceLandeviceNumberOfEntries;
    'InternetGatewayDevice.Layer3Forwarding': InternetGatewayDeviceLayer3Forwarding;
    'InternetGatewayDevice.ManagementServer': InternetGatewayDeviceManagementServer;
    'InternetGatewayDevice.ManagementServer.AliasBasedAddressing': InternetGatewayDeviceManagementServerAliasBasedAddressing;
    'InternetGatewayDevice.ManagementServer.ConnectionRequestPassword': InternetGatewayDeviceManagementServerConnectionRequestPassword;
    'InternetGatewayDevice.ManagementServer.ConnectionRequestURL': InternetGatewayDeviceManagementServerConnectionRequestUrl;
    'InternetGatewayDevice.ManagementServer.ConnectionRequestUsername': InternetGatewayDeviceManagementServerConnectionRequestUsername;
    'InternetGatewayDevice.ManagementServer.EnableCWMP': InternetGatewayDeviceManagementServerEnableCwmp;
    'InternetGatewayDevice.ManagementServer.KickURL': InternetGatewayDeviceManagementServerKickUrl;
    'InternetGatewayDevice.ManagementServer.ManageableDevice': InternetGatewayDeviceManagementServerManageableDevice;
    'InternetGatewayDevice.ManagementServer.ManageableDeviceNumberOfEntries': InternetGatewayDeviceManagementServerManageableDeviceNumberOfEntries;
    'InternetGatewayDevice.ManagementServer.NATDetected': InternetGatewayDeviceManagementServerNatdetected;
    'InternetGatewayDevice.ManagementServer.ParameterKey': InternetGatewayDeviceManagementServerParameterKey;
    'InternetGatewayDevice.ManagementServer.Password': InternetGatewayDeviceManagementServerPassword;
    'InternetGatewayDevice.ManagementServer.PeriodicInformEnable': InternetGatewayDeviceManagementServerPeriodicInformEnable;
    'InternetGatewayDevice.ManagementServer.PeriodicInformInterval': InternetGatewayDeviceManagementServerPeriodicInformInterval;
    'InternetGatewayDevice.ManagementServer.PeriodicInformTime': InternetGatewayDeviceManagementServerPeriodicInformTime;
    'InternetGatewayDevice.ManagementServer.STUNEnable': InternetGatewayDeviceManagementServerStunenable;
    'InternetGatewayDevice.ManagementServer.STUNMaximumKeepAlivePeriod': InternetGatewayDeviceManagementServerStunmaximumKeepAlivePeriod;
    'InternetGatewayDevice.ManagementServer.STUNMinimumKeepAlivePeriod': InternetGatewayDeviceManagementServerStunminimumKeepAlivePeriod;
    'InternetGatewayDevice.ManagementServer.STUNPassword': InternetGatewayDeviceManagementServerStunpassword;
    'InternetGatewayDevice.ManagementServer.STUNServerAddress': InternetGatewayDeviceManagementServerStunserverAddress;
    'InternetGatewayDevice.ManagementServer.STUNServerPort': InternetGatewayDeviceManagementServerStunserverPort;
    'InternetGatewayDevice.ManagementServer.STUNUsername': InternetGatewayDeviceManagementServerStunusername;
    'InternetGatewayDevice.ManagementServer.UDPConnectionRequestAddress': InternetGatewayDeviceManagementServerUdpconnectionRequestAddress;
    'InternetGatewayDevice.ManagementServer.UDPConnectionRequestAddressNotificationLimit': InternetGatewayDeviceManagementServerUdpconnectionRequestAddressNotificationLimit;
    'InternetGatewayDevice.ManagementServer.URL': InternetGatewayDeviceManagementServerUrl;
    'InternetGatewayDevice.ManagementServer.UpgradesManaged': InternetGatewayDeviceManagementServerUpgradesManaged;
    'InternetGatewayDevice.ManagementServer.Username': InternetGatewayDeviceManagementServerUsername;
    'InternetGatewayDevice.Time': InternetGatewayDeviceTime;
    'InternetGatewayDevice.TraceRouteDiagnostics': InternetGatewayDeviceTraceRouteDiagnostics;
    'InternetGatewayDevice.UDPEchoConfig': InternetGatewayDeviceUdpechoConfig;
    'InternetGatewayDevice.UploadDiagnostics': InternetGatewayDeviceUploadDiagnostics;
    'InternetGatewayDevice.User': InternetGatewayDeviceUser;
    'InternetGatewayDevice.UserInterface': InternetGatewayDeviceUserInterface;
    'InternetGatewayDevice.WANDevice': InternetGatewayDeviceWandevice;
    'InternetGatewayDevice.WANDevice.1': InternetGatewayDeviceWandevice1;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice': InternetGatewayDeviceWandevice1WanconnectionDevice;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4': InternetGatewayDeviceWandevice1WanconnectionDevice4;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.AddressingType': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1AddressingType;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.ConnectionStatus': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1ConnectionStatus;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.ConnectionType': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1ConnectionType;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.DNSOverrideAllowed': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1DnsoverrideAllowed;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.DNSServers': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Dnsservers;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.DefaultGateway': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1DefaultGateway;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.Enable': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Enable;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.ExternalIPAddress': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1ExternalIpaddress;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.MACAddress': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Macaddress;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.MACAddressOverride': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1MacaddressOverride;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.MaxMTUSize': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1MaxMtusize;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.NATEnabled': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Natenabled;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.Name': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Name;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.PortMapping': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1PortMapping;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.PortMappingNumberOfEntries': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1PortMappingNumberOfEntries;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.SubnetMask': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1SubnetMask;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.Uptime': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Uptime;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_ClonedMACAddress': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpClonedMacaddress;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_DefaultIPv6Gateway': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpDefaultIpv6Gateway;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_DefaultIPv6GatewayOverride': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpDefaultIpv6GatewayOverride;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_ExternalIPv6Address': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpExternalIpv6Address;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_FirewallEnabled': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpFirewallEnabled;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_FullconeNATEnabled': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpFullconeNatenabled;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_Hostname': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpHostname;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_IGMPProxyEnabled': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIgmpproxyEnabled;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_IPv4Enabled': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv4Enabled;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_IPv6AddressingType': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv6AddressingType;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_IPv6DNSOverrideAllowed': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv6DnsoverrideAllowed;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_IPv6DNSServers': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv6Dnsservers;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_IPv6Enabled': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv6Enabled;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_PrefixLength': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpPrefixLength;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnection.1.X_TP_Unicast': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpUnicast;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANEthernetLinkConfig': InternetGatewayDeviceWandevice1WanconnectionDevice4WanethernetLinkConfig;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANIPConnectionNumberOfEntries': InternetGatewayDeviceWandevice1WanconnectionDevice4WanipconnectionNumberOfEntries;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANPPPConnection': InternetGatewayDeviceWandevice1WanconnectionDevice4Wanpppconnection;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.WANPPPConnectionNumberOfEntries': InternetGatewayDeviceWandevice1WanconnectionDevice4WanpppconnectionNumberOfEntries;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.X_TP_L2TP_Connection': InternetGatewayDeviceWandevice1WanconnectionDevice4XTpL2TpConnection;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.X_TP_PPTP_Connection': InternetGatewayDeviceWandevice1WanconnectionDevice4XTpPptpConnection;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.X_TP_WANL2TPConnectionNumberOfEntries': InternetGatewayDeviceWandevice1WanconnectionDevice4XTpWanl2TpconnectionNumberOfEntries;
    'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.4.X_TP_WANPPTPConnectionNumberOfEntries': InternetGatewayDeviceWandevice1WanconnectionDevice4XTpWanpptpconnectionNumberOfEntries;
    'InternetGatewayDevice.WANDevice.1.WANCommonInterfaceConfig': InternetGatewayDeviceWandevice1WancommonInterfaceConfig;
    'InternetGatewayDevice.WANDevice.1.WANConnectionNumberOfEntries': InternetGatewayDeviceWandevice1WanconnectionNumberOfEntries;
    'InternetGatewayDevice.WANDevice.1.WANEthernetInterfaceConfig': InternetGatewayDeviceWandevice1WanethernetInterfaceConfig;
    'InternetGatewayDevice.WANDeviceNumberOfEntries': InternetGatewayDeviceWandeviceNumberOfEntries;
    'InternetGatewayDevice.X_TP_Local': InternetGatewayDeviceXTpLocal;
    'InternetGatewayDevice.X_TP_Services': InternetGatewayDeviceXTpServices;
    'InternetGatewayDevice.X_TP_VPN': InternetGatewayDeviceXTpVpn;
    'DeviceID.Manufacturer': DeviceIdManufacturer;
    'DeviceID.OUI': DeviceIdOui;
    'DeviceID.ProductClass': DeviceIdProductClass;
    'DeviceID.SerialNumber': DeviceIdSerialNumber;
    'Events.Inform': EventsInform;
    'Events.Registered': EventsRegistered;
    'Events.0_BOOTSTRAP': Events0Bootstrap;
    'Events.1_BOOT': Events1Boot;
    Tags: Tags;
    TagValues: TagValues;
    TagPlainValues: string[];
}

export interface DeviceIdId {
    value: string[];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface InternetGatewayDevice {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDeviceInfo {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDeviceInfoHardwareVersion {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDeviceInfoProvisioningCode {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDeviceInfoSoftwareVersion {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDeviceInfoSpecVersion {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDeviceSummary {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnostics {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsBomtime {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsDscp {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsDiagnosticsState {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsDownloadUrl {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsEomtime {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsEthernetPriority {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsInterface {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsRomtime {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsTcpopenRequestTime {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsTcpopenResponseTime {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsTestBytesReceived {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceDownloadDiagnosticsTotalBytesReceived {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceFirewall {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceIppingDiagnostics {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1 {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Hosts {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHost {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHost1 {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHost1Active {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHost1AddressSource {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHost1HostName {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHost1Ipaddress {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHost1LeaseTimeRemaining {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHost1Macaddress {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1HostsHostNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1LanethernetInterfaceConfig {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1LanethernetInterfaceNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1LanhostConfigManagement {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1LanhostConfigManagementIpinterface {
    object: boolean;
    objectTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1LanhostConfigManagementIpinterface1 {
    object: boolean;
    objectTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1LanhostConfigManagementIpinterface1IpinterfaceIpaddress {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1LanwlanconfigurationNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1 {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1AutoChannelEnable {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Bssid {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1BasicAuthenticationMode {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1BasicEncryptionModes {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1BeaconType {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Channel {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Enable {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Ieee11iAuthenticationMode {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Ieee11iEncryptionModes {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1KeyPassphrase {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1PreSharedKey {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Ssid {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Standard {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Status {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1TransmitPower {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1TransmitPowerSupported {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1WepencryptionLevel {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Wepkey {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1WepkeyIndex {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1WpaauthenticationMode {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1WpaencryptionModes {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1Wps {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1XTpBssdescEntry {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1XTpBand {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1XTpBandwidth {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1XTpNeighbourScanEnabled {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1XTpPreSharedKey {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1XTpRadiusServerIp {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1XTpRadiusServerPassword {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration1XTpRadiusServerPort {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3 {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3AutoChannelEnable {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Bssid {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3BasicAuthenticationMode {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3BasicEncryptionModes {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3BeaconType {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Channel {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Enable {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Ieee11iAuthenticationMode {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Ieee11iEncryptionModes {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3KeyPassphrase {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3PreSharedKey {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Ssid {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Standard {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Status {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3TransmitPower {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3TransmitPowerSupported {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3WepencryptionLevel {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Wepkey {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3WepkeyIndex {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3WpaauthenticationMode {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3WpaencryptionModes {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3Wps {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3XTpBssdescEntry {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3XTpBand {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3XTpBandwidth {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3XTpNeighbourScanEnabled {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3XTpPreSharedKey {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3XTpRadiusServerIp {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3XTpRadiusServerPassword {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandevice1Wlanconfiguration3XTpRadiusServerPort {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLandeviceNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceLayer3Forwarding {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServer {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerAliasBasedAddressing {
    value: [boolean, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerConnectionRequestPassword {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerConnectionRequestUrl {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerConnectionRequestUsername {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerEnableCwmp {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerKickUrl {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerManageableDevice {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerManageableDeviceNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerNatdetected {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerParameterKey {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerPassword {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerPeriodicInformEnable {
    value: [boolean, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerPeriodicInformInterval {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerPeriodicInformTime {
    value: [number, string];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerStunenable {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerStunmaximumKeepAlivePeriod {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerStunminimumKeepAlivePeriod {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerStunpassword {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerStunserverAddress {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerStunserverPort {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerStunusername {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerUdpconnectionRequestAddress {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerUdpconnectionRequestAddressNotificationLimit {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerUrl {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerUpgradesManaged {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceManagementServerUsername {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceTime {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceTraceRouteDiagnostics {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceUdpechoConfig {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceUploadDiagnostics {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceUser {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceUserInterface {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1 {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4 {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1 {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1AddressingType {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1ConnectionStatus {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1ConnectionType {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1DnsoverrideAllowed {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Dnsservers {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1DefaultGateway {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Enable {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1ExternalIpaddress {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Macaddress {
    value: string[];
    valueTimestamp: number;
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1MacaddressOverride {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1MaxMtusize {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Natenabled {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Name {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1PortMapping {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1PortMappingNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1SubnetMask {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1Uptime {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpClonedMacaddress {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpDefaultIpv6Gateway {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpDefaultIpv6GatewayOverride {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpExternalIpv6Address {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpFirewallEnabled {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpFullconeNatenabled {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpHostname {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIgmpproxyEnabled {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv4Enabled {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv6AddressingType {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv6DnsoverrideAllowed {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv6Dnsservers {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpIpv6Enabled {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpPrefixLength {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanipconnection1XTpUnicast {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4WanethernetLinkConfig {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4WanipconnectionNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4Wanpppconnection {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4WanpppconnectionNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4XTpL2TpConnection {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4XTpPptpConnection {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4XTpWanl2TpconnectionNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionDevice4XTpWanpptpconnectionNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WancommonInterfaceConfig {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanconnectionNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandevice1WanethernetInterfaceConfig {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceWandeviceNumberOfEntries {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceXTpLocal {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceXTpServices {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface InternetGatewayDeviceXTpVpn {
    object: boolean;
    objectTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
}

export interface DeviceIdManufacturer {
    value: string[];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface DeviceIdOui {
    value: string[];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface DeviceIdProductClass {
    value: string[];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface DeviceIdSerialNumber {
    value: string[];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface EventsInform {
    value: [number, string];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface EventsRegistered {
    value: [number, string];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface Events0Bootstrap {
    value: [number, string];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface Events1Boot {
    value: [number, string];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface Tags {
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}

export interface TagValues {
    value: [string, boolean];
    valueTimestamp: number;
    writable: boolean;
    writableTimestamp: number;
    object: boolean;
    objectTimestamp: number;
}
