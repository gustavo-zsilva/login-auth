// Variáveis
const navigateScreenBtns = document.querySelectorAll('.change-screen')

const loginContainer = document.querySelector('.login')
const registerContainer = document.querySelector('.register')

const forms = document.querySelectorAll('form')
const submitButtons = document.querySelectorAll('button[type=submit]')

let credentials = JSON.parse(localStorage.getItem('register_credentials')) || [];

// Métodos
navigateScreenBtns.forEach(btn => btn.addEventListener('click', changeScreen))
forms.forEach(form => form.addEventListener('submit', submitFields))

// Faz as mudanças do formulário de login para o de registro, e vice-versa.
function changeScreen(event) {
    event.preventDefault();

    loginContainer.classList.toggle('hide')
    registerContainer.classList.toggle('hide')
}

// Faz os testes iniciais para checar se os inputs poderão ser validados.
function submitFields(event) {
    event.preventDefault()

    const currentForm = event.target;
    const formInputs = currentForm.querySelectorAll('section .field input')

    let isValidated = [];

    formInputs.forEach(input => isValidated.push(input.value === ''))

    if (isValidated.includes(true)) {
        swal(
            'Calma aí!',
            'Preencha todos campos para continuar.',
            'warning'
        )
   
    } else {
        let formValues = [];
       
        formInputs.forEach(input => formValues.push(input.value));

        currentForm.classList.contains('register-form')
        ? registerUser(formValues)
        : loginUser(formValues)
    }
}

// Cuida de permitir ou não o registro de um usuário.
function registerUser(formValues) {

    if (formValues[2] !== formValues[3]) {
        swal(
            'Sua senha pode ter sido escrita errada.',
            'Verifique-a novamente para continuar.',
            'warning'
        )

        return;
    }

    localStorage.setItem('register_credentials', JSON.stringify(formValues))
    location.reload();
}

// Cuida de permitir ou não o login de um usuário.
async function loginUser(formValues) {

    // Checa se o usuário e a senha vão ao encontro do registro.
    if (formValues[0] === credentials[0] && formValues[1] === credentials[2]) {

        await swal(
            'Bom trabalho!',
            'Você está logado agora!',
            'success'
        )

        location.reload()
    } else {

        swal(
            'Oops...',
            `Parece que algo deu errado na autenticação. <br> Verifique suas credenciais mais uma vez.`,
            'error'
        )
    }

}

