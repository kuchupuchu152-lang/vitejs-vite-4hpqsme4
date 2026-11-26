import { useState } from 'react'
import { MEMORIES } from './memories.js'

const css = `
.ar{min-height:100vh;background:radial-gradient(ellipse at 50% 0%,#6b1f33,#1d0a10 75%);color:#f1d98a;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8rem;padding:1.2rem 0;animation:fadeIn 1s ease both}
.ar-row{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;width:100%;padding:1rem 12vw}
.ar-card{flex:0 0 76vw;max-width:320px;aspect-ratio:3/4;scroll-snap-align:center;perspective:900px}
.ar-in{position:relative;width:100%;height:100%;transition:transform .8s;transform-style:preserve-3d}
.ar-in.flip{transform:rotateY(180deg)}
.ar-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:2px solid #d4a93a;background:#f6ead4;color:#4a1020;padding:.7rem;display:flex;flex-direction:column;gap:.5rem;box-shadow:0 12px 30px rgba(0,0,0,.5)}
.ar-back{transform:rotateY(180deg);background:#fdf1ef;justify-content:center;text-align:center;font-style:italic;font-size:1.15rem}
.ar-front img,.ar-empty{flex:1;min-height:0;width:100%;object-fit:cover;background:#e6d5b8}
.ar-empty{display:flex;align-items:center;justify-content:center;font-style:italic}
.ar-cap{font-family:'Cinzel',serif;font-size:.8rem;letter-spacing:.1em;color:#8a1a36;text-align:center}
`

function Card({ m }) {
  const [flip, setFlip] = useState(false)
    return (
        <div className="ar-card" onClick={() => setFlip(!flip)}>
              <div className={`ar-in ${flip ? 'flip' : ''}`}>
                      <div className="ar-face ar-front">
                                {m.photo ? <img src={m.photo} alt="" /> : <div className="ar-empty">Your photo here</div>}
                                          <p className="ar-cap">{m.title}</p>
                                                  </div>
                                                          <div className="ar-face ar-back">
                                                                    <p className="ar-cap">{m.title}</p>
                                                                              <p>{m.text}</p>
                                                                                      </div>
                                                                                            </div>
                                                                                                </div>
                                                                                                  )
                                                                                                  }

                                                                                                  export default function Archives({ onDone }) {
                                                                                                    return (
                                                                                                        <div className="ar">
                                                                                                              <style>{css}</style>
                                                                                                                    <p className="kicker">THE ROYAL ARCHIVES</p>
                                                                                                                          <p className="hint">Swipe through our memories. Tap a card to turn it.</p>
                                                                                                                                <div className="ar-row">
                                                                                                                                        {MEMORIES.map((m, i) => <Card key={i} m={m} />)}
                                                                                                                                              </div>
                                                                                                                                                    <button className="gold-btn" onClick={onDone}>LEAVE THE ARCHIVES</button>
                                                                                                                                                        </div>
                                                                                                                                                          )
                                                                                                                                                          }