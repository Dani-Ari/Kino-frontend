async function fetchReservedTickets() {
    const response = await fetch(`${API_BASE}/tickets`);

    if (!response.ok) {
        alert('Failed to load tickets');
        return;
    }

    const tickets = await response.json();

    const ticketList = document.getElementById('ticketList');
    ticketList.innerHTML = '';

    tickets
        .filter(ticket => ticket.status === 'RESERVED')
        .forEach(ticket => {
            const li = document.createElement('li');

            li.textContent =
                `${ticket.showing.movie.title} - Seat ${ticket.seat.rowIndex}-${ticket.seat.seatNumber}`;

            const sellBtn = document.createElement('button');
            sellBtn.textContent = 'Sell';

            sellBtn.onclick = () => sellTicket(ticket.id);

            li.appendChild(sellBtn);
            ticketList.appendChild(li);
        });
}

async function sellTicket(id) {
    const response = await fetch(`${API_BASE}/tickets/${id}/sell`, {
        method: 'PATCH'
    });

    if (response.ok) {
        fetchReservedTickets();
    } else {
        alert('Something went wrong!');
    }
}

fetchReservedTickets();