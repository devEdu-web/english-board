const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function verifyEmail(email) {

    return email.match(emailRegex)

}

export {verifyEmail}