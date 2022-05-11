const errorCard = document.getElementById('errorCard')
const userForm = document.getElementById('change-picture-container')

document.userForm.onsubmit = postRegister

async function postRegister(event) {
    event.preventDefault(event)

    const form = event.target
    const userData = new FormData(form)
    const options = {
        method: 'POST',
        body: userData,
        redirect: 'follow',

    }


    try {
        const response = await fetch(form.action, options)
        if(response.status >= 400) {
            const json = await response.json()
            errorCard.innerHTML = json.errors[0].msg
            errorCard.style.display = 'block'

            setTimeout(() => {
                errorCard.style.display = 'none'
            }, 2000)

        } else {
            window.location.href = response.url
        }

    } catch(e) {
        throw e
    }


}