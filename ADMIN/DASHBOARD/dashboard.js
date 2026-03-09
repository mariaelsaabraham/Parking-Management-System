// Initialize Supabase client
const supabaseClient = supabase.createClient(
    "https://ahvjvezeusaedzqljlzk.supabase.co",
    "sb_publishable_tLf_mZd_Hu94uTUszvgILQ_tLtmtVVn"
);

// Show selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");

    if (sectionId === "locations") {
        loadLocations(); // fetch latest locations
    }
}

// Display a location in the table with Edit & Delete buttons
function addLocationToTable(location) {
    const tbody = document.getElementById("tableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${location.name}</td>
        <td>${location.city}</td>
        <td>${location.latitude}</td>
        <td>${location.longitude}</td>
        <td>
            <button class="btn-edit" onclick="editLocation(${location.id}, '${location.name}', '${location.city}')">Edit</button>
            <button class="btn-delete" onclick="deleteLocation(${location.id})">Delete</button>
        </td>
    `;
    tbody.appendChild(row);
}

// Fetch all locations from Supabase and display
async function loadLocations() {
    const { data, error } = await supabaseClient.from("locations").select("*");
    if (error) {
        console.error(error);
        alert("Error fetching locations from database");
        return;
    }

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = ""; // clear old rows
    data.forEach(location => addLocationToTable(location));
}

// Delete a location
async function deleteLocation(id) {
    if (!confirm("Are you sure you want to delete this location?")) return;

    const { error } = await supabaseClient
        .from('locations')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Error deleting location");
        console.error(error);
    } else {
        alert("Location deleted successfully!");
        loadLocations(); // refresh table
    }
}

// Edit a location
async function editLocation(id, oldName, oldCity) {
    const newName = prompt("Enter new parking name:", oldName);
    if (!newName) return;

    const newCity = prompt("Enter new city:", oldCity);
    if (!newCity) return;

    const { error } = await supabaseClient
        .from('locations')
        .update({ name: newName, city: newCity })
        .eq('id', id);

    if (error) {
        alert("Error updating location");
        console.error(error);
    } else {
        alert("Location updated successfully!");
        loadLocations(); // refresh table
    }
}