/**
 * Represents a Key-Value object.
 */
export interface IAssoc<T>
{
    [key: string]: T;
}

/**
 * Represents common data returned by the api.
 */
export interface CallbackData<T extends QueryResponseItem>
{
    cmd?: string;
    options?: string[];
    text?: string;
    parameters: IAssoc<Object>;
    //item: QueryCommand;
    error: QueryError;
    response: T[];
    rawResponse: string;

    // cmd?: string,
    // options?: string[];
    // text?: string;
    // parameters: Object;
}

export interface LoginParams extends IAssoc<any>
{
    client_login_name: string;
    client_login_password: string;
}

export interface VersionResponseData extends QueryResponseItem
{
    version: string;
    build: number;
    platform: string;
}

export interface UseParams extends IAssoc<any>
{
    sid: number;
}
export interface ServerListResponseData extends QueryResponseItem
{
    //@todo
    virtualserver_id: number;
    virtualserver_port: number;
    virtualserver_status: string;
    virtualserver_clientsonline: number;
}
export interface ServerDeleteParams extends UseParams
{ }

export interface ServerStartStopParams extends UseParams
{ }

export interface ClientListResponseData extends QueryResponseItem
{
    //TODO
}
export interface ClientListParams extends IAssoc<any>
{ }

/**
 * Specialized callback data for a failed request.
 */
export interface ErrorResponseData extends QueryResponseItem
{ }

/**
 * Represents common data returned by the api during a successful response.
 */
export interface QueryResponseItem extends IAssoc<any>
{ }

/**
 * Item that represents a query error.
 */
export interface QueryError
{
    /**
     * The error id.
     * @type {number}
     */
    id: number;
    /**
     * Error message.
     * @type {string}
     */
    msg: string;

    /**
     * Permission that the client does not have.
     * @type {number}
     */
    failed_permid?: number;
}

/**
 * Represents an item in the processing queue for the api.
 */
export interface QueryCommand
{
    cmd: string;
    options: string[];
    parameters: IAssoc<Object>;
    text: string;
    resolveFunction: (data: CallbackData<any>) => void;
    rejectFunction: (reason: any) => void;

    response?: QueryResponseItem[];
    rawResponse?: string;
    error?: QueryError;
}

export interface HostInfoResponseData extends QueryResponseItem
{
    instance_uptime: number;
    host_timestamp_utc: number;
    virtualservers_running_total: number;
    connection_filetransfer_bandwidth_sent: number;
    // TODO
}

export interface InstanceInfoResponseData extends QueryResponseItem
{
    // TODO
}

export interface GenericResponseData extends QueryResponseItem
{ }

export interface ServerRequstConnectionInfoResponseData extends QueryResponseItem, ServerConnectionProperties
{ }

export interface ServerEditParams extends IAssoc<any>, VirtualServerPropertiesChangable
{ }

export interface ServerInfoResponseData extends QueryResponseItem, VirtualServerProperties
{ }

export interface SendTextMessageParams extends QueryResponseItem
{
    targetmode: TextMessageTargetMode;
    target: number;
    msg: string;
}

export interface InstanceEditParams extends IAssoc<any>, InstancePropertiesChangable
{ }

export interface GmParams extends IAssoc<any>
{
    msg: string;
}
export interface ChannelListResponseData extends QueryResponseItem
{
    cid: number;
    pid: number;
    channel_order: number;
    channel_name: string;
    channel_topic: string;
    total_clients: number;
}
export interface ChannelInfoParams extends IAssoc<any>
{
    cid: number;
}
export interface ChannelInfoResponseData extends QueryResponseItem, ChannelProperties
{ }

export interface ChannelDeleteParams extends IAssoc<any>, ChannelInfoParams
{
    force: YesNo;
}

export interface ClientInfoResponseData extends QueryResponseItem, ClientProperties
{ }
export interface ClientInfoParams extends IAssoc<any>
{
    clid: number;
}

export interface ClientDBDeleteParams extends IAssoc<any>
{
    cldbid: number;
}

