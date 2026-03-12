async function fetchReservations() {

    const response = await fetch(`${API_BASE}/reservations`);

    const reservations = await response.json();

    const table = document.getElementById('reservationTable');

    table.innerHTML = '';

    reservations.forEach(reservation => {

        const tr = document.createElement('tr');

        const seats = reservation.tickets
            .map(t => `${t.seat.rowIndex}-${t.seat.seatNumber}`)
            .join(', ');

        const cancelButton =
            reservation.status === 'CONFIRMED'
                ? `<button onclick="cancelReservation(${reservation.id})">Cancel</button>`
                : '';

        tr.innerHTML = `
<td>${reservation.customer.name}</td>
<td>${reservation.customer.phone}</td>
<td>${reservation.showing.movie.title}</td>
<td>${reservation.showing.theatre.name}</td>
<td>${new Date(reservation.showing.startTime).toLocaleString('da-DK')}</td>
<td>${seats}</td>
<td>${reservation.status}</td>
<td>${cancelButton}</td>
`;

        table.appendChild(tr);

    });

}

async function cancelReservation(id) {

    const response = await fetch(`${API_BASE}/reservations/${id}`, {
        method: 'PATCH'
    });

    if (response.ok) {

        fetchReservations();

    } else {

        alert('Cancel failed');

    }

}

fetchReservations();