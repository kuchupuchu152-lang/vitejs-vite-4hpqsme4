import { useState } from 'react'
import Invitation from './Invitation.jsx'
import Palace from './Palace.jsx'
import Hall from './Hall.jsx'
import Wing, { RoomPlaceholder } from './Wing.jsx'
import { WINGS, FINALE } from './content.js'
import RoseGarden from './RoseGarden.jsx'
import CrownChamber from './CrownChamber.jsx'
import QuietRoom from './QuietRoom.jsx'
import Archives from './Archives.jsx'
import Ballroom from './Ballroom.jsx'
import Awards from './Awards.jsx'
// Finished rooms get registered here later, e.g. { garden: RoseGarden }
const VIEWS = { garden: RoseGarden, crown: CrownChamber, quiet: QuietRoom, archives: Archives, ballroom: Ballroom, awards: Awards }

export default function App() {
  const [step, setStep] = useState('invite') // for testing, try 'hall'
    const [side, setSide] = useState('left')
      const [roomId, setRoomId] = useState(null)
        const [visited, setVisited] = useState({})

          const count = (w) => WINGS[w].rooms.filter((r) => visited[r.id]).length

            if (step === 'invite') return <Invitation onDone={() => setStep('palace')} />
              if (step === 'palace') return <Palace onDone={() => setStep('hall')} />

                if (step === 'hall') {
                    return (
                          <Hall
                                  done={{ left: count('left'), right: count('right') }}
                                          onChoose={(s) => { setSide(s); setStep('wing') }}
                                                  onFinale={() => setStep('finale')}
                                                        />
                                                            )
                                                              }

                                                                if (step === 'wing') {
                                                                    return (
                                                                          <Wing
                                                                                  title={WINGS[side].name}
                                                                                          rooms={WINGS[side].rooms}
                                                                                                  visited={visited}
                                                                                                          onOpen={(id) => { setRoomId(id); setStep('room') }}
                                                                                                                  onBack={() => setStep('hall')}
                                                                                                                        />
                                                                                                                            )
                                                                                                                              }

                                                                                                                                if (step === 'room') {
                                                                                                                                    const room = WINGS[side].rooms.find((r) => r.id === roomId)
                                                                                                                                        const View = VIEWS[roomId] || RoomPlaceholder
                                                                                                                                            return <View room={room} onDone={() => { setVisited((v) => ({ ...v, [roomId]: true })); setStep('wing') }} />
                                                                                                                                              }

                                                                                                                                                return (
                                                                                                                                                    <div className="screen">
                                                                                                                                                          <p className="subtitle">The Kingdom of</p>
                                                                                                                                                                <h1 className="title">THE GREAT KRISH KHUNTIA</h1>
                                                                                                                                                                      <p className="hint">{FINALE}</p>
                                                                                                                                                                            <button className="gold-btn" onClick={() => setStep('invite')}>BEGIN AGAIN</button>
                                                                                                                                                                                </div>
                                                                                                                                                                                  )
                                                                                                                                                                                  }