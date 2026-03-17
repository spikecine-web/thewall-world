// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { supabase } from "../lib/supabase";

/* ═══════════════════════════════════════════════════════
   thewall.world — The World's Wall
   Final production build
   ═══════════════════════════════════════════════════════ */

const TILES = [
  /* ── #1 Riccardo ── */
  {
    w: ["Ser"],
    city: "Colombia",
    co: "Colombia",
    founder: true,
    name: "Riccardo",
  },
  {
    w: ["Feliz"],
    city: "Colombia",
    co: "Colombia",
    founder: true,
    name: "Riccardo",
  },
  /* ── #2 Spike ── */
  {
    w: ["Believe"],
    city: "Heaven",
    co: "Forever",
    founder: true,
    name: "Spike",
  },
  /* ── #3 Chloe & Vida ── */
  {
    w: ["Love"],
    city: "Heaven",
    co: "Forever",
    founder: true,
    name: "Chloe & Vida",
  },
  {
    w: ["Always"],
    city: "Heaven",
    co: "Forever",
    founder: true,
    name: "Chloe & Vida",
  },
  /* ── #4 Mowgli ── */
  { w: ["I"], city: "Heaven", co: "Forever", founder: true, name: "Mowgli" },
  { w: ["will"], city: "Heaven", co: "Forever", founder: true, name: "Mowgli" },
  {
    w: ["always"],
    city: "Heaven",
    co: "Forever",
    founder: true,
    name: "Mowgli",
  },
  {
    w: ["smile"],
    city: "Heaven",
    co: "Forever",
    founder: true,
    name: "Mowgli",
  },
  { w: ["for"], city: "Heaven", co: "Forever", founder: true, name: "Mowgli" },
  { w: ["you"], city: "Heaven", co: "Forever", founder: true, name: "Mowgli" },
  { w: ["Be"], city: "Heaven", co: "Forever", founder: true, name: "Mowgli" },
  {
    w: ["happy"],
    city: "Heaven",
    co: "Forever",
    founder: true,
    name: "Mowgli",
  },
  /* ── The world joins ── */
  { w: ["Hope"], city: "São Paulo", co: "Brazil" },
  { w: ["Dream"], city: "Tokyo", co: "Japan" },
  { w: ["Maria"], city: "Bogotá", co: "Colombia" },
  { w: ["Light"], city: "Mumbai", co: "India" },
  { w: ["Brave"], city: "Nairobi", co: "Kenya" },
  { w: ["Papá"], city: "Mexico City", co: "Mexico" },
  { w: ["Joy"], city: "Melbourne", co: "Australia" },
  { w: ["Soul"], city: "Roma", co: "Italy" },
  { w: ["Peace"], city: "Stockholm", co: "Sweden" },
  { w: ["Mamá"], city: "Lima", co: "Peru" },
  { w: ["Rise"], city: "Lagos", co: "Nigeria" },
  { w: ["Bold"], city: "London", co: "UK" },
  { w: ["Dance"], city: "Barcelona", co: "Spain" },
  { w: ["Stars"], city: "Cairo", co: "Egypt" },
  { w: ["Te", "amo", "familia"], city: "Medellín", co: "Colombia" },
  { w: ["Shine"], city: "Bangkok", co: "Thailand" },
  { w: ["Magic"], city: "Marrakech", co: "Morocco" },
  { w: ["Heart"], city: "Dublin", co: "Ireland" },
  { w: ["Smile"], city: "Seoul", co: "South Korea" },
  { w: ["I", "love", "you", "Mom"], city: "Austin", co: "USA" },
  { w: ["Zen"], city: "Kathmandu", co: "Nepal" },
  { w: ["Bloom"], city: "Amsterdam", co: "Netherlands" },
  { w: ["Merci", "pour", "tout"], city: "Lyon", co: "France" },
  { w: ["Ikigai"], city: "Kyoto", co: "Japan" },
  { w: ["Amor"], city: "Buenos Aires", co: "Argentina" },
  { w: ["Unity"], city: "Cape Town", co: "South Africa" },
  { w: ["Never", "give", "up"], city: "Accra", co: "Ghana" },
  { w: ["Wisdom"], city: "Beijing", co: "China" },
  { w: ["Gratitude"], city: "Bali", co: "Indonesia" },
  { w: ["Courage"], city: "Athens", co: "Greece" },
  { w: ["Saudade"], city: "Porto", co: "Portugal" },
  { w: ["Ubuntu"], city: "Johannesburg", co: "South Africa" },
  { w: ["Familia"], city: "Dar es Salaam", co: "Tanzania" },
  { w: ["You", "are", "enough"], city: "Toronto", co: "Canada" },
  { w: ["Lumière"], city: "Marseille", co: "France" },
  { w: ["Danke"], city: "München", co: "Germany" },
  { w: ["Forza"], city: "Napoli", co: "Italy" },
  { w: ["Alive"], city: "Lisboa", co: "Portugal" },
];

const SIM_L = [
  { city: "São Paulo", co: "Brazil" },
  { city: "Tokyo", co: "Japan" },
  { city: "Paris", co: "France" },
  { city: "Mumbai", co: "India" },
  { city: "Lagos", co: "Nigeria" },
  { city: "Seoul", co: "South Korea" },
  { city: "Berlin", co: "Germany" },
  { city: "Bogotá", co: "Colombia" },
  { city: "Cairo", co: "Egypt" },
  { city: "Lima", co: "Peru" },
  { city: "Rome", co: "Italy" },
  { city: "Nairobi", co: "Kenya" },
  { city: "Bangkok", co: "Thailand" },
  { city: "Dublin", co: "Ireland" },
  { city: "Kyoto", co: "Japan" },
  { city: "Vancouver", co: "Canada" },
  { city: "Istanbul", co: "Turkey" },
  { city: "Hanoi", co: "Vietnam" },
  { city: "Santiago", co: "Chile" },
  { city: "Melbourne", co: "Australia" },
];
const SIM_W = [
  "Amor",
  "Vida",
  "Rêve",
  "Cielo",
  "Lux",
  "Merci",
  "Sol",
  "Anima",
  "Grazie",
  "Libre",
  "Alegría",
  "Sogno",
  "Espoir",
  "Fuerza",
  "Amour",
  "Ikigai",
  "Bonheur",
  "Feliz",
  "Lumière",
  "Danke",
  "Salam",
  "Shanti",
  "Aloha",
  "Ubuntu",
  "Saudade",
  "Arigato",
  "Gracias",
  "Obrigado",
];

const F = [
  "'Nunito',sans-serif",
  "'Quicksand',sans-serif",
  "'Nunito',sans-serif",
  "'Quicksand',sans-serif",
  "'Nunito',sans-serif",
  "'Quicksand',sans-serif",
];

const BLOCKED = [
  /fuck/i,
  /shit/i,
  /bitch/i,
  /cunt/i,
  /dick/i,
  /cock/i,
  /slut/i,
  /whore/i,
  /nigger/i,
  /nigga/i,
  /fag/i,
  /retard/i,
  /spic/i,
  /chink/i,
  /kike/i,
  /kill/i,
  /murder/i,
  /rape/i,
  /terror/i,
  /bomb/i,
  /nazi/i,
  /hitler/i,
  /suicide/i,
  /shoot/i,
  /stab/i,
];
const clean = (w) => !BLOCKED.some((p) => p.test(w));

