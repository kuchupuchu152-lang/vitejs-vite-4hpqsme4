import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { LETTER, LETTER_SIGN } from './content.js'
import { Sky, Ground, Hedges, Arch, Fountain } from './GardenScenery.jsx'
import { Roses, Pedestal, Lamps, Petals } from './GardenRoses.jsx'

const FOG = '#f3cdb8'

const css = `
.rg-reading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(60,15,30,.5);animation:fadeIn .8s ease both;padding:1rem}
.rg-paper{width:min(92vw,390px);max-height:82vh;display:flex;flex-direction:column;background:linear-gradient(#fbf3e4,#f4e6cf);color:#4a1020;border:1px solid #d4a93a;outline:1px solid rgba(212,169,58,.5);outline-offset:-8px;box-shadow:0 20px 50px rgba(0,0,0,.6);padding:1.6rem 1.3rem;animation:rgUnfold 1.2s cubic-bezier(.2,.8,.2,1) both}
.rg-title{font-family:'Cinzel',serif;letter-spacing:.14em;font-size:.9rem;color:#8a1a36;text-align:center;margin-bottom:.8rem}
.rg-body{flex:1;min-height:0;overflow-y:auto;font-size:1.15rem;line-height:1.55;font-style:italic;text-align:left;padding-right:.3rem}
.rg-body p{margin-bottom:.8rem}
.rg-sign{white-space:pre-line;text-align:right;font-style:normal!important;font-family:'Cinzel',serif;font-size:.8rem;color:#8a1a36}
.rg-btn{margin:1rem auto 0;flex-shrink:0}
@keyframes rgUnfold{from{opacity:0;transform:perspective(900px) rotateX(-70deg) scale(.92)}to{opacity:1;transform:none}}
`

function Rig({ phase, onArrive }) {
  const arrived = useRef(false)
    useFrame((state, dt) => {
        const cam = state.camera
            const t = state.clock.elapsedTime
                cam.rotation.x = -0.05
                    cam.position.z = THREE.MathUtils.damp(cam.position.z, -12.5, 0.5, dt)
                        cam.position.y = 1.7 + (phase === 'walk' ? Math.sin(t * 2) * 0.03 : Math.sin(t) * 0.01)
                            cam.position.x = Math.sin(t * 0.4) * 0.07
                                if (phase === 'walk' && !arrived.current && cam.position.z < -12) {
                                      arrived.current = true
                                            onArrive()
                                                }
                                                  })
                                                    return null
                                                    }

                                                    export default function RoseGarden({ onDone }) {
                                                      const [phase, setPhase] = useState('walk')

                                                        return (
                                                            <div className="stage">
                                                                  <style>{css}</style>
                                                                        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.7, 9], fov: 62 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
                                                                                <color attach="background" args={[FOG]} />
                                                                                        <fog attach="fog" args={[FOG, 14, 60]} />
                                                                                                <ambientLight intensity={1.05} color="#ffe6d0" />
                                                                                                        <hemisphereLight args={['#ffe9d6', '#8fb36e', 0.8]} />
                                                                                                                <directionalLight position={[8, 6, 4]} intensity={1.1} color="#ffc9a0" />
                                                                                                                        <Rig phase={phase} onArrive={() => setPhase('arrived')} />
                                                                                                                                <Sky />
                                                                                                                                        <Ground />
                                                                                                                                                <Hedges />
                                                                                                                                                        <Roses />
                                                                                                                                                                <Arch />
                                                                                                                                                                        <Fountain />
                                                                                                                                                                                <Pedestal />
                                                                                                                                                                                        <Lamps />
                                                                                                                                                                                                <Petals />
                                                                                                                                                                                                      </Canvas>

                                                                                                                                                                                                            {phase === 'walk' && (
                                                                                                                                                                                                                    <div className="overlay" key="walk">
                                                                                                                                                                                                                              <p className="kicker">THE ROSE GARDEN</p>
                                                                                                                                                                                                                                        <p className="hint">Follow the path, my king…</p>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                            {phase === 'arrived' && (
                                                                                                                                                                                                                                                                    <div className="overlay" key="arrived">
                                                                                                                                                                                                                                                                              <p className="kicker">A LETTER IS WAITING</p>
                                                                                                                                                                                                                                                                                        <p className="hint">Someone left this for you among the roses.</p>
                                                                                                                                                                                                                                                                                                  <button className="gold-btn" onClick={() => setPhase('reading')}>OPEN THE LETTER</button>
                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                      {phase === 'reading' && (
                                                                                                                                                                                                                                                                                                                              <div className="rg-reading" key="reading">
                                                                                                                                                                                                                                                                                                                                        <div className="rg-paper">
                                                                                                                                                                                                                                                                                                                                                    <p className="rg-title">A LETTER FROM HIS QUEEN</p>
                                                                                                                                                                                                                                                                                                                                                                <div className="rg-body">
                                                                                                                                                                                                                                                                                                                                                                              {LETTER.map((t, i) => <p key={i}>{t}</p>)}
                                                                                                                                                                                                                                                                                                                                                                                            <p className="rg-sign">{LETTER_SIGN}</p>
                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                    <button className="gold-btn rg-btn" onClick={onDone}>LEAVE THE GARDEN</button>
                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                  )
                                                                                                                                                                                                                                                                                                                                                                                                                                                  }