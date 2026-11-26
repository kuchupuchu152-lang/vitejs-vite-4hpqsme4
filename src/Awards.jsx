import { useState } from 'react'

const AWARDS = [
  { name: 'The Golden Heart', why: 'For being the king of my heart.' },
    { name: 'Keeper of Smiles', why: 'For every smile you have given me.' },
      { name: 'Knight of Kindness', why: 'For the gentle way you care for the people you love.' },
        { name: 'Royal Safe Harbour', why: 'For making me feel safe, always.' },
          { name: 'Most Treasured King', why: 'For four months of being the best part of my days.' },
          ]

          const css = `
          .aw{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:1.5rem;text-align:center;background:radial-gradient(ellipse at 50% 20%,#2f3478,#0f1030 75%);color:#f1d98a;animation:fadeIn 1s ease both}
          .aw-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;width:100%;max-width:330px}
          .aw-medal{aspect-ratio:1;border-radius:50%;border:3px solid #fff1b8;background:radial-gradient(circle at 35% 30%,#fff1b8,#d4a93a 55%,#8a6410);font-size:1.9rem;color:#6b1224;box-shadow:0 0 18px rgba(255,220,140,.5);transition:transform .3s,filter .3s;filter:grayscale(.8) brightness(.55)}
          .aw-medal.seen{filter:none}
          .aw-medal:active{transform:scale(.92)}
          .aw-card{min-height:5.5rem;width:100%;max-width:330px;border:1px solid #d4a93a;padding:.9rem;background:rgba(255,255,255,.06)}
          .aw-name{font-family:'Cinzel',serif;letter-spacing:.1em;color:#f1d98a}
          .aw-why{font-style:italic;font-size:1.15rem;margin-top:.4rem}
          `

          export default function Awards({ onDone }) {
            const [seen, setSeen] = useState({})
              const [cur, setCur] = useState(null)
                const count = Object.keys(seen).length
                  const all = count === AWARDS.length

                    const pick = (i) => {
                        setCur(i)
                            setSeen((s) => ({ ...s, [i]: true }))
                              }

                                return (
                                    <div className="aw">
                                          <style>{css}</style>
                                                <p className="kicker">THE KING'S AWARDS</p>
                                                      <p className="hint">Tap each medal. Honours for the one and only king. ({count}/{AWARDS.length})</p>
                                                            <div className="aw-grid">
                                                                    {AWARDS.map((a, i) => (
                                                                              <button key={a.name} className={`aw-medal ${seen[i] ? 'seen' : ''}`} onClick={() => pick(i)}>★</button>
                                                                                      ))}
                                                                                            </div>
                                                                                                  <div className="aw-card">
                                                                                                          {cur === null ? (
                                                                                                                    <p className="aw-why">Choose a medal…</p>
                                                                                                                            ) : (
                                                                                                                                      <>
                                                                                                                                                  <p className="aw-name">{AWARDS[cur].name}</p>
                                                                                                                                                              <p className="aw-why">{AWARDS[cur].why}</p>
                                                                                                                                                                        </>
                                                                                                                                                                                )}
                                                                                                                                                                                      </div>
                                                                                                                                                                                            {all && <p className="hint">All honours earned. King of four months, and forever in my heart.</p>}
                                                                                                                                                                                                  <button className={`gold-btn ${all ? 'glow' : ''}`} onClick={onDone}>LEAVE THE HALL</button>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                        )
                                                                                                                                                                                                        }