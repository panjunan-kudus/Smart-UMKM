function uploadImage(fileData, meta) {
  assertDriveConfigured();
  if (!fileData) throw new Error("fileData kosong.");

  meta = meta || {};
  var parts = String(fileData).split(",");
  var contentType = (parts[0].match(/data:(.*);base64/) || [])[1] || meta.mimeType || "application/octet-stream";
  var bytes = Utilities.base64Decode(parts.length > 1 ? parts[1] : parts[0]);
  var extension = (contentType.split("/")[1] || "bin").replace("jpeg", "jpg");
  var fileName = meta.fileName || [meta.slug || "umkm", meta.field || "image", Date.now()].join("-") + "." + extension;

  var folder = getUploadFolder(meta.slug || "general", meta.field || "images");
  var blob = Utilities.newBlob(bytes, contentType, fileName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    id: file.getId(),
    name: file.getName(),
    url: "https://drive.google.com/uc?export=view&id=" + file.getId(),
    webViewUrl: file.getUrl()
  };
}

function getUploadFolder(slug, field) {
  var root = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  var slugFolder = getOrCreateDriveFolder(root, slug);
  return getOrCreateDriveFolder(slugFolder, field);
}

function getOrCreateDriveFolder(parent, name) {
  var folders = parent.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return parent.createFolder(name);
}

function deleteDriveFile(fileId) {
  if (!fileId) return false;
  DriveApp.getFileById(fileId).setTrashed(true);
  return true;
}

function listDriveFiles(folderName) {
  assertDriveConfigured();
  var root = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  var folder = folderName ? getOrCreateDriveFolder(root, folderName) : root;
  var files = folder.getFiles();
  var result = [];
  while (files.hasNext()) {
    var file = files.next();
    result.push({ id: file.getId(), name: file.getName(), url: file.getUrl() });
  }
  return result;
}
