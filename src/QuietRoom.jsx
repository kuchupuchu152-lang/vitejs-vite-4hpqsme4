import { useState } from 'react'
import { SORRY, SORRY_SIGN } from './content.js'

const css = `
.qr{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:1.5rem;text-align:center;background:radial-gradient(ellipse at 50% 55%,#5b3a55 0%,#241528 70%);color:#f1d98a;animation:fadeIn 1.2s ease both;overflow:hidden}
.qr>*:not(.qr-halo){position:relative;z-index:1}
.qr-halo{position:absolute;left:50%;top:38%;width:460px;height:460px;margin:-230px 0 0 -230px;border-radius:50%;background:radial-gradient(rgba(255,200,120,.35),transparent 65%);animation:qrGlow 2.6s ease-in-out infinite;pointer-events:none}
.qr-candles{display:flex;align-items:flex-end;gap:1.6rem;margin-top:1.8rem}
.qr-candle{position:relative;width:14px;background:linear-gradient(90deg,#f3e8d2,#e0d0b0);border-radius:3px}
.qr-flame{position:absolute;left:50%;top:-24px;width:14px;height:24px;margin-left:-7px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(#fff6c8,#ffb84a 70%);transform-origin:bottom;animation:qrFlicker 1.4s ease-in-out infinite}
.qr-paper{width:min(92vw,390px);max-height:82vh;display:flex;flex-direction:column;background:linear-gradient(#fdf1ef,#f6e2df);color:#4a1020;border:1px solid #c98a8a;outline:1px solid rgba(201,138,138,.5);outline-offset:-8px;box-shadow:0 20px 50px rgba(0,0,0,.6);padding:1.6rem 1.3rem;animation:qrUnfold 1.4s cubic-bezier(.2,.8,.2,1) both}
.qr-title{font-family:'Cinzel',serif;letter-spacing:.14em;font-size:.9rem;color:#8a1a36;text-align:center;margin-bottom:.8rem}
.qr-body{flex:1;min-height:0;overflow-y:auto;font-size:1.15rem;line-height:1.55;font-style:italic;text-align:left;padding-right:.3rem}
.qr-body p{margin-bottom:.8rem}
.qr-sign{text-align:right;font-style:normal!important;font-family:'Cinzel',serif;font-size:.8rem;color:#8a1a36}
.qr-btn{margin:1rem auto 0;flex-shrink:0}
@keyframes qrFlicker{0%,100%{transform:scale(1,1) rotate(-2deg);opacity:1}50%{transform:scale(.9,1.12) rotate(2deg);opacity:.85}}
@keyframes qrGlow{50%{opacity:.65}}
@keyframes qrUnfold{from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:none}}
`

export default function QuietRoom({ onDone }) {
  const [open, setOpen] = useState(false)
    return (
        <div className="qr">
              <style>{css}</style>
                    <div className="qr-halo" />
                          {!open ? (
                                  <>
                                            <p className="kicker">THE QUIET ROOM</p>
                                                      <div className="qr-candles">
                                                                  {[70, 96, 80].map((h, i) => (
                                                                                <div key={i} className="qr-candle" style={{ height: h }}>
                                                                                                <div className="qr-flame" style={{ animationDelay: `${i * 0.4}s` }} />
                                                                                                              </div>
                                                                                                                          ))}
                                                                                                                                    </div>
                                                                                                                                              <p className="hint">Some things are better said quietly.</p>
                                                                                                                                                        <button className="gold-btn" onClick={() => setOpen(true)}>OPEN THE NOTE</button>
                                                                                                                                                                </>
                                                                                                                                                                      ) : (
                                                                                                                                                                              <div className="qr-paper">
                                                                                                                                                                                        <p className="qr-title">FROM MY HEART</p>
                                                                                                                                                                                                  <div className="qr-body">
                                                                                                                                                                                                              {SORRY.map((t, i) => <p key={i}>{t}</p>)}
                                                                                                                                                                                                                          <p className="qr-sign">{SORRY_SIGN}</p>
                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                              <button className="gold-btn qr-btn" onClick={onDone}>LEAVE THE ROOM</button>
                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                  )
                                                                                                                                                                                                                                                                  }