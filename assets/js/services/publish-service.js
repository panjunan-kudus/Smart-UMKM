window.PublishService = {
  buildPublicData() {
    return GASService.request("buildPublicData");
  },

  publishAll() {
    return GASService.request("publishAll");
  },

  publishUmkm(id) {
    return GASService.request("publishSingleUmkm", { id });
  }
};
