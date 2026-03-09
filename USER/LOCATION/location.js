//  Connect to Supabase
const supabaseUrl = "https://ahvjvezeusaedzqljlzk.supabase.co";
const supabaseKey = "sb_publishable_tLf_mZd_Hu94uTUszvgILQ_tLtmtVVn";
window.supabaseClient = window.supabaseClient ||
    window.supabase.createClient(supabaseUrl, supabaseKey);

// Get elements
const goButton = document.getElementById("goButton");
const locationSelect = document.getElementById("locationSelect");

// Load locations from database
async function loadLocations() {
    const { data, error } = await window.supabaseClient
        .from("locations")
        .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        console.error("Error fetching locations:", error);
        return;
    }

    data.forEach(location => {
        const option = document.createElement("option");
        option.value = location.city;
        option.textContent = location.city;
        locationSelect.appendChild(option);
    });
}

// Call function when page loads
loadLocations();

// Your existing button logic (unchanged)
goButton.addEventListener("click", function () {
    const selectedCity = locationSelect.value;

    if (!selectedCity) {
        alert("Please select a location first.");
        return;
    }

    window.location.href = `../PARKING/parking.html?city=${selectedCity}`;
});