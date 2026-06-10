const { app } = require('./_helpers');

function vertical(id, name, icon, entries) {
  return {
    id,
    slug: id,
    name,
    icon,
    apps: entries.map((e) =>
      Array.isArray(e)
        ? app(e[0], e[1], e[2] || [], e[3] || 'P3')
        : app(e.slug, e.displayName, e.crossRefs || [], e.priority || 'P3')
    ),
  };
}

module.exports = { vertical, app };
