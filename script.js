// Variáveis
const navigateScreenBtns = document.querySelectorAll('.change-screen')
const deleteButton = document.querySelector('.delete-account')

const loginContainer = document.querySelector('.login')
const registerContainer = document.querySelector('.register')

const forms = document.querySelectorAll('form')
const submitButtons = document.querySelectorAll('button[type=submit]')

let credentials = JSON.parse(localStorage.getItem('register_credentials')) || [];

// Métodos
navigateScreenBtns.forEach(btn => btn.addEventListener('click', changeScreen))
forms.forEach(form => form.addEventListener('submit', submitFields))
deleteButton.addEventListener('click', deleteAccount)

// Faz as mudanças do formulário de login para o de registro, e vice-versa.
function changeScreen(event) {
    event.preventDefault();

    loginContainer.classList.toggle('hide')
    registerContainer.classList.toggle('hide')
}

console.log(credentials);

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
        let formValues = [...credentials];

        const usernameRegister = document.querySelector('#username-register')
        const userPhoto = document.querySelector('#user-photo')
        const passwordRegister = document.querySelector('#password-register')
        const passwordConfirm = document.querySelector('#password-confirm')
       
        formValues.push({
            username: usernameRegister.value,
            imageUrl: userPhoto.value,
            password: passwordRegister.value,
            passwordConfirm: passwordConfirm.value
        });

        currentForm.classList.contains('register-form')
        ? registerUser(formValues)
        : loginUser(formValues)
    }
}

// Cuida de permitir ou não o registro de um usuário.
async function registerUser(formValues) {

    if (!checkRegisterFields(formValues)) return;

    localStorage.setItem('register_credentials', JSON.stringify(formValues))

    await swal(
        'Cadastro realizado com sucesso!',
        'Agora você já pode se logar.',
        'success'
    )

    location.reload();
}

// Cuida de permitir ou não o login de um usuário.
async function loginUser(formValues) {

    const lastRegister = formValues[formValues.length - 1];

    const slicedFormValues = formValues.slice(0, formValues.length - 1);

    const inputPassword = document.querySelector('input#password')
    const inputUsername = document.querySelector('input#username')

    console.log(lastRegister);

    /* ------ */

    const hasLoginPermission = (username, password) => {
        let isUsernameAndPasswordRegistered = false;

        for (let userRegister of slicedFormValues) {
            let currentUserRegister = Object.values(userRegister)

            if (currentUserRegister.includes(username) && currentUserRegister.includes(password)) {
                return isUsernameAndPasswordRegistered = true;
            }
        }

        return isUsernameAndPasswordRegistered;
    }

    /* ------- */

    // Checa se o usuário e a senha vão ao encontro do registro.
    if (hasLoginPermission(inputUsername.value, inputPassword.value)) {

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


// Checa todos campos do cadastro, retorna falso juntamente com a mensagem de erro
// se achar erros, e verdadeiro caso contrário.
function checkRegisterFields(formValues) {

    const lastRegister = formValues[formValues.length - 1]

    let { username, imageUrl, password, passwordConfirm } = lastRegister;
    let slicedFormValues = formValues.slice(0, formValues.length - 1);

    const isRegistered = (register) => {
        let isNameOnRegister = false;

        for (let userRegister of slicedFormValues) {
            if (Object.values(userRegister).indexOf(register) > -1) {
                console.log(`Found ${register}`);
                return isNameOnRegister = true;
            }
        }

        return isNameOnRegister;
    }

    if (password !== passwordConfirm) {
        swal(
            'Sua senha pode ter sido escrita errada.',
            'Verifique-a novamente para continuar.',
            'warning'
        )

        return false;

    } if (password.length <= 6) {
        swal(
            'Digite uma senha com mais de 6 caracteres!',
            '',
            'warning'
        )

        return false;

    } if (isRegistered(username)) {
        swal(
            'Um cadastro já existe com este nome.',
            'Escolha um nome diferente ou tente logar.',
            'error'
        )

        return false;
    }

    return true;
}


function saveToStorage() {

}


// Deleta a conta selecionada
function deleteAccount() {
    openModal()
}


function openModal() {

    let accountsArray = [];

    swal({
        title: 'Qual conta deseja deletar?',
        showCancelButton: true,
        input: 'text',
        confirmButtonText: `Deletar`,
        cancelButtonText: `Não vou deletar nada.`,
        confirmButtonColor: 'red',
    }).then(result => {
        if (result.isConfirmed) {
            swal(
                'Deletado!',
                'A conta foi deletada.',
                'success'
            )
        }
    
    })

  
    

}
