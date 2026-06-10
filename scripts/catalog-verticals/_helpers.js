function app(slug, displayName, crossRefs = [], priority = 'P3') {
  return { slug, displayName, crossRefs, priority };
}

module.exports = { app };