export interface ClientMoveParams extends IAssoc<any>
{
    clid: number[];
    cid: number;
    cpw?: string;
}
export interface ClientKickParams extends IAssoc<any>
{
    clid: number[];
    reasonid: ReasonIdentifier;
    reasonmsg: string;
}
export interface ClientPokeParams extends IAssoc<any>
{
    clid: number;
    msg: string;
}
export interface ClientPermListParams extends IAssoc<any>
{
    cldbid: number;
}
export interface ClientPermListResponseData extends QueryResponseItem
{
    cldbid?: number;
    permid: number;
    permvalue: number;
    permnegated: YesNo;
    permskip: number;
}
export interface ClientAddPermParams extends IAssoc<any>
{
    cldbid: number;
    permid?: number[];
    permsid?: string[];
    permvalue: number[];
    permskip: YesNo[];
}
export interface ClientDeleteParams extends IAssoc<any>
{
    cldbid: number;
    permid: number[];
    permsid: string[];
}

export interface MessageDeleteParams extends IAssoc<any>
{
    msgid: number;
}

export interface ComplainDeleteAllParams extends IAssoc<any>
{
    tcldbid: number;
}
export interface ComplainDeleteParams extends IAssoc<any>
{
    tcldbid: number;
    fcldbid: number;
}
export interface BanClientParams extends IAssoc<any>
{
    clid: number;
    time?: number;
    banreason?: string;
}

export interface BanListResponseData extends QueryResponseItem
{
    banid: number;
    ip: string;
    created: number;
    invokername: string;
    invokercldbid: number;
    invokeruid: string;
    reason: string;
    enforcements: number;
}

export interface BanAddParams extends IAssoc<any>
{
    ip?: string;
    name?: string;
    uid?: string;
    time?: number;
    banreason?: string;
}
export interface BanDeleteParams extends IAssoc<any>
{
    banid: number;
}

export interface FtStopParams extends IAssoc<any>
{
    serverftfid: number;
    delete: YesNo;
}

export interface LogAddParams extends IAssoc<any>
{
    loglevel: LogLevel;
    logmsg: string;
}

export interface InstancePropertiesChangable
{
    /**
    * Default ServerQuery group ID
    */
    SERVERINSTANCE_GUEST_SERVERQUERY_GROUP: any;
    /**
     * Default template group ID for administrators on new virtual servers (used to create initial token)
     */
    SERVERINSTANCE_TEMPLATE_SERVERADMIN_GROUP: any;
    /**
     * TCP port used for file transfers
     */
    SERVERINSTANCE_FILETRANSFER_PORT: number;
    /**
     * Max bandwidth available for outgoing file transfers (Bytes/s)
     */
    SERVERINSTANCE_MAX_DOWNLOAD_TOTAL_BANDWITDH: number;
    /**
     * Max bandwidth available for incoming file transfers (Bytes/s)
     */
    SERVERINSTANCE_MAX_UPLOAD_TOTAL_BANDWITDH: number;
    /**
     * Default server group ID used in templates
     */
    SERVERINSTANCE_TEMPLATE_SERVERDEFAULT_GROUP: any;
    /**
     * Default channel group ID used in templates
     */
    SERVERINSTANCE_TEMPLATE_CHANNELDEFAULT_GROUP: any;
    /**
     * Default channel administrator group ID used in templates
     */
    SERVERINSTANCE_TEMPLATE_CHANNELADMIN_GROUP: any;
    /**
     * Max number of commands allowed in <SERVERINSTANCE_SERVERQUERY_FLOOD_TIME> seconds
     */
    SERVERINSTANCE_SERVERQUERY_FLOOD_COMMANDS: number;
    /**
     * Timeframe in seconds for <SERVERINSTANCE_SERVERQUERY_FLOOD_COMMANDS> commands
     */
    SERVERINSTANCE_SERVERQUERY_FLOOD_TIME: number;
    /**
     * Time in seconds used for automatic bans triggered by the ServerQuery flood protection
     */
    SERVERINSTANCE_SERVERQUERY_FLOOD_BAN_TIME: number;
}

