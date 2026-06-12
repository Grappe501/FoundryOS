import { searchIndex, type SearchFilters, type SearchResponse } from '@foundry/search-engine';
import { buildPlatformSearchIndex } from './build-index';

let cachedIndex: ReturnType<typeof buildPlatformSearchIndex> | null = null;

function getIndex() {
  if (!cachedIndex) cachedIndex = buildPlatformSearchIndex();
  return cachedIndex;
}

export function searchPlatform(filters: SearchFilters): SearchResponse {
  return searchIndex(getIndex(), filters);
}

export function refreshSearchIndex(): void {
  cachedIndex = buildPlatformSearchIndex();
}
