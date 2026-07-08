function doGet(e) {
  try {
    var action = e && e.parameter && e.parameter.action ? e.parameter.action : "health";
    return jsonResponse(routeAction(action, e.parameter || {}));
  } catch (err) {
    return errorResponse(err);
  }
}

function doPost(e) {
  try {
    var request = parseRequest(e);
    return jsonResponse(routeAction(request.action, request.payload || {}));
  } catch (err) {
    return errorResponse(err);
  }
}

function routeAction(action, payload) {
  switch (action) {
    case "health": return { status: "ok" };
    case "initStorage": return initStorage();
    case "getAllUmkm": return getAllUmkm();
    case "getPublishedUmkm": return getPublishedUmkm();
    case "getUmkmById": return getUmkmById(payload.id);
    case "getUmkmBySlug": return getUmkmBySlug(payload.slug);
    case "saveUmkm": return saveUmkm(payload.data || []);
    case "createUmkm": return createUmkm(payload.umkm);
    case "updateUmkm": return updateUmkm(payload.id, payload.updates || {});
    case "deleteUmkm": return deleteUmkm(payload.id);
    case "publishUmkm": return publishUmkm(payload.id);
    case "unpublishUmkm": return unpublishUmkm(payload.id);
    case "getSettings": return getSettings();
    case "saveSettings": return saveSettings(payload.data || {});
    case "getCategories": return getCategories();
    case "saveCategories": return saveCategories(payload.data || []);
    case "addCategory": return addCategory(payload.category);
    case "deleteCategory": return deleteCategory(payload.id);
    case "uploadImage": return uploadImage(payload.fileData, payload.meta || {});
    case "deleteDriveFile": return deleteDriveFile(payload.fileId);
    case "listDriveFiles": return listDriveFiles(payload.folderName);
    case "getGithubRepositoryInfo": return getGithubRepositoryInfo();
    case "commitGithubFile": return commitGithubFile(payload.path, payload.content, payload.message);
    case "publishGithubJson": return publishGithubJson(payload.path, payload.data, payload.message);
    case "buildPublicData": return buildPublicData();
    case "publishAll": return publishAll();
    case "publishSingleUmkm": return publishSingleUmkm(payload.id);
    case "login": return login(payload.username, payload.password);
    case "logout": return logout();
    case "isLoggedIn": return isLoggedIn();
    default: throw new Error("Action tidak dikenal: " + action);
  }
}
