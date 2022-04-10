const deleteButtons = document.getElementsByClassName('delete-button')

for(button of deleteButtons) {
    const wordRow = button.parentElement
    const wordId = wordRow.dataset.id
    button.addEventListener('click', async () => {
        try {
            const response = await fetch(`/words/delete-word/${wordId}`, {
                method: 'DELETE'
            })

            if(response.status === 200) {
                wordRow.remove()
            }

        } catch (error) {

        }

    })
}

