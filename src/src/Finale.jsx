import { useMemo, useState } from 'react'

const COLORS = ['#f1d98a', '#d4a93a', '#ff7a9a', '#d62b4b', '#ffd6e0', '#ffffff']
const WORDS = ['♥', '♥', '♥', 'my munchkin', 'I love you']

const css = `
.fn{position:relative;min-height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.7rem;padding:1.5rem;text-align:center;background:radial-gradient(ellipse at 50% 38%,#8a1a36,#240610 75%);animation:fnIn 1.2s ease both}
.fn-msg{position:relative;z-index:5;pointer-events:none}
.fn-big{font-family:'Cinzel',serif;font-size:clamp(2.4rem,13vw,4.4rem);letter-spacing:.08em;background:linear-gradient(90deg,#8a6d12,#f1d98a,#c9a227,#f1d98a,#8a6d12);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:fnShine 5s linear infinite,fnPop 1.2s cubic-bezier(.2,1.4,.4,1) both}
.fn-sub{font-size:clamp(1.7rem,8.5vw,2.6rem);font-style:italic;color:#ffe3ea;text-shadow:0 0 24px rgba(255,150,180,.8);animation:fnPop 1.2s .5s cubic-bezier(.2,1.4,.4,1) both}
.fn-c{position:absolute;top:-20px;width:9px;height:14px;z-index:2;animation:fnFall linear infinite}
.fn-h{position:absolute;bottom:-50px;z-index:2;animation:fnRise linear infinite}
.fn-fw{position:absolute;z-index:3;width:0;height:0}
.fn-s{position:absolute;left:0;top:0;width:6px;height:6px;border-radius:50%;opacity:0;animation:fnBurst 4.5s ease-out infinite}
.fn-tap{position:absolute;inset:0;z-index:4}
.fn-th{position:fixed;z-index:6;color:#ff9bb5;font-size:1.7rem;pointer-events:none;white-space:nowrap;animation:fnTap 2.2s ease-out forwards}
@keyframes fnIn{from{opacity:0}to{opacity:1}}
@keyframes fnShine{to{background-position:200% center}}
@keyframes fnPop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
@keyframes fnFall{0%{transform:translate3d(0,-20px,0) rotate(0)}100%{transform:translate3d(var(--dx),112vh,0) rotate(720deg)}}
@keyframes fnRise{0%{transform:translate(0,0) scale(.6);opacity:0}15%{opacity:1}100%{transform:translate(var(--dx),-112vh) scale(1.2);opacity:0}}
@keyframes fnBurst{0%{transform:translate(0,0) scale(1);opacity:1}30%{opacity:1}45%{transform:translate(var(--x),var(--y)) scale(.5);opacity:0}100%{transform:translate(var(--x),var(--y)) scale(.5);opacity:0}}
@keyframes fnTap{from{opacity:1;transform:translate(-50%,0) scale(.6)}to{opacity:0;transform:translate(-50%,-150px) scale(1.4)}}
`

export default function Finale() {
  const [taps, setTaps] = useState([])

  const bits = useMemo(() => {
    const confetti = Array.from({ length: 56 }, () => ({
      left: Math.random() * 100,
      dx: (Math.random() - 0.5) * 120,
      delay: Math.random() * 6,
      dur: 5 + Math.random() * 5,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      r: Math.random() > 0.5 ? '50%' : '2px',
    }))
    const hearts = Array.from({ length: 16 }, () => ({
      left: Math.random() * 100,
      dx: (Math.random() - 0.5) * 80,
      delay: Math.random() * 7,
      dur: 6 + Math.random() * 5,
      size: 18 + Math.random() * 22,
      c: ['#ff7a9a', '#ff4d79', '#ffd6e0', '#f1d98a'][Math.floor(Math.random() * 4)],
    }))
    const centres = [{ x: 24, y: 26, d: 0.6 }, { x: 76, y: 20, d: 1.9 }, { x: 50, y: 66, d: 3.2 }]
    const sparks = centres.map((c) => ({
      ...c,
      p: Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2
        const d = 80 + (i % 3) * 22
        return { x: Math.cos(a) * d, y: Math.sin(a) * d, c: COLORS[i % COLORS.length] }
      }),
    }))
    return { confetti, hearts, sparks }
  }, [])

  const tap = (e) => {
    const id = Date.now() + Math.random()
    const w = WORDS[Math.floor(Math.random() * WORDS.length)]
    setTaps((t) => [...t, { id, w, x: e.clientX, y: e.clientY }])
    setTimeout(() => setTaps((t) => t.filter((k) => k.id !== id)), 2300)
  }

  return (
    <div className="fn">
      <style>{css}</style>
      {bits.confetti.map((c, i) => (
        <span
          key={`c${i}`}
          className="fn-c"
          style={{ left: `${c.left}%`, background: c.c, borderRadius: c.r, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s`, '--dx': `${c.dx}px` }}
        />
      ))}
      {bits.hearts.map((h, i) => (
        <span
          key={`h${i}`}
          className="fn-h"
          style={{ left: `${h.left}%`, color: h.c, fontSize: h.size, animationDelay: `${h.delay}s`, animationDuration: `${h.dur}s`, '--dx': `${h.dx}px` }}
        >
          ♥
        </span>
      ))}
      {bits.sparks.map((s, i) => (
        <div key={`s${i}`} className="fn-fw" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
          {s.p.map((p, j) => (
            <span key={j} className="fn-s" style={{ background: p.c, animationDelay: `${s.d}s`, '--x': `${p.x}px`, '--y': `${p.y}px` }} />
          ))}
        </div>
      ))}
      <div className="fn-msg">
        <p className="fn-big">I love you</p>
        <p className="fn-sub">my sweet lil' munchkin 😚❤️</p>
      </div>
      <div className="fn-tap" onClick={tap} />
      {taps.map((t) => (
        <span key={t.id} className="fn-th" style={{ left: t.x, top: t.y }}>{t.w}</span>
      ))}
    </div>
  )
      }