const ts = (i) => {
  const h = (i * 137.508) % 360;
  return {
    bg: `hsl(${h},${52 + (i % 25)}%,${26 + (i % 14)}%)`,
    fg: `hsl(${(h + 38) % 360},82%,83%)`,
    f: F[i % F.length],
    r: ((i * 7) % 5) - 2,
  };
};

const TIERS = [
  {
    id: 2,
    name: "A Message",
    price: 5,
    words: 10,
    desc: "A short message or name",
    ic: "✧",
  },
  {
    id: 3,
    name: "A Love Letter",
    price: 10,
    words: 25,
    desc: "Say something meaningful",
    ic: "♡",
  },
  {
    id: 1,
    name: "One Word",
    price: 1,
    words: 1,
    desc: "A single word on the wall",
    ic: "✦",
  },
  {
    id: 4,
    name: "A Legacy",
    price: 25,
    words: 50,
    desc: "Gold tiles · choose your color",
    ic: "★",
  },
  {
    id: 5,
    name: "Go Big",
    price: -1,
    words: -1,
    desc: "Custom amount · $25 min",
    ic: "🚀",
  },
  {
    id: 0,
    name: "Just Listen",
    price: 0,
    words: 0,
    desc: "Get a kind word every morning",
    ic: "☼",
  },
];