interface InstancePropertiesReadOnly extends ServerConnectionProperties
{
    /**
     * Uptime in seconds
     */
    INSTANCE_UPTIME: number;
    /**
     * Current server date and time as UTC timestamp
     */
    HOST_TIMESTAMP_UTC: any;
    /**
     * Number of virtual servers running
     */
    VIRTUALSERVERS_RUNNING_TOTAL: number;
    /**
     * Database revision number
     */
    SERVERINSTANCE_DATABASE_VERSION: any;
    /**
     * Max number of clients for all virtual servers
     */
    VIRTUALSERVERS_TOTAL_MAXCLIENTS: number;
    /**
     * Number of clients online on all virtual servers
     */
    VIRTUALSERVERS_TOTAL_CLIENTS_ONLINE: number;
    /**
     * Number of channels on all virtual servers
     */
    VIRTUALSERVERS_TOTAL_CHANNELS_ONLINE: number;
}

interface InstanceProperties extends InstancePropertiesReadOnly, InstancePropertiesChangable
{ }

export interface BindingListResponseData extends QueryResponseItem
{
    //TODO
}

export interface VirtualServerPropertiesChangable
{
    /**
     * Name of the virtual server
     */
    VIRTUALSERVER_NAME: string;
    /**
     * Welcome message of the virtual server
     */
    VIRTUALSERVER_WELCOMEMESSAGE: string;
    /**
     * Number of slots available on the virtual server
     */
    VIRTUALSERVER_MAXCLIENTS: number;
    /**
     * Password of the virtual server
     */
    VIRTUALSERVER_PASSWORD: string;
    /**
     * Host message of the virtual server
     */
    VIRTUALSERVER_HOSTMESSAGE: string;
    /**
     * Host message mode of the virtual server (see Definitions)
     */
    VIRTUALSERVER_HOSTMESSAGE_MODE: any;
    /**
     * Default server group ID
     */
    VIRTUALSERVER_DEFAULT_SERVER_GROUP: any;
    /**
     * Default channel group ID
     */
    VIRTUALSERVER_DEFAULT_CHANNEL_GROUP: any;
    /**
     * Default channel administrator group ID
     */
    VIRTUALSERVER_DEFAULT_CHANNEL_ADMIN_GROUP: any;
    /**
     * Max bandwidth for outgoing file transfers on the virtual server (Bytes/s)
     */
    VIRTUALSERVER_MAX_DOWNLOAD_TOTAL_BANDWIDTH: number;
    /**
     * Max bandwidth for incoming file transfers on the virtual server (Bytes/s)
     */
    VIRTUALSERVER_MAX_UPLOAD_TOTAL_BANDWIDTH: number;
    /**
     * Host banner URL opened on click
     */
    VIRTUALSERVER_HOSTBANNER_URL: string;
    /**
     * Host banner URL used as image source
     */
    VIRTUALSERVER_HOSTBANNER_GFX_URL: string;
    /**
     * Interval for reloading the banner on client-side
     */
    VIRTUALSERVER_HOSTBANNER_GFX_INTERVAL: any;
    /**
     * Number of complaints needed to ban a client automatically
     */
    VIRTUALSERVER_COMPLAIN_AUTOBAN_COUNT: number;
    /**
     * Time in seconds used for automatic bans triggered by complaints
     */
    VIRTUALSERVER_COMPLAIN_AUTOBAN_TIME: number;
    /**
     * Time in seconds before a complaint is deleted automatically
     */
    VIRTUALSERVER_COMPLAIN_REMOVE_TIME: number;
    /**
     * Number of clients in the same channel needed to force silence
     */
    VIRTUALSERVER_MIN_CLIENTS_IN_CHANNEL_BEFORE_FORCED_SILENCE: number;
    /**
     * Client volume lowered automatically while a priority speaker is talking
     */
    VIRTUALSERVER_PRIORITY_SPEAKER_DIMM_MODIFICATOR: any;
    /**
     * Anti-flood points removed from a client for being good
     */
    VIRTUALSERVER_ANTIFLOOD_POINTS_TICK_REDUCE: any;
    /**
     * Anti-flood points needed to block commands being executed by the client
     */
    VIRTUALSERVER_ANTIFLOOD_POINTS_NEEDED_COMMAND_BLOCK: any;
    /**
     * Anti-flood points needed to block incoming connections from the client
     */
    VIRTUALSERVER_ANTIFLOOD_POINTS_NEEDED_IP_BLOCK: any;
    /**
     * The display mode for the virtual servers hostbanner (see Definitions)
     */
    VIRTUALSERVER_HOSTBANNER_MODE: any;
    /**
     * Text used for the tooltip of the host button on client-side
     */
    VIRTUALSERVER_HOSTBUTTON_TOOLTIP: string;
    /**
     * Text used for the tooltip of the host button on client-side
     */
    VIRTUALSERVER_HOSTBUTTON_GFX_URL: string;
    /**
     * URL opened on click on the host button
     */
    VIRTUALSERVER_HOSTBUTTON_URL: string;
    /**
     * Download quota for the virtual server (MByte)
     */
    VIRTUALSERVER_DOWNLOAD_QUOTA: number;
    /**
     * Download quota for the virtual server (MByte)
     */
    VIRTUALSERVER_UPLOAD_QUOTA: number;
    /**
     * Machine ID identifying the server instance associated with the virtual server in the database
     */
    VIRTUALSERVER_MACHINE_ID: any;
    /**
     * UDP port the virtual server is listening on
     */
    VIRTUALSERVER_PORT: number;
    /**
     * Indicates whether the server starts automatically with the server instance or not
     */
    VIRTUALSERVER_AUTOSTART: any;
    /**
     * Status of the virtual server (online | virtual online | offline | booting up | shutting down | …)
     */
    VIRTUALSERVER_STATUS: string;
    /**
     * Indicates whether the server logs events related to clients or not
     */
    VIRTUALSERVER_LOG_CLIENT: any;
    /**
     * Indicates whether the server logs events related to ServerQuery clients or not
     */
    VIRTUALSERVER_LOG_QUERY: any;
    /**
     * Indicates whether the server logs events related to channels or not
     */
    VIRTUALSERVER_LOG_CHANNEL: any;
    /**
     * Indicates whether the server logs events related to permissions or not
     */
    VIRTUALSERVER_LOG_PERMISSIONS: any;
    /**
     * Indicates whether the server logs events related to server changes or not
     */
    VIRTUALSERVER_LOG_SERVER: any;
    /**
     * Indicates whether the server logs events related to file transfers or not
     */
    VIRTUALSERVER_LOG_FILETRANSFER: any;
    /**
     * Min client version required to connect
     */
    VIRTUALSERVER_MIN_CLIENT_VERSION: any;
    /**
     * Minimum client identity security level required to connect to the virtual server
     */
    VIRTUALSERVER_NEEDED_IDENTITY_SECURITY_LEVEL: any;
    /**
     * Phonetic name of the virtual server
     */
    VIRTUALSERVER_NAME_PHONETIC: any;
    /**
     * CRC32 checksum of the virtual server icon
     */
    VIRTUALSERVER_ICON_ID: any;
    /**
     * Number of reserved slots available on the virtual server
     */
    VIRTUALSERVER_RESERVED_SLOTS: number;
    /**
     * Indicates whether the server appears in the global web server list or not
     */
    VIRTUALSERVER_WEBLIST_ENABLED: any;
    /**
     * The global codec encryption mode of the virtual server
     */
    VIRTUALSERVER_CODEC_ENCRYPTION_MODE: any;
}

