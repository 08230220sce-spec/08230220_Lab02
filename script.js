// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle mobile menu
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger menu
    navToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Hero navigation links
  const heroNavLinks = document.querySelectorAll(".hero-nav-link")
  heroNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Update main nav
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })

        // Update hero nav
        heroNavLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  // Utility function to handle external links
  function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]')
    externalLinks.forEach((link) => {
      link.setAttribute("target", "_blank")
      link.setAttribute("rel", "noopener noreferrer")
    })
  }

  // Initialize external links handling
  handleExternalLinks()

  // Navbar background on scroll
  const nav = document.querySelector(".nav")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.style.background = "rgba(15, 23, 42, 0.98)"
    } else {
      nav.style.background = "rgba(15, 23, 42, 0.95)"
    }
  })

  // Typing effect for hero title (optional enhancement)
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    heroTitle.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500)
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".project-card, .skill-category, .timeline-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Contact form handling
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Create mailto link
      const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`

      // Open email client
      window.location.href = mailtoLink

      // Show success message (you can customize this)
      alert("Thank you for your message! Your email client should open now.")

      // Reset form
      this.reset()
    })
  }

  // Add keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const navMenu = document.querySelector(".nav-menu")
      const navToggle = document.querySelector(".nav-toggle")

      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      }
    }
  })

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Apply debouncing to scroll events
  const debouncedUpdateActiveNav = debounce(updateActiveNav, 10)
  window.addEventListener("scroll", debouncedUpdateActiveNav)
})
