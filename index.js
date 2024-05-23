
document.addEventListener('DOMContentLoaded', function () {
    
    let usedUsernames = [];

    
    let signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault(); 
            let username = document.getElementById("signup-username").value;
            let email = document.getElementById("signup-email").value;
            let password = document.getElementById("signup-password").value;
            let confirmPassword = document.getElementById("confirm-password").value;

            
            if (usedUsernames.includes(username.toLowerCase())) {
                alert("Username is already taken");
                return;
            }

            
            if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[@#$%^&*(),.?":{}|<>]/.test(password)) {
                alert("Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters");
                return;
            }

            
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            
            let newUser = {
                username: username,
                email: email,
                password: password
            };

            window.location.href = "Login.html";
            fetch("http://localhost:5500/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(user => {
                alert("User added: " );

                
                usedUsernames.push(username.toLowerCase());
                
            })
            .catch(error => {
                console.error("Error adding user:", error);
                alert("Error adding user. Please try again.");
            });

            
            document.getElementById("signup-form").reset();
        });
    }

    
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); 
            let loginEmail = document.getElementById("login-email").value;
            let loginPassword = document.getElementById("login-password").value;

            
            fetch("http://localhost:5500/users") 
            .then(response => response.json())
            .then(data => {
                
                let user = data.find(user => user.email === loginEmail);

                if (!user) {
                    alert("Email not found. Please sign up first.");
                    return;
                }

                
                if (loginPassword !== user.password) {
                    alert("Incorrect password");
                    return;
                }

                
                alert("Login successful!");
            
                window.location.href = "index.html";
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                alert("Error fetching user data. Please try again.");
            });
        });
    }
});
