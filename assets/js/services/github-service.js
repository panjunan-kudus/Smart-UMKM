window.GithubService = {
  getRepositoryInfo() {
    return GASService.request("getGithubRepositoryInfo");
  },

  commitFile(path, content, message) {
    return GASService.request("commitGithubFile", { path, content, message });
  },

  publishJson(path, data, message) {
    return GASService.request("publishGithubJson", { path, data, message });
  }
};
