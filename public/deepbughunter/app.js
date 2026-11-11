/* DeepBugHunter UI Mock — hash router + screen renderers */

(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const short = DBH.short;

  const ROUTES = [
    { id: "home", path: "#/", label: "Missions", nav: false },
    { id: "overview", path: "#/mission", label: "Overview", nav: true, key: "1" },
    { id: "knowledge", path: "#/knowledge", label: "Knowledge", nav: true, key: "2" },
    { id: "hypotheses", path: "#/hypotheses", label: "Hypotheses", nav: true, key: "3" },
    { id: "experiment", path: "#/experiment", label: "Experiment", nav: true, key: "4" },
    { id: "evidence", path: "#/evidence", label: "Evidence", nav: true, key: "5" },
    { id: "dossier", path: "#/dossier", label: "Dossier", nav: true, key: "6" },
    { id: "events", path: "#/events", label: "Event log", nav: true, key: "7" },
  ];

  function pct(used, cap) {
    return Math.min(100, Math.round((used / cap) * 1000) / 10);
  }

  function money(n) {
    return "$" + n.toFixed(2);
  }

  function statusBadge(status) {
    const s = String(status).toLowerCase().replace(/\s+/g, "_");
    return `<span class="badge ${s}">${escapeHtml(status)}</span>`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function ladderBar(current, opts = {}) {
    const { compact = false, showLabels = true } = opts;
    if (compact) {
      return `<span class="ladder-compact" title="Evidence high-water L${current}" aria-label="Evidence ladder level ${current}">
        ${DBH.ladderLabels
          .map((l) => {
            const on = l.level <= current;
            const cls = on
              ? "pip on" + (l.level >= 6 ? " max" : l.level >= 5 ? " high" : "")
              : "pip";
            return `<span class="${cls}"></span>`;
          })
          .join("")}
      </span>`;
    }
    return `<div class="ladder" role="img" aria-label="Evidence ladder, current L${current}">
      ${DBH.ladderLabels
        .map((l) => {
          const reached = l.level <= current;
          const isCurrent = l.level === current;
          const cls = [
            "ladder-step",
            "l" + l.level,
            reached ? "reached" : "",
            isCurrent ? "current" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return `<div class="${cls}">
            <span class="lvl">${l.short}</span>
            ${showLabels ? `<span class="lbl">${l.name}</span>` : ""}
          </div>`;
        })
        .join("")}
    </div>`;
  }

  function hashChip(full, label) {
    return `<span class="hash hash-tip" title="sha256:${full}">${label || short(full)}…</span>`;
  }

  /* —— Chrome —— */
  function renderChrome(activeId) {
    const m = DBH.mission;
    const b = m.budgets;
    const isHome = activeId === "home";
    const navItems = ROUTES.filter((r) => r.nav)
      .map(
        (r) => `<li class="nav-item">
          <a href="${r.path}" class="${r.id === activeId ? "active" : ""}" data-route="${r.id}">
            ${r.label}
            <span class="nav-key">${r.key}</span>
          </a>
        </li>`
      )
      .join("");

    const roles = m.roles
      .map(
        (r) => `<div class="role-chip">
          <span class="role-dot ${r.state}"></span>
          <span class="role-name">${r.name}</span>
          <span class="role-state">${r.detail}</span>
        </div>`
      )
      .join("");

    return `
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark" aria-hidden="true"></div>
          <a href="#/" class="brand-name" style="color:inherit;text-decoration:none">DeepBugHunter</a>
          <span class="brand-tag">evidence console</span>
        </div>
        <div class="top-metrics">
          ${
            isHome
              ? `<div class="metric"><span class="metric-label">Mode</span><span class="metric-value">mission select</span></div>`
              : `
            <div class="metric">
              <span class="metric-label">Mission</span>
              <span class="metric-value accent">${escapeHtml(m.name)}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Scope Guard</span>
              <span class="metric-value ok">ENFORCING</span>
            </div>
            <div class="metric">
              <span class="metric-label">Spend / Cap</span>
              <span class="metric-value">${money(b.totalSpend)} / ${money(b.totalCap)}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Evidence HWM</span>
              <span class="metric-value">${ladderBar(DBH.finding.ladder, { compact: true })} L${DBH.finding.ladder}</span>
            </div>`
          }
          <span class="demo-pill">Demo data</span>
        </div>
      </header>
      <div class="shell ${isHome ? "home-mode" : ""}">
        <aside class="sidebar" aria-label="Mission navigation">
          <div>
            <div class="nav-section-label">Mission</div>
            <ul class="nav-list">${navItems}</ul>
          </div>
          <div>
            <div class="nav-section-label">Roster</div>
            <div class="roles-list">${roles}</div>
          </div>
          <div style="margin-top:auto;padding:0 14px">
            <div class="nav-section-label" style="padding-left:0">Invariant</div>
            <p class="muted" style="font-size:11.5px;margin:0;line-height:1.5">
              Event log is system of record. UI is a client. Scope Guard is not an LLM and cannot be overridden by discovery agents.
            </p>
            <p style="margin:10px 0 0"><a href="#/" style="font-size:12px">← All missions</a></p>
          </div>
        </aside>
        <main class="main" id="main-view" tabindex="-1"></main>
      </div>`;
  }

  /* —— Screens —— */
  function pageHome() {
    const rows = DBH.missions
      .map((m) => {
        const activeCls = m.active ? "mission-row-active clickable" : "clickable";
        const href = m.active ? "#/mission" : "#/";
        return `<tr class="${activeCls}" data-href="${href}">
          <td><a class="row-link" href="${href}">${escapeHtml(m.name)}</a>
            <div class="dim" style="font-size:11px;margin-top:2px">${escapeHtml(m.note)}</div>
          </td>
          <td><span class="badge track">Track ${m.track}</span></td>
          <td>${statusBadge(m.status)}</td>
          <td class="num">${money(m.spendUsd)} <span class="dim">/ ${money(m.capUsd)}</span></td>
          <td>${ladderBar(m.highestLadder, { compact: true })} <span class="mono dim">L${m.highestLadder}</span></td>
          <td class="num dim">${escapeHtml(m.lastActivity.replace("T", " ").slice(0, 16))}</td>
        </tr>`;
      })
      .join("");

    return `
      <div class="page home-hero">
        <div class="page-kicker">Control layer</div>
        <h1>Missions</h1>
        <p>Evidence-producing search over in-scope targets. The unit of value is a verified, unique finding with reproducible proof — not a chat transcript.</p>
      </div>
      <div class="grid-4" style="margin-bottom:16px">
        <div class="stat-tile"><div class="k">Active</div><div class="v">1</div><div class="s">Track A · acme-http</div></div>
        <div class="stat-tile"><div class="k">REPORT_READY</div><div class="v">1</div><div class="s">demo sealed dossier</div></div>
        <div class="stat-tile"><div class="k">Policy blocked</div><div class="v">1</div><div class="s">Scope Guard DENY</div></div>
        <div class="stat-tile"><div class="k">Ladder rule</div><div class="v" style="font-size:16px">L3+</div><div class="s">nothing below is reportable</div></div>
      </div>
      <section class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Mission roster</h2>
          <span class="panel-meta">DEMO · fictional targets</span>
        </div>
        <div class="panel-body tight table-wrap">
          <table class="data">
            <thead>
              <tr>
                <th>Mission</th><th>Track</th><th>Status</th><th>Spend</th><th>HWM</th><th>Last activity</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
      <p class="muted" style="margin-top:14px;font-size:12px">
        Open the active mission to inspect Main’s tick, Scope Guard, hypothesis portfolio, live experiment, evidence ladder, dossier, and the append-only event log.
      </p>`;
  }

  function pageOverview() {
    const m = DBH.mission;
    const steps = m.tickSteps
      .map((s) => `<span class="tick-step ${s.state}">${s.label}</span>`)
      .join("");
    const profiles = m.budgets.profiles
      .map((p) => {
        const usedPct = pct(p.spend, p.cap);
        return `<div>
          <div class="budget-row"><span>${p.label}</span><span>${money(p.spend)} / ${money(p.cap)}</span></div>
          <div class="budget-bar"><span style="width:${usedPct}%"></span></div>
        </div>`;
      })
      .join("");
    const fuzzPct = pct(m.budgets.fuzzHours.used, m.budgets.fuzzHours.cap);
    const guards = m.guard.decisions
      .map(
        (d) => `<div class="guard-item">
          <span class="when">${d.t}</span>
          <div class="what">
            <strong>${escapeHtml(d.action)}</strong> · ${escapeHtml(d.actor)}
            <span class="path">${escapeHtml(d.detail)} · ${escapeHtml(d.path)}</span>
          </div>
          ${statusBadge(d.verdict)}
        </div>`
      )
      .join("");

    return `
      <div class="page">
        <header class="page-header">
          <div>
            <div class="page-kicker">Control · Main tick</div>
            <h1 class="page-title">${escapeHtml(m.name)}</h1>
            <p class="page-sub">Persistent coordinator. Reloads from the event log each tick. Cannot change policy/scope, cannot touch the target, cannot promote findings.</p>
          </div>
          <div class="page-actions">
            <span class="badge track">Track ${m.track}</span>
            ${statusBadge(m.status)}
            <span class="run-live"><span class="pulse"></span> tick ${m.tick}</span>
          </div>
        </header>

        <div class="grid-2">
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Live tick</h2>
              <span class="panel-meta">phase · ${m.tickPhase}</span>
            </div>
            <div class="panel-body">
              <div class="tick-board">
                <div class="tick-ring">
                  <div style="text-align:center">
                    <div class="tick-num">${m.tick}</div>
                    <div class="tick-label">tick</div>
                  </div>
                </div>
                <div>
                  <div class="tick-steps">${steps}</div>
                  <p class="muted" style="margin:12px 0 0;font-size:12px">
                    Scheduler priority ≈ (proof_value + information_value) / estimated_cost · favor short proof distance · separate fuzz vs LLM budgets.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">ScopeGrant</h2>
              <span class="panel-meta">${hashChip(m.scopeGrant.artifact)}</span>
            </div>
            <div class="panel-body">
              <dl class="kv">
                <dt>Grant id</dt><dd class="mono">${m.scopeGrant.id}</dd>
                <dt>Surfaces</dt><dd class="mono">${m.scopeGrant.surfaces.join(" · ")}</dd>
                <dt>Denied</dt><dd class="mono" style="color:var(--deny)">${m.scopeGrant.denied.join(" · ")}</dd>
                <dt>Image</dt><dd class="mono">${escapeHtml(m.scopeGrant.dockerImage)}</dd>
                <dt>Expires</dt><dd class="mono">${m.scopeGrant.expires}</dd>
              </dl>
            </div>
          </section>
        </div>

        <div class="grid-2" style="margin-top:14px">
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Budgets</h2>
              <span class="panel-meta">${money(m.budgets.totalSpend)} / ${money(m.budgets.totalCap)}</span>
            </div>
            <div class="panel-body stack">
              ${profiles}
              <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:4px">
                <div class="budget-row"><span>Fuzz hours</span><span>${m.budgets.fuzzHours.used}h / ${m.budgets.fuzzHours.cap}h</span></div>
                <div class="budget-bar fuzz"><span style="width:${fuzzPct}%"></span></div>
              </div>
              <div>
                <div class="nav-section-label" style="padding:8px 0 4px">Stop conditions</div>
                <ul style="margin:0;padding-left:16px;color:var(--text-2);font-size:12.5px">
                  ${m.policy.stopConditions.map((c) => `<li class="mono">${escapeHtml(c)}</li>`).join("")}
                </ul>
              </div>
            </div>
          </section>

          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Scope Guard</h2>
              <span class="badge allow">enforcing · not an LLM</span>
            </div>
            <div class="panel-body tight">
              <div class="guard-feed">${guards}</div>
            </div>
          </section>
        </div>

        <section class="panel" style="margin-top:14px">
          <div class="panel-head">
            <h2 class="panel-title">Evidence high-water mark</h2>
            <span class="panel-meta">FND-0003 · L${DBH.finding.ladder}</span>
          </div>
          <div class="panel-body">
            ${ladderBar(DBH.finding.ladder)}
            <p class="ladder-note"><strong>Nothing below L3 is reportable.</strong> REPORT_READY requires uniqueness, in-scope, repro bundle, root cause, and fresh-context adjudication.</p>
          </div>
        </section>
      </div>`;
  }

  function pageKnowledge() {
    const k = DBH.knowledge;
    const modules = k.modules
      .map(
        (m) => `<tr>
          <td class="mono">${escapeHtml(m.name)}</td>
          <td class="num">${m.loc}</td>
          <td><span class="badge ${m.risk === "high" ? "running" : m.risk === "med" ? "queued" : ""}">${m.risk}</span></td>
          <td>${escapeHtml(m.notes)}</td>
        </tr>`
      )
      .join("");
    const surfaces = k.surfaces
      .map(
        (s) => `<div class="surface-card">
          <h4>${escapeHtml(s.name)}</h4>
          <div class="meta">${escapeHtml(s.entry)}</div>
          <div class="tags">${s.tags
            .map((t) => `<span class="tag ${s.hot ? "hot" : ""}">${t}</span>`)
            .join("")}</div>
        </div>`
      )
      .join("");
    const fixes = k.fixHistory
      .map(
        (f) => `<tr>
          <td class="mono">${f.rev}</td>
          <td>${escapeHtml(f.summary)}</td>
          <td class="mono dim">${f.related}</td>
        </tr>`
      )
      .join("");

    const escaped = escapeHtml(k.snippet);
    const highlighted = escaped
      .replace(/\/\* DEMO[\s\S]*?\*\//, (m) => `<span class="cm">${m}</span>`)
      .replace(/\/\* DEMO BUG:.*?\*\//, (m) => `<span class="err">${m}</span>`)
      .replace(/\b(static|int|const|char|size_t|uint32_t|return|for|if)\b/g, `<span class="kw">$1</span>`)
      .replace(/\b(parse_content_length)\b/g, `<span class="fn">$1</span>`);

    return `
      <div class="page">
        <header class="page-header">
          <div>
            <div class="page-kicker">Knowledge · Recon</div>
            <h1 class="page-title">Attack surface</h1>
            <p class="page-sub">${escapeHtml(k.target)} · ${k.rev} · ${k.loc.toLocaleString()} LOC · ${k.languages.join(", ")}</p>
          </div>
          <div class="page-actions">
            <span class="panel-meta">model ${hashChip(k.modelArtifact)}</span>
          </div>
        </header>

        <div class="grid-2">
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Program model</h2>
              <span class="panel-meta">src ${hashChip(k.srcSnapshot)}</span>
            </div>
            <div class="panel-body tight table-wrap">
              <table class="data">
                <thead><tr><th>Module</th><th>LOC</th><th>Risk</th><th>Notes</th></tr></thead>
                <tbody>${modules}</tbody>
              </table>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Surfaces</h2>
              <span class="panel-meta">${hashChip(k.surfaceArtifact)}</span>
            </div>
            <div class="panel-body">
              <div class="surface-map">${surfaces}</div>
            </div>
          </section>
        </div>

        <div class="grid-2" style="margin-top:14px">
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Fix history</h2>
              <span class="panel-meta">${hashChip(k.fixArtifact)}</span>
            </div>
            <div class="panel-body tight table-wrap">
              <table class="data">
                <thead><tr><th>Rev</th><th>Summary</th><th>Surface</th></tr></thead>
                <tbody>${fixes}</tbody>
              </table>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Focus snippet</h2>
              <span class="panel-meta">DEMO bug locus</span>
            </div>
            <div class="panel-body">
              <pre class="code-block">${highlighted}</pre>
            </div>
          </section>
        </div>
      </div>`;
  }

  function pageHypotheses() {
    // Rank by score descending for display consistency with "scheduler ranking"
    const sorted = [...DBH.hypotheses].sort((a, b) => b.score - a.score);
    const rows = sorted
      .map((h, i) => {
        const rank = i + 1;
        return `<tr class="clickable" data-href="${h.status === "running" ? "#/experiment" : h.status === "promoted" ? "#/evidence" : "#/hypotheses"}">
          <td class="rank">#${rank}</td>
          <td>
            <a class="row-link" href="${h.status === "running" ? "#/experiment" : h.status === "promoted" ? "#/evidence" : "#/hypotheses"}">${escapeHtml(h.title)}</a>
            <div class="dim" style="font-size:11px;margin-top:2px">${h.id} · ${h.runner}${h.note ? " · " + escapeHtml(h.note) : ""}</div>
          </td>
          <td>${statusBadge(h.status)}</td>
          <td class="num">${h.proofDistance}</td>
          <td class="score-cell"><span class="big">${h.infoValue.toFixed(2)}</span><span class="sub">info</span></td>
          <td class="num">${money(h.estCostUsd)}</td>
          <td class="score-cell"><span class="big">${h.score.toFixed(3)}</span><span class="sub">priority</span></td>
        </tr>`;
      })
      .join("");

    return `
      <div class="page">
        <header class="page-header">
          <div>
            <div class="page-kicker">Search · Hypothesis portfolio</div>
            <h1 class="page-title">Ranked hypotheses</h1>
            <p class="page-sub">Scheduler picks by (proof_value + information_value) / estimated_cost, favoring short proof distance. Fuzz and LLM budgets are separate.</p>
          </div>
          <div class="page-actions">
            <span class="badge">${DBH.hypotheses.length} in portfolio</span>
          </div>
        </header>
        <section class="panel">
          <div class="panel-head">
            <h2 class="panel-title">Portfolio</h2>
            <span class="panel-meta">Track A · acme-http DEMO</span>
          </div>
          <div class="panel-body tight table-wrap">
            <table class="data">
              <thead>
                <tr>
                  <th>Rank</th><th>Hypothesis</th><th>Status</th><th>Proof Δ</th><th>Info</th><th>Est. cost</th><th>Score</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          <div class="formula">priority ≈ (proof_value + information_value) / estimated_cost &nbsp;·&nbsp; proof_value ↑ as proof distance ↓</div>
        </section>
      </div>`;
  }

  function pageExperiment() {
    const e = DBH.experiment;
    const logs = e.logs
      .map(
        (l) => `<div><span class="ts">${l.t}</span>  <span class="${l.cls}">${escapeHtml(l.msg)}</span></div>`
      )
      .join("");
    const arts = e.artifacts
      .map(
        (a) => `<li>
          <span class="name">${escapeHtml(a.name)}</span>
          <span class="sha hash-tip" title="sha256:${a.sha}">${short(a.sha)}…</span>
        </li>`
      )
      .join("");
    const guards = e.guardInline
      .map(
        (g) => `<div class="guard-item">
          <span class="when">${g.t}</span>
          <div class="what">${escapeHtml(g.text)}</div>
          ${statusBadge(g.verdict)}
        </div>`
      )
      .join("");

    return `
      <div class="page">
        <header class="page-header">
          <div>
            <div class="page-kicker">Search · Experimenter</div>
            <h1 class="page-title">${e.id} · ${escapeHtml(e.title)}</h1>
            <p class="page-sub">Runner under Scope Guard. Artifacts are content-addressed. Verifier will grade from artifact refs only — never from Experimenter chat.</p>
          </div>
          <div class="page-actions">
            <span class="run-live"><span class="pulse"></span> ${e.status}</span>
            ${statusBadge(e.runner)}
          </div>
        </header>

        <div class="grid-4" style="margin-bottom:14px">
          <div class="stat-tile"><div class="k">Hypothesis</div><div class="v" style="font-size:15px">${e.hypId}</div><div class="s">chunk-size overflow</div></div>
          <div class="stat-tile"><div class="k">Elapsed</div><div class="v" style="font-size:18px">${e.elapsed}</div><div class="s">started ${e.started.slice(11, 19)}</div></div>
          <div class="stat-tile"><div class="k">Execs</div><div class="v" style="font-size:18px">${e.execs}</div><div class="s">${e.coverage}</div></div>
          <div class="stat-tile"><div class="k">Image</div><div class="v" style="font-size:13px;word-break:break-all">${escapeHtml(e.image)}</div><div class="s">pinned digest</div></div>
        </div>

        <div class="grid-2">
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Runner log</h2>
              <span class="panel-meta">not a chat transcript</span>
            </div>
            <div class="panel-body">
              <div class="log-console" id="run-log">${logs}</div>
            </div>
          </section>
          <div class="stack">
            <section class="panel">
              <div class="panel-head">
                <h2 class="panel-title">Scope Guard (inline)</h2>
              </div>
              <div class="panel-body tight">
                <div class="guard-feed">${guards}</div>
              </div>
            </section>
            <section class="panel">
              <div class="panel-head">
                <h2 class="panel-title">Artifact refs</h2>
              </div>
              <div class="panel-body">
                <ul class="artifact-list">${arts}</ul>
              </div>
            </section>
          </div>
        </div>
      </div>`;
  }

  function pageEvidence() {
    const f = DBH.finding;
    const gates = f.gates
      .map(
        (g) => `<li>
          <span class="gate-icon ${g.ok ? "pass" : "fail"}">${g.ok ? "✓" : "×"}</span>
          <div><strong>${escapeHtml(g.label)}</strong><div class="muted" style="font-size:12px">${escapeHtml(g.detail)}</div></div>
        </li>`
      )
      .join("");
    const hist = f.ladderHistory
      .map(
        (h) => `<tr>
          <td class="mono">L${h.level}</td>
          <td>${escapeHtml(h.label)}</td>
          <td>${escapeHtml(h.note)}</td>
          <td class="mono dim">${h.at}</td>
        </tr>`
      )
      .join("");

    return `
      <div class="page">
        <header class="page-header">
          <div>
            <div class="page-kicker">Evidence · Finding</div>
            <h1 class="page-title">${f.id} · ${escapeHtml(f.title)}</h1>
            <p class="page-sub">${escapeHtml(f.component)} · from ${f.hypId} · DEMO fictional finding</p>
          </div>
          <div class="page-actions">
            ${statusBadge(f.status)}
            <a class="btn btn-primary" href="#/dossier">Open dossier</a>
          </div>
        </header>

        <section class="panel" style="margin-bottom:14px">
          <div class="panel-head">
            <h2 class="panel-title">Evidence ladder</h2>
            <span class="panel-meta">current L${f.ladder}</span>
          </div>
          <div class="panel-body">
            ${ladderBar(f.ladder)}
            <p class="ladder-note"><strong>L0–L2 are not reportable.</strong> L3 establishes root cause; L4–L6 add uniqueness, scope, and REPORT_READY gates.</p>
          </div>
        </section>

        <div class="finding-hero">
          <section class="panel">
            <div class="panel-head">
              <h2 class="panel-title">Climb history</h2>
            </div>
            <div class="panel-body tight table-wrap">
              <table class="data">
                <thead><tr><th>Lvl</th><th>Gate</th><th>Note</th><th>At</th></tr></thead>
                <tbody>${hist}</tbody>
              </table>
            </div>
          </section>
          <div class="stack">
            <section class="panel">
              <div class="panel-head">
                <h2 class="panel-title">REPORT_READY gates</h2>
              </div>
              <div class="panel-body">
                <ul class="gate-list">${gates}</ul>
              </div>
            </section>
            <div class="compare-l2">
              <h4>Why L2 is not reportable</h4>
              <p style="margin:0;font-size:12.5px;color:var(--text-1);line-height:1.55">
                <strong>${escapeHtml(f.l2Counterexample.id)}</strong> — ${escapeHtml(f.l2Counterexample.title)}.
                ${escapeHtml(f.l2Counterexample.whyNotReportable)}
              </p>
              <div style="margin-top:8px">${ladderBar(2)}</div>
            </div>
          </div>
        </div>

        <section class="panel" style="margin-top:14px">
          <div class="panel-head">
            <h2 class="panel-title">Proof artifacts</h2>
            <span class="panel-meta">content-addressed</span>
          </div>
          <div class="panel-body">
            <div class="evidence-refs">
              ${Object.entries({
                "crash-raw": f.artifacts.crashRaw,
                "crash-min": f.artifacts.crashMin,
                "asan-log": f.artifacts.asan,
                "repro-bundle": f.artifacts.repro,
                "root-cause": f.artifacts.rootcause,
                adjudication: f.artifacts.adjudication,
                dedupe: f.artifacts.dedupe,
                dossier: f.artifacts.dossier,
              })
                .map(
                  ([kind, sha]) => `<div class="ref">
                    <span class="kind">${kind}</span>
                    <span class="sha hash-tip" title="sha256:${sha}">sha256:${short(sha)}…</span>
                    <span class="dim mono">${sha.slice(0, 8)}</span>
                  </div>`
                )
                .join("")}
            </div>
          </div>
        </section>
      </div>`;
  }

  function pageDossier() {
    const d = DBH.dossier;
    const repro = d.repro.map((r) => `<li class="mono" style="font-size:12.5px">${escapeHtml(r)}</li>`).join("");
    const refs = d.evidence
      .map(
        (e) => `<div class="ref">
          <span class="kind">${e.kind}</span>
          <span class="sha hash-tip" title="sha256:${e.sha}">sha256:${short(e.sha)}…</span>
          <span class="dim">${short(e.sha)}</span>
        </div>`
      )
      .join("");
    const non = d.nonClaims.map((n) => `<li>${escapeHtml(n)}</li>`).join("");

    return `
      <div class="page dossier">
        <header class="page-header" style="border:none;margin-bottom:10px;padding-bottom:0">
          <div>
            <div class="page-kicker">Evidence · Reporter</div>
            <h1 class="page-title" style="font-size:18px">Research dossier</h1>
          </div>
          <div class="page-actions">
            ${ladderBar(6, { compact: true })}
            <span class="badge report_ready">L6 REPORT_READY</span>
          </div>
        </header>

        <article class="dossier-paper">
          <div class="dossier-mast">
            <h1>${escapeHtml(d.title)}</h1>
            <span class="classif">${escapeHtml(d.classification)}</span>
          </div>
          <div class="dossier-meta">
            <div><div class="k">Finding</div><div class="v mono">${d.findingId}</div></div>
            <div><div class="k">Severity</div><div class="v">${escapeHtml(d.severity)}</div></div>
            <div><div class="k">Mapping</div><div class="v" style="font-size:11.5px">${escapeHtml(d.cwe)}</div></div>
            <div><div class="k">Dossier artifact</div><div class="v mono hash-tip" title="sha256:${d.artifact}">${short(d.artifact)}…</div></div>
          </div>

          <section class="dossier-section">
            <h2>Summary</h2>
            <p>${escapeHtml(d.summary)}</p>
          </section>
          <section class="dossier-section">
            <h2>Root cause</h2>
            <p>${escapeHtml(d.rootCause)}</p>
          </section>
          <section class="dossier-section">
            <h2>Impact</h2>
            <p>${escapeHtml(d.impact)}</p>
          </section>
          <section class="dossier-section">
            <h2>Reproduction</h2>
            <ul>${repro}</ul>
          </section>
          <section class="dossier-section">
            <h2>Evidence references</h2>
            <div class="evidence-refs">${refs}</div>
          </section>
          <section class="dossier-section">
            <h2>Non-claims (demo)</h2>
            <ul>${non}</ul>
          </section>
        </article>
      </div>`;
  }

  function pageEvents(filterState = {}) {
    const typeFilter = filterState.type || "all";
    const actorFilter = filterState.actor || "all";
    const q = (filterState.q || "").toLowerCase();

    const types = ["all", ...new Set(DBH.events.map((e) => e.type))].sort((a, b) =>
      a === "all" ? -1 : a.localeCompare(b)
    );
    const actors = ["all", ...new Set(DBH.events.map((e) => e.actor))].sort((a, b) =>
      a === "all" ? -1 : a.localeCompare(b)
    );

    const filtered = DBH.events.filter((e) => {
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      if (actorFilter !== "all" && e.actor !== actorFilter) return false;
      if (q) {
        const hay = (e.body + e.type + e.actor + e.arts.join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const rows = filtered
      .map(
        (e) => `<div class="event-row">
          <span class="seq">#${e.seq}</span>
          <span class="type">${escapeHtml(e.type)}</span>
          <span class="actor">${escapeHtml(e.actor)}</span>
          <div class="body">
            <span class="dim mono" style="margin-right:8px">${e.t}</span>
            ${escapeHtml(e.body)}
          </div>
          <div class="arts">
            ${e.arts
              .map((a) => `<span class="hash-tip" title="sha256:${a}">${short(a)}…</span>`)
              .join("") || '<span class="dim">—</span>'}
          </div>
        </div>`
      )
      .join("");

    return `
      <div class="page">
        <header class="page-header">
          <div>
            <div class="page-kicker">Control · System of record</div>
            <h1 class="page-title">Event log</h1>
            <p class="page-sub">Append-only. Every screen is a projection of this log. Agents write events and artifact refs; the UI never invents state.</p>
          </div>
          <div class="page-actions">
            <span class="panel-meta">${filtered.length} / ${DBH.events.length} events</span>
          </div>
        </header>

        <div class="filters" id="event-filters">
          <label class="dim" style="font-size:11px">Type
            <select data-filter="type">
              ${types.map((t) => `<option value="${t}" ${t === typeFilter ? "selected" : ""}>${t}</option>`).join("")}
            </select>
          </label>
          <label class="dim" style="font-size:11px">Actor
            <select data-filter="actor">
              ${actors.map((a) => `<option value="${a}" ${a === actorFilter ? "selected" : ""}>${a}</option>`).join("")}
            </select>
          </label>
          <input type="search" data-filter="q" placeholder="Filter body / hash…" value="${escapeHtml(q)}" />
        </div>

        <section class="panel">
          <div class="panel-head">
            <h2 class="panel-title">Append-only stream</h2>
            <span class="panel-meta">newest first · DEMO</span>
          </div>
          <div class="panel-body tight">
            <div class="event-stream">
              ${rows || '<div class="empty-filter">No events match filters</div>'}
            </div>
          </div>
        </section>
      </div>`;
  }

  /* —— Router —— */
  let eventFilter = { type: "all", actor: "all", q: "" };

  function currentRoute() {
    const hash = location.hash || "#/";
    const found = ROUTES.find((r) => r.path === hash);
    return found || ROUTES[0];
  }

  function render() {
    const route = currentRoute();
    const app = $("#app");
    app.innerHTML = renderChrome(route.id);
    const main = $("#main-view");

    const pages = {
      home: pageHome,
      overview: pageOverview,
      knowledge: pageKnowledge,
      hypotheses: pageHypotheses,
      experiment: pageExperiment,
      evidence: pageEvidence,
      dossier: pageDossier,
      events: () => pageEvents(eventFilter),
    };
    main.innerHTML = (pages[route.id] || pageHome)();

    // Row click helpers
    main.querySelectorAll("tr[data-href]").forEach((tr) => {
      tr.addEventListener("click", (ev) => {
        if (ev.target.closest("a")) return;
        const href = tr.getAttribute("data-href");
        if (href && href !== "#/") location.hash = href;
        else if (href === "#/" && tr.querySelector("a")) location.hash = tr.querySelector("a").getAttribute("href");
      });
    });

    // Event filters
    const filters = $("#event-filters", main);
    if (filters) {
      filters.addEventListener("change", onFilter);
      filters.addEventListener("input", onFilter);
    }

    // Scroll run log to bottom
    const log = $("#run-log", main);
    if (log) log.scrollTop = log.scrollHeight;

    document.title =
      route.id === "home"
        ? "DeepBugHunter — Missions"
        : `DeepBugHunter — ${route.label}`;
  }

  function onFilter(ev) {
    const t = ev.target;
    if (!t.dataset.filter) return;
    eventFilter = { ...eventFilter, [t.dataset.filter]: t.value };
    // Re-render events page only body via full render (simple + consistent)
    if (currentRoute().id === "events") render();
  }

  // Keyboard nav 1–7
  document.addEventListener("keydown", (ev) => {
    if (ev.target.matches("input, select, textarea")) return;
    const route = ROUTES.find((r) => r.key === ev.key);
    if (route) {
      location.hash = route.path;
    }
  });

  window.addEventListener("hashchange", render);
  if (!location.hash) location.hash = "#/";
  render();
})();