export interface ServerConnectionProperties
{
    /**
     * Current bandwidth used for outgoing file transfers (Bytes/s)
     */
    CONNECTION_FILETRANSFER_BANDWIDTH_SENT: number;
    /**
     * Current bandwidth used for incoming file transfers (Bytes/s)
     */
    CONNECTION_FILETRANSFER_BANDWIDTH_RECEIVED: number;
    /**
     * Total amount of packets sent
     */
    CONNECTION_PACKETS_SENT_TOTAL: number;
    /**
     * Total amount of packets received
     */
    CONNECTION_PACKETS_RECEIVED_TOTAL: number;
    /**
     * Total amount of bytes sent
     */
    CONNECTION_BYTES_SENT_TOTAL: number;
    /**
     * Total amount of bytes received
     */
    CONNECTION_BYTES_RECEIVED_TOTAL: number;
    /**
     * Average bandwidth used for outgoing data in the last second (Bytes/s)
     */
    CONNECTION_BANDWIDTH_SENT_LAST_SECOND_TOTAL: number;
    /**
     * Average bandwidth used for incoming data in the last second (Bytes/s)
     */
    CONNECTION_BANDWIDTH_RECEIVED_LAST_SECOND_TOTAL: number;
    /**
     * Average bandwidth used for outgoing data in the last minute (Bytes/s)
     */
    CONNECTION_BANDWIDTH_SENT_LAST_MINUTE_TOTAL: number;
    /**
     * Average bandwidth used for incoming data in the last minute (Bytes/s)
     */
    CONNECTION_BANDWIDTH_RECEIVED_LAST_MINUTE_TOTAL: number;
}

