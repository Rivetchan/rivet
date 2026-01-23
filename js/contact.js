// Init EmailJS
;(function () {
  emailjs.init('tlfBPSfkWXdy3sjH2')
})()

// Ambil form
const form = document.getElementById('contactForm')

form.addEventListener('submit', function (e) {
  e.preventDefault()

  emailjs
    .sendForm('email me', 'rivet-form', form)
    .then(() => {
      alert('✅ Message sent successfully!')
      form.reset()
    })
    .catch((error) => {
      console.error(error)
      alert('❌ Failed to send message.')
    })
})
