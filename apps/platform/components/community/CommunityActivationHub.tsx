'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getMentorTier, getWeekKey, type CommunityWorldConfig } from '../../lib/community-worlds';
import { getVisitorId, trackValidationEvent } from '../../lib/validation-tracker';
import type { CommunityMemberRow, CommunityPostRow } from '@foundry/db';

type Props = {
  config: CommunityWorldConfig;
  initialPosts: CommunityPostRow[];
  initialMembers: CommunityMemberRow[];
  isMember: boolean;
  userLabel: string;
  userSlug: string;
  stats: {
    member_count: number;
    posts_this_week: number;
    challenge_submissions: number;
    showcase_posts: number;
  };
};

export function CommunityActivationHub({
  config,
  initialPosts,
  initialMembers,
  isMember: initialMember,
  userLabel,
  userSlug,
  stats,
}: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [members, setMembers] = useState(initialMembers);
  const [isMember, setIsMember] = useState(initialMember);
  const [tab, setTab] = useState<'feed' | 'challenge' | 'showcase'>('feed');
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [feedbackComment, setFeedbackComment] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weekKey = useMemo(() => getWeekKey(), []);
  const effectiveSlug = userSlug || getVisitorId();
  const challengePosts = posts.filter((p) => p.post_type === 'challenge' && p.week_key === weekKey);
  const showcasePosts = posts.filter((p) => p.post_type === 'showcase');
  const myChallengeDone = challengePosts.some((p) => p.user_slug === effectiveSlug);

  async function handleJoin() {
    setBusy(true);
    setError(null);
    const res = await fetch('/api/community/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ world_slug: config.slug, visitor_id: getVisitorId(), display_name: userLabel }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? 'Could not join');
      return;
    }
    setIsMember(true);
    void trackValidationEvent({ event_type: 'community_joined', path_slug: config.slug, landing_page: `/community/${config.slug}` });
  }

  async function handleSubmit(postType: 'challenge' | 'showcase') {
    if (!body.trim()) return;
    setBusy(true);
    setError(null);
    const res = await fetch('/api/community/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        world_slug: config.slug,
        post_type: postType,
        title: title || undefined,
        body,
        visitor_id: getVisitorId(),
        display_name: userLabel,
      }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? 'Submit failed');
      return;
    }
    if (data.post) setPosts((prev) => [data.post, ...prev]);
    setBody('');
    setTitle('');
    void trackValidationEvent({
      event_type: postType === 'challenge' ? 'challenge_submitted' : 'showcase_posted',
      path_slug: config.slug,
      landing_page: `/community/${config.slug}`,
    });
  }

  async function handleFeedback(postId: string) {
    const comment = feedbackComment[postId]?.trim();
    if (!comment) return;
    setBusy(true);
    const res = await fetch('/api/community/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post_id: postId, comment, visitor_id: getVisitorId(), display_name: userLabel }),
    });
    setBusy(false);
    if (res.ok) {
      setFeedbackComment((prev) => ({ ...prev, [postId]: '' }));
      void trackValidationEvent({ event_type: 'peer_feedback_given', path_slug: config.slug });
      window.location.reload();
    }
  }

  const accent = '#6B9B6B';

  return (
    <div>
      <header style={{ marginTop: 16 }}>
        <p style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Living community</p>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{config.name}</h1>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          Belong here. Weekly challenges · showcases · peer feedback · {config.mentorTitle} recognition.
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, color: '#6B6B70' }}>
          <span>{stats.member_count} members</span>
          <span>{stats.posts_this_week} posts this week</span>
          <span>{stats.challenge_submissions} challenges</span>
          <span>{stats.showcase_posts} showcases</span>
        </div>
      </header>

      {!isMember ? (
        <section style={{ marginTop: 24, padding: 24, background: '#1A2A1A', borderRadius: 8, border: '1px solid #2A4A2A' }}>
          <p style={{ color: '#E8E8EC', margin: 0 }}>Join {config.name} to participate in challenges and showcase your work.</p>
          <button type="button" onClick={handleJoin} disabled={busy} style={{ marginTop: 16, padding: '12px 24px', background: '#2A4A2A', border: 'none', borderRadius: 6, color: '#E8E8EC', cursor: 'pointer' }}>
            {busy ? 'Joining…' : 'Join community →'}
          </button>
          <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
            <Link href="/create-account" style={{ color: accent }}>Sign in</Link> to save your membership across devices.
          </p>
        </section>
      ) : (
        <p style={{ marginTop: 16, color: accent, fontSize: 13 }}>You&apos;re a member · {userLabel}</p>
      )}

      <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['feed', 'challenge', 'showcase'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              padding: '8px 16px',
              fontSize: 12,
              borderRadius: 6,
              border: `1px solid ${tab === t ? '#2A4A2A' : '#1A1A1E'}`,
              background: tab === t ? '#1A2A1A' : '#111114',
              color: tab === t ? accent : '#8A8A8E',
              cursor: 'pointer',
            }}
          >
            {t === 'feed' ? 'Feed' : t === 'challenge' ? 'Weekly challenge' : 'Showcase'}
          </button>
        ))}
      </div>

      {tab === 'challenge' && (
        <section style={{ marginTop: 20, padding: 24, background: '#111114', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>This week: {config.weeklyChallengeTheme}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{config.weeklyChallengePrompt}</p>
          {myChallengeDone ? (
            <p style={{ color: accent, fontSize: 13, marginTop: 16 }}>You submitted this week&apos;s challenge. Come back next week.</p>
          ) : isMember ? (
            <>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Your challenge response…" style={fieldStyle} />
              <button type="button" disabled={busy || !body.trim()} onClick={() => handleSubmit('challenge')} style={{ ...btnStyle, marginTop: 12 }}>
                Submit challenge
              </button>
            </>
          ) : (
            <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 16 }}>Join to submit.</p>
          )}
          <div style={{ marginTop: 20 }}>
            <h3 style={{ fontSize: 12, color: '#6B6B70', margin: 0 }}>This week ({weekKey})</h3>
            {challengePosts.map((p) => (
              <PostCard key={p.id} post={p} config={config} feedbackComment={feedbackComment} setFeedbackComment={setFeedbackComment} onFeedback={handleFeedback} isMember={isMember} userSlug={effectiveSlug} busy={busy} />
            ))}
          </div>
        </section>
      )}

      {tab === 'showcase' && (
        <section style={{ marginTop: 20, padding: 24, background: '#111114', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>{config.showcaseLabel}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{config.peerReviewLabel}</p>
          {isMember && (
            <>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (optional)" style={{ ...fieldStyle, marginTop: 16 }} />
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="What did you build, cook, taste, or learn?" style={fieldStyle} />
              <button type="button" disabled={busy || !body.trim()} onClick={() => handleSubmit('showcase')} style={{ ...btnStyle, marginTop: 12 }}>
                Post to showcase
              </button>
            </>
          )}
          <div style={{ marginTop: 20 }}>
            {showcasePosts.map((p) => (
              <PostCard key={p.id} post={p} config={config} feedbackComment={feedbackComment} setFeedbackComment={setFeedbackComment} onFeedback={handleFeedback} isMember={isMember} userSlug={effectiveSlug} busy={busy} />
            ))}
            {showcasePosts.length === 0 && <p style={{ color: '#6B6B70', fontSize: 13 }}>No showcases yet — be the first.</p>}
          </div>
        </section>
      )}

      {tab === 'feed' && (
        <section style={{ marginTop: 20 }}>
          {posts.length === 0 ? (
            <p style={{ color: '#6B6B70', fontSize: 14 }}>The feed is quiet. Join and post the first challenge or showcase.</p>
          ) : (
            posts.map((p) => (
              <PostCard key={p.id} post={p} config={config} feedbackComment={feedbackComment} setFeedbackComment={setFeedbackComment} onFeedback={handleFeedback} isMember={isMember} userSlug={effectiveSlug} busy={busy} />
            ))
          )}
        </section>
      )}

      <section style={{ marginTop: 32, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Members & {config.mentorTitle} recognition</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>Not badges — recognition for helping others.</p>
        {members.map((m) => {
          const tier = getMentorTier(m.help_count ?? 0);
          return (
            <div key={m.id} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#E8E8EC' }}>{m.display_name ?? m.user_slug}</span>
              <span style={{ color: m.help_count >= 3 ? accent : '#6B6B70' }}>{tier.label}</span>
            </div>
          );
        })}
      </section>

      <p style={{ marginTop: 24, fontSize: 13, color: '#6B6B70' }}>
        <Link href={`/${config.slug}`} style={{ color: '#6B6B70' }}>← {config.slug.replace(/-/g, ' ')} world</Link>
        {' · '}
        <Link href={`/${config.slug}/missions`} style={{ color: accent }}>Missions</Link>
      </p>

      {error && <p style={{ color: '#C96B6B', fontSize: 13, marginTop: 12 }}>{error}</p>}
    </div>
  );
}

function PostCard({
  post,
  config,
  feedbackComment,
  setFeedbackComment,
  onFeedback,
  isMember,
  userSlug,
  busy,
}: {
  post: CommunityPostRow;
  config: CommunityWorldConfig;
  feedbackComment: Record<string, string>;
  setFeedbackComment: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onFeedback: (id: string) => void;
  isMember: boolean;
  userSlug: string;
  busy: boolean;
}) {
  return (
    <article style={{ marginTop: 16, padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #1A1A1E' }}>
      <p style={{ margin: 0, fontSize: 11, color: '#6B6B70' }}>
        {post.post_type} · {post.author_label ?? post.user_slug} · {new Date(post.created_at).toLocaleDateString()}
      </p>
      {post.title && <h3 style={{ color: '#E8E8EC', fontSize: 15, margin: '8px 0 0' }}>{post.title}</h3>}
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{post.body}</p>
      {(post.feedback_count ?? 0) > 0 && (
        <p style={{ color: accentMuted, fontSize: 12, marginTop: 8 }}>{post.feedback_count} feedback</p>
      )}
      {isMember && post.user_slug !== userSlug && (
        <div style={{ marginTop: 12 }}>
          <input
            value={feedbackComment[post.id] ?? ''}
            onChange={(e) => setFeedbackComment((prev) => ({ ...prev, [post.id]: e.target.value }))}
            placeholder="Constructive feedback…"
            style={{ ...fieldStyle, fontSize: 13 }}
          />
          <button type="button" disabled={busy} onClick={() => onFeedback(post.id)} style={{ ...btnStyle, marginTop: 8, fontSize: 12, padding: '8px 14px' }}>
            Give feedback
          </button>
        </div>
      )}
    </article>
  );
}

const accentMuted = '#6B9B6B';

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  marginTop: 8,
  background: '#0F0F12',
  border: '1px solid #1A1A1E',
  borderRadius: 6,
  color: '#E8E8EC',
  fontSize: 14,
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const btnStyle: React.CSSProperties = {
  padding: '12px 20px',
  background: '#2A4A2A',
  border: 'none',
  borderRadius: 6,
  color: '#E8E8EC',
  fontSize: 14,
  cursor: 'pointer',
};
