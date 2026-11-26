import { useState } from 'react'

export default function Invitation({ onDone }) {
  const [stage, setStage] = useState('sealed')

    const openEnvelope = () => {
        if (stage !== 'sealed') return
            setStage('flipping')
                setTimeout(() => setStage('card'), 1100)
                  }

                    const openGates = () => {
                        if (stage === 'opening') return
                            setStage('opening')
                                setTimeout(onDone, 2800)
                                  }

                                    if (stage === 'gates' || stage === 'opening') {
                                        return (
                                              <div className="gates-scene">
                                                      <p className="gates-text">THE KINGDOM AWAITS</p>
                                                              <div className={`gate gate-left ${stage === 'opening' ? 'swing' : ''}`} />
                                                                      <div className={`gate gate-right ${stage === 'opening' ? 'swing' : ''}`} />
                                                                              <button
                                                                                        className={`gold-btn gates-btn ${stage === 'opening' ? 'hide' : ''}`}
                                                                                                  onClick={openGates}
                                                                                                          >
                                                                                                                    OPEN THE GATES
                                                                                                                            </button>
                                                                                                                                  </div>
                                                                                                                                      )
                                                                                                                                        }

                                                                                                                                          if (stage === 'card') {
                                                                                                                                              return (
                                                                                                                                                    <div className="screen">
                                                                                                                                                            <div className="invite-card">
                                                                                                                                                                      <p className="subtitle">By Royal Decree</p>
                                                                                                                                                                                <p className="subtitle">You are cordially invited to enter the Kingdom of</p>
                                                                                                                                                                                          <h1 className="title">THE GREAT KRISH KHUNTIA</h1>
                                                                                                                                                                                                    <p className="subtitle">A gift from his Queen</p>
                                                                                                                                                                                                              <button className="gold-btn" onClick={() => setStage('gates')}>
                                                                                                                                                                                                                          APPROACH THE GATES
                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                      )
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                          return (
                                                                                                                                                                                                                                                              <div className="screen">
                                                                                                                                                                                                                                                                    <div className={`envelope ${stage === 'flipping' ? 'flipping' : ''}`}>
                                                                                                                                                                                                                                                                            <div className="env-pocket" />
                                                                                                                                                                                                                                                                                    <div className="env-flap" />
                                                                                                                                                                                                                                                                                            <button className="seal" onClick={openEnvelope} aria-label="Break the seal">K</button>
                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                        <p className="subtitle">Tap the seal</p>
                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                              )
                                                                                                                                                                                                                                                                                                              }