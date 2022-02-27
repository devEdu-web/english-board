const main = document.getElementById('main')
const nameContainer = document.getElementById('change-name-container')
const emailContainer = document.getElementById('change-email-container')
const passwordContainer = document.getElementById('change-password-container')
const allEditContainers = document.getElementsByClassName('edit-container')
const allEditButtons = document.getElementsByClassName('editButton')

const editNameButton = document.getElementById('nameButton')
const emailButton = document.getElementById('emailButton')
const passwordButton = document.getElementById('passwordButton')
const closeButtons = document.getElementsByClassName('close-containers')

for(let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', closeContainers)
}

// closeButton.addEventListener('click', closeContainers)


editNameButton.addEventListener('click', editName)
emailButton.addEventListener('click', editEmail)
passwordButton.addEventListener('click', editPassword)

function editName(event) {
    disableEditButtons()
    main.classList.add('edit-mode')
    nameContainer.style.display = 'block'
}

function editEmail() {
    disableEditButtons()
    main.classList.add('edit-mode')
    emailContainer.style.display = 'block'
}


function editPassword() {
    disableEditButtons()
    main.classList.add('edit-mode')
    passwordContainer.style.display = 'block'
}

function closeContainers() {
    for(let i = 0; i < allEditContainers.length; i++) {
        allEditContainers[i].style.display = 'none'
    }
    enableEditButtons()
    main.classList.remove('edit-mode')

}

function disableEditButtons() {
    for(let i = 0; i < allEditButtons.length; i++) {
        allEditButtons[i].disabled = true
    }
}

function enableEditButtons() {
    for(let i = 0; i < allEditButtons.length; i++) {
        allEditButtons[i].disabled = false
    }
}