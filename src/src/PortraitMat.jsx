import { useMemo } from 'react'
import * as THREE from 'three'

const PHOTO = '/portrait.jpg'
const ASPECT = 3.6 / 5

export default function PortraitMat() {
  const tex = useMemo(() => {
    const t = new THREE.TextureLoader().load(PHOTO, (tx) => {
      const ia = tx.image.width / tx.image.height
      if (ia > ASPECT) {
        tx.repeat.set(ASPECT / ia, 1)
        tx.offset.set((1 - ASPECT / ia) / 2, 0)
      } else {
        tx.repeat.set(1, ia / ASPECT)
        tx.offset.set(0, (1 - ia / ASPECT) / 2)
      }
      tx.needsUpdate = true
    })
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
  return <meshBasicMaterial map={tex} />
          }
