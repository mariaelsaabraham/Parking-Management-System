document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const successMsg = document.getElementById("successMsg");

    errorMsg.style.display = "none";
    successMsg.textContent = "";

    // Gmail validation
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Password min 10 characters
    const passwordPattern = /^.{10,}$/;

    // Special character check
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    if (!gmailPattern.test(username)) {
        errorMsg.textContent = "Email must be a valid @gmail.com address.";
        errorMsg.style.display = "block";
        return;
    }

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

    // Save user
    localStorage.setItem("email", username);
    localStorage.setItem("password", password);

    successMsg.textContent = "Account created successfully!";
});