export interface VirtualServerPropertiesReadOnly extends ServerConnectionProperties
{
    /**
     * Indicates whether the server has a password set or not
     */
    VIRTUALSERVER_FLAG_PASSWORD: any;
    /**
     * Number of clients connected to the virtual server
     */
    VIRTUALSERVER_CLIENTSONLINE: number;
    /**
     * Number of ServerQuery clients connected to the virtual server
     */
    VIRTUALSERVER_QUERYCLIENTSONLINE: number;
    /**
     * Number of channels created on the virtual server
     */
    VIRTUALSERVER_CHANNELSONLINE: number;
    /**
     * Creation date and time of the virtual server as UTC timestamp
     */
    VIRTUALSERVER_CREATED: any;
    /**
     * Uptime in seconds
     */
    VIRTUALSERVER_UPTIME: number;
    /**
     * Operating system the server is running on
     */
    VIRTUALSERVER_PLATFORM: string;
    /**
     * Server version information including build number
     */
    VIRTUALSERVER_VERSION: any;
    /**
     * Indicates whether the initial privilege key for the virtual server has been used or not
     */
    VIRTUALSERVER_ASK_FOR_PRIVILEGEKEY: any;
    /**
     * Total number of clients connected to the virtual server since it was last started
     */
    VIRTUALSERVER_CLIENT_CONNECTIONS: number;
    /**
     * Total number of ServerQuery clients connected to the virtual server since it was last started
     */
    VIRTUALSERVER_QUERY_CLIENT_CONNECTIONS: number;
    /**
     * Number of bytes downloaded from the virtual server on the current month
     */
    VIRTUALSERVER_MONTH_BYTES_DOWNLOADED: number;
    /**
     * Number of bytes uploaded to the virtual server on the current month
     */
    VIRTUALSERVER_MONTH_BYTES_UPLOADED: number;
    /**
     * Number of bytes downloaded from the virtual server since it was last started
     */
    VIRTUALSERVER_TOTAL_BYTES_DOWNLOADED: number;
    /**
     * Number of bytes uploaded to the virtual server since it was last started
     */
    VIRTUALSERVER_TOTAL_BYTES_UPLOADED: number;
    /**
     * Unique ID of the virtual server
     */
    VIRTUALSERVER_UNIQUE_IDENTIFER: any;
    /**
     * Database ID of the virtual server
     */
    VIRTUALSERVER_ID: any;
    /**
     * The average packet loss for speech data on the virtual server
     */
    VIRTUALSERVER_TOTAL_PACKETLOSS_SPEECH: number;
    /**
     * The average packet loss for keepalive data on the virtual server
     */
    VIRTUALSERVER_TOTAL_PACKETLOSS_KEEPALIVE: number;
    /**
     * The average packet loss for control data on the virtual server
     */
    VIRTUALSERVER_TOTAL_PACKETLOSS_CONTROL: number;
    /**
     * The average packet loss for all data on the virtual server
     */
    VIRTUALSERVER_TOTAL_PACKETLOSS_TOTAL: number;
    /**
     * The average ping of all clients connected to the virtual server
     */
    VIRTUALSERVER_TOTAL_PING: number;
    /**
     * The IPv4 address the virtual server is listening on
     */
    VIRTUALSERVER_IP: any;
    /**
     * The directory where the virtual servers filebase is located
     */
    VIRTUALSERVER_FILEBASE: string;
}

export interface VirtualServerProperties extends VirtualServerPropertiesReadOnly, VirtualServerPropertiesChangable
{ }

