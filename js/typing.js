/**
 * TYPING EFFECT JAVASCRIPT
 * Portfolio Cyber Neon - Terminal Typing Effect
 */

document.addEventListener('DOMContentLoaded', function () {
  const typingElement = document.getElementById('typing-text')

  if (!typingElement) return

  // Texts for typing effect
  const texts = [
    'Welcome to my journey. I am a Student currently Studying Programming and Cybersecurity. Passionate about building secure web and applications.',
    'Graduate of Batam State Vocational High School 7 with over 2 years of experience in the technology industry, I believe that no System is Secure.',
    'As I enter 2026, I continue to hone my tech skills by learning the latest innovations, contributing to open-source projects, and deepening my cybersecurity knowledge. Every line of code and every new project is a step toward a more mature skill set.',
  ]

  // Start typing effect
  startTypingEffect(typingElement, texts)
})

/**
 * Start typing effect with multiple texts
 */
function startTypingEffect(element, texts, textIndex = 0, charIndex = 0, isDeleting = false) {
  const currentText = texts[textIndex]
  const typingSpeed = isDeleting ? 30 : 70 // Faster when deleting
  const pauseBetweenTexts = 2000

  // Update text content
  if (isDeleting) {
    element.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    element.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  // Check if typing is complete
  if (!isDeleting && charIndex === currentText.length) {
    // Pause before deleting
    setTimeout(() => {
      startTypingEffect(element, texts, textIndex, charIndex, true)
    }, pauseBetweenTexts)
    return
  }

  // Check if deleting is complete
  if (isDeleting && charIndex === 0) {
    // Move to next text (or back to first)
    textIndex = (textIndex + 1) % texts.length
    // Pause before typing new text
    setTimeout(() => {
      startTypingEffect(element, texts, textIndex, charIndex, false)
    }, 500)
    return
  }

  // Continue typing/deleting
  setTimeout(() => {
    startTypingEffect(element, texts, textIndex, charIndex, isDeleting)
  }, typingSpeed)
}

/**
 * Create matrix rain effect (optional)
 */
function createMatrixEffect() {
  const matrixOverlay = document.createElement('div')
  matrixOverlay.className = 'fixed inset-0 pointer-events-none z-0 opacity-5'
  matrixOverlay.id = 'matrix-overlay'

  document.body.appendChild(matrixOverlay)

  // Create columns
  for (let i = 0; i < 50; i++) {
    createMatrixColumn(matrixOverlay)
  }
}

/**
 * Create single matrix column
 */
function createMatrixColumn(container) {
  const column = document.createElement('div')
  column.className = 'absolute top-0 font-share-tech text-green-400'
  column.style.left = `${Math.random() * 100}%`
  column.style.fontSize = `${14 + Math.random() * 10}px`

  // Create characters
  let content = ''
  const chars =
    '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  const length = 20 + Math.floor(Math.random() * 20)

  for (let i = 0; i < length; i++) {
    content += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>'
  }

  column.innerHTML = content
  container.appendChild(column)

  // Animation
  let position = -500
  const speed = 50 + Math.random() * 100

  function animate() {
    position += 2
    column.style.top = `${position}px`

    if (position > window.innerHeight) {
      position = -500
      column.style.left = `${Math.random() * 100}%`
    }

    // Randomly change some characters
    if (Math.random() > 0.8) {
      const lines = column.innerHTML.split('<br>')
      const randomIndex = Math.floor(Math.random() * lines.length)
      if (lines[randomIndex]) {
        lines[randomIndex] = chars.charAt(Math.floor(Math.random() * chars.length))
        column.innerHTML = lines.join('<br>')
      }
    }

    setTimeout(animate, speed)
  }

  animate()
}

// Uncomment to enable matrix effect (optional, can be heavy on performance)
// createMatrixEffect();

/**
 * Add terminal-like focus effect
 */
function addTerminalEffects() {
  // Add click effect to terminal
  const terminal = document.querySelector('.terminal-window')
  if (terminal) {
    terminal.addEventListener('click', function () {
      this.classList.add('ring-2', 'ring-cyan-500')
      setTimeout(() => {
        this.classList.remove('ring-2', 'ring-cyan-500')
      }, 2000)
    })
  }
}

// Initialize terminal effects
addTerminalEffects()
