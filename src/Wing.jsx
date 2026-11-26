export default function Wing({ title, rooms, visited, onOpen, onBack }) {
    const all = rooms.every((r) => visited[r.id])
      return (
          <div className="wing">
                <p className="kicker" style={{ color: '#8a1a36' }}>{title}</p>
                      <p className="hint">Three doors. Open them in any order.</p>
                            <div className="doors">
                                    {rooms.map((r) => (
                                              <button key={r.id} className={`door ${visited[r.id] ? 'seen' : ''}`} style={{ '--c': r.color }} onClick={() => onOpen(r.id)}>
                                                          <span className="door-arch" />
                                                                      <span className="door-name">{r.name}</span>
                                                                                  <span className="door-sub">{visited[r.id] ? 'Visited ✓' : r.sub}</span>
                                                                                            </button>
                                                                                                    ))}
                                                                                                          </div>
                                                                                                                <button className={`gold-btn ${all ? 'glow' : ''}`} onClick={onBack}>
                                                                                                                        {all ? 'RETURN TO THE GRAND HALL' : 'BACK TO THE HALL'}
                                                                                                                              </button>
                                                                                                                                  </div>
                                                                                                                                    )
                                                                                                                                    }

                                                                                                                                    export function RoomPlaceholder({ room, onDone }) {
                                                                                                                                      return (
                                                                                                                                          <div className="wing" style={{ background: `radial-gradient(ellipse at 50% 30%, ${room.color}, #14070b 80%)`, color: '#f1d98a' }}>
                                                                                                                                                <p className="kicker">UNDER CONSTRUCTION</p>
                                                                                                                                                      <h1 className="title">{room.name}</h1>
                                                                                                                                                            <p className="hint">{room.line}</p>
                                                                                                                                                                  <button className="gold-btn" onClick={onDone}>LEAVE THE ROOM</button>
                                                                                                                                                                      </div>
                                                                                                                                                                        )
                                                                                                                                                                        }