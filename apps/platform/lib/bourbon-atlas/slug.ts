/** Slugify Atlas term titles — matches search index slugify */
export function atlasSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function atlasTermHref(slug: string): string {
  return `/bourbon/atlas/${slug}`;
}
