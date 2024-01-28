// This file defines constants for all the different types of log messages
// They are in alphabetical order, sorted by what type of log they are.



// The log parser could not figure out what this is
export const UNKNOWN = "UNKNOWN";



// "The ... element on ... is currently being driven by Drive on ... and can be modified only through the drive reference."
export const ERR_ELEMENT_CURRENTLY_DRIVEN = "ERR_ELEMENT_CURRENTLY_DRIVEN";
// "Exception getting types from assembly"
export const ERR_GETTING_ASSEMBLY_TYPES = "ERR_GETTING_ASSEMBLY_TYPES";
// These are weird as they are identified by an empty line and the string " LastModifyingUser: " appears at the end of the previous line.
export const ERR_LAST_MODIFYING_USER = "ERR_LAST_MODIFYING_USER";



// FrooxEngine was initialized
export const GRN_ENGINE_INIT = "GRN_ENGINE_INIT";
// World Loaded
export const GRN_WORLD_LOADED = "GRN_WORLD_LOADED";



// App initialization data, happens once on startup
export const LOG_APP_INIT = "LOG_APP_INIT";
// Initialized Audio Input MMDevice ...
export const LOG_AUDIO_INPUT_INIT = "LOG_AUDIO_INPUT_INIT";
// Audio sample rate, buffer length and buffer amount
export const LOG_AUDIO_SYSTEM_INFO = "LOG_AUDIO_SYSTEM_INFO";
// Autodetected device, happens once on startup
export const LOG_AUTODETECTED_DEVICE = "LOG_AUTODETECTED_DEVICE";
// Which locales are available
export const LOG_AVAILABLE_LOCALES = "LOG_AVAILABLE_LOCALES";
// "BroadcastKey changed" message
export const LOG_BROADCAST_KEY_CHANGED = "LOG_BROADCAST_KEY_CHANGED";
// the compatibility hash has been computed
export const LOG_COMPATIBILITY_HASH = "LOG_COMPATIBILITY_HASH";
// Default audio input
export const LOG_DEFAULT_CAPTURE = "LOG_DEFAULT_CAPTURE";
// Default audio input
export const LOG_DEFAULT_OUTPUT = "LOG_DEFAULT_CAPTURE";
// DeviceName, happens once on startup
export const LOG_DEVICE_NAME = "LOG_DEVICE_NAME";
// Exiting the game
export const LOG_EXITING = "LOG_EXITING";
// Found appropriate user/machine home
export const LOG_FOUND_APPROPRIATE_HONE = "LOG_FOUND_APPROPRIATE_HONE";
// Graphics Device Type, happens once during startup
export const LOG_GRAPHICS_DEVICE_TYPE = "LOG_GRAPHICS_DEVICE_TYPE";
// Part of the game starting up
export const LOG_INIT_STEP = "LOG_INIT_STEP";
// Background/Priority workers are initialized
export const LOG_INITIALIZED_WORK_PROCESSOR = "LOG_INITIALIZED_WORK_PROCESSOR";
// The version of a given library
export const LOG_LIBRARY_VERSION = "LOG_LIBRARY_VERSION";
// Workspace loaded
export const LOG_LOADED_WORKSPACE = "LOG_LOADED_WORKSPACE";
// Workspace being loaded
export const LOG_LOADING_WORKSPACE = "LOG_LOADING_WORKSPACE";
// "Got asset at path: ..., loading world"
export const LOG_LOADING_WORLD_FROM_ASSET = "LOG_LOADING_WORLD_FROM_ASSET";
// The machine ID, happens once on startup
export const LOG_MACHINE_ID = "LOG_MACHINE_ID";
// NetworkInitStart
export const LOG_NETWORK_INIT_START = "LOG_NETWORK_INIT_START";
// App/Data/Cache Paths
export const LOG_PATHS = "LOG_PATHS";
// The game authorized some permission during startup
export const LOG_PERMISSION_AUTHORIZED = "LOG_PERMISSION_AUTHORIZED";
// Rebuild message. Not sure what it means.
export const LOG_REBUILD = "LOG_REBUILD";
// Requesting gather for resdb asset
export const LOG_REQUESTING_GATHER_FOR = "LOG_REQUESTING_GATHER_FOR";
// "SendStatusToUser" message
export const LOG_SEND_STATUS_TO_USER = "LOG_SEND_STATUS_TO_USER";
// SignalR BroadcastStatus
export const LOG_SIGNALR_BROADCAST_STATUS = "LOG_SIGNALR_BROADCAST_STATUS";
// SIGNALR InitializeStatus
export const LOG_SIGNALR_INITIALIZE_STATUS = "LOG_SIGNALR_INITIALIZE_STATUS";
// SignalR ListenOnKey
export const LOG_SIGNALR_LISTEN_ON_KEY = "LOG_SIGNALR_LISTEN_ON_KEY";
// SignalR has reconnected
export const LOG_SIGNALR_RECONNECTED = "LOG_SIGNALR_RECONNECTED";
// SignalR is reconnecting
export const LOG_SIGNALR_RECONNECTING = "LOG_SIGNALR_RECONNECTING";
// SIGNALR RequestStatus
export const LOG_SIGNALR_REQUEST_STATUS = "LOG_SIGNALR_REQUEST_STATUS";
// SignalR status was initialized. This also says how many contacts you have
export const LOG_SIGNALR_STATUS_INITIALIZED = "LOG_SIGNALR_STATUS_INITIALIZED";
// A user is being spawned
export const LOG_SPAWNING_USER = "LOG_SPAWNING_USER";
// A world is being started
export const LOG_STARTING_RUNNING_WORLD = "LOG_STARTING_RUNNING_WORLD";
// Indicates which formats are supported for a certain type of file
export const LOG_SUPPORTED_FORMATS = "LOG_SUPPORTED_FORMATS";
// Indicates which network protocols are supported
export const LOG_SUPPORTED_NETWORK_PROTOCOLS = "LOG_SUPPORTED_NETWORK_PROTOCOLS";
// A user's info for the session they just joined
export const LOG_USER_INFO = "LOG_USER_INFO";
// A user joined a session
export const LOG_USER_JOINED = "LOG_USER_JOINED";
// What a user will be spawned as(?)
export const LOG_USER_SPAWN = "LOG_USER_SPAWN";
// Things like "WorldName set to ..."
export const LOG_WORLD_PARAMETER_SET = "LOG_WORLD_PARAMETER_SET";



// "Associating self-reference with legacy element ..." warning
export const WRN_ASSOCIATING_SELF_REFERENCE_WITH_LEGACY_ELEMENT = "WRN_ASSOCIATING_SELF_REFERENCE_WITH_LEGACY_ELEMENT";
// The game froze for X+ seconds
export const WRN_ENGINE_UNRESPONSIVE = "WRN_ENGINE_UNRESPONSIVE";
// Failed Gather Job
export const WRN_FAILED_GATHER_JOB = "WRN_FAILED_GATHER_JOB";
// A "Missing method ... on Element" warning
export const WRN_MISSING_METHOD = "WRN_MISSING_METHOD";
// An "Unmapped elements on ..." warning
export const WRN_UNMAPPED_ELEMENTS = "WRN_UNMAPPED_ELEMENTS";
// An "Unsupported worker type" warning
export const WRN_UNSUPPORTED_WORKER_TYPE = "WRN_UNSUPPORTED_WORKER_TYPE";
// An "Unused candidates" warning
export const WRN_UNUSED_CANDIDATES = "WRN_UNUSED_CANDIDATES";