import React from 'react';
import type { SemanticToken, TokenGroup } from '../../tokens/semantic';

/* Renders a sample appropriate to the token category, picking visuals from class names. */
function Sample({ token }: { token: SemanticToken }) {
  const cls = token.class;

  // Foreground (text/icon) — show a label on a sensible background.
  if (cls.startsWith('text-')) {
    const bg =
      cls.includes('inverse') ? 'bg-surface-inverse' :
      cls.includes('on-primary') ? 'bg-primary' :
      cls.includes('on-secondary') ? 'bg-secondary' :
      cls.includes('on-danger') ? 'bg-danger' :
      cls.includes('on-success') ? 'bg-success' :
      cls.includes('on-warning') ? 'bg-warning' :
      cls.includes('on-info') ? 'bg-info' :
      cls.includes('link') ? 'bg-surface' :
      'bg-surface';
    return (
      <span className={`inline-flex items-center rounded-default px-12 py-4 text-sm font-medium ${bg} ${cls}`}>
        The quick brown fox
      </span>
    );
  }

  // Borders — show a sample outline.
  if (cls.startsWith('border-border')) {
    return <div className={`h-32 w-120 rounded-default border-2 ${cls}`} />;
  }

  // Backgrounds (surfaces, actions, status).
  if (cls.startsWith('bg-')) {
    // Every swatch gets a visible frame so white/light/transparent colors render against the doc bg.
    // Secondary uses the same stroke as everything else — its real visual distinction (the dark outline
    // used in components) is documented in the description rather than mocked here.
    const isTransparent = cls === 'bg-tertiary';
    // Checkered ground for transparent so the user can see "nothing is there".
    const transparentBg = isTransparent
      ? {
          backgroundImage:
            'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)',
          backgroundSize: '12px 12px',
          backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
        }
      : undefined;
    return (
      <div
        className={`h-32 w-120 rounded-default border border-border ${cls}`}
        style={transparentBg}
      />
    );
  }

  // Radius.
  if (cls.startsWith('rounded-')) {
    return <div className={`h-40 w-40 border border-border bg-surface-subtle ${cls}`} />;
  }

  // Shadow.
  if (cls.startsWith('shadow-')) {
    return <div className={`h-32 w-120 rounded-default bg-surface ${cls}`} />;
  }

  // Motion durations — animated bar.
  if (cls.startsWith('duration-')) {
    return <MotionSample duration={token.value} />;
  }

  // Easings — just the curve label, no live demo for now.
  if (cls.startsWith('ease-')) {
    return <span className="font-mono text-xs text-fg-subtle">{token.value}</span>;
  }

  // Opacity — show an inverse swatch dimmed.
  if (cls.startsWith('opacity-')) {
    return (
      <div className="flex items-center gap-12">
        <div className={`h-32 w-32 rounded-default bg-surface-inverse ${cls}`} />
        <span className="font-mono text-xs text-fg-subtle">applied to inverse surface</span>
      </div>
    );
  }

  // Z-index — just the value.
  if (cls.startsWith('z-')) {
    return <span className="font-mono text-xs text-fg-subtle">z-index: {token.value}</span>;
  }

  // Icon size — show a square at that size with the value.
  if (cls.startsWith('size-icon-')) {
    const px = token.value.replace('px', '');
    return (
      <div className="flex items-center gap-12">
        <div className="bg-fg" style={{ width: `${px}px`, height: `${px}px`, borderRadius: '2px' }} />
        <span className="font-mono text-xs text-fg-subtle">{token.value}</span>
      </div>
    );
  }

  return null;
}

function MotionSample({ duration }: { duration: string }) {
  const [on, setOn] = React.useState(false);
  return (
    <div className="flex items-center gap-12">
      <button
        onClick={() => setOn((v) => !v)}
        className="rounded-default border border-border-input px-12 py-4 text-xs font-medium text-fg hover:bg-surface-subtle"
      >
        play
      </button>
      <div className="relative h-8 w-120 rounded-pill bg-surface-subtle">
        <div
          className="absolute top-0 h-8 rounded-pill bg-fg"
          style={{
            width: '20%',
            left: on ? '80%' : '0%',
            transitionProperty: 'left',
            transitionDuration: duration,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </div>
  );
}

function Row({ token }: { token: SemanticToken }) {
  return (
    <div className="grid grid-cols-[200px_1fr_240px] items-start gap-32 border-b border-border-subtle px-32 py-24 last:border-b-0">
      <div>
        <div className="font-mono text-sm font-medium text-fg">{token.name}</div>
        <div className="mt-4 font-mono text-xs text-fg-subtle">{token.class}</div>
        <div className="mt-2 text-xs text-fg-subtle">→ {token.primitive}</div>
      </div>
      <div>
        <div className="text-sm text-fg">{token.description}</div>
        <div className="mt-4 text-xs text-fg-subtle">{token.usage}</div>
      </div>
      <div className="flex items-center justify-start"><Sample token={token} /></div>
    </div>
  );
}

export function TokenSection({ group }: { group: TokenGroup }) {
  return (
    <section className="my-32">
      <h2 className="mb-4 text-xl font-semibold text-fg">{group.title}</h2>
      <p className="mb-16 text-sm text-fg-subtle">{group.intro}</p>
      <div className="overflow-hidden rounded-default border border-border bg-surface">
        {group.tokens.map((t) => <Row key={t.name} token={t} />)}
      </div>
    </section>
  );
}
