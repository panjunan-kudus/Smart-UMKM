function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(error) {
  var message = error && error.message ? error.message : String(error);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseRequest(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return { action: e && e.parameter ? e.parameter.action : "health", payload: e && e.parameter ? e.parameter : {} };
  }
  return JSON.parse(e.postData.contents);
}

function getSpreadsheet() {
  // TODO: Pastikan SPREADSHEET_ID sudah diisi di Config.gs.
  if (!SPREADSHEET_ID || SPREADSHEET_ID === "__SPREADSHEET_ID__") {
    throw new Error("SPREADSHEET_ID belum dikonfigurasi.");
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getOrCreateSheet(name, headers) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  ensureHeaders(sheet, headers);
  return sheet;
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return;
  }

  var current = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0];
  var needsUpdate = headers.some(function(header, index) {
    return current[index] !== header;
  });

  if (needsUpdate) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function sheetToObjects(sheet, headers) {
  ensureHeaders(sheet, headers);
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  return values
    .filter(function(row) { return row.some(function(cell) { return cell !== ""; }); })
    .map(function(row) { return rowToObject(row, headers); });
}

function rowToObject(row, headers) {
  var object = {};
  headers.forEach(function(header, index) {
    var value = row[index];
    if (JSON_FIELDS.indexOf(header) !== -1) {
      value = parseJsonValue(value, header === "produk" || header === "galeri" ? [] : {});
    } else if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    } else if (value === "") {
      value = null;
    }
    object[header] = value;
  });
  return object;
}

function objectToRow(object, headers) {
  return headers.map(function(header) {
    var value = object && Object.prototype.hasOwnProperty.call(object, header) ? object[header] : "";
    if (JSON_FIELDS.indexOf(header) !== -1) return JSON.stringify(value || (header === "produk" || header === "galeri" ? [] : {}));
    if (value === null || typeof value === "undefined") return "";
    return value;
  });
}

function parseJsonValue(value, fallback) {
  if (!value) return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch (err) {
    return fallback;
  }
}

function findRowById(sheet, headers, id) {
  var idColumn = headers.indexOf("id") + 1;
  if (idColumn < 1 || sheet.getLastRow() <= 1) return -1;
  var values = sheet.getRange(2, idColumn, sheet.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === id) return i + 2;
  }
  return -1;
}

function nowIso() {
  return new Date().toISOString();
}

function assertDriveConfigured() {
  // TODO: Pastikan DRIVE_FOLDER_ID sudah diisi di Config.gs.
  if (!DRIVE_FOLDER_ID || DRIVE_FOLDER_ID === "__DRIVE_FOLDER_ID__") {
    throw new Error("DRIVE_FOLDER_ID belum dikonfigurasi.");
  }
}

function assertGithubConfigured() {
  // TODO: Isi GITHUB_OWNER, GITHUB_REPO, dan GITHUB_TOKEN di Config.gs.
  if (GITHUB_OWNER === "__OWNER__" || GITHUB_REPO === "__REPOSITORY__" || GITHUB_TOKEN === "__TOKEN__") {
    throw new Error("Konfigurasi GitHub belum lengkap.");
  }
}
