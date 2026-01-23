// ====================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// ====================================
// Author: Enno Nurwansyah Rasyidi
// Politeknik Negeri Batam (Polibatam)
// ====================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('Portfolio website loaded successfully!')

  // ====================================
  // 1. SET CURRENT YEAR IN FOOTER
  // ====================================
  document.getElementById('currentYear').textContent = new Date().getFullYear()

  // ====================================
  // 2. THEME TOGGLE FUNCTIONALITY
  // ====================================
  const themeToggle = document.getElementById('themeToggle')
  const body = document.body

  // Check for saved theme or prefer color scheme
  const savedTheme =
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

  // Apply saved theme
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme')
  }

  // Theme toggle event listener
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme')

    // Save theme preference to localStorage
    const isDark = body.classList.contains('dark-theme')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')

    // Add animation to toggle button
    themeToggle.style.transform = 'rotate(360deg)'
    setTimeout(() => {
      themeToggle.style.transform = 'rotate(0deg)'
    }, 300)
  })

  // ====================================
  // 3. MOBILE NAVIGATION
  // ====================================
  const hamburger = document.querySelector('.hamburger')
  const navLinks = document.querySelector('.nav-links')
  const navLinksItems = document.querySelectorAll('.nav-links a')

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navLinks.classList.toggle('active')

    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  })

  // Close mobile menu when clicking on a link
  navLinksItems.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active')
      navLinks.classList.remove('active')
      document.body.style.overflow = 'auto'
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target)

    if (!isClickInsideNav && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active')
      navLinks.classList.remove('active')
      document.body.style.overflow = 'auto'
    }
  })

  // ====================================
  // 4. BACK TO TOP BUTTON
  // ====================================
  const backToTopBtn = document.getElementById('backToTop')

  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add('visible')
    } else {
      backToTopBtn.classList.remove('visible')
    }

    // Update active nav link based on scroll position
    updateActiveNavLink()

    // Add parallax effect to hero section
    applyParallaxEffect()
  })

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    // Add bounce animation
    backToTopBtn.style.transform = 'scale(0.8)'
    setTimeout(() => {
      backToTopBtn.style.transform = 'scale(1)'
    }, 300)
  })

  // ====================================
  // 5. SMOOTH SCROLLING FOR ANCHOR LINKS
  // ====================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')

      // Skip empty or # only links
      if (href === '#' || href === '#!') return

      e.preventDefault()
      const targetElement = document.querySelector(href)

      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
    })
  })

  // ====================================
  // 6. ANIMATE PROGRESS BARS ON SCROLL
  // ====================================
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-fill')

    progressBars.forEach((bar) => {
      const width = bar.getAttribute('data-width') || '0'
      bar.style.width = width + '%'

      // Add animation class
      bar.classList.add('animated')
    })
  }

  // ====================================
  // 7. ANIMATE CIRCLE PROGRESS ON SCROLL
  // ====================================
  const animateCircleProgress = () => {
    const circleProgresses = document.querySelectorAll('.circle-progress')

    circleProgresses.forEach((circle) => {
      const percent = circle.getAttribute('data-percent') || '0'
      const degree = (percent / 100) * 360

      // Create gradient with the calculated degree
      circle.style.background = `conic-gradient(var(--primary-color) ${degree}deg, var(--gray-light) 0deg)`

      // Add animation class
      circle.classList.add('animated')

      // Animate the percentage text
      const circleText = circle.parentElement.querySelector('.circle-text')
      if (circleText) {
        let current = 0
        const increment = percent / 50 // Adjust speed
        const timer = setInterval(() => {
          current += increment
          if (current >= percent) {
            current = percent
            clearInterval(timer)
          }
          circleText.textContent = Math.round(current) + '%'
        }, 20)
      }
    })
  }

  // ====================================
  // 8. INTERSECTION OBSERVER FOR ANIMATIONS
  // ====================================
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate skills section
        if (entry.target.classList.contains('skills-section')) {
          animateProgressBars()
        }

        // Animate soft skills section
        if (entry.target.classList.contains('soft-skills-section')) {
          animateCircleProgress()
        }

        // Animate timeline items
        if (entry.target.classList.contains('timeline-item')) {
          entry.target.classList.add('visible')
        }

        // Add animation to all animate-on-scroll elements
        entry.target.querySelectorAll('.animate-on-scroll').forEach((el) => {
          el.classList.add('animated')
        })

        // Stop observing after animation is triggered
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe sections for animations
  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section)
  })

  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach((item) => {
    observer.observe(item)
  })

  // ====================================
  // 9. FORM SUBMISSION HANDLING
  // ====================================
  const contactForm = document.getElementById('contactForm')

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()

      // Get form values
      const name = document.getElementById('name').value.trim()
      const email = document.getElementById('email').value.trim()
      const message = document.getElementById('message').value.trim()

      // Basic validation
      if (!name || !email || !message) {
        showNotification('Harap isi semua field!', 'error')
        return
      }

      if (!isValidEmail(email)) {
        showNotification('Format email tidak valid!', 'error')
        return
      }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...'
      submitBtn.disabled = true

      // Simulate API call (replace with actual API call in production)
      setTimeout(() => {
        // Show success message
        showNotification(
          `Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Saya akan membalas ke email ${email} secepatnya.`,
          'success'
        )

        // Reset form
        contactForm.reset()

        // Restore button state
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 1500)
    })
  }

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // ====================================
  // 10. NOTIFICATION SYSTEM
  // ====================================
  function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification')
    if (existingNotification) {
      existingNotification.remove()
    }

    // Create notification element
    const notification = document.createElement('div')
    notification.className = `notification ${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `

    // Add to DOM
    document.body.appendChild(notification)

    // Show notification with animation
    setTimeout(() => {
      notification.classList.add('show')
    }, 10)

    // Close notification on button click
    const closeBtn = notification.querySelector('.notification-close')
    closeBtn.addEventListener('click', () => {
      notification.classList.remove('show')
      setTimeout(() => {
        notification.remove()
      }, 300)
    })

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove('show')
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove()
          }
        }, 300)
      }
    }, 5000)
  }

  // ====================================
  // 11. PROJECT CARD HOVER EFFECTS
  // ====================================
  const projectCards = document.querySelectorAll('.project-card')

  projectCards.forEach((card) => {
    // Store original transform
    const originalTransform = card.style.transform

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) scale(1.02)'
      card.style.zIndex = '10'

      // Add glow effect
      card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)'

      // Add slight rotation for 3D effect
      card.style.transform += ' perspective(1000px) rotateX(2deg) rotateY(2deg)'
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = originalTransform
      card.style.zIndex = ''
      card.style.boxShadow = ''
    })
  })

  // ====================================
  // 12. TOOL ITEM HOVER EFFECTS
  // ====================================
  const toolItems = document.querySelectorAll('.tool-item')

  toolItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      // Add bounce animation to icon
      const icon = item.querySelector('i')
      if (icon) {
        icon.style.transform = 'scale(1.3) rotate(10deg)'
      }
    })

    item.addEventListener('mouseleave', () => {
      // Reset icon
      const icon = item.querySelector('i')
      if (icon) {
        icon.style.transform = ''
      }
    })
  })

  // ====================================
  // 13. CERTIFICATE CARD HOVER EFFECTS
  // ====================================
  const certificateCards = document.querySelectorAll('.certificate-card')

  certificateCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      // Add floating animation
      card.style.transform = 'translateY(-15px)'

      // Add gradient border effect
      card.style.borderImage =
        'linear-gradient(135deg, var(--primary-color), var(--accent-color)) 1'
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = ''
      card.style.borderImage = ''
    })
  })

  // ====================================
  // 14. HEADER SCROLL EFFECT
  // ====================================
  const header = document.querySelector('.header')

  function updateHeaderOnScroll() {
    if (window.pageYOffset > 100) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'
      header.style.backdropFilter = 'blur(20px)'
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'

      if (body.classList.contains('dark-theme')) {
        header.style.backgroundColor = 'rgba(30, 30, 30, 0.95)'
      }
    } else {
      header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)'
      header.style.backdropFilter = 'blur(15px)'
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'

      if (body.classList.contains('dark-theme')) {
        header.style.backgroundColor = 'rgba(30, 30, 30, 0.95)'
      }
    }
  }

  // Initial call and scroll event
  updateHeaderOnScroll()
  window.addEventListener('scroll', updateHeaderOnScroll)

  // ====================================
  // 15. ACTIVE NAV LINK UPDATE
  // ====================================
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-links a')

    let currentSection = ''
    const scrollPosition = window.pageYOffset + 200

    // Find current section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id')
      }
    })

    // Update active class
    navLinks.forEach((link) => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active')
      }
    })
  }

  // ====================================
  // 16. PARALLAX EFFECT
  // ====================================
  function applyParallaxEffect() {
    const scrolled = window.pageYOffset
    const heroSection = document.querySelector('.hero-section')

    if (heroSection) {
      const imageWrapper = heroSection.querySelector('.image-wrapper')
      if (imageWrapper) {
        imageWrapper.style.transform = `translateY(${scrolled * 0.05}px)`
      }

      const heroText = heroSection.querySelector('.hero-text')
      if (heroText) {
        heroText.style.transform = `translateY(${scrolled * 0.03}px)`
      }
    }
  }

  // ====================================
  // 17. RIPPLE BUTTON EFFECT
  // ====================================
  document
    .querySelectorAll(
      '.btn-primary, .btn-secondary, .project-github, .project-demo, .certificate-link'
    )
    .forEach((button) => {
      button.addEventListener('click', function (e) {
        // Create ripple element
        const ripple = document.createElement('span')
        ripple.classList.add('ripple-effect')

        // Get click position relative to button
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        // Set ripple styles
        ripple.style.width = ripple.style.height = size + 'px'
        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'

        // Remove existing ripples
        const existingRipples = this.querySelectorAll('.ripple-effect')
        existingRipples.forEach((r) => r.remove())

        // Add ripple to button
        this.appendChild(ripple)

        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove()
        }, 1000)
      })
    })

  // ====================================
  // 18. DOWNLOAD CV BUTTON FUNCTIONALITY
  // ====================================
  const downloadCvBtn = document.querySelector('a[href*="Download CV"]')

  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function (e) {
      e.preventDefault()

      // Show notification
      showNotification('CV sedang diunduh...', 'success')

      // Simulate download (in real scenario, this would link to actual CV file)
      setTimeout(() => {
        showNotification('CV berhasil diunduh!', 'success')

        // Create and trigger download (example)
        // const link = document.createElement('a');
        // link.href = 'path/to/cv.pdf';
        // link.download = 'Enno_Nurwansyah_CV.pdf';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      }, 1000)
    })
  }

  // ====================================
  // 19. NEWSLETTER FORM
  // ====================================
  const newsletterForm = document.querySelector('.newsletter-form')

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (!email || !isValidEmail(email)) {
        showNotification('Masukkan email yang valid!', 'error')
        return
      }

      // Show loading
      const submitBtn = this.querySelector('button')
      const originalHtml = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

      // Simulate subscription
      setTimeout(() => {
        showNotification('Terima kasih telah berlangganan newsletter!', 'success')
        emailInput.value = ''
        submitBtn.innerHTML = originalHtml
      }, 1500)
    })
  }

  // ====================================
  // 20. SKILLS PROGRESS ANIMATION ON HOVER
  // ====================================
  const skillCategories = document.querySelectorAll('.skill-category')

  skillCategories.forEach((category) => {
    category.addEventListener('mouseenter', () => {
      const progressBars = category.querySelectorAll('.progress-fill')

      progressBars.forEach((bar) => {
        const width = bar.getAttribute('data-width') || '0'

        // Animate width with slight delay for each bar
        setTimeout(() => {
          bar.style.width = width + '%'
        }, 100)
      })
    })
  })

  // ====================================
  // 21. TYPEWRITER EFFECT FOR HERO TEXT (Optional)
  // ====================================
  function initTypewriterEffect() {
    const titleElement = document.querySelector('.hero-text .title')
    if (!titleElement) return

    const originalText = titleElement.textContent
    const texts = [
      'Programmer | Cyber Security Enthusiast',
      'Database Specialist | Full Stack Developer',
      'Embedded Systems | IoT Developer',
    ]

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let isEnd = false

    function typeWriter() {
      const currentText = texts[textIndex]

      if (isDeleting) {
        // Deleting text
        titleElement.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
      } else {
        // Writing text
        titleElement.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
      }

      // Check if text is complete
      if (!isDeleting && charIndex === currentText.length) {
        isEnd = true
        setTimeout(typeWriter, 2000) // Pause at end
        return
      }

      // Check if text is deleted
      if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
      }

      // Determine typing speed
      let speed = isDeleting ? 50 : 100

      // Speed up at the end
      if (isEnd) {
        speed = 1000
        isEnd = false
        isDeleting = true
      }

      setTimeout(typeWriter, speed)
    }

    // Start typewriter effect after 2 seconds
    setTimeout(typeWriter, 2000)
  }

  // Uncomment to enable typewriter effect
  // initTypewriterEffect();

  // ====================================
  // 22. LAZY LOAD IMAGES
  // ====================================
  const lazyImages = document.querySelectorAll('img[data-src]')

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.getAttribute('data-src')
        img.classList.add('loaded')
        imageObserver.unobserve(img)
      }
    })
  })

  lazyImages.forEach((img) => imageObserver.observe(img))

  // ====================================
  // 23. INITIALIZE ANIMATIONS ON LOAD
  // ====================================
  function initializeAnimations() {
    // Check if skills section is already in viewport
    const skillsSection = document.querySelector('.skills-section')
    const softSkillsSection = document.querySelector('.soft-skills-section')

    if (skillsSection && isElementInViewport(skillsSection)) {
      animateProgressBars()
    }

    if (softSkillsSection && isElementInViewport(softSkillsSection)) {
      animateCircleProgress()
    }

    // Add animation classes to elements on load
    setTimeout(() => {
      document
        .querySelectorAll('.skill-category, .tool-item, .certificate-card, .project-card')
        .forEach((el) => {
          el.classList.add('animate-on-scroll')
        })
    }, 500)
  }

  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    )
  }

  // ====================================
  // 24. KEYBOARD SHORTCUTS
  // ====================================
  document.addEventListener('keydown', (e) => {
    // Toggle theme with Ctrl/Cmd + T
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault()
      themeToggle.click()
    }

    // Go to top with Ctrl/Cmd + Home
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Toggle mobile menu with Escape
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active')
      navLinks.classList.remove('active')
      document.body.style.overflow = 'auto'
    }
  })

  // ====================================
  // 25. COPY EMAIL TO CLIPBOARD
  // ====================================
  const emailElement = document.querySelector('.contact-details p')

  if (emailElement && emailElement.textContent.includes('@')) {
    emailElement.style.cursor = 'pointer'
    emailElement.title = 'Klik untuk menyalin email'

    emailElement.addEventListener('click', function () {
      const email = this.textContent.trim()

      // Copy to clipboard
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showNotification('Email disalin ke clipboard!', 'success')
        })
        .catch((err) => {
          console.error('Gagal menyalin email: ', err)
          showNotification('Gagal menyalin email', 'error')
        })
    })
  }

  // ====================================
  // 26. PAGE LOAD ANIMATION
  // ====================================
  function pageLoadAnimation() {
    // Add loading class to body
    body.classList.add('page-loading')

    // Remove loading class after page is loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        body.classList.remove('page-loading')
        body.classList.add('page-loaded')

        // Show welcome notification
        setTimeout(() => {
          showNotification('Selamat datang di portfolio Enno Nurwansyah!', 'success')
        }, 500)
      }, 500)
    })
  }

  // Initialize page load animation
  pageLoadAnimation()

  // ====================================
  // 27. INITIALIZE ALL FUNCTIONALITIES
  // ====================================
  initializeAnimations()

  console.log('All JavaScript functionalities initialized!')
})

