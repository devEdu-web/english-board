const errorCard = document.getElementById('errorCard')

document.userForm.onsubmit = postRegister

async function postRegister(event) {
    event.preventDefault(event)

    const form = event.target
    const userData = new FormData(form)
    const options = {
        method: form.method,
        body: new URLSearchParams(userData),
        redirect: 'follow',

    }

    try {

        const response = await fetch(form.action, options)
        
        if(response.status >= 400) {
            const json = await response.json()
            errorCard.style.display = 'block'
            errorCard.innerHTML = json.errors[0].msg
        } else {
            window.location.href = response.url
        }

    } catch(e) {
        throw e
    }


}