export interface ChannelPropertiesChangable
{
    /**
    * Name of the channel
    */
    CHANNEL_NAME: string;
    /**
     * Topic of the channel
     */
    CHANNEL_TOPIC: string;
    /**
     * Description of the channel
     */
    CHANNEL_DESCRIPTION: string;
    /**
     * Password of the channel
     */
    CHANNEL_PASSWORD: string;
    /**
     * Codec used by the channel (see Definitions)
     */
    CHANNEL_CODEC: Codec;
    /**
     * Codec quality used by the channel
     */
    CHANNEL_CODEC_QUALITY: any;
    /**
     * Individual max number of clients for the channel
     */
    CHANNEL_MAXCLIENTS: number;
    /**
     * Individual max number of clients for the channel family
     */
    CHANNEL_MAXFAMILYCLIENTS: number;
    /**
     * ID of the channel below which the channel is positioned
     */
    CHANNEL_ORDER: number;
    /**
     * Indicates whether the channel is permanent or not
     */
    CHANNEL_FLAG_PERMANENT: any;
    /**
     * Indicates whether the channel is semi-permanent or not
     */
    CHANNEL_FLAG_SEMI_PERMANENT: any;
    /**
     * Indicates whether the channel is temporary or not
     */
    CHANNEL_FLAG_TEMPORARY: any;
    /**
     * Indicates whether the channel is the virtual servers default channel or not
     */
    CHANNEL_FLAG_DEFAULT: any;
    /**
     * Indicates whether the channel has a max clients limit or not
     */
    CHANNEL_FLAG_MAXCLIENTS_UNLIMITED: any;
    /**
     * Indicates whether the channel has a max family clients limit or not
     */
    CHANNEL_FLAG_MAXFAMILYCLIENTS_UNLIMITED: any;
    /**
     * Indicates whether the channel inherits the max family clients from his parent channel or not
     */
    CHANNEL_FLAG_MAXFAMILYCLIENTS_INHERITED: any;
    /**
     * Needed talk power for this channel
     */
    CHANNEL_NEEDED_TALK_POWER: any;
    /**
     * Phonetic name of the channel
     */
    CHANNEL_NAME_PHONETIC: string;
    /**
     * CRC32 checksum of the channel icon
     */
    CHANNEL_ICON_ID: any;
    /**
     * Indicates whether speech data transmitted in this channel is encrypted or not
     */
    CHANNEL_CODEC_IS_UNENCRYPTED: any;
    /**
     * The channels parent ID
     */
    CPID: number;
}

export interface ChannelPropertiesReadOnly
{
    /**
    * Indicates whether the channel has a password set or not
    */
    CHANNEL_FLAG_PASSWORD: any;
    /**
     * Path of the channels file repository
     */
    CHANNEL_FILEPATH: string;
    /**
     * Indicates whether the channel is silenced or not
     */
    CHANNEL_FORCED_SILENCE: any;
    /**
     * The channels ID
     */
    CID: number;
}

export interface ChannelProperties extends ChannelPropertiesReadOnly, ChannelPropertiesChangable
{ }

