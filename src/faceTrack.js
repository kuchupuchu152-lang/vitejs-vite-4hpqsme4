import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision'
import { drawCrown } from './crownArt.js'

const WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
const MODEL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'

const sm = { x: 0, y: 0, w: 0, a: 0, ok: false }

function draw(c, v, lm) {
  const w = v.videoWidth
    const h = v.videoHeight
      if (c.width !== w) {
          c.width = w
              c.height = h
                }
                  const ctx = c.getContext('2d')
                    ctx.save()
                      ctx.translate(w, 0)
                        ctx.scale(-1, 1)
                          ctx.drawImage(v, 0, 0, w, h)
                            ctx.restore()
                              const res = lm.detectForVideo(v, performance.now())
                                const f = res.faceLandmarks && res.faceLandmarks[0]
                                  if (!f) {
                                      sm.ok = false
                                          return
                                            }
                                              const P = (i) => ({ x: (1 - f[i].x) * w, y: f[i].y * h })
                                                let a = P(234)
                                                  let b = P(454)
                                                    if (a.x > b.x) {
                                                        const t = a
                                                            a = b
                                                                b = t
                                                                  }
                                                                    const top = P(10)
                                                                      const chin = P(152)
                                                                        const fw = Math.hypot(b.x - a.x, b.y - a.y)
                                                                          const fh = Math.hypot(top.x - chin.x, top.y - chin.y)
                                                                            const ux = (top.x - chin.x) / fh
                                                                              const uy = (top.y - chin.y) / fh
                                                                                const next = {
                                                                                    x: top.x + ux * fh * 0.06,
                                                                                        y: top.y + uy * fh * 0.06,
                                                                                            w: fw * 1.2,
                                                                                                a: Math.atan2(b.y - a.y, b.x - a.x),
                                                                                                  }
                                                                                                    const k = sm.ok ? 0.45 : 1
                                                                                                      sm.x += (next.x - sm.x) * k
                                                                                                        sm.y += (next.y - sm.y) * k
                                                                                                          sm.w += (next.w - sm.w) * k
                                                                                                            sm.a += (next.a - sm.a) * k
                                                                                                              sm.ok = true
                                                                                                                drawCrown(ctx, sm.x, sm.y, sm.w, sm.a)
                                                                                                                }

                                                                                                                export async function startTracking(video, canvas, onProgress) {
                                                                                                                  onProgress('Opening the camera…')
                                                                                                                    const stream = await navigator.mediaDevices.getUserMedia({
                                                                                                                        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } },
                                                                                                                            audio: false,
                                                                                                                              })
                                                                                                                                video.srcObject = stream
                                                                                                                                  await video.play()
                                                                                                                                    onProgress('Waking the royal mirror…')
                                                                                                                                      const fileset = await FilesetResolver.forVisionTasks(WASM)
                                                                                                                                        const make = (delegate) =>
                                                                                                                                            FaceLandmarker.createFromOptions(fileset, {
                                                                                                                                                  baseOptions: { modelAssetPath: MODEL, delegate },
                                                                                                                                                        runningMode: 'VIDEO',
                                                                                                                                                              numFaces: 1,
                                                                                                                                                                  })
                                                                                                                                                                    let lm
                                                                                                                                                                      try {
                                                                                                                                                                          lm = await make('GPU')
                                                                                                                                                                            } catch (e) {
                                                                                                                                                                                lm = await make('CPU')
                                                                                                                                                                                  }
                                                                                                                                                                                    let alive = true
                                                                                                                                                                                      let raf = 0
                                                                                                                                                                                        let last = -1
                                                                                                                                                                                          const loop = () => {
                                                                                                                                                                                              if (!alive) return
                                                                                                                                                                                                  if (video.videoWidth && video.currentTime !== last) {
                                                                                                                                                                                                        last = video.currentTime
                                                                                                                                                                                                              draw(canvas, video, lm)
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                      raf = requestAnimationFrame(loop)
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                          loop()
                                                                                                                                                                                                                            return () => {
                                                                                                                                                                                                                                alive = false
                                                                                                                                                                                                                                    cancelAnimationFrame(raf)
                                                                                                                                                                                                                                        stream.getTracks().forEach((t) => t.stop())
                                                                                                                                                                                                                                            lm.close()
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                              }