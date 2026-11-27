import { useEffect, useRef, useState } from 'react'
import DanceCard from './DanceCard.jsx'

const SONG = '/song.mp3'
const PHOTOS = ['/us-1.jpg', '/us-2.jpg', '/us-3.jpg', '/us-4.jpg', '/us-6.jpg', '/us-7.jpg', '/us-8.jpg']
const WORDS = ['♥', '♥', '♥', 'my king', 'I love you', 'forever']

const css = `
.bl{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(#2a1018,#6b3a24 60%,#2a160e);color:#f1d98a;animation:fadeIn 1s ease both}
.bl-wins{position:absolute;top:22%;left:0;right:0;display:flex;justify-content:space-between;padding:0 4%}
.bl-win{width:52px;height:130px;border-radius:30px 30px 0 0;border:3px solid #d4a93a;background:linear-gradient(#ffe6bd,#f6c98a);box-shadow:0 0 30px rgba(255,210,140,.6)}
.bl-chand{position:absolute;top:0;left:50%;margin-left:-110px;width:220px;transform-origin:top center;animation:blSwing 6s ease-in-out infinite;filter:drop-shadow(0 0 18px rgba(255,220,140,.8))}
.bl-floor{position:absolute;left:-50%;right:-50%;bottom:0;height:44%;transform:perspective(500px) rotateX(60deg);transform-origin:bottom;background:conic-gradient(#3a2418 25%,#eedfc2 0 50%,#3a2418 0 75%,#eedfc2 0) 0 0/90px 90px}
.bl-dim{position:absolute;inset:0;background:rgba(20,5,10,.72);opacity:0;transition:opacity 1.6s;pointer-events:none;z-index:1}
.last .bl-dim{opacity:1}
.bl-frame{position:absolute;top:140px;left:50%;width:min(44vw,180px);aspect-ratio:3/4;transform:translateX(-50%);border:6px solid #d4a93a;outline:2px solid #8a6410;background:#1a0a0e;overflow:hidden;box-shadow:0 0 30px rgba(255,210,140,.5),0 10px 30px rgba(0,0,0,.6);z-index:2}
.bl-frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.4s}
.bl-frame img.on{opacity:1}
.bl-spot{position:absolute;left:50%;bottom:190px;width:260px;height:90px;margin-left:-130px;border-radius:50%;background:radial-gradient(rgba(255,226,160,.6),transparent 70%);animation:blPulse 2.4s ease-in-out infinite;z-index:2}
.last .bl-spot{background:radial-gradient(rgba(255,226,160,.95),transparent 70%)}
.bl-dance{position:absolute;left:50%;bottom:200px;width:110px;margin-left:-55px;transform-origin:50% 100%;animation:blSway 4s ease-in-out infinite;z-index:2}
.bl-tap{position:absolute;inset:0;z-index:3}
.bl-heart{position:fixed;z-index:3;color:#ff7a9a;font-size:1.6rem;pointer-events:none;white-space:nowrap;animation:blUp 2.6s ease-out forwards}
.bl .overlay{z-index:4}
.bl-row{display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center}
.bl-small{padding:.65rem .8rem;font-size:.72rem;letter-spacing:.1em}
.bl-leave{background:none;border:none;color:#f1d98a;opacity:.8;text-decoration:underline;font-family:'Cormorant Garamond',serif;font-size:1.05rem}
@keyframes blSwing{50%{transform:rotate(2.5deg)}0%,100%{transform:rotate(-2.5deg)}}
@keyframes blPulse{50%{opacity:.6}}
@keyframes blSway{0%,100%{transform:rotate(-3deg) translateY(0)}50%{transform:rotate(3deg) translateY(-4px)}}
@keyframes blUp{from{opacity:1;transform:translate(-50%,0) scale(.6)}to{opacity:0;transform:translate(-50%,-160px) scale(1.4)}}
`

