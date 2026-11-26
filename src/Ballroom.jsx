import { useEffect, useRef, useState } from 'react'

const SONG = '/music/song.mp3' // optional: add your song here later

const css = `
.bl{position:relative;min-height:100vh;overflow:hidden;background:linear-gradient(#2a1018,#6b3a24 60%,#2a160e);color:#f1d98a;animation:fadeIn 1s ease both}
.bl-tap{position:absolute;inset:0;z-index:1}
.bl-wins{position:absolute;top:20%;left:0;right:0;display:flex;justify-content:space-around;padding:0 6%}
.bl-win{width:68px;height:150px;border-radius:40px 40px 0 0;border:3px solid #d4a93a;background:linear-gradient(#ffe6bd,#f6c98a);box-shadow:0 0 30px rgba(255,210,140,.6)}
.bl-chand{position:absolute;top:0;left:50%;margin-left:-110px;width:220px;transform-origin:top center;animation:blSwing 6s ease-in-out infinite;filter:drop-shadow(0 0 18px rgba(255,220,140,.8))}
.bl-floor{position:absolute;left:-50%;right:-50%;bottom:0;height:44%;transform:perspective(500px) rotateX(60deg);transform-origin:bottom;background:conic-gradient(#3a2418 25%,#eedfc2 0 50%,#3a2418 0 75%,#eedfc2 0) 0 0/90px 90px}
.bl-spot{position:absolute;left:50%;bottom:8%;width:320px;height:120px;margin-left:-160px;border-radius:50%;background:radial-gradient(rgba(255,226,160,.7),transparent 70%);animation:blPulse 2.4s ease-in-out infinite}
.bl .overlay{z-index:3}
.bl-heart{position:fixed;z-index:2;color:#ff7a9a;font-size:1.8rem;pointer-events:none;animation:blUp 2.6s ease-out forwards}
@keyframes blSwing{50%{transform:rotate(2.5deg)}0%,100%{transform:rotate(-2.5deg)}}
@keyframes blPulse{50%{opacity:.55}}
@keyframes blUp{from{opacity:1;transform:translate(-50%,0) scale(.6)}to{opacity:0;transform:translate(-50%,-160px) scale(1.4)}}
`

export default function Ballroom({ onDone }) {
  const audio = useRef()
    const [on, setOn] = useState(false)
      const [hearts, setHearts] = useState([])

        useEffect(() => () => audio.current && audio.current.pause(), [])

          const toggle = () => {
              const a = audio.current
                  if (on) {
                        a.pause()
                              setOn(false)
                                  } else {
                                        a.play().catch(() => {})
                                              setOn(true)
                                                  }
                                                    }

                                                      const burst = (e) => {
                                                          const id = Date.now() + Math.random()
                                                              setHearts((h) => [...h, { id, x: e.clientX, y: e.clientY }])
                                                                  setTimeout(() => setHearts((h) => h.filter((k) => k.id !== id)), 2700)
                                                                    }

                                                                      return (
                                                                          <div className="bl">
                                                                                <style>{css}</style>
                                                                                      <audio ref={audio} src={SONG} loop />
                                                                                            <div className="bl-wins">
                                                                                                    <div className="bl-win" />
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
                                                                                                                                                                                          <div className="bl-spot" />
                                                                                                                                                                                                <div className="bl-tap" onClick={burst} />
                                                                                                                                                                                                      {hearts.map((h) => (
                                                                                                                                                                                                              <span key={h.id} className="bl-heart" style={{ left: h.x, top: h.y }}>♥</span>
                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                          <div className="overlay">
                                                                                                                                                                                                                                  <p className="kicker">THE ROYAL BALLROOM</p>
                                                                                                                                                                                                                                          <p className="hint">One dance, my king. Tap anywhere to send me a heart.</p>
                                                                                                                                                                                                                                                  <button className="gold-btn" onClick={toggle}>{on ? 'PAUSE OUR SONG' : 'PLAY OUR SONG'}</button>
                                                                                                                                                                                                                                                          <button className="gold-btn" onClick={onDone} style={{ opacity: 0.8 }}>LEAVE THE BALLROOM</button>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                      )
                                                                                                                                                                                                                                                                      }