import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@foundry/core',
    '@foundry/ui',
    '@foundry/seo-engine',
    '@foundry/topic-registry',
    '@foundry/content-engine',
    '@foundry/db',
    '@foundry/ownership-graph',
    '@foundry/vertical-resolver',
    '@foundry/factory',
    '@foundry/encyclopedia-engine',
    '@foundry/path-engine',
    '@foundry/project-engine',
    '@foundry/community-engine',
    '@foundry/domain-registry',
    '@foundry/learning-pyramid',
    '@foundry/lore-engine',
    '@foundry/mentor-engine',
    '@foundry/consequence-engine',
    '@foundry/collector-engine',
    '@foundry/world-events-engine',
    '@foundry/identity-narrative-engine',
    '@foundry/world-continuity-engine',
    '@foundry/outcome-engine',
  ],
};

export default nextConfig;
