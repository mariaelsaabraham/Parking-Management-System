const slotsContainer = document.getElementById("slotsContainer");

let selectedSlot = null;

// Load saved bookings from localStorage
let bookings = JSON.parse(localStorage.getItem("bookings")) || {};

function createSlots() {
    slotsContainer.innerHTML = "";

    // Generate 10 slots
    for (let i = 1; i <= 10; i++) {

        const slotCard = document.createElement("div");
        slotCard.classList.add("slot-card");

        const isBooked = bookings[i];

        slotCard.innerHTML = `
        <h3>Slot ${i}</h3>
        <div class="status ${isBooked ? "occupied" : "available"}" id="status-${i}">
            ${isBooked ? "Occupied" : "Available"}
        </div>
        <br>
        ${isBooked
                ? `<button onclick="cancelBooking(${i})">Cancel</button>`
                : `<button onclick="openForm(${i})">Book Now</button>`
            }

    `;

        slotsContainer.appendChild(slotCard);
    }
}

function openForm(slotNumber) {
    selectedSlot = slotNumber;
    document.getElementById("bookingModal").style.display = "flex";
}

function closeForm() {
    document.getElementById("bookingModal").style.display = "none";
}

function confirmBooking() {
    const name = document.getElementById("userName").value.trim();
    const car = document.getElementById("carName").value.trim();
    const plate = document.getElementById("plateNumber").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const timein = document.getElementById("timeIn").value.trim();
    const timeout = document.getElementById("timeOut").value.trim();

    if (!name || !car || !plate || !phone || !timein || !timeout) {
        alert("Please fill all details");
        return;
    }

    // ✅ Number Plate: 10 characters, CAPITAL letters + numbers only
    const platePattern = /^[A-Z0-9]{10}$/;
    if (!platePattern.test(plate)) {
        alert("Number plate must be 10 characters (CAPITAL letters & numbers only).");
        return;
    }

    // ✅ Phone number: exactly 10 digits
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
    }

    // ✅ Time must contain AM or PM
    const timePattern = /(AM|PM)$/i;
    if (!timePattern.test(timein) || !timePattern.test(timeout)) {
        alert("Time In and Time Out must include AM or PM.");
        return;
    }

    // Store booking info
    bookings[selectedSlot] = {
        name: name,
        car: car,
        plate: plate,
        phone: phone,
        timein: timein,
        timeout: timeout
    };

    localStorage.setItem("bookings", JSON.stringify(bookings));
    closeForm();
    createSlots();
}


function cancelBooking(slotNumber) {
    delete bookings[slotNumber];
    localStorage.setItem("bookings", JSON.stringify(bookings));
    createSlots();
}

createSlots();
