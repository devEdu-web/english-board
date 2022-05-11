const deleteButtons = document.getElementsByClassName('delete-button')

for(button of deleteButtons) {
    const hourRow = button.parentElement
    const hourId = hourRow.dataset.id
    const hourAmount = button.parentElement.children[2].innerHTML
    button.addEventListener('click', async () => {
        try {
            const response = await fetch(`/hours/delete-hour?amount_deleted=${hourAmount}&hourInfoId=${hourId}`, {
                method: 'DELETE'
            })

            if(response.status === 200) {
                hourRow.remove()
            }

        } catch (error) {
            throw error
        }

    })
}