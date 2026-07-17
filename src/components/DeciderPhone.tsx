"use client";

import { useEffect, useRef } from "react";
import type { Translation } from "@/lib/i18n/types";
import "./decider-phone.css";

type Prototype = Translation["decider"]["prototype"];

interface DeciderPhoneProps {
  /** Localized product name, e.g. "The Decider". */
  name: string;
  /** Localized prototype UI strings. */
  prototype: Prototype;
}

/**
 * The Decider — interactive phone prototype.
 *
 * Adapted from the standalone HTML prototype. The game logic is imperative
 * (it drives the DOM directly), so it runs inside a useEffect scoped to this
 * component's own #view node. All timers are cleaned up on unmount.
 *
 * All user-facing text comes from the localized `prototype` prop. The imperative
 * logic reads it through a ref so translations stay current without re-running
 * (and tearing down) the whole effect.
 */
export default function DeciderPhone({ name, prototype }: DeciderPhoneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef(name);
  const tRef = useRef(prototype);
  nameRef.current = name;
  tRef.current = prototype;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const viewEl = root.querySelector<HTMLElement>("#view");
    if (!viewEl) return;
    const view: HTMLElement = viewEl; // non-null for closures below

    // ---- prototype logic (self-contained) ----
    const BUCKETS = () => tRef.current.buckets;

    const ICON =
      '<svg class="brand-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Decider"><rect width="48" height="48" rx="12" fill="#0a0a0a"/><rect width="48" height="48" rx="12" fill="url(#decider-glow)"/><g stroke="#2BA3F7" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M14 15 H21 Q25 15 25 20 V24" opacity="0.55"/><path d="M14 33 H21 Q25 33 25 28 V24" opacity="0.55"/><path d="M25 24 H34"/></g><circle cx="13" cy="15" r="3.4" fill="#5BB8F9"/><circle cx="13" cy="33" r="3.4" fill="#2BA3F7" fill-opacity="0.5"/><circle cx="35" cy="24" r="4.6" fill="#2BA3F7"/><circle cx="35" cy="24" r="4.6" stroke="#5BB8F9" stroke-width="1.4" fill="none"/><defs><linearGradient id="decider-glow" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="#2BA3F7" stop-opacity="0.18"/><stop offset="1" stop-color="#2BA3F7" stop-opacity="0"/></linearGradient></defs></svg>';

    const ICON_HERO =
      '<svg class="brand-icon hero-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Decider"><rect width="48" height="48" rx="12" fill="#0a0a0a"/><rect width="48" height="48" rx="12" fill="url(#decider-glow-h)"/><g stroke="#2BA3F7" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.26"><path d="M14 15 H21 Q25 15 25 20 V24"/><path d="M14 33 H21 Q25 33 25 28 V24"/><path d="M25 24 H34"/></g><g stroke="#8fd6ff" stroke-width="2.6" stroke-linecap="round" fill="none"><path class="flow f1" pathLength="100" d="M14 15 H21 Q25 15 25 20 V24"/><path class="flow f2" pathLength="100" d="M14 33 H21 Q25 33 25 28 V24"/><path class="flow f3" pathLength="100" d="M25 24 H34"/></g><circle cx="13" cy="15" r="3.4" fill="#5BB8F9"/><circle cx="13" cy="33" r="3.4" fill="#2BA3F7" fill-opacity="0.5"/><circle class="ping" cx="35" cy="24" r="4.6" fill="none" stroke="#5BB8F9" stroke-width="1.4"/><circle class="decide" cx="35" cy="24" r="4.6" fill="#2BA3F7"/><circle cx="35" cy="24" r="4.6" fill="none" stroke="#5BB8F9" stroke-width="1.4"/><defs><linearGradient id="decider-glow-h" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="#2BA3F7" stop-opacity="0.18"/><stop offset="1" stop-color="#2BA3F7" stop-opacity="0"/></linearGradient></defs></svg>';

    const ENGINE_ORDER = ["blind", "bracket", "weighted", "gut"]; // most engaging first
    let engineStep = 0;
    function pickEngine() {
      const e = ENGINE_ORDER[engineStep % ENGINE_ORDER.length];
      engineStep++;
      return e;
    }

    type BracketState = { queue: string[]; champ: string; chall: string };
    type BlindCard = { opt: string; label: string };
    type BlindState = { remaining: BlindCard[]; gone: string[] };
    type WeightState = { alloc: Record<string, number>; budget: number };

    const STATE: {
      screen: string;
      bucket: string | null;
      logic: string;
      pool: string[] | null;
      struck: Record<string, boolean>;
      winner: string | null;
      fresh: boolean;
      bracket: BracketState | null;
      blind: BlindState | null;
      weight: WeightState | null;
    } = {
      screen: "enter", bucket: null, logic: "gut", pool: null, struck: {},
      winner: null, fresh: true, bracket: null, blind: null, weight: null,
    };

    let timers: ReturnType<typeof setTimeout>[] = [];
    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }
    function buzz(p: number | number[]) {
      try {
        if (navigator.vibrate) navigator.vibrate(p);
      } catch { /* no-op */ }
    }
    function later(fn: () => void, ms: number) {
      const t = setTimeout(fn, ms);
      timers.push(t);
      return t;
    }

    /* --- lightweight synth sound engine (Web Audio, no files) --- */
    type AudioCtx = AudioContext;
    let AC: AudioCtx | null = null;
    function ac(): AudioCtx | null {
      if (!AC) {
        try {
          const Ctor =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          AC = Ctor ? new Ctor() : null;
        } catch {
          AC = null;
        }
      }
      if (AC && AC.state === "suspended") {
        try { AC.resume(); } catch { /* no-op */ }
      }
      return AC;
    }
    function tone(freq: number, dur: number, type?: OscillatorType, gain?: number, delay?: number, glideTo?: number) {
      const a = ac();
      if (!a) return;
      const t = a.currentTime + (delay || 0);
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = type || "sine";
      o.frequency.setValueAtTime(freq, t);
      if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain || 0.12, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(a.destination);
      o.start(t);
      o.stop(t + dur + 0.03);
    }
    function noise(dur: number, gain?: number, freq?: number) {
      const a = ac();
      if (!a) return;
      const t = a.currentTime;
      const b = a.createBuffer(1, Math.max(1, Math.floor(a.sampleRate * dur)), a.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const s = a.createBufferSource();
      s.buffer = b;
      const f = a.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = freq || 1400;
      f.Q.value = 0.9;
      const g = a.createGain();
      g.gain.setValueAtTime(gain || 0.15, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f).connect(g).connect(a.destination);
      s.start(t);
      s.stop(t + dur + 0.02);
    }
    const SFX = {
      tap() { tone(680, 0.05, "triangle", 0.08); },
      soft() { tone(400, 0.05, "sine", 0.05); },
      tick() { tone(1250, 0.025, "square", 0.03); },
      beat() { tone(520, 0.09, "sine", 0.09, 0, 430); },
      lock() { tone(1600, 0.02, "triangle", 0.04); tone(587.33, 0.10, "sine", 0.10, 0.005); tone(880, 0.17, "sine", 0.09, 0.05); },
      whoosh() { noise(0.20, 0.05, 650); },
      redo() { tone(520, 0.24, "sine", 0.09, 0, 210); },
      win() { tone(523.25, 0.5, "sine", 0.11, 0); tone(659.25, 0.5, "sine", 0.10, 0.09); tone(783.99, 0.62, "sine", 0.11, 0.18); tone(1046.5, 0.5, "sine", 0.07, 0.28); },
    };

    function shuffle<T>(a: T[]): T[] {
      a = a.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    const SAMPLE: Record<string, number> = { gut: 4, bracket: 5, blind: 5, weighted: 4 };
    function sample(arr: string[], n: number) { return shuffle(arr).slice(0, Math.min(n, arr.length)); }
    function options() { return STATE.pool || []; }
    function finish(winner: string) { STATE.winner = winner; STATE.screen = "result"; render(); }

    function render() {
      clearTimers();
      if (STATE.screen === "enter") renderEnter();
      else if (STATE.screen === "hub") renderHub();
      else if (STATE.screen === "engine") renderEngine();
      else if (STATE.screen === "result") renderResult();
      else if (STATE.screen === "coming") renderComing();
    }

    function renderEnter() {
      const e = tRef.current.enter;
      view.innerHTML = ""
        + '<div class="enter">'
        + '<div class="enter-hero">'
        + '<div class="enter-badge">' + ICON_HERO + "</div>"
        + '<div class="enter-title">' + e.title + '</div>'
        + '<div class="enter-sub">' + e.sub + '</div>'
        + "</div>"
        + '<div class="enter-bottom">'
        + '<button class="lever" id="enter-go">' + e.cta + '</button>'
        + '<div class="enter-foot">' + e.foot + '</div>'
        + "</div>"
        + "</div>";
      view.querySelector<HTMLElement>("#enter-go")!.addEventListener("click", function () {
        SFX.tap(); buzz(12); STATE.screen = "hub"; render();
      });
    }

    function renderHub() {
      const order = ["eat", "go", "do"] as const;
      const hub = tRef.current.hub;
      const buckets = BUCKETS();
      let html = '<div class="hub-head"><div class="brand">' + ICON + '<span class="brand-name">' + nameRef.current + '</span></div><div class="h1">' + hub.title + '</div><div class="sub">' + hub.sub + '</div></div><div class="blocks">';
      order.forEach(function (key) {
        const b = buckets[key];
        html += '<div class="block" data-tone="' + key + '" data-bucket="' + key + '">'
          + '<span class="led"></span><div class="b-emoji">' + b.emoji + "</div>"
          + '<div class="b-title">' + b.title + '</div><div class="b-desc">' + b.desc + "</div></div>";
      });
      html += "</div>";
      view.innerHTML = html;
      view.querySelectorAll<HTMLElement>(".block").forEach(function (el) {
        el.addEventListener("click", function () {
          buzz(12); SFX.tap();
          STATE.bucket = el.dataset.bucket!;
          STATE.logic = pickEngine();
          STATE.winner = null; STATE.fresh = true; STATE.screen = "engine";
          render();
        });
      });
    }

    function renderEngine() {
      const b = BUCKETS()[STATE.bucket as "eat" | "go" | "do"];
      if (STATE.fresh) STATE.pool = sample(b.pool, SAMPLE[STATE.logic]);
      view.innerHTML = ""
        + '<button class="back" data-back>' + tRef.current.back + '</button>'
        + '<div class="engine-head">'
        + '<div class="eyebrow">' + b.eyebrow + '</div><div class="h1">' + b.title + "</div>"
        + '</div><div class="engine-body" id="ebody"></div>';
      view.querySelector<HTMLElement>("[data-back]")!.addEventListener("click", function () {
        SFX.soft(); STATE.screen = "hub"; render();
      });
      const body = view.querySelector<HTMLElement>("#ebody")!;
      if (STATE.logic === "gut") engineGut(body);
      else if (STATE.logic === "bracket") engineBracket(body);
      else if (STATE.logic === "blind") engineBlind(body);
      else engineWeighted(body);
    }

    /* 1. Gut-check */
    function activePool() { return options().filter(function (o) { return !STATE.struck[o]; }); }
    function engineGut(body: HTMLElement) {
      if (STATE.fresh) { STATE.struck = {}; STATE.fresh = false; }
      let html = '<div class="chips">';
      options().forEach(function (opt, i) {
        const st = STATE.struck[opt] ? " struck" : "";
        html += '<div class="chip' + st + '" data-opt="' + opt + '"><span>' + opt + '</span><span class="idx">0' + (i + 1) + "</span></div>";
      });
      html += '</div><div class="action-zone" id="action"><button class="lever" id="lever">' + tRef.current.gut.spin + '</button></div>';
      body.innerHTML = html;
      body.querySelector<HTMLElement>("#lever")!.addEventListener("click", spinGut);
    }
    function spinGut() {
      const lever = view.querySelector<HTMLElement>("#lever");
      if (lever) lever.setAttribute("disabled", "");
      buzz(18); SFX.lock();
      const chips = Array.prototype.slice.call(view.querySelectorAll(".chip")) as HTMLElement[];
      const pool = activePool();
      const poolChips = chips.filter(function (c) { return pool.indexOf(c.dataset.opt!) > -1; });
      if (poolChips.length === 1) { landGut(poolChips[0].dataset.opt!); return; }
      const winner = pool[Math.floor(Math.random() * pool.length)];
      let i = 0;
      const steps = 16;
      let delay = 55;
      (function tick() {
        chips.forEach(function (c) { c.classList.remove("flash"); });
        poolChips[i % poolChips.length].classList.add("flash");
        buzz(6); SFX.tick(); i++; delay += i > 10 ? 22 : 4;
        if (i < steps) { later(tick, delay); }
        else { chips.forEach(function (c) { c.classList.remove("flash"); }); buzz([0, 40]); SFX.lock(); landGut(winner); }
      })();
    }
    function landGut(winner: string) {
      STATE.winner = winner;
      (Array.prototype.slice.call(view.querySelectorAll(".chip")) as HTMLElement[]).forEach(function (c) {
        c.classList.toggle("win", c.dataset.opt === winner);
      });
      const action = view.querySelector<HTMLElement>("#action")!;
      action.innerHTML = ""
        + '<div class="countdown"><div class="cd-ring"><svg viewBox="0 0 128 128"><circle class="track" cx="64" cy="64" r="56"/>'
        + '<circle class="prog" cx="64" cy="64" r="56"/></svg><div class="cd-num" id="cdnum">3</div></div>'
        + '<div class="cd-label">' + tRef.current.gut.countdownLabel + '</div>'
        + '<button class="redo" id="redo">' + tRef.current.gut.redo + '</button></div>';
      const num = view.querySelector<HTMLElement>("#cdnum")!;
      later(function () { num.textContent = "2"; buzz(280); SFX.beat(); }, 1000);
      later(function () { num.textContent = "1"; buzz(200); SFX.beat(); }, 2000);
      later(function () { buzz(140); finish(winner); }, 3000);
      view.querySelector<HTMLElement>("#redo")!.addEventListener("click", function () {
        clearTimers(); buzz([0, 50, 30, 120]); SFX.redo();
        STATE.struck[winner] = true;
        const pool = activePool();
        if (pool.length <= 1) { finish(pool[0]); return; }
        engineGut(view.querySelector<HTMLElement>("#ebody")!);
        later(spinGut, 260);
      });
    }

    /* 2. Bracket */
    function engineBracket(body: HTMLElement) {
      if (STATE.fresh) {
        const q = shuffle(options());
        STATE.bracket = { queue: q, champ: q.shift()!, chall: q.shift()! };
        STATE.fresh = false;
      }
      drawBracket(body);
    }
    function drawBracket(body: HTMLElement) {
      const br = STATE.bracket!;
      const bk = tRef.current.bracket;
      const waiting = br.queue.length;
      const isFinal = waiting === 0;
      body.innerHTML = ""
        + '<div class="bracket-wrap">'
        + '<div class="round-tag">' + (isFinal ? bk.final : bk.round.replace("{count}", String(waiting))) + "</div>"
        + '<div class="match-card" data-pick="champ">' + br.champ + "</div>"
        + '<div class="vs-badge">' + bk.vs + '</div>'
        + '<div class="match-card" data-pick="chall">' + br.chall + "</div></div>";
      body.querySelectorAll<HTMLElement>(".match-card").forEach(function (el) {
        el.addEventListener("click", function () {
          const win = el.dataset.pick === "champ" ? br.champ : br.chall;
          buzz([0, 28]); SFX.lock(); el.classList.add("locked");
          const other = body.querySelector<HTMLElement>(".match-card:not(.locked)");
          if (other) other.classList.add("dissolve");
          later(function () {
            br.champ = win;
            if (br.queue.length === 0) { finish(win); return; }
            br.chall = br.queue.shift()!;
            drawBracket(body);
          }, 430);
        });
      });
    }

    /* 3. Blind */
    function engineBlind(body: HTMLElement) {
      if (STATE.fresh) {
        STATE.blind = {
          remaining: shuffle(options()).map(function (o, i) { return { opt: o, label: String.fromCharCode(65 + i) }; }),
          gone: [],
        };
        STATE.fresh = false;
      }
      drawBlind(body);
    }
    function drawBlind(body: HTMLElement) {
      const b = STATE.blind!;
      const bl = tRef.current.blind;
      const grid = b.remaining.map(function (c) {
        return '<div class="blind-card" data-label="' + c.label + '"><span class="bc-face">' + bl.cardBack + '</span><span class="bc-x">' + bl.out + '</span></div>';
      }).join("");
      const gone = b.gone.length
        ? b.gone.map(function (o) { return '<button class="gone-chip" data-gone="' + o + '">' + o + "</button>"; }).join("")
        : '<span class="gone-empty">' + bl.emptyYet + '</span>';
      body.innerHTML = ""
        + '<div class="blind-hint">' + bl.hint + '</div>'
        + '<div class="blind-grid">' + grid + "</div>"
        + '<div class="tossed"><div class="tossed-lbl">' + (b.gone.length ? bl.ruledOutMissHint : bl.ruledOut) + '</div><div class="tossed-row">' + gone + "</div></div>";
      body.querySelectorAll<HTMLElement>(".blind-card").forEach(function (el) {
        el.addEventListener("click", function () {
          if (el.classList.contains("flip")) return;
          const c = b.remaining.filter(function (x) { return x.label === el.dataset.label; })[0];
          buzz([0, 40]); SFX.lock();
          el.classList.add("flip");
          later(function () { el.querySelector<HTMLElement>(".bc-face")!.textContent = c.opt; }, 260);
          later(function () { el.classList.add("tossing"); }, 780);
          later(function () {
            b.remaining = b.remaining.filter(function (x) { return x.label !== c.label; });
            b.gone.push(c.opt);
            if (b.remaining.length === 1) finishBlindLast(body);
            else drawBlind(body);
          }, 1120);
        });
      });
      body.querySelectorAll<HTMLElement>("[data-gone]").forEach(function (el) {
        el.addEventListener("click", function () { buzz([0, 60]); SFX.lock(); finish(el.dataset.gone!); });
      });
    }
    function finishBlindLast(body: HTMLElement) {
      const last = STATE.blind!.remaining[0];
      const goneArr = STATE.blind!.gone;
      const bl = tRef.current.blind;
      const gone = goneArr.length
        ? goneArr.map(function (o) { return '<button class="gone-chip" data-gone="' + o + '">' + o + "</button>"; }).join("")
        : '<span class="gone-empty">' + bl.empty + '</span>';
      body.innerHTML = ""
        + '<div class="blind-hint">' + bl.finalHint + '</div>'
        + '<div class="blind-grid"><div class="blind-card solo flip" id="solo"><span class="bc-face">' + bl.cardBack + '</span></div></div>'
        + '<div class="tossed" style="margin-top:16px"><div class="tossed-lbl">' + (goneArr.length ? bl.ruledOutSwitchHint : bl.ruledOut) + '</div><div class="tossed-row">' + gone + "</div></div>"
        + '<div class="action-zone"><button class="lever" id="lockin">' + bl.lockIn + '</button></div>';
      buzz(18); SFX.lock();
      later(function () { const f = body.querySelector<HTMLElement>("#solo .bc-face"); if (f) f.textContent = last.opt; }, 260);
      function lock() { buzz([0, 40]); SFX.lock(); finish(last.opt); }
      body.querySelector<HTMLElement>("#lockin")!.addEventListener("click", lock);
      body.querySelector<HTMLElement>("#solo")!.addEventListener("click", lock);
      body.querySelectorAll<HTMLElement>("[data-gone]").forEach(function (el) {
        el.addEventListener("click", function () { buzz([0, 60]); SFX.lock(); finish(el.dataset.gone!); });
      });
    }

    /* 4. Weighted */
    function engineWeighted(body: HTMLElement) {
      if (STATE.fresh) {
        STATE.weight = { alloc: {}, budget: 10 };
        options().forEach(function (o) { STATE.weight!.alloc[o] = 0; });
        STATE.fresh = false;
      }
      drawWeight(body);
    }
    function drawWeight(body: HTMLElement) {
      const w = STATE.weight!;
      let used = 0;
      options().forEach(function (o) { used += w.alloc[o]; });
      const left = w.budget - used;
      const wt = tRef.current.weighted;
      let dots = "";
      for (let i = 0; i < w.budget; i++) { dots += '<span class="marble ' + (i < left ? "" : "used") + '"></span>'; }
      body.innerHTML = ""
        + '<div class="marble-bank">' + dots + '<span class="bank-num">' + wt.left.replace("{count}", String(left)) + "</span></div>"
        + '<div class="alloc">'
        + options().map(function (o) {
            const c = w.alloc[o];
            const pct = used ? Math.round(c / used * 100) : 0;
            return '<div class="alloc-row" data-opt="' + o + '"><div class="alloc-top"><span class="alloc-name">' + o + "</span>"
              + '<div class="stepper"><button data-dec="' + o + '">−</button><span class="alloc-cnt">' + c + '</span><button data-inc="' + o + '">+</button></div></div>'
              + '<div class="wbar"><span style="width:' + pct + '%"></span></div></div>';
          }).join("")
        + '</div><div class="action-zone"><button class="lever" id="roll"' + (used === 0 ? " disabled" : "") + ">" + wt.roll + (used ? wt.inPlay.replace("{count}", String(used)) : "") + "</button></div>";
      body.querySelectorAll<HTMLElement>("[data-inc]").forEach(function (el) {
        el.addEventListener("click", function () {
          if (left <= 0) { buzz(8); return; }
          w.alloc[el.dataset.inc!]++; buzz([0, 14]); SFX.tick(); drawWeight(body);
        });
      });
      body.querySelectorAll<HTMLElement>("[data-dec]").forEach(function (el) {
        el.addEventListener("click", function () {
          if (w.alloc[el.dataset.dec!] <= 0) return;
          w.alloc[el.dataset.dec!]--; buzz(8); SFX.soft(); drawWeight(body);
        });
      });
      const roll = body.querySelector<HTMLElement>("#roll");
      if (roll && used > 0) roll.addEventListener("click", function () { rollWeight(body); });
    }
    function rollWeight(body: HTMLElement) {
      const w = STATE.weight!;
      const names = options();
      const pool: string[] = [];
      names.forEach(function (o) { for (let i = 0; i < w.alloc[o]; i++) pool.push(o); });
      if (!pool.length) return;
      const roll = body.querySelector<HTMLElement>("#roll");
      if (roll) roll.setAttribute("disabled", "");
      const winner = pool[Math.floor(Math.random() * pool.length)];
      const rows = Array.prototype.slice.call(body.querySelectorAll(".alloc-row")) as HTMLElement[];
      let i = 0;
      const steps = 20;
      let delay = 55;
      (function tick() {
        rows.forEach(function (r) { r.classList.remove("hot"); });
        rows[names.indexOf(pool[Math.floor(Math.random() * pool.length)])].classList.add("hot");
        buzz(6); SFX.tick();
        i++; delay += i > 13 ? 28 : 4;
        if (i < steps) { later(tick, delay); }
        else {
          rows.forEach(function (r) { r.classList.remove("hot"); });
          rows[names.indexOf(winner)].classList.add("hot");
          buzz([0, 45]); SFX.lock();
          later(function () { finish(winner); }, 720);
        }
      })();
    }

    function confettiBurst(host?: HTMLElement | null) {
      host = host || view.querySelector<HTMLElement>(".result");
      if (!host) return;
      const layer = document.createElement("div");
      layer.className = "confetti";
      const colors = ["#54c6ff", "#ffbe5c", "#ff5f86", "#2b8bf7", "#ffffff", "#38b6ff"];
      for (let i = 0; i < 20; i++) {
        const s = document.createElement("span");
        const ang = Math.random() * Math.PI * 2;
        const dist = 55 + Math.random() * 130;
        s.style.setProperty("--tx", Math.round(Math.cos(ang) * dist) + "px");
        s.style.setProperty("--ty", Math.round(Math.sin(ang) * dist - 25) + "px");
        s.style.setProperty("--r", Math.round(Math.random() * 600 - 300) + "deg");
        s.style.background = colors[i % colors.length];
        s.style.animationDelay = (Math.random() * 0.06).toFixed(2) + "s";
        layer.appendChild(s);
      }
      host.appendChild(layer);
      later(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 1500);
    }

    function renderResult() {
      const b = BUCKETS()[STATE.bucket as "eat" | "go" | "do"];
      const rs = tRef.current.result;
      view.innerHTML = ""
        + '<button class="back" data-back>' + tRef.current.back + '</button>'
        + '<div class="result"><div class="medallion">' + b.emoji + "</div>"
        + '<div class="r-eyebrow">' + b.eyebrow + '</div><div class="r-win">' + STATE.winner + "</div>"
        + '<div class="r-note">' + rs.note + '</div>'
        + '<div class="r-actions"><button class="lever" id="again">' + rs.again + '</button>'
        + '<button class="redo" id="want">' + rs.want + '</button></div></div>';
      buzz([0, 30, 40, 90]); SFX.win(); confettiBurst();
      view.querySelector<HTMLElement>("[data-back]")!.addEventListener("click", goHome);
      view.querySelector<HTMLElement>("#want")!.addEventListener("click", function () {
        SFX.tap(); buzz(12); STATE.screen = "coming"; render();
      });
      view.querySelector<HTMLElement>("#again")!.addEventListener("click", function () {
        SFX.tap(); STATE.logic = pickEngine(); STATE.winner = null; STATE.fresh = true; STATE.screen = "engine"; render();
      });
    }

    function renderComing() {
      const cm = tRef.current.coming;
      const cards = cm.features.map(function (f) {
        return '<div class="feat"><span class="feat-ic">' + f.icon + '</span><div class="feat-txt"><div class="feat-name">' + f.name + '</div><div class="feat-desc">' + f.desc + "</div></div></div>";
      }).join("");
      view.innerHTML = ""
        + '<div class="engine-head"><div class="eyebrow">' + cm.eyebrow + '</div><div class="h1">' + cm.title + '</div><div class="sub">' + cm.sub + '</div></div>'
        + '<div class="coming-list">' + cards + "</div>"
        + '<div class="cta" id="cta">'
        + '<div class="cta-title">' + cm.ctaTitle + '</div>'
        + '<div class="cta-sub">' + cm.ctaSub + '</div>'
        + '<input class="cta-input" id="email" type="email" inputmode="email" placeholder="' + cm.emailPlaceholder + '">'
        + '<button class="lever" id="notify">' + cm.notify + '</button>'
        + "</div>";
      view.querySelector<HTMLElement>("#notify")!.addEventListener("click", function () {
        buzz([0, 30, 40, 90]); SFX.win();
        const email = ((view.querySelector<HTMLInputElement>("#email")!.value) || "").trim();
        const cta = view.querySelector<HTMLElement>("#cta")!;
        const title = email ? cm.doneWithEmailTitle : cm.doneNoEmailTitle;
        const sub = email ? cm.doneWithEmailSub : cm.doneNoEmailSub;
        cta.innerHTML = '<div class="cta-done"><div class="cta-check">✓</div><div class="cta-title">' + title + '</div><div class="cta-sub">' + sub + "</div></div>";
        confettiBurst(cta);
      });
    }

    function goHome() { SFX.soft(); STATE.screen = "hub"; STATE.bucket = null; render(); }

    render();

    // cleanup on unmount
    return () => {
      clearTimers();
      if (AC) { try { AC.close(); } catch { /* no-op */ } AC = null; }
      view.innerHTML = "";
    };
  }, []);

  return (
    <div id="the-decider" ref={rootRef}>
      <div className="iphone">
        <span className="btn action"></span>
        <span className="btn volup"></span>
        <span className="btn voldown"></span>
        <span className="btn power"></span>
        <div className="screen">
          <div className="aura"></div>
          <div className="island"></div>
          <div className="statusbar">
            <span className="sb-time">9:41</span>
            <span className="sb-right">
              <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2.5" width="3" height="9.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
              <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" opacity="0.5" /><rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" /><rect x="25" y="4.2" width="2" height="4.6" rx="1" fill="currentColor" opacity="0.5" /></svg>
            </span>
          </div>
          <div className="view" id="view"></div>
          <div className="home-ind"></div>
        </div>
      </div>
    </div>
  );
}
