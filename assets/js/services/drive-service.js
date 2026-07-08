window.DriveService = {
  uploadImage(fileData, meta) {
    return GASService.request("uploadImage", {
      fileData,
      meta: meta || {}
    });
  },

  deleteFile(fileId) {
    return GASService.request("deleteDriveFile", { fileId });
  },

  listFiles(folderName) {
    return GASService.request("listDriveFiles", { folderName });
  }
};
