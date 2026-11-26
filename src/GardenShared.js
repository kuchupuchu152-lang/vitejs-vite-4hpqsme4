import * as THREE from 'three'

export const GOLD = '#d4a93a'
export const CREAM = '#f3e8d2'
export const HEDGE = '#2f6b3a'
export const ROSE_COLORS = ['#d62b4b', '#e8587a', '#f4a3b5', '#fff0ee', '#b01237']

let glowTex
export function getGlow() {
  if (!glowTex) {
      const c = document.createElement('canvas')
          c.width = c.height = 128
              const g = c.getContext('2d')
                  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
                      grd.addColorStop(0, 'rgba(255,236,170,0.95)')
                          grd.addColorStop(0.4, 'rgba(255,220,140,0.35)')
                              grd.addColorStop(1, 'rgba(255,220,140,0)')
                                  g.fillStyle = grd
                                      g.fillRect(0, 0, 128, 128)
                                          glowTex = new THREE.CanvasTexture(c)
                                            }
                                              return glowTex
                                              }