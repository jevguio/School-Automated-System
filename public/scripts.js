document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const bookingList = document.getElementById('bookingList');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const dateInput = document.getElementById('dateInput');
    let isEditing = false;
    let currentLi;
    let currentBookingId;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (isEditing) {
            updateBooking(currentBookingId, nameInput.value, emailInput.value, dateInput.value);
        } else {
            addBooking(nameInput.value, emailInput.value, dateInput.value);
        }
        resetForm();
    });

    function addBooking(name, email, date) {
        fetch('/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ name, email, date })
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = `${name} (${email}) - ${date}`;
            li.dataset.id = data.id;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => {
                editBooking(data.id, name, email, date);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteBooking(data.id, li);
            });

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            bookingList.appendChild(li);
        });
    }

    function editBooking(id, name, email, date) {
        nameInput.value = name;
        emailInput.value = email;
        dateInput.value = date;
        isEditing = true;
        currentBookingId = id;
    }

    function updateBooking(id, name, email, date) {
        fetch(`/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ name, email, date })
        })
        .then(response => response.json())
        .then(data => {
            const li = document.querySelector(`li[data-id='${id}']`);
            li.textContent = `${name} (${email}) - ${date}`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => {
                editBooking(id, name, email, date);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteBooking(id, li);
            });

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            isEditing = false;
            currentBookingId = null;
        });
    }

    function deleteBooking(id, li) {
        fetch(`/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        })
        .then(() => {
            li.remove();
        });
    }

    function resetForm() {
        nameInput.value = '';
        emailInput.value = '';
        dateInput.value = '';
        isEditing = false;
        currentBookingId = null;
    }
});
