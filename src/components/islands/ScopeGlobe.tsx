import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';

type SceneProps = { active: boolean; onReady: () => void };

class GLErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    document.querySelector('[data-scope-fallback]')?.removeAttribute('data-hidden');
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export default function ScopeGlobe() {
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null);
  const [active, setActive] = useState(true);
  const host = useRef<HTMLDivElement>(null);
  const onScreen = useRef(true);
  const tabOn = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let started = false;

    const sync = () => setActive(onScreen.current && tabOn.current);

    const load = () => {
      if (started || cancelled) return;
      if (reduce.matches || !webglAvailable()) {
        setScene(null);
        document.querySelector('[data-scope-fallback]')?.removeAttribute('data-hidden');
        return;
      }
      started = true;
      void import('./ScopeScene').then((mod) => {
        if (!cancelled) setScene(() => mod.ScopeScene);
      });
    };

    // The SVG scope is the first paint. WebGL replaces it on the first
    // pointer or key event, and otherwise once the main thread has settled.
    const onInteract = () => load();
    window.addEventListener('pointermove', onInteract, { passive: true });
    window.addEventListener('keydown', onInteract);
    const timer = window.setTimeout(load, 4500);
    const onReduce = () => {
      started = false;
      load();
    };
    reduce.addEventListener('change', onReduce);

    const stage = host.current?.closest('.scope-stage') ?? host.current;
    const io =
      stage && 'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen.current = entry.isIntersecting;
              sync();
            },
            { threshold: 0.08 },
          )
        : null;
    if (stage && io) io.observe(stage);

    const onVis = () => {
      tabOn.current = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('pointermove', onInteract);
      window.removeEventListener('keydown', onInteract);
      reduce.removeEventListener('change', onReduce);
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const reveal = () => {
    document.querySelector('[data-scope-fallback]')?.setAttribute('data-hidden', 'true');
  };

  return (
    <div ref={host} className="scope-canvas">
      {Scene ? (
        <GLErrorBoundary>
          <Scene active={active} onReady={reveal} />
        </GLErrorBoundary>
      ) : null}
    </div>
  );
}
