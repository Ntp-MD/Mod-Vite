<template>
  <div id="overflow-space"></div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  interface TrailPoint {
    x: number
    y: number
  }

  interface Ripple {
    x: number
    y: number
    radius: number
    maxRadius: number
    lifetime: number
    maxLifetime: number
    strength: number
  }

  onMounted(() => {
    const container = document.getElementById('overflow-space')
    if (!container) return
    const width = container.offsetWidth
    const height = container.offsetHeight

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.pointerEvents = 'none'
    container.appendChild(canvas)

    const ctxRaw = canvas.getContext('2d')
    if (!ctxRaw) return
    const ctx: CanvasRenderingContext2D = ctxRaw

    // ----------------- CONFIG -----------------
    const blobPoints = 12
    const baseRadius = 20

    const angles: number[] = []
    const noiseOffsets: number[] = []
    for (let i = 0; i < blobPoints; i++) {
      angles.push((i / blobPoints) * Math.PI * 2)
      noiseOffsets.push(Math.random() * 100)
    }

    let mouseX = width / 2
    let mouseY = height / 2

    let trail: TrailPoint[] = []
    const maxTrail = 25

    let ripples: Ripple[] = [] // must be let, allows reassignment
    const maxRipples = 8
    let time = 0

    function addRipple(x: number, y: number) {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 60,
        lifetime: 0,
        maxLifetime: 60,
        strength: 2
      })
      if (ripples.length > maxRipples) ripples.shift()
    }

    // ----------------- MOUSE -----------------
    const updateMouse = (e: MouseEvent | TouchEvent) => {
      const pageX = 'touches' in e ? e.touches[0].pageX : e.clientX
      const pageY = 'touches' in e ? e.touches[0].pageY : e.clientY
      const rect = container.getBoundingClientRect()
      mouseX = pageX - rect.left
      mouseY = pageY - rect.top

      addRipple(mouseX, mouseY)
    }

    container.addEventListener('mousemove', updateMouse as EventListener)
    container.addEventListener('touchmove', updateMouse as EventListener)

    // ----------------- ANIMATE -----------------
    function animate() {
      ctx.clearRect(0, 0, width, height)

      // Smooth trail follow
      const last = trail[0] || { x: mouseX, y: mouseY }
      const vx = (mouseX - last.x) * 0.2
      const vy = (mouseY - last.y) * 0.2
      const headX = last.x + vx
      const headY = last.y + vy

      trail.unshift({ x: headX, y: headY })
      if (trail.length > maxTrail) trail.pop()

      // Animate ripples
      ripples.forEach((r) => {
        r.radius += r.maxRadius / r.maxLifetime
        r.lifetime++
      })
      ripples = ripples.filter((r) => r.lifetime < r.maxLifetime)

      // Draw trail with ripple distortion
      trail.forEach((t, i) => {
        const factor = 1 - i / trail.length
        let radius = baseRadius * factor

        ripples.forEach((r) => {
          const dx = t.x - r.x
          const dy = t.y - r.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < r.radius) radius += (1 - dist / r.radius) * r.strength * 10
        })

        ctx.fillStyle = `rgba(28,33,41,${0.2 * factor})`
        ctx.beginPath()
        ctx.arc(t.x, t.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      time += 0.03
      requestAnimationFrame(animate)
    }

    // Start after 0.5s
    setTimeout(() => {
      animate()
      addRipple(mouseX, mouseY) // initial ripple
    }, 500)
  })
</script>

<style scoped>
  #overflow-space {
    position: relative;
    display: block;
    background: #fff;
    width: 100%;
    height: 600px;
    overflow: hidden;
  }
</style>
