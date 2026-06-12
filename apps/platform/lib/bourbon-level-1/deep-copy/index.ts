import { BOURBON_PAGE_DEPTH } from './pages-core';
import { BOURBON_PAGE_DEPTH_TOOLS } from './pages-tools';
import type { BourbonPageDepth } from './types';

export const ALL_BOURBON_PAGE_DEPTH: BourbonPageDepth[] = [...BOURBON_PAGE_DEPTH, ...BOURBON_PAGE_DEPTH_TOOLS];

export function getBourbonPageDepth(id: string): BourbonPageDepth | undefined {
  return ALL_BOURBON_PAGE_DEPTH.find((p) => p.id === id);
}

export function getBourbonPageDepthByPath(path: string): BourbonPageDepth | undefined {
  const normalized = path.replace(/\/$/, '') || '/bourbon';
  return ALL_BOURBON_PAGE_DEPTH.find((p) => p.path === normalized);
}

export * from './types';
export * from './tool-depth';
export { wordCount } from './types';
