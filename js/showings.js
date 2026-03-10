async function fetchShowings() {
    const response = await fetch(`${API_BASE}/showings`);
    const showings = await response.json();

    const showingList = document.getElementById('showingList');
    showingList.innerHTML = '';

    showings.filter(s => s.status === 'SCHEDULED').forEach(showing => {
        const li = document.createElement('li');
        const ageLimit = showing.movie.ageLimit ? `${showing.movie.ageLimit}+` : 'All ages';
        const date = new Date(showing.startTime).toLocaleString('da-DK');

        li.textContent = `${showing.movie.title} - ${ageLimit} - ${showing.theatre.name} - ${date}`;

        const cancelBtn = document.createElement('button')
        cancelBtn.textContent = 'Cancel'
        cancelBtn.onclick = () => cancelShowing(showing.id)

        li.appendChild(cancelBtn)
        showingList.appendChild(li);
    });
}

async function cancelShowing(id) {
    if (!confirm('Are you sure? All associated reservations & tickets will also be cancelled.')) return;

    const response = await fetch(`${API_BASE}/showings/${id}`, {
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

fetchShowings();