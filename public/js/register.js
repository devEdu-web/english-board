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
        console.log(response)
        const json = await response.json()
        console.log(JSON.stringify(json))

    } catch(e) {
        console.log(e)
    }


}