export interface ClientPropertiesChangable
{
    /**
     * Nickname of the client
     */
    CLIENT_NICKNAME: string;
    /**
     * Indicates whether the client is able to talk or not
     */
    CLIENT_IS_TALKER: any;
    /**
     * Brief description of the client
     */
    CLIENT_DESCRIPTION: string;
    /**
     * Indicates whether the client is a channel commander or not
     */
    CLIENT_IS_CHANNEL_COMMANDER: any;
    /**
     * CRC32 checksum of the client icon
     */
    CLIENT_ICON_ID: any;
}
export interface ClientPropertiesReadOnly
{
    /**
    * Unique ID of the client
    */
    CLIENT_UNIQUE_IDENTIFIER: any;
    /**
     * Client version information including build number
     */
    CLIENT_VERSION: any;
    /**
     * Operating system the client is running on
     */
    CLIENT_PLATFORM: any;
    /**
     * Indicates whether the client has their microphone muted or not
     */
    CLIENT_INPUT_MUTED: any;
    /**
     * Indicates whether the client has their speakers muted or not
     */
    CLIENT_OUTPUT_MUTED: any;
    /**
     * Indicates whether the client has enabled their capture device or not
     */
    CLIENT_INPUT_HARDWARE: any;
    /**
     * Indicates whether the client has enabled their playback device or not
     */
    CLIENT_OUTPUT_HARDWARE: any;
    /**
     * Default channel of the client
     */
    CLIENT_DEFAULT_CHANNEL: any;
    /**
     * Username of a ServerQuery client
     */
    CLIENT_LOGIN_NAME: any;
    /**
     * Database ID of the client
     */
    CLIENT_DATABASE_ID: any;
    /**
     * Current channel group ID of the client
     */
    CLIENT_CHANNEL_GROUP_ID: any;
    /**
     * Current server group IDs of the client separated by a comma
     */
    CLIENT_SERVER_GROUPS: any;
    /**
     * Creation date and time of the clients first connection to the server as UTC timestamp
     */
    CLIENT_CREATED: any;
    /**
     * Creation date and time of the clients last connection to the server as UTC timestamp
     */
    CLIENT_LASTCONNECTED: any;
    /**
     * Total number of connections from this client since the server was started
     */
    CLIENT_TOTALCONNECTIONS: any;
    /**
     * Indicates whether the client is away or not
     */
    CLIENT_AWAY: any;
    /**
     * Away message of the client
     */
    CLIENT_AWAY_MESSAGE: any;
    /**
     * Indicates whether the client is a ServerQuery client or not
     */
    CLIENT_TYPE: any;
    /**
     * Indicates whether the client has set an avatar or not
     */
    CLIENT_FLAG_AVATAR: any;
    /**
     * The clients current talk power
     */
    CLIENT_TALK_POWER: any;
    /**
     * Indicates whether the client is requesting talk power or not
     */
    CLIENT_TALK_REQUEST: any;
    /**
     * The clients current talk power request message
     */
    CLIENT_TALK_REQUEST_MSG: any;
    /**
     * Number of bytes downloaded by the client on the current month
     */
    CLIENT_MONTH_BYTES_DOWNLOADED: any;
    /**
     * Number of bytes uploaded by the client on the current month
     */
    CLIENT_MONTH_BYTES_UPLOADED: any;
    /**
     * Number of bytes downloaded by the client since the server was started
     */
    CLIENT_TOTAL_BYTES_DOWNLOADED: any;
    /**
     * Number of bytes uploaded by the client since the server was started
     */
    CLIENT_TOTAL_BYTES_UPLOADED: any;
    /**
     * Indicates whether the client is a priority speaker or not
     */
    CLIENT_IS_PRIORITY_SPEAKER: any;
    /**
     * Number of unread offline messages in this clients inbox
     */
    CLIENT_UNREAD_MESSAGES: any;
    /**
     * Phonetic name of the client
     */
    CLIENT_NICKNAME_PHONETIC: any;
    /**
     * The clients current ServerQuery view power
     */
    CLIENT_NEEDED_SERVERQUERY_VIEW_POWER: any;
    /**
     * Current bandwidth used for outgoing file transfers (Bytes/s)
     */
    CONNECTION_FILETRANSFER_BANDWIDTH_SENT: any;
    /**
     * Current bandwidth used for incoming file transfers (Bytes/s)
     */
    CONNECTION_FILETRANSFER_BANDWIDTH_RECEIVED: any;
    /**
     * Total amount of packets sent
     */
    CONNECTION_PACKETS_SENT_TOTAL: any;
    /**
     * Total amount of packets received
     */
    CONNECTION_PACKETS_RECEIVED_TOTAL: any;
    /**
     * Total amount of bytes sent
     */
    CONNECTION_BYTES_SENT_TOTAL: any;
    /**
     * Total amount of bytes received
     */
    CONNECTION_BYTES_RECEIVED_TOTAL: any;
    /**
     * Average bandwidth used for outgoing data in the last second (Bytes/s)
     */
    CONNECTION_BANDWIDTH_SENT_LAST_SECOND_TOTAL: any;
    /**
     * Average bandwidth used for incoming data in the last second (Bytes/s)
     */
    CONNECTION_BANDWIDTH_RECEIVED_LAST_SECOND_TOTAL: any;
    /**
     * Average bandwidth used for outgoing data in the last minute (Bytes/s)
     */
    CONNECTION_BANDWIDTH_SENT_LAST_MINUTE_TOTAL: any;
    /**
     * Average bandwidth used for incoming data in the last minute (Bytes/s)
     */
    CONNECTION_BANDWIDTH_RECEIVED_LAST_MINUTE_TOTAL: any;
    /**
     * The IPv4 address of the client
     */
    CONNECTION_CLIENT_IP: any;
    /**
     * The country identifier of the client (i.e. DE)
     */
    CLIENT_COUNTRY: any;
}

