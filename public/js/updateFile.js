// const errorCard = document.getElementById('errorCard')
const userForm = document.getElementById('change-picture-container')

userForm.addEventListener('submit', postRegister)

async function postRegister(event) {
    event.preventDefault(event)

    const errorAlert = event.target.children[1]
    const form = event.target
    const userData = new FormData(form)
    const options = {
        method: 'POST',
        body: userData,
        redirect: 'follow',

    }

    try {
        const response = await fetch(form.action, options)
        console.log(response)
        if(response.status >= 400) {
            const json = await response.json()
            console.log(JSON.stringify(json))
            errorAlert.innerHTML = json.errors[0].msg
            errorAlert.style.display = 'block'
        } else {
            window.location.href = response.url
        }

    } catch(e) {
        console.log(e)
    }


}