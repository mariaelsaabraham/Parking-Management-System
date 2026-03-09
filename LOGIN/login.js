document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.style.display = "none";

    // Admin rule
    if (username === "admin@gmail.com" && password === "admin123") {
        window.location.href = "../../ADMIN/DASHBOARD/dashboard.html";
        return;
    }

    // ✅ Check if user has signed up (stored in localStorage)
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (!savedEmail) {
        errorMsg.textContent = "No account found. Please sign up first.";
        errorMsg.style.display = "block";
        return;
    }

    // Gmail validation
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.com$/;

    if (!gmailPattern.test(username)) {
        errorMsg.textContent = "Email must be a valid gmail.com,yahoo.com or outlook.com address!";
        errorMsg.style.display = "block";
        return;
    }

    // Password rule: min 10 characters
    const passwordPattern = /^.{10,}$/;

    // Special character check
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    if (!passwordPattern.test(password)) {
        errorMsg.textContent = "Password must be at least 10 characters.";
        errorMsg.style.display = "block";
        return;
    }

    if (!specialCharPattern.test(password)) {
        errorMsg.textContent = "Password must contain a special symbol.";
        errorMsg.style.display = "block";
        return;
    }


     //checking if right pass and username or not
    if (username !== savedEmail || password !== savedPassword) {
        errorMsg.textContent = "Invalid email or password.";
        errorMsg.style.display = "block";
        return;
    }

    // If everything is correct
    window.location.href = "../DASHBOARD/dashboard.html";
});
