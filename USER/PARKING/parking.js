// Initialize Supabase
const supabaseClient = supabase.createClient(
    "https://ahvjvezeusaedzqljlzk.supabase.co",
    "sb_publishable_tLf_mZd_Hu94uTUszvgILQ_tLtmtVVn"
);

const title = document.getElementById("title");
const container = document.getElementById("parkingContainer");

// Get city from URL
const params = new URLSearchParams(window.location.search);
const cityName = params.get("city");

if (!cityName) {
    title.innerHTML = "No city selected";
} else {
    loadParkingSpaces(cityName);
}

async function loadParkingSpaces(cityName) {

    const { data, error } = await supabaseClient
        .from("locations")
        .select("*")
        .eq("city", cityName);

    if (error) {
        console.error(error);
        title.innerHTML = "Error loading parking spaces";
        return;
    }

    if (!data || data.length === 0) {
        title.innerHTML = `No parking spaces found in ${cityName}`;
        return;
    }

    title.innerHTML = `Parking Spaces in ${cityName}`;

    data.forEach(space => {
        const div = document.createElement("div");
        div.classList.add("parking");

        div.innerHTML = `
        <h3>${space.name}</h3>
    `;

        div.onclick = function () {
            window.location.href =
                `../BOOKSLOT/bookslot.html?city=${cityName}&parking=${encodeURIComponent(space.name)}`;
        };

        container.appendChild(div);
    });
}