// ====================================
// 28. ADDITIONAL GLOBAL FUNCTIONS
// ====================================

// Debounce function for performance optimization
function debounce(func, wait = 20, immediate = true) {
  let timeout
  return function () {
    const context = this,
      args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// Throttle function for scroll events
function throttle(func, limit = 100) {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ====================================
// 29. ADD STYLES FOR DYNAMIC ELEMENTS
// ====================================
const dynamicStyles = `
    /* Notification Styles */
    .notification {
        position: fixed;
        top: 30px;
        right: 30px;
        background: var(--card-bg);
        border-radius: 12px;
        padding: 20px;
        box-shadow: var(--shadow-hover);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(150%);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        z-index: 9999;
        border-left: 5px solid var(--primary-color);
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-left-color: var(--success-color);
    }

    .notification.error {
        border-left-color: var(--danger-color);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
        flex: 1;
    }

    .notification-content i {
        font-size: 1.5rem;
        color: var(--primary-color);
    }

    .notification.success .notification-content i {
        color: var(--success-color);
    }

    .notification.error .notification-content i {
        color: var(--danger-color);
    }

    .notification-content span {
        font-size: 1rem;
        color: var(--text-color);
        line-height: 1.5;
    }

    .notification-close {
        background: none;
        border: none;
        color: var(--text-light);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 5px;
        transition: var(--transition);
    }

    .notification-close:hover {
        color: var(--danger-color);
        transform: rotate(90deg);
    }

    /* Ripple Effect Styles */
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Page Load Animation */
    .page-loading::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--body-bg);
        z-index: 99999;
        opacity: 1;
        transition: opacity 0.5s ease;
    }

    .page-loading::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        border: 5px solid var(--gray-light);
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 99999;
    }

    .page-loaded::before {
        opacity: 0;
        pointer-events: none;
    }

    .page-loaded::after {
        opacity: 0;
        pointer-events: none;
    }

    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* Active Navigation Link */
    .nav-links a.active {
        color: var(--accent-color) !important;
    }

    .nav-links a.active::after {
        width: 100% !important;
    }

    /* Image Load Animation */
    img.loaded {
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Smooth Scrollbar */
    html {
        scroll-behavior: smooth;
    }

    @media (prefers-reduced-motion: reduce) {
        html {
            scroll-behavior: auto;
        }

        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`

// Add dynamic styles to document
const styleSheet = document.createElement('style')
styleSheet.textContent = dynamicStyles
document.head.appendChild(styleSheet)

// ====================================
// 30. SERVICE WORKER FOR PWA (Optional)
// ====================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registered with scope: ', registration.scope)
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error)
      })
  })
}