export default function Ballroom({ onDone }) {
  const audio = useRef()
  const [on, setOn] = useState(false)
  const [note, setNote] = useState('')
  const [hearts, setHearts] = useState([])
  const [slide, setSlide] = useState(0)
  const [card, setCard] = useState(false)
  const [last, setLast] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % PHOTOS.length), 3500)
    const a = audio.current
    return () => {
      clearInterval(t)
      if (a) a.pause()
    }
  }, [])

  const play = () => {
    audio.current
      .play()
      .then(() => {
        setOn(true)
        setNote('')
      })
      .catch(() => setNote('Add your song file to hear music.'))
  }

  const toggle = () => {
    if (on) {
      audio.current.pause()
      setOn(false)
    } else play()
  }

  const lastDance = () => {
    setLast(true)
    if (!on) play()
  }

  const burst = (e) => {
    const id = Date.now() + Math.random()
    const w = WORDS[Math.floor(Math.random() * WORDS.length)]
    setHearts((h) => [...h, { id, w, x: e.clientX, y: e.clientY }])
    setTimeout(() => setHearts((h) => h.filter((k) => k.id !== id)), 2700)
  }

  return (
    <div className={`bl ${last ? 'last' : ''}`}>
      <style>{css}</style>
      <audio ref={audio} src={SONG} loop />
      <div className="bl-wins">
        <div className="bl-win" />
        <div className="bl-win" />
      </div>
      <svg className="bl-chand" viewBox="0 0 220 150">
        <line x1="110" y1="0" x2="110" y2="34" stroke="#d4a93a" strokeWidth="3" />
        <path d="M20 80 Q110 20 200 80" fill="none" stroke="#d4a93a" strokeWidth="4" />
        <ellipse cx="110" cy="84" rx="92" ry="9" fill="rgba(212,169,58,.25)" stroke="#d4a93a" strokeWidth="4" />
        {[28, 60, 110, 160, 192].map((x) => <circle key={x} cx={x} cy="72" r="6" fill="#fff3c4" />)}
        {[40, 75, 110, 145, 180].map((x) => <path key={x} d={`M${x} 94 l-5 14 l5 22 l5 -22 z`} fill="#fff6dc" />)}
      </svg>
      <div className="bl-floor" />
      <div className="bl-dim" />
      <div className="bl-frame">
        {PHOTOS.map((p, i) => <img key={p} src={p} alt="" className={i === slide ? 'on' : ''} />)}
      </div>
      <div className="bl-spot" />
      <svg className="bl-dance" viewBox="0 0 120 140">
        <g stroke="#d4a93a" strokeWidth="1.2">
          <circle cx="42" cy="22" r="9" fill="#120a0e" />
          <path d="M30 34 h24 l5 52 h-34 z" fill="#120a0e" />
          <path d="M34 86 h8 v44 h-8 z M46 86 h8 v44 h-8 z" fill="#120a0e" />
          <circle cx="80" cy="26" r="8" fill="#8a1a36" />
          <path d="M72 36 h10 l26 96 h-62 z" fill="#8a1a36" />
        </g>
      </svg>
      <div className="bl-tap" onClick={burst} />
      {hearts.map((h) => (
        <span key={h.id} className="bl-heart" style={{ left: h.x, top: h.y }}>{h.w}</span>
      ))}
      <div className="overlay">
        <p className="kicker">THE ROYAL BALLROOM</p>
        <p className="hint">{note || (last ? 'May I have this dance, my king?' : 'Tap anywhere to send me a heart.')}</p>
        <div className="bl-row">
          <button className="gold-btn bl-small" onClick={toggle}>{on ? 'PAUSE SONG' : 'PLAY SONG'}</button>
          <button className="gold-btn bl-small" onClick={() => setCard(true)}>DANCE CARD</button>
          <button className="gold-btn bl-small" onClick={lastDance}>LAST DANCE</button>
        </div>
        <button className="bl-leave" onClick={onDone}>Leave the ballroom</button>
      </div>
      {card && <DanceCard onClose={() => setCard(false)} />}
    </div>
  )
}