/* ── 3D Globe — made of real words ── */
function Globe({ tiles }) {
  const ref = useRef(null);
  const drag = useRef(false);
  const pm = useRef({ x: 0, y: 0 });
  const rot = useRef({ x: 0.3, y: 0 });
  const auto = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.clientWidth,
      h = el.clientHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080e, 0.08);
    const cam = new THREE.PerspectiveCamera(46, w / h, 0.1, 100);
    cam.position.z = 3.8;
    const ren = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    ren.setSize(w, h);
    ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ren.setClearColor(0x0e1117, 1);
    el.appendChild(ren.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const l1 = new THREE.PointLight(0xff6b6b, 0.8, 12);
    l1.position.set(3, 2, 4);
    scene.add(l1);
    const l2 = new THREE.PointLight(0x4ecdc4, 0.6, 12);
    l2.position.set(-3, -1, 3);
    scene.add(l2);
    const l3 = new THREE.PointLight(0xffe66d, 0.3, 12);
    l3.position.set(0, -3, 2);
    scene.add(l3);

    const grp = new THREE.Group();
    const R = 1.38;

    // Helper: create a text texture for a word
    function makeWordTexture(word, isFounder) {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 48;
      const ctx = canvas.getContext("2d");

      // Background
      const hue = Math.floor(Math.random() * 360);
      if (isFounder) {
        ctx.fillStyle = `hsl(25, 60%, 18%)`;
      } else {
        ctx.fillStyle = `hsl(${hue}, 45%, 20%)`;
      }
      ctx.fillRect(0, 0, 128, 48);

      // Subtle inner glow
      const grad = ctx.createRadialGradient(30, 15, 0, 64, 24, 80);
      grad.addColorStop(
        0,
        isFounder ? "rgba(255,160,80,0.15)" : "rgba(255,255,255,0.08)",
      );
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 48);

      // Text
      const fontSize = word.length > 6 ? 12 : word.length > 4 ? 15 : 18;
      ctx.font = `bold ${fontSize}px Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isFounder
        ? "#FFB074"
        : `hsl(${(hue + 40) % 360}, 80%, 80%)`;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 3;
      ctx.fillText(word.toUpperCase(), 64, 24);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    // Helper: create a dim empty placeholder tile
    function makeEmptyTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      const hue = Math.floor(Math.random() * 360);
      ctx.fillStyle = `hsl(${hue}, 20%, 12%)`;
      ctx.fillRect(0, 0, 64, 32);
      // tiny dot to show it's an empty slot
      ctx.fillStyle = `hsl(${hue}, 30%, 20%)`;
      ctx.beginPath();
      ctx.arc(32, 16, 2, 0, Math.PI * 2);
      ctx.fill();
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    // Build all globe positions
    const positions = [];
    const rings = 26;
    for (let i = 0; i < rings; i++) {
      const phi = (Math.PI * (i + 0.5)) / rings;
      const cnt = Math.max(4, Math.round(Math.sin(phi) * 36));
      for (let j = 0; j < cnt; j++) {
        const theta = (2 * Math.PI * j) / cnt;
        positions.push({ phi, theta });
      }
    }

    // Flatten all words from tiles
    const allWords = [];
    tiles.forEach((t) => {
      t.w.forEach((word) => {
        allWords.push({ word, founder: !!t.founder });
      });
    });

    // Place real words first, then empty placeholders
    positions.forEach((pos, idx) => {
      const { phi, theta } = pos;
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.cos(phi);
      const z = R * Math.sin(phi) * Math.sin(theta);

      let tex;
      let tileW = 0.11;
      let tileH = 0.05;

      if (idx < allWords.length) {
        // Real word tile
        tex = makeWordTexture(allWords[idx].word, allWords[idx].founder);
        tileW = 0.12;
        tileH = 0.055;
      } else {
        // Empty placeholder
        tex = makeEmptyTexture();
        tileW = 0.08;
        tileH = 0.04;
      }

      const geo = new THREE.PlaneGeometry(tileW, tileH);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.lookAt(0, 0, 0);
      grp.add(m);
    });

    scene.add(grp);

    // Stars
    const sg = new THREE.BufferGeometry();
    const sp = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      sp[i * 3] = (Math.random() - 0.5) * 20;
      sp[i * 3 + 1] = (Math.random() - 0.5) * 20;
      sp[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
    scene.add(
      new THREE.Points(
        sg,
        new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.01,
          transparent: true,
          opacity: 0.25,
        }),
      ),
    );

    let af;
    const anim = () => {
      af = requestAnimationFrame(anim);
      if (auto.current && !drag.current) rot.current.y += 0.003;
      grp.rotation.x = rot.current.x;
      grp.rotation.y = rot.current.y;
      ren.render(scene, cam);
    };
    anim();

    const rs = () => {
      const nw = el.clientWidth,
        nh = el.clientHeight;
      cam.aspect = nw / nh;
      cam.updateProjectionMatrix();
      ren.setSize(nw, nh);
    };
    window.addEventListener("resize", rs);
    return () => {
      window.removeEventListener("resize", rs);
      cancelAnimationFrame(af);
      if (el.contains(ren.domElement)) el.removeChild(ren.domElement);
      ren.dispose();
    };
  }, [tiles]);

  const dn = (e) => {
    drag.current = true;
    auto.current = false;
    pm.current = { x: e.clientX, y: e.clientY };
  };
  const mv = (e) => {
    if (!drag.current) return;
    rot.current.y += (e.clientX - pm.current.x) * 0.005;
    rot.current.x += (e.clientY - pm.current.y) * 0.005;
    rot.current.x = Math.max(-1.2, Math.min(1.2, rot.current.x));
    pm.current = { x: e.clientX, y: e.clientY };
  };
  const up = () => {
    drag.current = false;
    setTimeout(() => {
      auto.current = true;
    }, 2500);
  };

  return (
    <div
      style={{
        position: "relative",
        maxWidth: 540,
        margin: "0 auto",
        padding: "0 12px",
      }}
    >
      <div
        ref={ref}
        onPointerDown={dn}
        onPointerMove={mv}
        onPointerUp={up}
        onPointerLeave={up}
        style={{
          width: "100%",
          height: 320,
          cursor: "grab",
          borderRadius: 16,
          overflow: "hidden",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 9,
          color: "rgba(255,255,255,0.8)",
          fontFamily: "'DM Mono',monospace",
          background: "rgba(0,0,0,0.5)",
          padding: "3px 10px",
          borderRadius: 10,
          pointerEvents: "none",
        }}
      >
        drag to rotate
      </div>
    </div>
  );
}

/* ── Tile ── */
function Tile({ d, i, hov, onH, onL, onClick }) {
  const s = ts(i);
  const disp = d.w.length > 1 ? d.w[0] + "…" : d.w[0];
  const gold = d.tier === 4;
  const found = d.founder;
  return (
    <div
      onClick={() => onClick(d, i)}
      onMouseEnter={() => onH(i)}
      onMouseLeave={onL}
      style={{
        width: 64,
        height: 64,
        backgroundColor: found ? "#1a0f0a" : gold ? "#2a1f0a" : d.color || s.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hov ? `scale(1.45) rotate(0deg)` : `rotate(${s.r}deg)`,
        zIndex: hov ? 50 : 1,
        borderRadius: hov ? 8 : found ? 3 : 2,
        boxShadow: hov
          ? "0 10px 40px rgba(0,0,0,0.6),0 0 0 2px rgba(255,255,255,0.6)"
          : found
            ? "inset 0 0 0 1px rgba(255,160,80,0.3), 0 0 12px rgba(255,120,50,0.08)"
            : gold
              ? "inset 0 0 0 1px rgba(255,215,0,0.25)"
              : "inset 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: found
            ? "linear-gradient(135deg,rgba(255,140,60,0.15),transparent 60%)"
            : gold
              ? "linear-gradient(135deg,rgba(255,215,0,0.12),transparent 60%)"
              : "radial-gradient(circle at 30% 30%,rgba(255,255,255,0.1),transparent 60%)",
        }}
      />
      <span
        style={{
          fontFamily: s.f,
          fontSize: disp.length > 6 ? 8 : disp.length > 4 ? 10 : 12,
          fontWeight: 700,
          color: found ? "#FFB074" : gold ? "#FFD700" : s.fg,
          textTransform: "uppercase",
          letterSpacing: 0.4,
          textAlign: "center",
          lineHeight: 1.1,
          padding: "1px 3px",
          position: "relative",
          zIndex: 2,
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}
      >
        {disp}
      </span>
      {hov && (
        <span
          style={{
            fontSize: 6,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "'DM Mono',monospace",
            position: "relative",
            zIndex: 2,
            marginTop: 1,
          }}
        >
          {d.city}
        </span>
      )}
    </div>
  );
}

/* ── Tile Modal ── */
function TileModal({ d, i, onClose, same, onShare }) {
  if (!d) return null;
  const s = ts(i);
  const txt = d.w.join(" ");
  const v = Math.floor(Math.random() * 3000) + 50;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeUp .25s ease",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: d.founder ? "#1a0f0a" : d.color || s.bg,
          borderRadius: 20,
          padding: "40px 44px 32px",
          textAlign: "center",
          maxWidth: 360,
          width: "100%",
          boxShadow: d.founder
            ? "0 24px 80px rgba(0,0,0,0.6), 0 0 30px rgba(255,140,60,0.06)"
            : "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        {d.name && (
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,176,116,0.6)",
              fontFamily: "'DM Mono',monospace",
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 8,
            }}
          >
            by {d.name}
          </div>
        )}
        <div
          style={{
            fontFamily: s.f,
            fontSize: txt.length > 15 ? 20 : txt.length > 8 ? 30 : 44,
            fontWeight: 700,
            color: d.founder ? "#FFB074" : s.fg,
            textTransform: d.w.length === 1 ? "uppercase" : "none",
            letterSpacing: d.w.length === 1 ? 2 : 0.5,
            lineHeight: 1.2,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {txt}
        </div>
        <div
          style={{
            marginTop: 16,
            padding: "10px 16px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'DM Mono',monospace",
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 3,
            }}
          >
            placed from
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Nunito',sans-serif",
            }}
          >
            {d.city}, {d.co}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginTop: 14,
          }}
        >
          {[
            { v: v.toLocaleString(), l: "views" },
            { v: same, l: "similar" },
            { v: `#${i + 1}`, l: "tile" },
          ].map((x, j) => (
            <div key={j} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                {x.v}
              </div>
              <div
                style={{
                  fontSize: 7,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'DM Mono',monospace",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginTop: 1,
                }}
              >
                {x.l}
              </div>
            </div>
          ))}
        </div>
        {/* Position on the wall */}
        <div
          style={{
            marginTop: 12,
            padding: "8px 12px",
            background: "rgba(0,0,0,0.15)",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'DM Mono',monospace",
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 3,
            }}
          >
            position on the wall
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.75)",
              fontFamily: "'DM Mono',monospace",
            }}
          >
            Row {Math.floor(i / 12) + 1}, Column {(i % 12) + 1} · Section{" "}
            {String.fromCharCode(65 + Math.floor(i / 120))}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.8)",
              fontFamily: "'DM Mono',monospace",
              marginTop: 2,
            }}
          >
            thewall.world/tile/{i + 1}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginTop: 14,
          }}
        >
          {[
            { ic: "𝕏", c: "#1DA1F2", n: "X" },
            { ic: "f", c: "#4267B2", n: "Facebook" },
            { ic: "✆", c: "#25D366", n: "WhatsApp" },
            { ic: "🔗", c: "#aaa", n: "Copy link" },
          ].map((p, j) => (
            <button
              key={j}
              onClick={() => onShare(p.n, txt, d.city, d.co)}
              style={{
                background: p.c,
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                cursor: "pointer",
                color: "#fff",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                boxShadow: `0 4px 12px ${p.c}55`,
              }}
            >
              {p.ic}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: 14,
            background: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.75)",
            padding: "6px 22px",
            borderRadius: 14,
            fontSize: 10,
            cursor: "pointer",
            fontFamily: "'DM Mono',monospace",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* ── Input Panel ── */
function InputPanel({ onAdd, onShare, totalWords }) {
  // ALL hooks must be at the top, called every render, no conditions
  const [tier, setTier] = useState(TIERS[0]);
  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [co, setCo] = useState("");
  const [email, setEmail] = useState("");
  const [daily, setDaily] = useState(false);
  const [step, setStep] = useState(1);
  const [err, setErr] = useState("");
  const [last, setLast] = useState(null);
  const [myNumber, setMyNumber] = useState(null);
  const [customAmount, setCustomAmount] = useState(0);
  const [paying, setPaying] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [name, setName] = useState("");
  const paypalBtnRef = useRef(null);

  const wc = text.trim().split(/\s+/).filter(Boolean).length;
  const over = tier.words === -1 ? wc > customAmount * 2 : wc > tier.words;

  // Load PayPal SDK
  useEffect(function() {
    var id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!id || typeof window === 'undefined') return;
    if (document.querySelector('#paypal-sdk')) { setPaypalLoaded(true); return; }
    var script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = 'https://www.paypal.com/sdk/js?client-id=' + id + '&currency=USD';
    script.onload = function() { setPaypalLoaded(true); };
    document.body.appendChild(script);
  }, []);

  // Render PayPal button
  useEffect(function() {
    if (step !== 2 || !paypalLoaded || !city.trim() || !co || !paypalBtnRef.current) return;
    if (typeof window === 'undefined' || !window.paypal) return;
    if (tier.id === 0) return;
    var price = tier.id === 5 ? customAmount : tier.price;
    if (!price || price <= 0) return;
    paypalBtnRef.current.innerHTML = '';
    window.paypal.Buttons({
      style: { layout: 'horizontal', color: 'blue', shape: 'rect', label: 'pay', height: 45 },
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{ amount: { value: String(price) }, description: 'The Worlds Wall - ' + tier.name }]
        });
      },
onApprove: function(data) {
        setPaying(true);
        var words = text.trim().split(/\s+/).filter(Boolean);
        var num = totalWords + 1;
        fetch('/api/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderID: data.orderID,
            tile: {
              words: words,
              full_message: words.join(' '),
              name: name.trim() || null,
              city: city.trim(),
              country: co,
              tier: tier.id,
              email: email || null,
            }
          })
        }).then(function(r) { return r.json(); }).then(function(d) {
          console.log('PAYPAL RESULT:', JSON.stringify(d));
          if (email && daily) {
            fetch('/api/tile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ is_subscriber: true, email: email.trim() })
            });
          }
          onAdd({ w: words, name: name.trim() || null, city: city.trim(), co: co, tier: tier.id, num: num });
          setLast({ w: words, city: city.trim(), co: co, tier: tier.id, num: num });
          setMyNumber(num);
          setPaying(false);
          setStep(3);
        }).catch(function(e) {
          console.error('Error:', e);
          setPaying(false);
        });
      },
      onError: function(err) { console.error('PayPal error:', err); setPaying(false); }
    }).render(paypalBtnRef.current);
  }, [step, paypalLoaded, city, co, tier.id, tier.price, customAmount]);

  const next = () => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return;
    var maxWords = tier.words === -1 ? customAmount * 2 : tier.words;
    if (wc > maxWords) {
      setErr("Max " + maxWords + " words for this tier");
      return;
    }
    if (words.find((w) => !clean(w))) {
      setErr("Let's keep it kind. Try different words.");
      return;
    }
    setErr("");
    setStep(2);
  };

  const submitFree = () => {
    if (!email.trim()) return;
    supabase.from("subscribers").insert([{ email: email.trim() }]);
    setLast(null);
    setMyNumber(null);
    setStep(3);
  };

  const reset = () => {
    setText("");
    setName("");
    setCity("");
    setCo("");
    setEmail("");
    setDaily(false);
    setStep(1);
    setLast(null);
    setMyNumber(null);
    setTier(TIERS[0]);
    setCustomAmount(0);
    setPaying(false);
  };

  const inp = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "11px 14px",
    color: "#fff",
    fontSize: 14,
    fontFamily: "'DM Mono',monospace",
    outline: "none",
    width: "100%",
  };

  return (
    <div
      id="place"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "40px 20px 48px",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: 8,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.8)",
          fontFamily: "'DM Mono',monospace",
          marginBottom: 8,
        }}
      >
        thewall.world
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 26,
          fontWeight: 800,
          color: "#fff",
          fontFamily: "'Nunito',sans-serif",
          marginBottom: 4,
        }}
      >
        Place your words on the wall
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "rgba(255,255,255,0.75)",
          fontFamily: "'Quicksand',sans-serif",
          marginBottom: 6,
        }}
      >
        A word. A name. A love letter. Yours forever.
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "#FFE66D",
          fontFamily: "'Quicksand',sans-serif",
          fontWeight: 600,
          marginBottom: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>💛</span> Be kind. This wall is for
        everyone. <span style={{ fontSize: 18 }}>💛</span>
      </div>

      {step === 1 && (
        <div>
          {/* Tier tabs */}
          <div
            style={{
              display: "flex",
              gap: 5,
              justifyContent: "center",
              marginBottom: 18,
              flexWrap: "wrap",
            }}
          >
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTier(t)}
                style={{
                  background:
                    tier.id === t.id
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.02)",
                  border: `1px solid ${tier.id === t.id ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.05)"}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  cursor: "pointer",
                  textAlign: "center",
                  minWidth: 82,
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: 15, marginBottom: 1 }}>{t.ic}</div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: tier.id === t.id ? "#fff" : "rgba(255,255,255,0.7)",
                    fontFamily: "'Quicksand',sans-serif",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color:
                      tier.id === t.id ? "#4ECDC4" : "rgba(255,255,255,0.6)",
                    fontFamily: "'DM Mono',monospace",
                    margin: "2px 0",
                  }}
                >
                  {t.price === 0
                    ? "Free"
                    : t.price === -1
                      ? "Custom"
                      : `$${t.price}`}
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  {t.words === 0
                    ? "daily email"
                    : t.words === 1
                      ? "1 word"
                      : t.words === -1
                        ? "2 per $"
                        : "up to " + t.words}
                </div>
              </button>
            ))}
          </div>

          {/* Go Big — custom amount */}
          {tier.id === 5 ? (
            <div style={{ animation: "fadeUp .3s ease" }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Quicksand',sans-serif",
                  marginBottom: 14,
                  lineHeight: 1.5,
                }}
              >
                Choose your amount. You get 2 words per dollar.
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  min="25"
                  value={customAmount || ""}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 0;
                    setCustomAmount(v);
                    setTier({ ...tier, price: v, words: v * 2 });
                  }}
                  placeholder="25"
                  style={{
                    ...inp,
                    width: 120,
                    fontSize: 24,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                />
              </div>
              {customAmount >= 25 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: "#4ECDC4",
                    fontFamily: "'DM Mono',monospace",
                    marginBottom: 12,
                  }}
                >
                  You get {customAmount * 2} words on the wall
                </div>
              )}
              {customAmount > 0 && customAmount < 25 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    color: "#FF6B6B",
                    fontFamily: "'DM Mono',monospace",
                    marginBottom: 12,
                  }}
                >
                  Minimum $25
                </div>
              )}
              {customAmount >= 25 && (
                <div>
                  <textarea
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      setErr("");
                    }}
                    placeholder={`Write up to ${customAmount * 2} words...`}
                    rows={3}
                    style={{
                      ...inp,
                      fontSize: 15,
                      resize: "none",
                      lineHeight: 1.5,
                    }}
                  />
                  <div
                    style={{
                      textAlign: "right",
                      marginTop: 4,
                      fontSize: 10,
                      color:
                        wc > customAmount * 2
                          ? "#FF6B6B"
                          : "rgba(255,255,255,0.6)",
                      fontFamily: "'DM Mono',monospace",
                    }}
                  >
                    {wc}/{customAmount * 2}
                  </div>
                  {err && (
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 4,
                        fontSize: 12,
                        color: "#FF6B6B",
                      }}
                    >
                      {err}
                    </div>
                  )}
                  <button
                    onClick={next}
                    disabled={!text.trim() || wc > customAmount * 2}
                    style={{
                      width: "100%",
                      marginTop: 8,
                      background:
                        text.trim() && wc <= customAmount * 2
                          ? "linear-gradient(135deg,#FF6B6B,#ee5a24)"
                          : "rgba(255,255,255,0.03)",
                      border: "none",
                      borderRadius: 12,
                      padding: "15px",
                      color:
                        text.trim() && wc <= customAmount * 2
                          ? "#fff"
                          : "rgba(255,255,255,0.12)",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor:
                        text.trim() && wc <= customAmount * 2
                          ? "pointer"
                          : "default",
                      fontFamily: "'Nunito',sans-serif",
                    }}
                  >
                    Next — Where are you from?
                  </button>
                </div>
              )}
            </div>
          ) : tier.id === 0 ? (
            <div style={{ animation: "fadeUp .3s ease" }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Quicksand',sans-serif",
                  marginBottom: 14,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                Every morning, we'll send you a beautiful word
                <br />
                from someone, somewhere in the world.
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ ...inp, fontSize: 16, textAlign: "center" }}
              />
              <button
                onClick={submitFree}
                disabled={!email.trim()}
                style={{
                  width: "100%",
                  marginTop: 10,
                  background: email.trim()
                    ? "linear-gradient(135deg,#4ECDC4,#2ecc71)"
                    : "rgba(255,255,255,0.03)",
                  border: "none",
                  borderRadius: 12,
                  padding: "15px",
                  color: email.trim() ? "#fff" : "rgba(255,255,255,0.6)",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: email.trim() ? "pointer" : "default",
                  fontFamily: "'Quicksand',sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                Subscribe — it's free
              </button>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 8,
                  fontSize: 9,
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                No spam. Unsubscribe anytime. Just one kind word.
              </div>
            </div>
          ) : (
            <div>
              {/* Paid tiers — word input */}
              {tier.words === 1 ? (
                <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value.replace(/\s/g, "").slice(0, 14));
                    setErr("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && next()}
                  placeholder="Your word"
                  style={{
                    ...inp,
                    fontSize: 20,
                    fontWeight: 700,
                    textAlign: "center",
                    letterSpacing: 1.5,
                  }}
                />
              ) : (
                <textarea
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setErr("");
                  }}
                  placeholder={
                    tier.words === -1
                      ? "Write as much as you want..."
                      : `Write up to ${tier.words} words...`
                  }
                  rows={3}
                  style={{
                    ...inp,
                    fontSize: 15,
                    resize: "none",
                    lineHeight: 1.5,
                  }}
                />
              )}
              <div
                style={{
                  textAlign: "right",
                  marginTop: 4,
                  fontSize: 10,
                  color: over ? "#FF6B6B" : "rgba(255,255,255,0.8)",
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                {wc}/{tier.words}
              </div>
              {err && (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 4,
                    fontSize: 12,
                    color: "#FF6B6B",
                    fontFamily: "'Quicksand',sans-serif",
                  }}
                >
                  {err}
                </div>
              )}
              <button
                onClick={next}
                disabled={!text.trim() || over}
                style={{
                  width: "100%",
                  marginTop: 8,
                  background:
                    text.trim() && !over
                      ? "linear-gradient(135deg,#FF6B6B,#ee5a24)"
                      : "rgba(255,255,255,0.03)",
                  border: "none",
                  borderRadius: 12,
                  padding: "15px",
                  color:
                    text.trim() && !over ? "#fff" : "rgba(255,255,255,0.6)",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: text.trim() && !over ? "pointer" : "default",
                  fontFamily: "'Quicksand',sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                Next — Where are you from?
              </button>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div style={{ animation: "fadeUp .3s ease" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'DM Mono',monospace",
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 8,
              }}
            >
              Preview — check for typos!
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              {text
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .map((word, wi) => {
                  const h = (wi * 137.508) % 360;
                  return (
                    <div
                      key={wi}
                      style={{
                        background: `hsl(${h},50%,28%)`,
                        borderRadius: 4,
                        padding: "8px 12px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: `hsl(${(h + 40) % 360},80%,82%)`,
                        fontFamily: "'Nunito',sans-serif",
                        textTransform: "uppercase",
                        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                      }}
                    >
                      {word}
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#FFE66D",
                fontFamily: "'Quicksand',sans-serif",
              }}
            >
              "{text.trim()}"
            </div>
            <button
              onClick={() => setStep(1)}
              style={{
                marginTop: 8,
                background: "none",
                border: "none",
                color: "#FF6B6B",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'Quicksand',sans-serif",
                textDecoration: "underline",
              }}
            >
              Edit my words
            </button>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:8,color:"rgba(255,255,255,0.35)",fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:2,marginBottom:3,display:"block"}}>Your Name (optional)</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value.slice(0,40))} placeholder="How should we call you?" style={inp}/>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 8,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'DM Mono',monospace",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 3,
                  display: "block",
                }}
              >
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value.slice(0, 30))}
                placeholder="Tokyo"
                style={inp}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 8,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'DM Mono',monospace",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 3,
                  display: "block",
                }}
              >
                Country
              </label>
              <select
                value={co}
                onChange={(e) => setCo(e.target.value)}
                style={{ ...inp, appearance: "none", cursor: "pointer" }}
              >
                <option value="" style={{ background: "#15151f" }}>
                  Select country
                </option>
                {[
                  "Afghanistan",
                  "Albania",
                  "Algeria",
                  "Argentina",
                  "Armenia",
                  "Australia",
                  "Austria",
                  "Azerbaijan",
                  "Bahamas",
                  "Bangladesh",
                  "Belarus",
                  "Belgium",
                  "Belize",
                  "Bolivia",
                  "Bosnia",
                  "Brazil",
                  "Bulgaria",
                  "Cambodia",
                  "Cameroon",
                  "Canada",
                  "Chile",
                  "China",
                  "Colombia",
                  "Congo",
                  "Costa Rica",
                  "Croatia",
                  "Cuba",
                  "Cyprus",
                  "Czech Republic",
                  "Denmark",
                  "Dominican Republic",
                  "Ecuador",
                  "Egypt",
                  "El Salvador",
                  "Estonia",
                  "Ethiopia",
                  "Fiji",
                  "Finland",
                  "France",
                  "Georgia",
                  "Germany",
                  "Ghana",
                  "Greece",
                  "Guatemala",
                  "Haiti",
                  "Honduras",
                  "Hungary",
                  "Iceland",
                  "India",
                  "Indonesia",
                  "Iran",
                  "Iraq",
                  "Ireland",
                  "Israel",
                  "Italy",
                  "Jamaica",
                  "Japan",
                  "Jordan",
                  "Kazakhstan",
                  "Kenya",
                  "Kuwait",
                  "Laos",
                  "Latvia",
                  "Lebanon",
                  "Libya",
                  "Lithuania",
                  "Luxembourg",
                  "Madagascar",
                  "Malaysia",
                  "Mali",
                  "Malta",
                  "Mexico",
                  "Moldova",
                  "Mongolia",
                  "Morocco",
                  "Mozambique",
                  "Myanmar",
                  "Nepal",
                  "Netherlands",
                  "New Zealand",
                  "Nicaragua",
                  "Nigeria",
                  "North Korea",
                  "Norway",
                  "Oman",
                  "Pakistan",
                  "Palestine",
                  "Panama",
                  "Paraguay",
                  "Peru",
                  "Philippines",
                  "Poland",
                  "Portugal",
                  "Qatar",
                  "Romania",
                  "Russia",
                  "Rwanda",
                  "Saudi Arabia",
                  "Senegal",
                  "Serbia",
                  "Singapore",
                  "Slovakia",
                  "Slovenia",
                  "Somalia",
                  "South Africa",
                  "South Korea",
                  "Spain",
                  "Sri Lanka",
                  "Sudan",
                  "Sweden",
                  "Switzerland",
                  "Syria",
                  "Taiwan",
                  "Tanzania",
                  "Thailand",
                  "Trinidad",
                  "Tunisia",
                  "Turkey",
                  "Uganda",
                  "Ukraine",
                  "United Arab Emirates",
                  "United Kingdom",
                  "United States",
                  "Uruguay",
                  "Uzbekistan",
                  "Venezuela",
                  "Vietnam",
                  "Yemen",
                  "Zambia",
                  "Zimbabwe",
                  "Heaven",
                ].map((c) => (
                  <option key={c} value={c} style={{ background: "#15151f" }}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'DM Mono',monospace",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 3,
                display: "block",
              }}
            >
              Email (optional — get a word daily)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inp}
            />
          </div>
          {email && (
            <div
              onClick={() => setDaily(!daily)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                marginBottom: 14,
                padding: "4px 0",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  flexShrink: 0,
                  border: `2px solid ${daily ? "#4ECDC4" : "rgba(255,255,255,0.12)"}`,
                  background: daily ? "#4ECDC4" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all .2s",
                }}
              >
                {daily && (
                  <span
                    style={{ color: "#0e1117", fontSize: 11, fontWeight: 700 }}
                  >
                    ✓
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "'Quicksand',sans-serif",
                }}
              >
                Send me a word from the wall every morning
              </span>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
            <button
              onClick={() => {
                setStep(1);
                setPaying(false);
              }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "13px 16px",
                color: "rgba(255,255,255,0.65)",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Nunito',sans-serif",
              }}
            >
              ←
            </button>
            <div style={{ flex: 1, minHeight: 45 }}>
              {paying && (
                <div style={{ textAlign: "center", padding: "14px", color: "#4ECDC4", fontSize: 14, fontFamily: "'Quicksand',sans-serif", animation: "pulse 1.5s infinite" }}>
                  Processing payment...
                </div>
              )}
              {!paying && city.trim() && co && paypalLoaded && (
                <div ref={paypalBtnRef}></div>
              )}
              {!paying && city.trim() && co && !paypalLoaded && (
                <div style={{ textAlign: "center", padding: "14px", color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "'Quicksand',sans-serif" }}>
                  Loading payment...
                </div>
              )}
              {!paying && (!city.trim() || !co) && (
                <div style={{ textAlign: "center", padding: "14px", color: "rgba(255,255,255,0.4)", fontSize: 13, fontFamily: "'Quicksand',sans-serif" }}>
                  Fill in your city and country to pay
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div
          style={{
            animation: "fadeUp .3s ease",
            textAlign: "center",
            padding: "12px 0",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>
            {tier.id === 0 ? "☀️" : "✨"}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#4ECDC4",
              fontFamily: "'Nunito',sans-serif",
              marginBottom: 4,
            }}
          >
            {tier.id === 0 ? "You're subscribed!" : "You're on the wall!"}
          </div>
          {tier.id !== 0 && myNumber && (
            <div
              style={{
                margin: "12px auto 16px",
                display: "inline-block",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "14px 28px",
              }}
            >
              <div
                style={{
                  fontSize: 8,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'DM Mono',monospace",
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  marginBottom: 4,
                }}
              >
                You are word number
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#FFE66D",
                  fontFamily: "'DM Mono',monospace",
                  lineHeight: 1,
                }}
              >
                #{myNumber.toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'DM Mono',monospace",
                  marginTop: 4,
                }}
              >
                thewall.world/tile/{myNumber}
              </div>
            </div>
          )}
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "'Quicksand',sans-serif",
              marginBottom: 20,
            }}
          >
            {tier.id === 0
              ? "A kind word will arrive in your inbox every morning."
              : "Your tile lives forever at thewall.world"}
          </div>
          <div
            style={{
              fontSize: 8,
              color: "rgba(255,255,255,0.8)",
              fontFamily: "'DM Mono',monospace",
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 10,
            }}
          >
            Share your tile
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            {[
              { n: "X", c: "#1DA1F2", ic: "𝕏" },
              { n: "Facebook", c: "#4267B2", ic: "f" },
              { n: "Instagram", c: "#E1306C", ic: "◎" },
              { n: "WhatsApp", c: "#25D366", ic: "✆" },
              { n: "Copy link", c: "#aaa", ic: "🔗" },
            ].map((p) => (
              <button
                key={p.n}
                onClick={() => onShare(p.n, last)}
                style={{
                  background: p.c,
                  border: "none",
                  borderRadius: "50%",
                  width: 46,
                  height: 46,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  padding: 0,
                  transition: "all 0.2s ease",
                  color: "#fff",
                  boxShadow: `0 4px 15px ${p.c}55`,
                }}
              >
                <span>{p.ic}</span>
              </button>
            ))}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'DM Mono',monospace",
              marginBottom: 14,
            }}
          >
            Thank you for being part of The World's Wall
          </div>
          <button
            onClick={reset}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "10px 22px",
              color: "rgba(255,255,255,0.7)",
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "'Quicksand',sans-serif",
            }}
          >
            Place another word
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function TheWall() {
  const [tiles, setTiles] = useState(TILES);
  const [sel, setSel] = useState(null);
  const [selI, setSelI] = useState(null);
  const [hov, setHov] = useState(null);
  const [view, setView] = useState("wall");
  const [cc, setCc] = useState(0);
  const [bravos, setBravos] = useState(0);
  const [bravoPop, setBravoPop] = useState(false);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const BASE_COUNT = 0; // wall launched with this many words
  const totalWords = BASE_COUNT + tiles.length;

  useEffect(() => {
    setCc(new Set(tiles.map((t) => t.co)).size);
  }, [tiles]);
   useEffect(function() {
    fetch('/api/tile?bravos=true').then(function(r){return r.json();}).then(function(d){ if(d.count) setBravos(d.count); });
  }, []);

  // Load tiles from database
  useEffect(() => {
    try {
      supabase
        .from("tiles")
        .select("*")
        .order("id")
        .then(function (result) {
          if (result.data && result.data.length > 0) {
            var dbTiles = result.data.map(function (t) {
              return {
                w: t.words,
                city: t.city,
                co: t.country,
                tier: t.tier,
                founder: t.founder,
                name: t.name,
                color: t.color,
              };
            });
            setTiles(dbTiles);
          }
        })
        .catch(function (e) {
          console.error("Failed to load tiles:", e);
        });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const add = ({ w, city, co, tier }) => {
    const h = Math.random() * 360;
    if (w.length === 1)
      setTiles((p) => [
        ...p,
        { w, city, co, tier, color: `hsl(${h},60%,33%)` },
      ]);
    else
      w.forEach((word, i) =>
        setTimeout(
          () =>
            setTiles((p) => [
              ...p,
              {
                w: [word],
                city,
                co,
                tier,
                color: `hsl(${(h + i * 15) % 360},60%,33%)`,
              },
            ]),
          i * 120,
        ),
      );
  };

  const share = (platform, data) => {
    const num = data?.num ? ` I'm word #${data.num.toLocaleString()}.` : "";
    const t = data?.w
      ? `I just placed "${data.w.join(" ")}" on The World's Wall from ${data.city}, ${data.co}.${num} Add yours →`
      : "Check out The World's Wall →";
    const u = "https://thewall.world";
    const enc = encodeURIComponent(`${t} ${u}`);
    const links = {
      X: `https://x.com/intent/tweet?text=${enc}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}&quote=${enc}`,
      WhatsApp: `https://wa.me/?text=${enc}`,
    };
    if (platform === "Copy link") {
      navigator.clipboard?.writeText(`${t} ${u}`);
      alert("Copied!");
      return;
    }
    if (platform === "Instagram") {
      navigator.clipboard?.writeText(`${t} ${u}`);
      alert("Copied! Paste on your Instagram story.");
      return;
    }
    if (links[platform])
      window.open(links[platform], "_blank", "width=600,height=400");
  };

  const same = sel
    ? tiles.filter((t) => t.w[0].toLowerCase() === sel.w[0].toLowerCase())
        .length
    : 0;
  const phrases = [
    "The wall is waking up",
    "Voices gathering",
    "The mosaic grows",
    "A chorus of words",
    "Something beautiful is forming",
    "The world is speaking",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e1117",
        color: "#fff",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;700;800&family=Quicksand:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          position: "fixed",
          top: "-25%",
          left: "-10%",
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(ellipse,rgba(255,107,107,0.035) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-20%",
          right: "-10%",
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse,rgba(78,205,196,0.025) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          padding: "36px 20px 10px",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(34px,5.5vw,56px)",
            fontWeight: 800,
            fontFamily: "'Nunito',sans-serif",
            margin: 0,
            lineHeight: 1.05,
            background:
              "linear-gradient(135deg,#FF6B6B 0%,#FFE66D 30%,#4ECDC4 60%,#DCD6F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          The World's Wall
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "'Quicksand',sans-serif",
            marginTop: 8,
            maxWidth: 500,
            margin: "8px auto 0",
            lineHeight: 1.55,
            fontWeight: 500,
          }}
        >
          An art project made by the world, for the world.
        </p>
      </header>

      {/* ── What is this? Explainer ── */}
      <div
        style={{
          maxWidth: 520,
          margin: "16px auto 8px",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "'Quicksand',sans-serif",
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            We're building a globe made of{" "}
            <strong>5 million words</strong> from from
            people all over the planet. You choose a word, a name, or a message
            — it becomes a tile on the globe forever. When we reach 5 million,
            the digital globe becomes a{" "}
            <strong style={{ color: "#FFE66D" }}>
              real physical sculpture
            </strong>{" "}
            donated to a museum.
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 12,
              color: "rgba(255,255,255,0.65)",
              fontFamily: "'Quicksand',sans-serif",
            }}
          >
            From{" "}
            <span style={{ color: "#4ECDC4", fontWeight: 700 }}>
              {cc} countries
            </span>{" "}
            and counting.
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "14px 0 4px" }}>
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "clamp(26px,4vw,38px)",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {totalWords.toLocaleString()}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'Quicksand',sans-serif",
            marginLeft: 8,
            fontWeight: 600,
          }}
        >
          words on the wall
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Quicksand',sans-serif",
          fontSize: 13,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.6)",
          marginBottom: 14,
        }}
      >
        {phrases[Math.floor(totalWords / 4) % phrases.length]}
      </div>

      {/* View Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          marginBottom: 14,
        }}
      >
        {[
          { id: "globe", l: "🌍 Globe" },
          { id: "wall", l: "▦ Wall" },
          { id: "search", l: "🔍 Find" },
        ].map((v) => (
          <button
            key={v.id}
            onClick={() => {
              setView(v.id);
              if (v.id === "search") setSearchActive(true);
              else setSearchActive(false);
            }}
            style={{
              background:
                view === v.id
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.015)",
              border: `1px solid ${view === v.id ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.04)"}`,
              borderRadius: 8,
              padding: "5px 15px",
              cursor: "pointer",
              color: view === v.id ? "#fff" : "rgba(255,255,255,0.6)",
              fontSize: 11,
              fontFamily: "'DM Mono',monospace",
              transition: "all .2s",
            }}
          >
            {v.l}
          </button>
        ))}
      </div>

      {view === "globe" && <Globe tiles={tiles} />}

      {view === "search" && (
        <div
          style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px 16px" }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Nunito',sans-serif",
              marginBottom: 12,
            }}
          >
            Find your word
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a word, name, or city..."
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "12px 16px",
              color: "#fff",
              fontSize: 15,
              fontFamily: "'DM Mono',monospace",
              outline: "none",
              width: "100%",
              textAlign: "center",
            }}
          />
          {search.trim().length > 0 &&
            (() => {
              const q = search.trim().toLowerCase();
              const results = tiles
                .map((t, i) => ({ t, i }))
                .filter(
                  ({ t }) =>
                    t.w.some((word) => word.toLowerCase().includes(q)) ||
                    t.city.toLowerCase().includes(q) ||
                    t.co.toLowerCase().includes(q) ||
                    (t.name && t.name.toLowerCase().includes(q)),
                );

              // Group by name for founder tiles to show full messages
              const grouped = {};
              const ungrouped = [];
              results.forEach(({ t, i }) => {
                if (t.name) {
                  if (!grouped[t.name])
                    grouped[t.name] = {
                      name: t.name,
                      tiles: [],
                      indices: [],
                      city: t.city,
                      co: t.co,
                      founder: t.founder,
                    };
                  grouped[t.name].tiles.push(t);
                  grouped[t.name].indices.push(i);
                } else {
                  ungrouped.push({ t, i });
                }
              });
              const groups = Object.values(grouped);

              return (
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "'DM Mono',monospace",
                      marginBottom: 12,
                    }}
                  >
                    {results.length} tile{results.length !== 1 ? "s" : ""} found
                  </div>

                  {/* Grouped messages (founder tiles with names) */}
                  {groups.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        marginBottom: 16,
                      }}
                    >
                      {groups.map((g, gi) => {
                        const fullMsg = g.tiles
                          .map((t) => t.w.join(" "))
                          .join(" ");
                        const firstIdx = g.indices[0];
                        return (
                          <div
                            key={gi}
                            onClick={() => {
                              setSel({ ...g.tiles[0], w: fullMsg.split(" ") });
                              setSelI(firstIdx);
                            }}
                            style={{
                              background: g.founder
                                ? "#1a0f0a"
                                : "rgba(255,255,255,0.03)",
                              border: g.founder
                                ? "1px solid rgba(255,160,80,0.2)"
                                : "1px solid rgba(255,255,255,0.08)",
                              borderRadius: 14,
                              padding: "18px 20px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 8,
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: g.founder
                                    ? "rgba(255,176,116,0.8)"
                                    : "rgba(255,255,255,0.75)",
                                  fontFamily: "'DM Mono',monospace",
                                  textTransform: "uppercase",
                                  letterSpacing: 2,
                                }}
                              >
                                {g.name}
                              </div>
                              <div
                                style={{
                                  fontSize: 8,
                                  color: "rgba(255,255,255,0.8)",
                                  fontFamily: "'DM Mono',monospace",
                                }}
                              >
                                {g.tiles.length} tile
                                {g.tiles.length !== 1 ? "s" : ""} · #
                                {firstIdx + 1}
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: g.founder
                                  ? "#FFB074"
                                  : "rgba(255,255,255,0.8)",
                                fontFamily: "'Nunito',sans-serif",
                                lineHeight: 1.4,
                                marginBottom: 8,
                              }}
                            >
                              "{fullMsg}"
                            </div>
                            <div
                              style={{
                                fontSize: 10,
                                color: "rgba(255,255,255,0.6)",
                                fontFamily: "'DM Mono',monospace",
                              }}
                            >
                              {g.city}, {g.co}
                            </div>
                            {/* Individual word tiles */}
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 4,
                                marginTop: 10,
                              }}
                            >
                              {g.tiles.map((t, ti) => {
                                const s = ts(g.indices[ti]);
                                return (
                                  <div
                                    key={ti}
                                    style={{
                                      background: g.founder
                                        ? "rgba(255,140,60,0.1)"
                                        : "rgba(255,255,255,0.05)",
                                      border:
                                        "1px solid rgba(255,255,255,0.06)",
                                      borderRadius: 6,
                                      padding: "4px 8px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: g.founder ? "#FFB074" : s.fg,
                                        fontFamily: "'DM Mono',monospace",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {t.w[0]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Individual tiles (non-grouped) */}
                  {ungrouped.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        justifyContent: "center",
                      }}
                    >
                      {ungrouped.slice(0, 60).map(({ t, i }) => {
                        const s = ts(i);
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              setSel(t);
                              setSelI(i);
                            }}
                            style={{
                              background: t.color || s.bg,
                              borderRadius: 10,
                              padding: "10px 14px",
                              cursor: "pointer",
                              textAlign: "center",
                              minWidth: 80,
                              border: "1px solid rgba(255,255,255,0.08)",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: s.fg,
                                fontFamily: s.f,
                                textTransform: "uppercase",
                                textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                              }}
                            >
                              {t.w.join(" ")}
                            </div>
                            <div
                              style={{
                                fontSize: 8,
                                color: "rgba(255,255,255,0.75)",
                                fontFamily: "'DM Mono',monospace",
                                marginTop: 3,
                              }}
                            >
                              {t.city}, {t.co}
                            </div>
                            <div
                              style={{
                                fontSize: 7,
                                color: "rgba(255,255,255,0.6)",
                                fontFamily: "'DM Mono',monospace",
                                marginTop: 2,
                              }}
                            >
                              tile #{i + 1}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {results.length === 0 && (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.75)",
                          fontFamily: "'Quicksand',serif",
                          fontStyle: "italic",
                        }}
                      >
                        No tiles found for "{search}"
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.8)",
                          fontFamily: "'DM Mono',monospace",
                          marginTop: 6,
                        }}
                      >
                        Be the first to place it on the wall!
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          {search.trim().length === 0 && (
            <div
              style={{
                textAlign: "center",
                marginTop: 20,
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
                fontFamily: "'Quicksand',sans-serif",
                fontStyle: "italic",
              }}
            >
              Search by word, name, city, or country
            </div>
          )}
        </div>
      )}

      {view === "wall" && (
        <div style={{ padding: "0 8px 8px", maxWidth: 960, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {tiles.map((t, i) => (
              <Tile
                key={i}
                d={t}
                i={i}
                hov={hov === i}
                onH={setHov}
                onL={() => setHov(null)}
                onClick={(d, idx) => {
                  setSel(d);
                  setSelI(idx);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bravo Button */}
      <div style={{ textAlign: "center", padding: "24px 0 8px" }}>
        <button
          onClick={() => {
            setBravos((b) => b + 1);
             fetch('/api/tile', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({is_bravo:true})});
            setBravoPop(true);
            setTimeout(() => setBravoPop(false), 600);
          }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 40,
            padding: "12px 28px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            transition: "all 0.2s ease",
            transform: bravoPop ? "scale(1.1)" : "scale(1)",
          }}
        >
          <span
            style={{
              fontSize: 22,
              transition: "transform 0.3s ease",
              transform: bravoPop ? "scale(1.3) rotate(-10deg)" : "scale(1)",
            }}
          >
            👏
          </span>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: bravoPop ? "#FFE66D" : "rgba(255,255,255,0.7)",
                fontFamily: "'DM Mono',monospace",
                transition: "color 0.3s ease",
              }}
            >
              {bravos.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'DM Mono',monospace",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Bravo
            </div>
          </div>
        </button>
      </div>

      <div style={{ textAlign: "center", padding: "8px 0 8px" }}>
        <a
          href="#place"
          style={{
            color: "rgba(255,255,255,0.8)",
            textDecoration: "none",
            fontSize: 11,
            fontFamily: "'DM Mono',monospace",
          }}
        >
          ↓ place your words ↓
        </a>
      </div>

      <InputPanel onAdd={add} onShare={share} totalWords={totalWords} />

      {sel && (
        <TileModal
          d={sel}
          i={selI}
          same={same}
          onShare={(p, txt, c, co) => share(p, { w: [txt], city: c, co })}
          onClose={() => {
            setSel(null);
            setSelI(null);
          }}
        />
      )}

      <footer style={{ textAlign: "center", padding: "0 20px 24px" }}>
        {/* ── Three Promises ── */}
        <div
          style={{
            maxWidth: 500,
            margin: "0 auto 24px",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#FF2D78",
            fontFamily: "'Nunito',sans-serif",
            paddingTop: 24,
            textShadow: "0 0 20px rgba(255,45,120,0.3)",
          }}
        >
          Cool news for you
        </div>

        {/* 1. Forever Promise */}
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto 16px",
            padding: "24px 24px 22px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 14,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 8 }}>∞</div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Nunito',sans-serif",
              marginBottom: 8,
            }}
          >
            Your words live forever
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Quicksand',sans-serif",
              lineHeight: 1.6,
              fontStyle: "italic",
              maxWidth: 380,
              margin: "0 auto",
            }}
          >
            The World's Wall will stay online forever. Your message, your name,
            your love letter — it will never be taken down. This is a permanent
            record of human connection, preserved for generations to come.
          </div>
        </div>

        {/* 2. Sculpture Promise */}
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto 16px",
            padding: "24px 24px 22px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 14,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 8 }}>🏛</div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Nunito',sans-serif",
              marginBottom: 8,
            }}
          >
            From digital to physical
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Quicksand',sans-serif",
              lineHeight: 1.6,
              fontStyle: "italic",
              maxWidth: 380,
              margin: "0 auto",
            }}
          >
            When the wall is complete, we will commission a physical sculpture
            of The World's Wall — every word, every name, every message — cast
            into a real, tangible work of art. The sculpture will be donated to
            a museum, where it will live as a permanent monument to what
            millions of strangers built together.
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 10,
              color: "rgba(255,255,255,0.8)",
              fontFamily: "'DM Mono',monospace",
            }}
          >
            Your word. In a museum. Forever.
          </div>
        </div>

        {/* 3. Animals Promise */}
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto 28px",
            padding: "24px 24px 22px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 14,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 8 }}>🐾</div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Nunito',sans-serif",
              marginBottom: 8,
            }}
          >
            Part of every tile helps animals in need
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Quicksand',sans-serif",
              lineHeight: 1.6,
              fontStyle: "italic",
              maxWidth: 380,
              margin: "0 auto",
            }}
          >
            A portion of all proceeds from The World's Wall is donated to animal
            shelters and rescue organizations around the world. Every word you
            place helps give an animal a second chance.
          </div>
          <div
            style={{
              marginTop: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: "6px 14px",
            }}
          >
            <span style={{ fontSize: 11 }}>🐕</span>
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Mono',monospace",
              }}
            >
              Words placed · Animals helped
            </span>
            <span style={{ fontSize: 11 }}>🐈</span>
          </div>
        </div>

        <div
          style={{
            width: 40,
            height: 1,
            background: "rgba(255,255,255,0.04)",
            margin: "0 auto 20px",
          }}
        />
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'DM Mono',monospace",
          }}
        >
          thewall.world — a global experiment
        </div>
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'DM Mono',monospace",
            marginTop: 4,
          }}
        >
          made with love from Colombia 🇨🇴
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.75)}
        *{box-sizing:border-box}body{margin:0;background:#0e1117}html{scroll-behavior:smooth}
      `}</style>
    </div>
  );
}
