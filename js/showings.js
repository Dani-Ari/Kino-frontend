async function fetchShowings() {
    const response = await fetch('http://localhost:8080/showings');
    const showings = await response.json();

    const showingList = document.getElementById('showingList');
    showingList.innerHTML = '';

    showings.filter(s => s.status === 'ACTIVE').forEach(showing => {
        const li = document.createElement('li');
        const ageLimit = showing.movie.ageLimit ? `${showing.movie.ageLimit}+` : 'All ages';
        const date = new Date(showing.startTime).toLocaleString('da-DK');

        li.textContent = `${showing.movie.title} - ${ageLimit} - ${showing.theatre.name} - ${date}`;

        const cancelBtn = document.createElement('button')
        cancelBtn.textContent = 'Cancel'
        cancelBtn.onclick = () => cancelShowing(showing.id)

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.onclick = () => deleteShowing(showing.id)

        li.appendChild(cancelBtn)
        li.appendChild(deleteBtn)
        showingList.appendChild(li);
    });
}

async function cancelShowing(id) {
    if (!confirm('Are you sure? All associated reservations & tickets will also be cancelled.')) return;

    const response = await fetch(`http://localhost:8080/showings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CANCELLED'})
    });

    if (response.ok) {
        fetchShowings();
    } else {
        alert('Something went wrong!')
    }
}


async function deleteShowing(id) {
    if (!confirm('Are you sure? All associated reservations & tickets will also be deleted.')) return;

    const response = await fetch(`http://localhost:8080/showings/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchShowings();
    } else {
        alert('Something went wrong!')
    }
}

fetchShowings();