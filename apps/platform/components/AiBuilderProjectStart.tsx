'use client';

import { trackValidationEvent } from '../lib/validation-tracker';

export function AiBuilderProjectStart({ projectName }: { projectName: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        void trackValidationEvent({
          event_type: 'project_started',
          landing_page: '/ai-builder',
          path_slug: 'ai-builder',
          metadata: { project: projectName },
        });
      }}
      style={{
        padding: '12px 20px',
        background: 'var(--foundry-success-bg)',
        border: 'none',
        borderRadius: 6,
        fontSize: 14,
        color: 'var(--foundry-text)',
        cursor: 'pointer',
      }}
    >
      Start: {projectName}
    </button>
  );
}
