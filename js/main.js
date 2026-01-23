/**
 * MAIN JAVASCRIPT FILE
 * Portfolio Cyber Neon - Main Logic & Interactions
 */

// Global Variables
let skillsData = []
let projectsData = []
let certificatesData = []

// DOM Elements
const skillsContainer = document.getElementById('skillsContainer')
const projectsContainer = document.getElementById('projectsContainer')
const certificatesContainer = document.getElementById('certificatesContainer')
const navbar = document.getElementById('navbar')
const menuToggle = document.getElementById('menuToggle')
const mobileMenu = document.getElementById('mobileMenu')
const contactForm = document.getElementById('contactForm')
const backToTop = document.getElementById('backToTop')
const typingText = document.getElementById('typingText')

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Cyber Neon Portfolio initialized')

  // Load data
  loadSkills()
  loadProjects()
  loadCertificates()

  // Setup event listeners
  setupEventListeners()

  // Setup scroll effects
  setupScrollEffects()

  // Setup mobile menu
  setupMobileMenu()

  // Setup contact form
  setupContactForm()

  // Setup back to top
  setupBackToTop()
})

/**
 * Load skills from JSON file
 */
async function loadSkills() {
  try {
    const response = await fetch('./data/skills.json')
    skillsData = await response.json()

    if (!skillsContainer) return

    skillsContainer.innerHTML = ''

    skillsData.forEach((skill) => {
      const skillCard = document.createElement('div')
      skillCard.className = 'skill-card'
      skillCard.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-xl font-bold text-${skill.color}-400">${skill.name}</h4>
                    <span class="text-green-400 font-share-tech">${skill.level}%</span>
                </div>

                <div class="mb-2">
                    <span class="text-sm px-3 py-1 rounded-full bg-${skill.color}-500/10 text-${skill.color}-400 border border-${skill.color}-500/30">
                        ${skill.category}
                    </span>
                </div>

                <div class="progress-container">
                    <div class="h-full rounded-full bg-${skill.color}-500 skill-progress-glow transition-all duration-1000"
                         style="width: 0%"
                         data-width="${skill.level}">
                    </div>
                </div>

                <div class="flex justify-between text-sm text-gray-400 mt-2">
                    <span>Beginner</span>
                    <span>${getSkillLevel(skill.level)}</span>
                    <span>Expert</span>
                </div>
            `

      skillsContainer.appendChild(skillCard)

      // Animate progress bar after a short delay
      setTimeout(() => {
        const progressBar = skillCard.querySelector('.progress-container div')
        if (progressBar) {
          progressBar.style.width = `${skill.level}%`
        }
      }, 300)
    })
  } catch (error) {
    console.error('Error loading skills:', error)
    skillsContainer.innerHTML = `
            <div class="col-span-2 text-center py-12">
                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                <p class="text-gray-400">Failed to load skills data.</p>
            </div>
        `
  }
}

/**
 * Load projects from JSON file
 */
async function loadProjects() {
  try {
    const response = await fetch('./data/projects.json')
    projectsData = await response.json()

    if (!projectsContainer) return

    projectsContainer.innerHTML = ''

    projectsData.forEach((project) => {
      const projectCard = document.createElement('div')
      projectCard.className = 'project-card'
      projectCard.innerHTML = `
                <div class="project-image">
                    <i class="fas fa-code text-5xl text-white/70"></i>
                    <div class="project-tech-badge bg-${getCategoryColor(project.category)}/20 text-${getCategoryColor(project.category)}">
                        ${project.category}
                    </div>
                </div>

                <div class="p-6">
                    <h3 class="text-xl font-bold mb-3 text-cyan-300">${project.title}</h3>
                    <p class="text-gray-300 mb-4 line-clamp-3">${project.description}</p>

                    <div class="mb-6">
                        <h4 class="text-sm font-bold text-gray-400 mb-2">Tech Stack:</h4>
                        <div class="flex flex-wrap gap-2">
                            ${project.techStack
                              .map(
                                (tech) => `
                                <span class="px-2 py-1 text-xs rounded bg-gray-800 text-cyan-300">${tech}</span>
                            `
                              )
                              .join('')}
                        </div>
                    </div>

                    <div class="flex justify-between">
                        <a href="${project.githubLink}" target="_blank"
                           class="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center">
                            <i class="fab fa-github mr-2"></i> Code
                        </a>
                        <a href="${project.demoLink}" target="_blank"
                           class="text-green-400 hover:text-green-300 transition-colors flex items-center">
                            <i class="fas fa-external-link-alt mr-2"></i> Live Demo
                        </a>
                    </div>
                </div>
            `

      projectsContainer.appendChild(projectCard)
    })
  } catch (error) {
    console.error('Error loading projects:', error)
    projectsContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                <p class="text-gray-400">Failed to load projects data.</p>
            </div>
        `
  }
}

/**
 * Load certificates from JSON file
 */
async function loadCertificates() {
  try {
    const response = await fetch('./data/certificates.json')
    certificatesData = await response.json()

    if (!certificatesContainer) return

    certificatesContainer.innerHTML = ''

    certificatesData.forEach((cert) => {
      const certCard = document.createElement('div')
      certCard.className = 'certificate-card'
      certCard.innerHTML = `
                <div class="flex items-start mb-4">
                    <div class="w-12 h-12 rounded-xl bg-${getCategoryColor(cert.category)}/10 flex items-center justify-center mr-4">
                        <i class="fas ${cert.icon} text-${getCategoryColor(cert.category)} text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-cyan-300">${cert.title}</h3>
                        <p class="text-gray-400 text-sm">${cert.organizer}</p>
                    </div>
                </div>

                <div class="flex justify-between items-center mb-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-${getCategoryColor(cert.category)}/10 text-${getCategoryColor(cert.category)}">
                        ${cert.category}
                    </span>
                    <span class="text-green-400 font-share-tech">${cert.year}</span>
                </div>

                <a href="#" onclick="openCertificate('${cert.link}')"
                  class="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center">
                  <i class="fas fa-eye mr-2"></i> View Certificate
                </a>
            `

      certificatesContainer.appendChild(certCard)
    })
  } catch (error) {
    console.error('Error loading certificates:', error)
    certificatesContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                <p class="text-gray-400">Failed to load certificates data.</p>
            </div>
        `
  }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Navbar scroll effect
  window.addEventListener('scroll', handleNavbarScroll)

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const targetId = this.getAttribute('href')
      if (targetId === '#') return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu.classList.contains('hidden') === false) {
          mobileMenu.classList.add('hidden')
        }

        // Smooth scroll
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        })
      }
    })
  })
}

/**
 * Handle navbar scroll effect
 */
function handleNavbarScroll() {
  if (window.scrollY > 100) {
    navbar.classList.add('bg-gray-900/95', 'shadow-lg')
    navbar.classList.remove('bg-gray-900/90')
  } else {
    navbar.classList.remove('bg-gray-900/95', 'shadow-lg')
    navbar.classList.add('bg-gray-900/90')
  }
}

/**
 * Setup scroll reveal animations
 */
function setupScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in')
      }
    })
  }, observerOptions)

  // Observe all cards
  document
    .querySelectorAll('.skill-card, .project-card, .certificate-card, .timeline-item')
    .forEach((element) => {
      observer.observe(element)
    })
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
  if (!menuToggle || !mobileMenu) return

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')

    // Change icon
    const icon = menuToggle.querySelector('i')
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-times')
      icon.classList.add('fa-bars')
    } else {
      icon.classList.remove('fa-bars')
      icon.classList.add('fa-times')
    }
  })
}

/**
 * Setup contact form
 */
function setupContactForm() {
  if (!contactForm) return

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Simple validation
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill all required fields', 'error')
      return
    }

    // Simulate form submission
    showNotification("Message sent successfully! I'll get back to you soon.", 'success')

    // Reset form
    contactForm.reset()
  })
}

/**
 * Setup back to top button
 */
function setupBackToTop() {
  if (!backToTop) return

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.remove('opacity-0', 'invisible')
      backToTop.classList.add('opacity-100', 'visible')
    } else {
      backToTop.classList.remove('opacity-100', 'visible')
      backToTop.classList.add('opacity-0', 'invisible')
    }
  })

  // Scroll to top when clicked
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.getElementById('notification')
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement('div')
  notification.id = 'notification'
  notification.className = `
        fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-xl font-bold
        transform transition-all duration-300
        ${
          type === 'success'
            ? 'bg-green-900/90 text-green-100 border border-green-700'
            : type === 'error'
              ? 'bg-red-900/90 text-red-100 border border-red-700'
              : 'bg-cyan-900/90 text-cyan-100 border border-cyan-700'
        }
    `
  notification.textContent = message

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full')
    notification.classList.add('translate-x-0')
  }, 10)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('translate-x-0')
    notification.classList.add('translate-x-full')

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 300)
  }, 5000)
}

/**
 * Helper: Get skill level text
 */
function getSkillLevel(percentage) {
  if (percentage >= 90) return 'Expert'
  if (percentage >= 70) return 'Advanced'
  if (percentage >= 50) return 'Intermediate'
  return 'Beginner'
}

/**
 * Helper: Get category color
 */
function getCategoryColor(category) {
  const colors = {
    Frontend: 'cyan',
    Backend: 'green',
    Database: 'blue',
    DevOps: 'purple',
    Security: 'red',
    Development: 'cyan',
    'Web Development': 'purple',
    Cloud: 'blue',
    Programming: 'yellow',
  }

  return colors[category] || 'cyan'
}

// Add fade in animation style
const style = document.createElement('style')
style.textContent = `
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.8s ease forwards;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`
document.head.appendChild(style)
