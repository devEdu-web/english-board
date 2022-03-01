const errorCard = document.getElementById('errorCard')
const userForms = document.getElementsByClassName('userForm')

for(let i = 0; i < userForms.length; i++) {
    userForms[i].addEventListener('submit', postRegister)
}

async function postRegister(event) {
    event.preventDefault(event)

    const errorAlert = event.target.children[1]
    const form = event.target
    const userData = new FormData(form)
    const options = {
        method: form.method,
        body: new URLSearchParams(userData),
        redirect: 'follow',

    }

    try {
        const response = await fetch(form.action, options)
        
        if(response.status === 400) {
            const json = await response.json()
            console.log(JSON.stringify(json))
            errorAlert.innerHTML = json.errors[0]
            errorAlert.style.display = 'block'
        } else {
            window.location.href = response.url
        }

    } catch(e) {
        console.log(e)
    }


}