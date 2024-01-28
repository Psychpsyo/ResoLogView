import {locale} from "./locale.mjs";
import {parseLog} from "./logParser.mjs";

function labelAll(htmlClass, label) {
	for (const elem of document.querySelectorAll("." + htmlClass)) {
		elem.textContent = label;
	}
}

// translate page
function translate() {
	logInputLabel.textContent = locale.inputLog;
	labelAll("prevPageBtn", locale.previousPage);
	labelAll("nextPageBtn", locale.nextPage);
	labelAll("pgSpan", locale.page);
	mainLog.dataset.emptyLabel = locale.noLogsLoaded;
}

translate();

// variables
const pageSize = 500; // number of log entries per page
let loadedLog = []; // all entries of the currently loaded log
let currentPage = 0; // currently visible page
let pageCount = 0; // number of pages in the current log

// next/prev buttons
function previousPage() {
	if (currentPage > 0) showPage(--currentPage);
}
function nextPage() {
	if (currentPage < pageCount-1) showPage(++currentPage);
}

for (const btn of document.querySelectorAll(".prevPageBtn")) {
	btn.addEventListener("click", previousPage);
}
for (const btn of document.querySelectorAll(".nextPageBtn")) {
	btn.addEventListener("click", nextPage);
}


// shows a 'page' from a log.
function showPage(num) {
	mainLog.innerHTML = "";
	labelAll("currentPage", num+1);
	for (let i = 0; i < pageSize; i++) {
		const entry = loadedLog[num * pageSize + i];
		if (!entry) break;
		const entryFragment = logEntry.content.cloneNode(true);
		entryFragment.querySelector(".logTimestamp").textContent = entry.timestamp;
		entryFragment.querySelector(".logTitle").textContent = locale.entryTypes[entry.type];
		entryFragment.querySelector(".logContent").textContent = entry.content;
		entryFragment.querySelector(".logEntry").classList.add("type" + entry.type.substring(0, 3));
		mainLog.appendChild(entryFragment);
	}
}

const logReader = new FileReader();
logReader.addEventListener("load", e => {
	loadedLog = parseLog(e.target.result);
	pageCount = Math.ceil(loadedLog.length / pageSize);
	currentPage = 0;
	labelAll("pageTotal", pageCount);
	showPage(currentPage);
});
logReader.addEventListener("error", () => {
	alert(locale.errorReadingLog);
});

// forces the log reader to read whichever file is in the logInput right now (if any)
function tryReadLog() {
	if (logInput.files.length > 0) logReader.readAsText(logInput.files[0], "UTF-8");
}

logInput.addEventListener("change", tryReadLog);
tryReadLog();