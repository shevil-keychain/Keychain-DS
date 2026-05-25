import React from 'react';

function Row({
  title,
  subtitle,
  description,
  children,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-40 border-b border-gray-200 px-32 py-24 last:border-b-0">
      <div className="w-160 shrink-0">
        <div className="whitespace-nowrap text-sm font-medium text-gray-900">{title}</div>
        {subtitle && (
          <div className="mt-4 break-words font-mono text-xs leading-snug text-gray-500">{subtitle}</div>
        )}
        {description && (
          <div className="mt-8 text-xs leading-snug text-gray-600">{description}</div>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-32 overflow-hidden rounded-8 border border-gray-200 bg-white">
      {children}
    </div>
  );
}

export function SpacingBar({ token, value }: { token: string; value: string }) {
  const px = parseFloat(value);
  return (
    <Row title={token} subtitle={value}>
      <div className="h-8 rounded-4 bg-black" style={{ width: `${px}px`, maxWidth: '100%' }} />
    </Row>
  );
}

export function RadiusSample({
  token,
  value,
  description,
}: {
  token: string;
  value: string;
  description?: string;
}) {
  return (
    <Row title={token} subtitle={value} description={description}>
      <div
        className="h-64 w-64 border border-gray-300 bg-gray-100"
        style={{ borderRadius: value }}
      />
    </Row>
  );
}

export function ShadowSample({ token, value }: { token: string; value: string }) {
  return (
    <Row title={token} subtitle={value}>
      <div className="h-64 w-120 rounded-8 bg-white" style={{ boxShadow: value }} />
    </Row>
  );
}

export function DurationSample({ token, value }: { token: string; value: string }) {
  const [on, setOn] = React.useState(false);
  return (
    <Row title={token} subtitle={value}>
      <div className="flex items-center gap-16">
        <button
          onClick={() => setOn((v) => !v)}
          className="rounded-4 border border-gray-200 px-12 py-4 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          animate
        </button>
        <div className="relative h-8 flex-1 rounded-4 bg-gray-100" style={{ maxWidth: '320px' }}>
          <div
            className="absolute top-0 h-8 rounded-4 bg-black"
            style={{
              width: '20%',
              left: on ? '80%' : '0%',
              transitionProperty: 'left',
              transitionDuration: value,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>
    </Row>
  );
}

export function EasingSample({ name, value }: { name: string; value: string }) {
  return <Row title={name} subtitle={value}>{null}</Row>;
}
