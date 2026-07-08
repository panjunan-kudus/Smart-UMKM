function buildPublicData() {
  return {
    umkm: getPublishedUmkm(),
    settings: getSettings(),
    categories: getCategories(),
    generatedAt: nowIso()
  };
}

function publishAll() {
  var data = buildPublicData();
  var result = publishGithubJson("data/umkm.json", data, "Publish UMKM public data");
  return {
    published: true,
    total: data.umkm.length,
    github: result
  };
}

function publishSingleUmkm(id) {
  publishUmkm(id);
  return publishAll();
}
