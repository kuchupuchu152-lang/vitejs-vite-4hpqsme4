import { useState } from 'react'

const DANCES = [
  { name: 'The First Dance', line: 'For the beginning of us, and every day since.' },
  { name: 'The Second Dance', line: 'For the little moments that became my favourite ones.' },
  { name: 'The Third Dance', line: 'For every hard day we hold hands through.' },
  { name: 'The Last Dance', line: 'For forever, if you will have me.' },
]

const css = `
.dc-back{position:fixed;inset:0;z-index:10;display:flex;align-items:center;justify-content:center;background:rgba(20,5,10,.75);padding:1rem}
.dc{width:min(92vw,380px);display:flex;flex-direction:column;gap:.7rem;background:linear-gradient(#fbf3e4,#f1e0c4);color:#4a1020;border:1px solid #d4a93a;outline:1px solid rgba(212,169,58,.5);outline-offset:-8px;padding:1.4rem 1.2rem;box-shadow:0 20px 50px rgba(0,0,0,.6);animation:fadeIn .6s ease both}
.dc-title{font-family:'Cinzel',serif;letter-spacing:.16em;text-align:center;color:#8a1a36;font-size:.95rem}
.dc-row{display:flex;flex-direction:column;gap:.2rem;text-align:left;background:rgba(138,26,54,.06);border:1px solid rgba(138,26,54,.25);padding:.7rem .8rem;color:inherit;font-family:inherit}
.dc-name{font-family:'Cinzel',serif;font-size:.8rem;letter-spacing:.08em;color:#8a1a36}
.dc-line{font-style:italic;font-size:1.12rem}
.dc-row.on{background:rgba(212,169,58,.18)}
`

export default function DanceCard({ onClose }) {
  const [open, setOpen] = useState({})
  return (
    <div className="dc-back" onClick={onClose}>
      <style>{css}</style>
      <div className="dc" onClick={(e) => e.stopPropagation()}>
        <p className="dc-title">YOUR DANCE CARD</p>
        {DANCES.map((d, i) => (
          <button key={i} className={`dc-row ${open[i] ? 'on' : ''}`} onClick={() => setOpen({ ...open, [i]: true })}>
            <span className="dc-name">{i + 1}. {d.name}</span>
            <span className="dc-line">{open[i] ? d.line : 'Tap to reveal'}</span>
          </button>
        ))}
        <button className="gold-btn" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  )
}
