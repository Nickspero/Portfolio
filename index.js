/* template_1d9uzy8   - template ID from EmailJS
service_lr8yc0a          - service ID from EmailJS
TWMzH2IFMbdgYjekQ            - public key from EmailJS */

/* function to SEND email*/

function contact(event) {            /*Defines a function named contact that will be called when the form is submitted. It receives the submit event.*/
    event.preventDefault()           /* by default, submitting a form refreshes the page. use preventDefault to prevent that */
    const loading = document.querySelector('.modal__overlay--loading')  /*loading = .modal__overlay--loading*/
    const success = document.querySelector('.modal__overlay--success')  /*success = .modal__overlay--success*/
    loading.classList.add('modal__overlay--visible');                   /* shows the LOADING OVERLAY by adding a class (VISIBLE, z-index:1)*/      
    emailjs                    /* in JavaScript library, connects you to emailJS service */
        .sendForm(             /* method that belongs to emailjs. Ex: emailjs.sendForm(serviceID, templateID, formElement, publicKey), returns a PROMISE */
            'service_lr8yc0a',    /* service ID from EmailJS */
            'template_1d9uzy8',   /* template ID from EmailJS */
            event.target,           /* event.target is just “the thing that triggered the event.” Since this function is attached to the form’s onsubmit, the target of the event is the form itself.*/
            'TWMzH2IFMbdgYjekQ'   /* public key from EmailJS */
        ).then(() => {                  /* if email sends successfully*/
            loading.classList.remove('modal__overlay--visible')  /* hide LOADING OVERLAY by removing VISIBLE class */
            success.classList.add('modal__overlay--visible')      /*display SUCCESS OVERLAY by adding it to classlist*/
        })
        .catch(() => {loading.classList.remove('modal__overlay--visible')  /* if email doesnt send for whatever reason, this error shows up*/
            .catch(err => console.log(err))
            alert("Email service is temporarily down. Please contact me at nspappas99@gmail.com")
        })
}


/* function to toggle Modal on and off*/

let isModalOpen = false
function toggleModal() {
    console.log(isModalOpen)
    if (isModalOpen) {         /*IF isModalOpen is TRUE*/
        isModalOpen = false
        return document.body.classList.remove('modal--open')
    }
    isModalOpen = true
    document.body.classList.add('modal--open')
}


// darkmode

let contrastToggle = false
function toggleContrast() {
    contrastToggle = !contrastToggle
    if (contrastToggle) {
        document.body.classList.add('dark-theme')
    }
    else {
        document.body.classList.remove('dark-theme')
    }
}

//background shapes motion

const scaleFactor = 1 / 20

function moveBackground(event) {
    const shapes = document.querySelectorAll('.shape')
    const x = event.clientX * scaleFactor
    const y = event.clientY * scaleFactor
    

    for (let i = 0; i<shapes.length; i++) {
        const isOdd = i % 2 !==0
        const boolInt = isOdd ? -1 : 1
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
    }
}





//Canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let mouseX = 0, mouseY = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;
});

// Draw a glowing wave
function drawRibbon(colors, offset) {
  const time = Date.now() * 0.002;
  const frequency = .5 + mouseX *2;
  const amplitude = 150 + mouseY * 100;

  ctx.beginPath();

  for (let x = 0; x <= canvas.width; x++) {
    const y = canvas.height / 2 +
      Math.sin(x * 0.01 * frequency + time + offset) * amplitude;
    ctx.lineTo(x, y);
  }

  // Use gradient stroke instead of fill
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  for (let i = 0; i < colors.length; i++) {
    gradient.addColorStop(i / (colors.length - 1), colors[i]);
  }

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 8; // thicker line
  ctx.shadowColor = colors[Math.floor(colors.length / 2)];
  ctx.shadowBlur = 50; // glow intensity
  ctx.stroke();
}

function animate() {
  // fade background slightly instead of full clear (gives glowing trails)
  ctx.fillStyle = '#1C1C1C';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw multiple glowing waves
  drawRibbon(["#00ffff", "#ff00ff", "#00ff00"], 0);
  drawRibbon(["#ff0080", "#ff8000", "#ffff00"], Math.PI / 3);
  drawRibbon(["#377E80", "#C64623"], Math.PI / 1.5);

  requestAnimationFrame(animate);
}

animate();