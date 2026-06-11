export function slugToPascal(slug: string): string {
  return slug
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

export function slugToConst(slug: string): string {
  return slug.replace(/-/g, '_').toUpperCase();
}

export function worldLibBasename(slug: string): string {
  return `${slug}-world`;
}

export function componentFolder(slug: string): string {
  return `${slug}-world`;
}
