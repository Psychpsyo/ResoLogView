import * as types from "./entryTypes.mjs";

// The regex used to identify a line as starting a new log entry
const logRegex = /^(\d{1,2}:\d{2}:\d{2} (AM|PM).\d{3}) \( +(-?\d+) FPS\)\t(.*)/;

// Every log entry is one of these.
class LogEntry {
	constructor(timestamp, fps, content, type) {
		this.timestamp = timestamp;
		this.fps = fps;
		this.content = content;
		this.type = type;
	}
}
// A list of regexes that, when applied to the remainder of the initial line for a log entry, identify it as a certain type of entry.
// Cannot use $ (string end) in the regex since LastModifyingUser errors would mess that up.
class LogTypeRegex {
	constructor(regex, type) {
		this.regex = regex;
		this.type = type;
	}
}

const logTypeRegexes = [
	new LogTypeRegex(/^Rebuild: .+/, types.LOG_REBUILD),
	new LogTypeRegex(/^SendStatusToUser: .+/, types.LOG_SEND_STATUS_TO_USER),
	new LogTypeRegex(/^SIGNALR: BroadcastStatus/, types.LOG_SIGNALR_BROADCAST_STATUS),
	new LogTypeRegex(/^SIGNALR: ListenOnKey/, types.LOG_SIGNALR_LISTEN_ON_KEY),
	new LogTypeRegex(/^SIGNALR: RequestStatus/, types.LOG_SIGNALR_REQUEST_STATUS),
	new LogTypeRegex(/^SIGNALR: InitializeStatus/, types.LOG_SIGNALR_INITIALIZE_STATUS),
	new LogTypeRegex(/^Status Initialized. Contact Count: \d+/, types.LOG_SIGNALR_STATUS_INITIALIZED),
	new LogTypeRegex(/^SignalR Reconnecting/, types.LOG_SIGNALR_RECONNECTING),
	new LogTypeRegex(/^SignalR Reconnected/, types.LOG_SIGNALR_RECONNECTED),
	new LogTypeRegex(/^BroadcastKey changed: .+/, types.LOG_BROADCAST_KEY_CHANGED),
	new LogTypeRegex(/^Requesting gather for: /, types.LOG_REQUESTING_GATHER_FOR),
	new LogTypeRegex(/^Got asset at path: .+, loading world/, types.LOG_LOADING_WORLD_FROM_ASSET),
	new LogTypeRegex(/^Failed gather for .+/, types.WRN_FAILED_GATHER_JOB),
	new LogTypeRegex(/^Failed to gather .+/, types.WRN_FAILED_GATHER_JOB),
	new LogTypeRegex(/^Failed Load: Could not gather asset variant: .+/, types.WRN_FAILED_GATHER_JOB),
	new LogTypeRegex(/^The .+ element on .+ is currently being driven by .+ on .+ and can be modified only through the drive reference./, types.ERR_ELEMENT_CURRENTLY_DRIVEN),
	new LogTypeRegex(/^World .+ Loaded in: \d{2}:\d{2}:\d{2}.\d{7}/, types.GRN_WORLD_LOADED),
	new LogTypeRegex(/^[a-zA-Z]+ set to .*/, types.LOG_WORLD_PARAMETER_SET),
	new LogTypeRegex(/^Unsupported worker type, couldn't load: /, types.WRN_UNSUPPORTED_WORKER_TYPE),
	new LogTypeRegex(/^Missing method .+ on Element: /, types.WRN_MISSING_METHOD),
	new LogTypeRegex(/^Unused candidates: /, types.WRN_UNUSED_CANDIDATES),
	new LogTypeRegex(/^Unmapped elements on .+:/, types.WRN_UNMAPPED_ELEMENTS),
	new LogTypeRegex(/^Associating self-reference with legacy element .+: .+/, types.WRN_ASSOCIATING_SELF_REFERENCE_WITH_LEGACY_ELEMENT),
	new LogTypeRegex(/^Starting running world:/, types.LOG_STARTING_RUNNING_WORLD),
	new LogTypeRegex(/^User Joined .+\. Username: .+/, types.LOG_USER_JOINED),
	new LogTypeRegex(/^User Spawn .+\. Username: /, types.LOG_USER_SPAWN),
	new LogTypeRegex(/^Spawning User .+/, types.LOG_SPAWNING_USER),
	new LogTypeRegex(/^User Psychpsyo Role: .+/, types.LOG_USER_INFO),
	new LogTypeRegex(/^NetworkInitStart/, types.LOG_NETWORK_INIT_START),
	new LogTypeRegex(/^Engine has been unresponsive for over \d+\.\d{2} seconds./, types.WRN_ENGINE_UNRESPONSIVE),
	new LogTypeRegex(/^Exception getting types from assembly /, types.ERR_GETTING_ASSEMBLY_TYPES),
	new LogTypeRegex(/^Loading workspace .+/, types.LOG_LOADING_WORKSPACE),
	new LogTypeRegex(/^Loaded workspace .+/, types.LOG_LOADED_WORKSPACE),
	new LogTypeRegex(/^\[\d+\]/, types.LOG_INIT_STEP),
	new LogTypeRegex(/^Initialized Audio Input MMDevice .+/, types.LOG_AUDIO_INPUT_INIT),
	new LogTypeRegex(/ permission authorized/, types.LOG_PERMISSION_AUTHORIZED),
	new LogTypeRegex(/^Supported .+ (F|f)ormats( .+)?: /, types.LOG_SUPPORTED_FORMATS),
	new LogTypeRegex(/^Supported network protocols: /, types.LOG_SUPPORTED_NETWORK_PROTOCOLS),
	new LogTypeRegex(/^Available locales: /, types.LOG_AVAILABLE_LOCALES),
	new LogTypeRegex(/^.+ Version: /, types.LOG_LIBRARY_VERSION),
	new LogTypeRegex(/^Found appropriate .+ home, loading and running it./, types.LOG_FOUND_APPROPRIATE_HONE),
	new LogTypeRegex(/^Compatibility Hash: .+/, types.LOG_COMPATIBILITY_HASH),
	new LogTypeRegex(/^Autodetected device: .+/, types.LOG_AUTODETECTED_DEVICE),
	new LogTypeRegex(/^DefaultCapture: .+/, types.LOG_DEFAULT_CAPTURE),
	new LogTypeRegex(/^DefaultOutput: .+/, types.LOG_DEFAULT_OUTPUT),
	new LogTypeRegex(/^DeviceName: .+/, types.LOG_DEVICE_NAME),
	new LogTypeRegex(/^MachineID: .+/, types.LOG_MACHINE_ID),
	new LogTypeRegex(/^AppPath: .+/, types.LOG_PATHS),
	new LogTypeRegex(/^Graphics Device Type: /, types.LOG_GRAPHICS_DEVICE_TYPE),
	new LogTypeRegex(/^Initialized WorkProcessor./, types.LOG_INITIALIZED_WORK_PROCESSOR),
	new LogTypeRegex(/^AudioSystem SampleRate:/, types.LOG_AUDIO_SYSTEM_INFO),
	new LogTypeRegex(/^Initializing App: /, types.LOG_APP_INIT),
	new LogTypeRegex(/^FrooxEngine Initialized in \d+\.\d+ ms/, types.GRN_ENGINE_INIT),
	new LogTypeRegex(/^Exiting. Save Homes: (True|False)/, types.LOG_EXITING)
];

export function parseLog(text) {
	const lines = text.split("\n");
	const allEntries = [];

	let currentEntry;
	for (const line of lines) {
		if (logRegex.test(line)) { // new log entry starts here
			const parts = line.match(logRegex);
			currentEntry = new LogEntry(parts[1], parseInt(parts[3]), parts[4], types.UNKNOWN);
			allEntries.push(currentEntry);

			// try to determine type
			for (const regex of logTypeRegexes) {
				if (regex.regex.test(currentEntry.content)) {
					currentEntry.type = regex.type;
					break;
				}
			}
		} else if (line === "" && currentEntry.content.includes(" LastModifyingUser: ")) { // LastModifyingUser error happened
			// remove LastModifyingUser: from last entry
			currentEntry.content = currentEntry.content.substring(0, currentEntry.content.indexOf(" LastModifyingUser: "));
			// create new entry
			currentEntry = new LogEntry(currentEntry.timestamp, currentEntry.fps, "LastModifyingUser: \n", types.ERR_LAST_MODIFYING_USER);
			allEntries.push(currentEntry);
		} else if (currentEntry) { // continuation of the current entry
			currentEntry.content += "\n" + line;
		}
	}

	return allEntries.filter(entry => entry.type !== types.UNKNOWN || !(/^\s*$/.test(entry.content)));
}