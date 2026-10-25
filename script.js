/* =========================================
   LIVORA JAVASCRIPT
   ========================================= */


/* PAGE TITLES */

const names = {

    dashboard: "Dashboard",

    profile: "Student Profile",

    room: "My Room",

    roommate: "Roommate Match",

    complaints: "Complaints",

    visitors: "Visitors",

    notices: "Hostel Notices",

    notifications: "Notifications",

    help: "Hostel Help",

    settings: "Settings"

};


/* =========================================
   LOGIN
   ========================================= */

function login() {

    document.getElementById("login").style.display = "none";

    document.getElementById("app").style.display = "block";
}

/* =========================================
   FORGOT PASSWORD
   ========================================= */

function forgotPassword() {

    document.getElementById("modalTitle")
        .textContent = "Reset Password";


    document.getElementById("modalBody")
        .innerHTML =

        '<p class="small-text">' +
        'Enter your registered email address ' +
        'to receive a password reset link.' +
        '</p>' +

        '<label>Email Address</label>' +

        '<input id="resetEmail" ' +
        'type="email" ' +
        'placeholder="Enter your email">' +

        '<button class="btn full" ' +
        'onclick="sendResetLink()">' +

        'Send Reset Link' +

        '</button>';


    document.getElementById("modal")
        .classList.add("show");
}


/* =========================================
   SEND RESET LINK
   ========================================= */

function sendResetLink() {

    let email =
        document
        .getElementById("resetEmail")
        .value
        .trim();


    if (!email) {

        toast("Please enter your email");

        return;

    }


    closeModal();

    toast("Password reset link sent");
}


/* =========================================
   LOGOUT
   ========================================= */

function logout() {

    document.getElementById("app").style.display = "none";

    document.getElementById("login").style.display = "flex";
}


/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(id, button) {

    document
        .querySelectorAll(".page")
        .forEach(function(page) {

            page.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");


    document
        .getElementById("title")
        .textContent = names[id];


    document
        .querySelectorAll(".nav button")
        .forEach(function(btn) {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }

    window.scrollTo(0, 0);
}


/* =========================================
   EDIT PROFILE
   ========================================= */

function openEdit() {

    document.getElementById("modalTitle")
        .textContent = "Edit Profile";


    document.getElementById("modalBody")
        .innerHTML =

        '<label>Name</label>' +

        '<input value="Aman Singh">' +

        '<label>Phone</label>' +

        '<input value="+91 98XXXXXX21">' +

        '<button class="btn full" ' +

        'onclick="closeModal();toast(\'Profile updated\')">' +

        'Save' +

        '</button>';


    document.getElementById("modal")
        .classList.add("show");
}


/* =========================================
   NEW COMPLAINT
   ========================================= */

function openComplaint() {

    document.getElementById("modalTitle")
        .textContent = "New Complaint";


    document.getElementById("modalBody")
        .innerHTML =

        '<label>Category</label>' +

        '<select id="category">' +

        '<option>Cleaning</option>' +

        '<option>Electrical</option>' +

        '<option>Plumbing</option>' +

        '<option>Room</option>' +

        '<option>Other</option>' +

        '</select>' +

        '<label>Problem</label>' +

        '<textarea id="problem" rows="4" ' +

        'placeholder="Write your problem"></textarea>' +

        '<button class="btn full" ' +

        'onclick="addComplaint()">' +

        'Submit' +

        '</button>';


    document.getElementById("modal")
        .classList.add("show");
}


/* =========================================
   ADD COMPLAINT
   ========================================= */

function addComplaint() {

    let table =
        document.getElementById("complaintTable");


    let row =
        table.insertRow(-1);


    let text =
        document
            .getElementById("problem")
            .value
            .trim();


    let category =
        document
            .getElementById("category")
            .value;


    if (!text) {

        text = "New Complaint";

    }


    row.innerHTML =

        "<td>#1025</td>" +

        "<td>" +
        safe(text) +
        "</td>" +

        "<td>" +
        category +
        "</td>" +

        "<td>" +

        "<span class='status yellow'>" +

        "Pending" +

        "</span>" +

        "</td>";


    document
        .getElementById("complaintCount")
        .textContent = "2";


    closeModal();

    toast("Complaint submitted");
}


/* =========================================
   ADD VISITOR
   ========================================= */

function openVisitor() {

    document.getElementById("modalTitle")
        .textContent = "Add Visitor";


    document.getElementById("modalBody")
        .innerHTML =

        '<label>Name</label>' +

        '<input id="visitorName" ' +
        'placeholder="Visitor name">' +

        '<label>Relation</label>' +

        '<input id="relation" ' +
        'placeholder="Brother / Friend / Parent">' +

        '<button class="btn full" ' +

        'onclick="addVisitor()">' +

        'Add' +

        '</button>';


    document.getElementById("modal")
        .classList.add("show");
}


/* =========================================
   ADD VISITOR
   ========================================= */

function addVisitor() {

    let table =
        document.getElementById("visitorTable");


    let row =
        table.insertRow(-1);


    let name =
        document
            .getElementById("visitorName")
            .value
            .trim();


    let relation =
        document
            .getElementById("relation")
            .value
            .trim();


    if (!name) {

        name = "New Visitor";

    }


    if (!relation) {

        relation = "Guest";

    }


    row.innerHTML =

        "<td>" +
        safe(name) +
        "</td>" +

        "<td>" +
        safe(relation) +
        "</td>" +

        "<td>Today</td>" +

        "<td>" +

        "<span class='status yellow'>" +

        "Pending" +

        "</span>" +

        "</td>";


    closeModal();

    toast("Visitor added");
}


/* =========================================
   CLOSE MODAL
   ========================================= */

function closeModal() {

    document.getElementById("modal")
        .classList.remove("show");
}


/* =========================================
   HOSTEL HELP CHAT
   ========================================= */

function sendMessage() {

    let input =
        document.getElementById("chatInput");


    let text =
        input.value.trim();


    if (!text) {

        return;

    }


    let box =
        document.getElementById("messages");


    box.innerHTML +=

        '<div class="msg me">' +

        safe(text) +

        '</div>';


    input.value = "";


    setTimeout(function() {

        let q = text.toLowerCase();

        let answer =
            "Please contact the hostel office for this issue.";


        if (q.includes("roommate")) {

            answer =
                "Your roommate Rahul Kumar has a 91% match with your preferences.";

        }


        else if (q.includes("complaint")) {

            answer =
                "You can submit a complaint from the Complaints section.";

        }


        else if (q.includes("room")) {

            answer =
                "Your room is 204 in Block A.";

        }


        else if (q.includes("notice")) {

            answer =
                "The next room inspection is on 25 August.";

        }


        box.innerHTML +=

            '<div class="msg bot">' +

            answer +

            '</div>';


        box.scrollTop =
            box.scrollHeight;


    }, 400);
}


/* =========================================
   SAFE TEXT
   ========================================= */

function safe(text) {

    return text.replace(

        /[&<>"']/g,

        function(x) {

            return {

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#039;"

            }[x];

        }

    );
}


/* =========================================
   TOAST
   ========================================= */

function toast(text) {

    let t =
        document.getElementById("toast");


    t.textContent = text;


    t.style.display = "block";


    setTimeout(function() {

        t.style.display = "none";

    }, 2000);
}