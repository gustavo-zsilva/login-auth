const triggerButtons = document.querySelectorAll('.change-screen')
const loginForm = document.querySelector('form')
const loginContainer = document.querySelector('.login')
const registerContainer = document.querySelector('.register')

triggerButtons.forEach(btn => {
    btn.addEventListener('click', (event) => renderAnimations(event))
})

function renderAnimations(event) {
    event.preventDefault();


    // if (loginContainer.classList.contains('up')) {
    //     registerContainer.classList.add('up');
    //     loginContainer.classList.remove('down')

    //     loginForm.classList.remove('hide')
    //     registerContainer.classList.add('hide')
    // }

    // loginContainer.classList.add('up')

   

    // loginContainer.addEventListener('animationend', ({animationName}) => {
    //     if (animationName === 'up') {
    //         loginForm.classList.add('hide')

    //         registerContainer.classList.add('down')
    //         registerContainer.classList.remove('hide')
    //         registerContainer.classList.add('up')
    //     }
    // })
}