export interface ClientProperties extends ClientPropertiesReadOnly, ClientPropertiesChangable
{ }

/*
    Enums imported from documentation.
*/

export enum YesNo
{
    No = 0,
    Yes = 1
}

export enum HostMessageMode
{
    /**
     * 1: display message in chatlog
     */
    HostMessageMode_LOG = 1,
    /**
     * 2: display message in modal dialog
     */
    HostMessageMode_MODAL,
    /**
     * 3: display message in modal dialog and close connection
     */
    HostMessageMode_MODALQUIT
}

export enum HostBannerMode
{
    /**
     * 0: do not adjust
     */
    HostMessageMode_NOADJUST = 0,
    /**
     * 1: adjust but ignore aspect ratio (like TeamSpeak 2)
     */
    HostMessageMode_IGNOREASPECT,
    /**
     * 2: adjust and keep aspect ratio
     */
    HostMessageMode_KEEPASPECT
}

export enum Codec
{
    /**
     * 0: speex narrowband (mono, 16bit, 8kHz)
     */
    CODEC_SPEEX_NARROWBAND = 0,
    /**
     * 1: speex wideband (mono, 16bit, 16kHz)
     */
    CODEC_SPEEX_WIDEBAND,
    /**
     * 2: speex ultra-wideband (mono, 16bit, 32kHz)
     */
    CODEC_SPEEX_ULTRAWIDEBAND,
    /**
     * 3: celt mono (mono, 16bit, 48kHz)
     */
    CODEC_CELT_MONO
}

export enum CodecEncryptionMode
{
    /**
     * 0: configure per channel
     */
    CODEC_CRYPT_INDIVIDUAL = 0,
    /**
     * 1: globally disabled
     */
    CODEC_CRYPT_DISABLED,
    /**
     * 2: globally enabled
     */
    CODEC_CRYPT_ENABLED
}

export enum TextMessageTargetMode
{
    /**
     * 1: target is a client
     */
    TextMessageTarget_CLIENT = 1,
    /**
     * 2: target is a channel
     */
    TextMessageTarget_CHANNEL,
    /**
     * 3: target is a virtual server
     */
    TextMessageTarget_SERVER
}

export enum LogLevel
{
    /**
     * 1: everything that is really bad
     */
    LogLevel_ERROR = 1,
    /**
     * 2: everything that might be bad
     */
    LogLevel_WARNING,
    /**
     * 3: output that might help find a problem
     */
    LogLevel_DEBUG,
    /**
     * 4: informational output
     */
    LogLevel_INFO
}

export enum ReasonIdentifier
{
    /**
     * 4: kick client from channel
     */
    REASON_KICK_CHANNEL = 4,
    /**
     * 5: kick client from server
     */
    REASON_KICK_SERVER
}

export enum PermissionGroupDatabaseTypes
{
    /**
     * 0: template group (used for new virtual servers)
     */
    PermGroupDBTypeTemplate = 0,
    /**
     * 1: regular group (used for regular clients)
     */
    PermGroupDBTypeRegular,
    /**
     * 2: global query group (used for ServerQuery clients)
     */
    PermGroupDBTypeQuery
}

export enum PermissionGroupTypes
{
    /**
     * 0: server group permission
     */
    PermGroupTypeServerGroup = 0,
    /**
     * 1: client specific permission
     */
    PermGroupTypeGlobalClient,
    /**
     * 2: channel specific permission
     */
    PermGroupTypeChannel,
    /**
     * 3: channel group permission
     */
    PermGroupTypeChannelGroup,
    /**
     * 4: channel-client specific permission
     */
    PermGroupTypeChannelClient
}

export enum TokenType
{
    /**
     * 0: server group token (id1={groupID} id2=0)
     */
    TokenServerGroup = 0,
    /**
     * 1: channel group token (id1={groupID} id2={channelID})
     */
    TokenChannelGroup
}
