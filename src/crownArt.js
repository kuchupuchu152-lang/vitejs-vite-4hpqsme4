export function drawCrown(ctx, x, y, w, angle) {
    const h = w * 0.62
      ctx.save()
        ctx.translate(x, y)
          ctx.rotate(angle)
            ctx.translate(-w / 2, -h)
              const g = ctx.createLinearGradient(0, 0, 0, h)
                g.addColorStop(0, '#fff1b8')
                  g.addColorStop(0.5, '#e0b13c')
                    g.addColorStop(1, '#8a6410')
                      ctx.fillStyle = g
                        ctx.strokeStyle = '#6b4a08'
                          ctx.lineWidth = Math.max(1, w * 0.012)
                            ctx.lineJoin = 'round'
                              const px = [0.08, 0.29, 0.5, 0.71, 0.92]
                                const py = [0.34, 0.16, 0, 0.16, 0.34]
                                  ctx.beginPath()
                                    ctx.moveTo(0, h)
                                      ctx.lineTo(0, h * 0.5)
                                        px.forEach((p, i) => {
                                            ctx.lineTo(w * p, h * py[i])
                                                if (i < 4) ctx.lineTo((w * (p + px[i + 1])) / 2, h * 0.52)
                                                  })
                                                    ctx.lineTo(w, h * 0.5)
                                                      ctx.lineTo(w, h)
                                                        ctx.closePath()
                                                          ctx.fill()
                                                            ctx.stroke()
                                                              ctx.fillStyle = '#b8872a'
                                                                ctx.fillRect(0, h * 0.8, w, h * 0.2)
                                                                  ctx.strokeRect(0, h * 0.8, w, h * 0.2)
                                                                    ctx.fillStyle = '#fffaf0'
                                                                      px.forEach((p, i) => {
                                                                          ctx.beginPath()
                                                                              ctx.arc(w * p, h * py[i], w * 0.028, 0, 6.2832)
                                                                                  ctx.fill()
                                                                                      ctx.stroke()
                                                                                        })
                                                                                          const jewels = [[0.22, '#1f8a5a', 0.03], [0.5, '#c4163a', 0.05], [0.78, '#1f8a5a', 0.03]]
                                                                                            jewels.forEach(([p, c, r]) => {
                                                                                                ctx.fillStyle = c
                                                                                                    ctx.beginPath()
                                                                                                        ctx.arc(w * p, h * 0.9, w * r, 0, 6.2832)
                                                                                                            ctx.fill()
                                                                                                                ctx.stroke()
                                                                                                                  })
                                                                                                                    ctx.restore()
                                                                                                                    }