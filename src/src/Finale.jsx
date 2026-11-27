import { FINALE } from './content.js'

const petals = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 0.7) % 8,
  dur: 6 + (i % 5),
  size: 10 + (i % 4) * 4,
}))

const css = `
.fn{position:relative;min-height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.9rem;padding:1.5rem;text-align:center;background:radial-gradient(ellipse at 50% 30%,#8a1a36,#240610 75%);color:#f1d98a;animation:fadeIn 1.4s ease both}
.fn>*:not(.fn-petal){position:relative;z-index:2}
.fn-petal{position:absolute;top:-30px;background:#f58aa6;border-radius:150% 0 150% 0;opacity:.85;animation:fnFall linear infinite;z-index:1}
.fn-petal:nth-child(3n){background:#d62b4b}
.fn-petal:nth-child(4n){background:#ffd6e0}
.fn-frame{width:min(54vw,220px);aspect-ratio:3/4;border:6px solid #d4a93a;outline:2px solid #8a6410;box-shadow:0 0 40px rgba(255,210,140,.5);overflow:hidden}
.fn-frame img{width:100%;height:100%;object-fit:cover;display:block}
.fn-date{font-family:'Cinzel',serif;letter-spacing:.2em;font-size:.8rem;color:#fff1b8}
@keyframes fnFall{0%{transform:translate(0,-30px) rotate(0)}50%{transform:translate(30px,55vh) rotate(180deg)}100%{transform:translate(-20px,112vh) rotate(360deg)}}
`

export default function Finale({ onRestart }) {
  return (
    <div className="fn">
      <style>{css}</style>
      {petals.map((p, i) => (
        <span key={i} className="fn-petal" style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }} />
      ))}
      <p className="kicker">THE ROYAL FINALE</p>
      <div className="fn-frame"><img src="/us-1.jpg" alt="" /></div>
      <h1 className="title">THE GREAT KRISH KHUNTIA</h1>
      <p className="fn-date">FOUR MONTHS · 28 NOVEMBER 2026</p>
      <p className="hint">{FINALE}</p>
      <button className="gold-btn" onClick={onRestart}>WALK THE KINGDOM AGAIN</button>
    </div>
  )
        }
