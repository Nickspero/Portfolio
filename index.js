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