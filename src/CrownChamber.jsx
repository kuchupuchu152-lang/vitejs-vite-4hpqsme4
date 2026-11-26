import { useEffect, useRef, useState } from 'react'
import { drawCrown } from './crownArt.js'
import Portrait from './Portrait.jsx'

const css = `
.cc{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:1.5rem;text-align:center;background:radial-gradient(ellipse at 50% 35%,#8a1a36,#2a0710 75%);color:#f1d98a;animation:fadeIn 1s ease both}
.cc canvas{width:min(72vw,300px);height:auto;filter:drop-shadow(0 0 24px rgba(255,220,140,.8));animation:ccFloat 3.5s ease-in-out infinite}
.cc-pedestal{width:min(46vw,200px);height:14px;border-radius:50%;background:radial-gradient(#f1d98a,#8a6410);box-shadow:0 0 30px rgba(255,220,140,.6);margin-top:-1.2rem}
@keyframes ccFloat{50%{transform:translateY(-8px)}}
`

export default function CrownChamber({ onDone }) {
  const [mode, setMode] = useState('intro')
    const ref = useRef()

      useEffect(() => {
          const c = ref.current
              if (!c) return
                  c.width = 600
                      c.height = 400
                          drawCrown(c.getContext('2d'), 300, 380, 520, 0)
                            }, [mode])

                              if (mode === 'studio') return <Portrait onClose={() => setMode('intro')} onDone={onDone} />

                                return (
                                    <div className="cc">
                                          <style>{css}</style>
                                                <p className="kicker">THE CROWN CHAMBER</p>
                                                      <canvas ref={ref} />
                                                            <div className="cc-pedestal" />
                                                                  <p className="hint">A crown for the man who rules my heart.</p>
                                                                        <button className="gold-btn" onClick={() => setMode('studio')}>WEAR THE CROWN</button>
                                                                              <button className="gold-btn" onClick={onDone} style={{ opacity: 0.7 }}>LEAVE THE CHAMBER</button>
                                                                                  </div>
                                                                                    )
                                                                                    }