"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function validateName(name) {
    return name.trim() !== "";
}
function validateEmail(email) {
    return email.trim() !== "";
}
function validatePassword(password) {
    return password.trim() !== "";
}
function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}
function displayError(elementId, show, message = "") {
    const element = document.getElementById(elementId);
    element.style.display = show ? "block" : "none";
    if (message)
        element.textContent = message;
}
const popUp = document.getElementById("pop-up");
const formRegister = document.getElementById("form-register");
const formLogin = document.getElementById("form-login");
const openPopUp = () => {
    popUp.classList.add("show");
    setTimeout(() => {
        popUp.classList.remove("show");
    }, 20000);
};
if (formRegister) {
    formRegister.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const nameRegister = document.getElementById("name-register").value;
            const emailRegister = document.getElementById("email-login").value;
            const passwordRegister = document.getElementById("password-login").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            // Reset error messages
            displayError("name-error", false);
            displayError("email-error", false);
            displayError("password-error", false);
            displayError("confirm-password-error", false);
            // Validate form inputs
            if (!validateName(nameRegister)) {
                displayError("name-error", true, "Name is required");
                return;
            }
            if (!validateEmail(emailRegister)) {
                displayError("email-error", true, "Email is required");
                return;
            }
            if (!validatePassword(passwordRegister)) {
                displayError("password-error", true, "Password is required");
                return;
            }
            if (!validateConfirmPassword(passwordRegister, confirmPassword)) {
                displayError("confirm-password-error", true, "Passwords do not match");
                return;
            }
            // Register user
            const response = yield fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: Date.now().toString(),
                    fname: nameRegister,
                    email: emailRegister,
                    password: passwordRegister,
                }),
            });
            if (response.ok) {
                openPopUp();
                // formRegister.reset();
            }
            else {
                const result = yield response.json();
                alert("Error: " + result.message);
            }
        });
    });
}
if (formLogin) {
    formLogin.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const emailLogin = document.getElementById("email-login").value;
            const passwordLogin = document.getElementById("password-login").value;
            // Reset error messages
            displayError("email-error", false);
            displayError("password-error", false);
            // Validate form inputs
            if (!validateEmail(emailLogin)) {
                displayError("email-error", true, "Email is required");
                return;
            }
            if (!validatePassword(passwordLogin)) {
                displayError("password-error", true, "Password is required");
                return;
            }
            // Login user
            const response = yield fetch(`http://localhost:3001/users?email=${emailLogin}&password=${passwordLogin}`);
            const users = yield response.json();
            if (users.length === 0) {
                alert("Invalid email or password");
            }
            else {
                alert("Login successful!");
            }
        });
    });
}
