const form = document.getElementById('reserveForm');

const selectedTickets = [];

async function fetchShowings() {

    const response = await fetch(`${API_BASE}/showings`);
    const showings = await response.json();

    const showingSelect = document.getElementById('showing');

    showingSelect.innerHTML = '';

    showings.forEach(showing => {

        const option = document.createElement('option');
        option.value = showing.id;

        const date = new Date(showing.startTime).toLocaleString('da-DK');

        option.textContent =
        `${showing.movie.title} - ${showing.theatre.name} - ${date}`;

        showingSelect.appendChild(option);

    });

    loadSeats();
}

document.getElementById('showing').addEventListener('change', loadSeats);

async function loadSeats() {

    const showingId = document.getElementById('showing').value;

    const response =
    await fetch(`${API_BASE}/reservations/showing/${showingId}/available`);

    const tickets = await response.json();

    const container = document.getElementById('seatContainer');

    container.innerHTML = '';

    selectedTickets.length = 0;

    tickets.forEach(ticket => {

        const button = document.createElement('button');

        button.type = 'button';

        button.textContent =
        `Row ${ticket.seat.rowIndex} Seat ${ticket.seat.seatNumber}`;

        button.onclick = () => toggleSeat(ticket.id, button);

        container.appendChild(button);

    });

}

function toggleSeat(ticketId, button) {

    const index = selectedTickets.indexOf(ticketId);

    if(index === -1) {

        selectedTickets.push(ticketId);
        button.style.background = 'green';

    } else {

        selectedTickets.splice(index,1);
        button.style.background = '';

    }
}

async function submitReservation(event) {

    event.preventDefault();

    const showingId = parseInt(document.getElementById('showing').value);
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    const reservation = {
        showingId: showingId,
        name: name,
        phone: phone,
        ticketIds: selectedTickets
    };

    const response = await fetch(`${API_BASE}/reservations`, {

        method:'POST',

        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify(reservation)

    });

    if(response.ok){

        alert('Reservation created');
        location.reload();

    }else{

        alert('Something went wrong');

    }

}

fetchShowings();

form.addEventListener('submit', submitReservation);