function getGithubRepositoryInfo() {
  assertGithubConfigured();
  return githubFetch("/repos/" + GITHUB_OWNER + "/" + GITHUB_REPO, "get");
}

function publishGithubJson(path, data, message) {
  return commitGithubFile(path, JSON.stringify(data, null, 2), message || "Publish UMKM data");
}

function commitGithubFile(path, content, message) {
  assertGithubConfigured();
  var apiPath = "/repos/" + GITHUB_OWNER + "/" + GITHUB_REPO + "/contents/" + encodeURIComponent(path).replace(/%2F/g, "/");
  var existing = null;

  try {
    existing = githubFetch(apiPath + "?ref=" + encodeURIComponent(GITHUB_BRANCH), "get");
  } catch (err) {
    existing = null;
  }

  var payload = {
    message: message || "Update " + path,
    content: Utilities.base64Encode(content),
    branch: GITHUB_BRANCH
  };
  if (existing && existing.sha) payload.sha = existing.sha;

  return githubFetch(apiPath, "put", payload);
}

function githubFetch(path, method, payload) {
  var options = {
    method: method || "get",
    muteHttpExceptions: true,
    headers: {
      Authorization: "Bearer " + GITHUB_TOKEN,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    }
  };

  if (payload) {
    options.contentType = "application/json";
    options.payload = JSON.stringify(payload);
  }

  var response = UrlFetchApp.fetch("https://api.github.com" + path, options);
  var code = response.getResponseCode();
  var text = response.getContentText();
  var data = text ? JSON.parse(text) : {};
  if (code < 200 || code >= 300) {
    throw new Error(data.message || "GitHub API gagal: HTTP " + code);
  }
  return data;
}
