import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { commands, type Command } from '../../data/commands';

function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith('/resume');
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const titleId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((item) =>
      `${item.label} ${item.hint ?? ''} ${item.group}`.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    document.documentElement.dataset.paletteReady = 'true';
    const openNow = () => {
      setQuery('');
      setActive(0);
      setOpen(true);
    };
    const toggle = () => {
      setOpen((value) => {
        if (!value) {
          setQuery('');
          setActive(0);
        }
        return !value;
      });
    };
    if (document.documentElement.dataset.palette === 'open') openNow();
    window.addEventListener('palette:open', openNow);
    window.addEventListener('palette:toggle', toggle);
    return () => {
      delete document.documentElement.dataset.paletteReady;
      window.removeEventListener('palette:open', openNow);
      window.removeEventListener('palette:toggle', toggle);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      delete document.documentElement.dataset.palette;
      return;
    }
    document.documentElement.dataset.palette = 'open';
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previous;
      cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const id = filtered[active]?.id;
    if (!id) return;
    document.getElementById(`cmd-${id}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, filtered, open]);

  function close() {
    setOpen(false);
  }

  function go(item: Command) {
    close();
    if (item.href.startsWith('#')) {
      const el = document.querySelector(item.href);
      if (el instanceof HTMLElement) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.focus({ preventScroll: true });
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        history.pushState(null, '', item.href);
      }
      return;
    }
    if (item.href.startsWith('mailto:')) {
      window.location.href = item.href;
      return;
    }
    window.open(item.href, '_blank', 'noopener,noreferrer');
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => Math.min(filtered.length - 1, index + 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.max(0, index - 1));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const item = filtered[active];
      if (item) go(item);
      return;
    }
    if (event.key === 'Tab') event.preventDefault();
  }

  if (!open) return null;

  let lastGroup = '';

  return (
    <div className="palette-backdrop" onMouseDown={close}>
      <div
        className="palette-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <p id={titleId} className="sr-only">
          Jump to a section or link
        </p>
        <div className="palette-search">
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
            aria-autocomplete="list"
            placeholder="Jump to…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>Esc</kbd>
        </div>
        {filtered.length === 0 ? (
          <p className="palette-empty" role="status">
            No matches
          </p>
        ) : (
          <ul id={listId} className="palette-list" role="listbox" aria-label="Destinations">
            {filtered.map((item, index) => {
              const showGroup = item.group !== lastGroup;
              lastGroup = item.group;
              return (
                <li key={item.id} role="presentation">
                  {showGroup ? (
                    <div className="palette-group" role="presentation">
                      {item.group}
                    </div>
                  ) : null}
                  <div
                    id={`cmd-${item.id}`}
                    role="option"
                    aria-selected={index === active}
                    className={index === active ? 'is-active' : undefined}
                    onMouseEnter={() => setActive(index)}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      go(item);
                    }}
                  >
                    <span>{item.label}</span>
                    <span className="palette-hint">
                      {item.hint ?? (isExternal(item.href) ? 'Open' : '')}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
