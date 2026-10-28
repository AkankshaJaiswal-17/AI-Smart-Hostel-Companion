/* =========================================
   LIVORA JAVASCRIPT
   ========================================= */


/* PAGE TITLES */

const names = {

    dashboard: "Dashboard",
    profile: "My Profile",
    room: "My Room",
    compatibility: "Compatibility",
    complaints: "Complaints",
    visitors: "Visitors",
    mess: "Mess",
    lostfound: "Lost & Found",
    notices: "Hostel Notices",
    notifications: "Notifications",
    settings: "Settings"

};


/* =========================================
   AUTH: LOGIN / SIGNUP SWITCH
   ========================================= */

function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {

        toast("Please enter your email and password");
        return;

    }

    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("livoraChat").style.display = "block";

    initApp();
}

function goToSignup() {

    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "flex";

}

function goToLogin() {

    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "flex";

}

function submitSignup(event) {

    event.preventDefault();

    let pw = document.getElementById("signupPassword").value;
    let confirmPw = document.getElementById("signupConfirmPassword").value;

    if (pw !== confirmPw) {

        toast("Passwords do not match");
        return;

    }

    toast("Account created. Please login.");

    goToLogin();

}

function togglePassword(id, button) {

    let input = document.getElementById(id);
    let icon = button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}


/* =========================================
   FORGOT PASSWORD
   ========================================= */

function forgotPassword() {

    document.getElementById("modalTitle").textContent = "Reset Password";

    document.getElementById("modalBody").innerHTML =

        '<p class="small-text">' +
        'Enter your registered email address ' +
        'to receive a password reset link.' +
        '</p>' +

        '<label>Email Address</label>' +

        '<input id="resetEmail" type="email" placeholder="Enter your email">' +

        '<button class="btn full" onclick="sendResetLink()">' +
        'Send Reset Link' +
        '</button>' +

        '<button class="btn ghost full" onclick="closeModal()">' +
        'Back to Login' +
        '</button>';

    document.getElementById("modal").classList.add("show");

}

function sendResetLink() {

    let email = document.getElementById("resetEmail").value.trim();

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
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "flex";
    document.getElementById("livoraChat").style.display = "none";
}


/* =========================================
   PAGE NAVIGATION
   ========================================= */

function showPage(id, button) {

    document.querySelectorAll(".page").forEach(function (page) {

        page.classList.remove("active");

    });

    document.getElementById(id).classList.add("active");

    document.getElementById("title").textContent = names[id];

    document.querySelectorAll(".nav button").forEach(function (btn) {

        btn.classList.remove("active");

    });

    if (button) {

        button.classList.add("active");

    } else {

        document.querySelectorAll(".nav button span").forEach(function (span) {

            if (span.textContent.trim().toLowerCase() === (names[id] || "").toLowerCase()) {

                span.closest("button").classList.add("active");

            }

        });

    }

    let sidebar = document.querySelector(".sidebar");

    if (sidebar.classList.contains("open")) {

        sidebar.classList.remove("open");

    }

    window.scrollTo(0, 0);

}

function toggleSidebar() {

    document.querySelector(".sidebar").classList.toggle("open");

}


/* =========================================
   EDIT PROFILE
   ========================================= */

function openEdit() {

    document.getElementById("modalTitle").textContent = "Edit Profile";

    document.getElementById("modalBody").innerHTML =

        '<label>Full Name</label>' +
        '<input id="editName" value="Aman Singh">' +

        '<label>Mobile Number</label>' +
        '<input id="editMobile" value="+91 98XXXXXX21">' +

        '<label>Hometown</label>' +
        '<input id="editHometown" value="Lucknow, UP">' +

        '<label>Languages Known</label>' +
        '<input id="editLanguages" value="Hindi, English">' +

        '<button class="btn full" onclick="saveProfile()">' +
        'Save' +
        '</button>';

    document.getElementById("modal").classList.add("show");

}

function saveProfile() {

    closeModal();
    toast("Profile updated");

}


/* =========================================
   CHANGE PASSWORD
   ========================================= */

function openChangePassword() {

    document.getElementById("modalTitle").textContent = "Change Password";

    document.getElementById("modalBody").innerHTML =

        '<label>Current Password</label>' +
        '<input type="password" placeholder="Enter current password">' +

        '<label>New Password</label>' +
        '<input type="password" placeholder="Enter new password">' +

        '<label>Confirm New Password</label>' +
        '<input type="password" placeholder="Confirm new password">' +

        '<button class="btn full" onclick="closeModal();toast(\'Password updated\')">' +
        'Update Password' +
        '</button>';

    document.getElementById("modal").classList.add("show");

}


/* =========================================
   NEW COMPLAINT
   ========================================= */

function openComplaint() {

    document.getElementById("modalTitle").textContent = "New Complaint";

    document.getElementById("modalBody").innerHTML =

        '<label>Category</label>' +

        '<select id="category">' +
        '<option>Cleaning</option>' +
        '<option>Electrical</option>' +
        '<option>Plumbing</option>' +
        '<option>Wi-Fi</option>' +
        '<option>Furniture</option>' +
        '<option>Room</option>' +
        '<option>Other</option>' +
        '</select>' +

        '<label>Problem</label>' +

        '<textarea id="problem" rows="4" placeholder="Write your problem"></textarea>' +

        '<button class="btn full" onclick="addComplaint()">' +
        'Submit' +
        '</button>';

    document.getElementById("modal").classList.add("show");

}

let complaintCounter = 1025;

function addComplaint() {

    let table = document.getElementById("complaintTable");
    let row = table.insertRow(-1);

    let text = document.getElementById("problem").value.trim();
    let category = document.getElementById("category").value;

    if (!text) {

        text = "New Complaint";

    }

    row.innerHTML =

        "<td>#" + complaintCounter + "</td>" +
        "<td>" + safe(text) + "</td>" +
        "<td>" + category + "</td>" +
        "<td><span class='status yellow'>Submitted</span></td>";

    complaintCounter++;

    let countEl = document.getElementById("complaintCount");
    countEl.textContent = (parseInt(countEl.textContent, 10) + 1).toString();

    closeModal();

    addNotification("Complaints", "Complaint Submitted",
        "Your " + category.toLowerCase() + " complaint has been submitted.");

    toast("Complaint submitted");

}


/* =========================================
   VISITORS
   ========================================= */

function openVisitor() {

    document.getElementById("modalTitle").textContent = "Add Visitor";

    document.getElementById("modalBody").innerHTML =

        '<label>Visitor Name</label>' +
        '<input id="visitorName" placeholder="Visitor name">' +

        '<label>Relation</label>' +
        '<input id="relation" placeholder="Brother / Friend / Parent">' +

        '<label>Visit Date</label>' +
        '<input id="visitDate" type="date">' +

        '<label>Additional Information (optional)</label>' +
        '<textarea id="visitorNote" rows="2" placeholder="Any extra details"></textarea>' +

        '<button class="btn full" onclick="addVisitor()">' +
        'Add' +
        '</button>';

    document.getElementById("modal").classList.add("show");

}

function addVisitor() {

    let table = document.getElementById("visitorTable");
    let row = table.insertRow(-1);

    let name = document.getElementById("visitorName").value.trim();
    let relation = document.getElementById("relation").value.trim();

    if (!name) {

        name = "New Visitor";

    }

    if (!relation) {

        relation = "Guest";

    }

    row.innerHTML =

        "<td>" + safe(name) + "</td>" +
        "<td>" + safe(relation) + "</td>" +
        "<td>Today</td>" +
        "<td><span class='status yellow'>Pending Approval</span></td>";

    closeModal();

    toast("Visitor request added");

}

function respondVisitor(allow) {

    let card = document.getElementById("visitorRequestCard");

    if (allow) {

        toast("Visitor approved");

        addNotification("Visitors", "Visitor Approved", "Raj Singh's visit request was approved.");

    } else {

        toast("Visitor denied");

        addNotification("Visitors", "Visitor Denied", "Raj Singh's visit request was denied.");

    }

    if (card) {

        card.style.display = "none";

    }

    let pendingEl = document.getElementById("visitorPendingCount");

    if (pendingEl) {

        pendingEl.textContent = "0";

    }

}


/* =========================================
   MESS
   ========================================= */

const weeklyMenu = {

    Monday: { Breakfast: "Upma • Boiled Egg • Milk", Lunch: "Rice • Dal • Roti • Aloo Sabzi", Snacks: "Tea • Samosa", Dinner: "Roti • Rice • Chana • Salad" },
    Tuesday: { Breakfast: "Idli • Sambhar • Milk", Lunch: "Rice • Rajma • Roti • Salad", Snacks: "Tea • Biscuits", Dinner: "Roti • Rice • Paneer • Dal" },
    Wednesday: { Breakfast: "Paratha • Curd • Pickle", Lunch: "Rice • Dal • Roti • Bhindi", Snacks: "Coffee • Pakora", Dinner: "Roti • Rice • Mix Veg • Dal" },
    Thursday: { Breakfast: "Poha • Bread • Milk", Lunch: "Rice • Dal • Roti • Kofta", Snacks: "Tea • Sandwich", Dinner: "Roti • Rice • Egg Curry • Salad" },
    Friday: { Breakfast: "Chola Bhatura • Milk", Lunch: "Rice • Dal • Roti • Palak Paneer", Snacks: "Tea • Biscuits", Dinner: "Roti • Rice • Dal • Salad" },
    Saturday: { Breakfast: "Dosa • Sambhar • Milk", Lunch: "Rice • Dal • Roti • Mixed Veg", Snacks: "Tea • Cutlet", Dinner: "Roti • Rice • Chicken/Soya • Dal" },
    Sunday: { Breakfast: "Chole Puri • Milk", Lunch: "Special Thali", Snacks: "Tea • Pastry", Dinner: "Roti • Rice • Paneer • Sweet" }

};

function toggleWeeklyMenu() {

    let card = document.getElementById("weeklyMenuCard");

    if (card.style.display === "none") {

        card.style.display = "block";
        buildWeekTabs();

    } else {

        card.style.display = "none";

    }

}

function buildWeekTabs() {

    let tabsEl = document.getElementById("weekTabs");

    if (tabsEl.childElementCount > 0) {

        return;

    }

    Object.keys(weeklyMenu).forEach(function (day, index) {

        let btn = document.createElement("button");
        btn.textContent = day;

        if (index === 0) {

            btn.classList.add("active");

        }

        btn.onclick = function () {

            document.querySelectorAll("#weekTabs button").forEach(function (b) {

                b.classList.remove("active");

            });

            btn.classList.add("active");

            renderWeekDay(day);

        };

        tabsEl.appendChild(btn);

    });

    renderWeekDay("Monday");

}

function renderWeekDay(day) {

    let menu = weeklyMenu[day];
    let body = document.getElementById("weekMenuBody");

    body.innerHTML =

        '<div class="row"><span>Breakfast</span><span>' + menu.Breakfast + '</span></div>' +
        '<div class="row"><span>Lunch</span><span>' + menu.Lunch + '</span></div>' +
        '<div class="row"><span>Snacks</span><span>' + menu.Snacks + '</span></div>' +
        '<div class="row"><span>Dinner</span><span>' + menu.Dinner + '</span></div>';

}

let selectedFeedback = null;

function selectFeedback(button, value) {

    document.querySelectorAll(".feedback-btn").forEach(function (b) {

        b.classList.remove("selected");

    });

    button.classList.add("selected");

    selectedFeedback = value;

}

function submitMessFeedback() {

    if (!selectedFeedback) {

        toast("Please select a feedback option");
        return;

    }

    document.querySelectorAll(".feedback-btn").forEach(function (b) {

        b.classList.remove("selected");

    });

    document.getElementById("messFeedbackText").value = "";

    selectedFeedback = null;

    toast("Thank you for your feedback");

}


/* =========================================
   LOST & FOUND
   ========================================= */

let lostFoundItems = [

    { id: 1, name: "Black Wallet", category: "Personal Items", type: "Lost", location: "Near Mess Hall", date: "18 Aug", description: "Black leather wallet with college ID inside.", status: "Lost" },
    { id: 2, name: "Blue Water Bottle", category: "Personal Items", type: "Found", location: "Block A Common Room", date: "17 Aug", description: "Steel blue bottle, dent on the bottom.", status: "Found" },
    { id: 3, name: "Physics Notebook", category: "Books / Notes", type: "Lost", location: "Library", date: "15 Aug", description: "Spiral notebook with green cover.", status: "Returned" },
    { id: 4, name: "Room Key Bunch", category: "Keys", type: "Found", location: "Block A Stairs", date: "14 Aug", description: "3 keys on a red keychain.", status: "Found" }

];

function renderLostFound() {

    let grid = document.getElementById("lfGrid");

    if (!grid) {

        return;

    }

    let search = document.getElementById("lfSearch").value.trim().toLowerCase();
    let filter = document.getElementById("lfFilter").value;
    let category = document.getElementById("lfCategory").value;

    let filtered = lostFoundItems.filter(function (item) {

        let matchesSearch = item.name.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search);

        let matchesFilter = filter === "All" || item.status === filter;

        let matchesCategory = category === "All" || item.category === category;

        return matchesSearch && matchesFilter && matchesCategory;

    });

    if (filtered.length === 0) {

        grid.innerHTML = '<p class="small-text">No items match your search.</p>';
        return;

    }

    grid.innerHTML = filtered.map(function (item) {

        let statusClass = item.status === "Returned" ? "green" : (item.status === "Found" ? "blue" : "yellow");
        let icon = item.type === "Lost" ? "fa-magnifying-glass" : "fa-box-open";

        return (

            '<div class="lf-card">' +

            '<div class="lf-card-top">' +
            '<div class="lf-icon"><i class="fa-solid ' + icon + '"></i></div>' +
            '<span class="status ' + statusClass + '">' + item.status + '</span>' +
            '</div>' +

            '<b>' + safe(item.name) + '</b>' +

            '<p class="lf-meta"><i class="fa-solid fa-tag"></i> ' + safe(item.category) + '</p>' +
            '<p class="lf-meta"><i class="fa-solid fa-location-dot"></i> ' + safe(item.location) + '</p>' +
            '<p class="lf-meta"><i class="fa-solid fa-calendar"></i> ' + safe(item.date) + '</p>' +

            '<p class="lf-desc">' + safe(item.description) + '</p>' +

            '<button class="btn ghost full" onclick="claimItem(' + item.id + ')">Contact / Claim Item</button>' +

            '</div>'

        );

    }).join("");

}

function claimItem(id) {

    toast("A claim request has been sent to the reporter");

}

function openReport(type) {

    let title = type === "lost" ? "Report Lost Item" : "Report Found Item";
    let locationLabel = type === "lost" ? "Last Seen Location" : "Found Location";

    document.getElementById("modalTitle").textContent = title;

    document.getElementById("modalBody").innerHTML =

        '<label>Item Name</label>' +
        '<input id="lfItemName" placeholder="Item name">' +

        '<label>Category</label>' +

        '<select id="lfItemCategory">' +
        '<option>Electronics</option>' +
        '<option>Books / Notes</option>' +
        '<option>Keys</option>' +
        '<option>Clothing</option>' +
        '<option>Bags</option>' +
        '<option>Cards / ID</option>' +
        '<option>Personal Items</option>' +
        '<option>Room Items</option>' +
        '<option>Other</option>' +
        '</select>' +

        '<label>Description</label>' +
        '<textarea id="lfItemDesc" rows="3" placeholder="Describe the item"></textarea>' +

        '<label>' + locationLabel + '</label>' +
        '<input id="lfItemLocation" placeholder="Where">' +

        '<label>Date</label>' +
        '<input id="lfItemDate" type="date">' +

        '<label>Photo (optional)</label>' +
        '<input type="file" accept="image/*">' +

        '<button class="btn full" onclick="submitReport(\'' + type + '\')">Submit Report</button>';

    document.getElementById("modal").classList.add("show");

}

function submitReport(type) {

    let name = document.getElementById("lfItemName").value.trim();
    let category = document.getElementById("lfItemCategory").value;
    let description = document.getElementById("lfItemDesc").value.trim();
    let location = document.getElementById("lfItemLocation").value.trim();

    if (!name) {

        toast("Please enter the item name");
        return;

    }

    let status = type === "lost" ? "Lost" : "Found";

    lostFoundItems.unshift({

        id: Date.now(),
        name: name,
        category: category,
        type: status,
        location: location || "Not specified",
        date: "Today",
        description: description || "No description provided.",
        status: status

    });

    closeModal();

    renderLostFound();

    addNotification("Lost & Found", "Report Submitted", name + " has been listed under " + status + " items.");

    toast("Report submitted");

}


/* =========================================
   NOTIFICATIONS
   ========================================= */

let notifications = [

    { id: 1, category: "Visitors", title: "New Visitor Request", message: "Raj Singh is waiting at the gate.", time: "3 min ago", unread: true, page: "visitors" },
    { id: 2, category: "Complaints", title: "Complaint Updated", message: "Your bathroom cleaning complaint is now In Progress.", time: "1 hr ago", unread: true, page: "complaints" },
    { id: 3, category: "Compatibility", title: "Compatibility Ready", message: "Your roommate compatibility result is ready.", time: "3 hr ago", unread: true, page: "compatibility" },
    { id: 4, category: "Mess", title: "Mess Update", message: "Dinner timing has been extended until 9:30 PM.", time: "Yesterday", unread: false, page: "mess" },
    { id: 5, category: "Lost & Found", title: "Lost & Found", message: "A possible match was found for your lost item.", time: "2 days ago", unread: false, page: "lostfound" }

];

let notifFilter = "All";

function addNotification(category, title, message) {

    notifications.unshift({

        id: Date.now(),
        category: category,
        title: title,
        message: message,
        time: "Just now",
        unread: true,
        page: categoryToPage(category)

    });

    renderNotifications();
    updateNotifBadge();

}

function categoryToPage(category) {

    let map = {

        "Visitors": "visitors",
        "Complaints": "complaints",
        "Mess": "mess",
        "Compatibility": "compatibility",
        "Lost & Found": "lostfound",
        "Room": "room",
        "Notices": "notices"

    };

    return map[category] || "notifications";

}

function setNotifFilter(filter, button) {

    notifFilter = filter;

    document.querySelectorAll(".filter-chip").forEach(function (chip) {

        chip.classList.remove("active");

    });

    button.classList.add("active");

    renderNotifications();

}

function renderNotifications() {

    let list = document.getElementById("notifList");

    if (!list) {

        return;

    }

    let filtered = notifications.filter(function (n) {

        if (notifFilter === "All") return true;
        if (notifFilter === "Unread") return n.unread;
        return n.category === notifFilter;

    });

    if (filtered.length === 0) {

        list.innerHTML = '<p class="small-text">No notifications here.</p>';
        return;

    }

    list.innerHTML = filtered.map(function (n) {

        let iconMap = {

            "Visitors": "fa-user-plus visitor",
            "Complaints": "fa-clipboard-list complaint",
            "Mess": "fa-utensils mess",
            "Compatibility": "fa-people-arrows compatibility",
            "Lost & Found": "fa-box-open lostfound",
            "Notices": "fa-bullhorn notice"

        };

        let iconClass = iconMap[n.category] || "fa-bell";

        return (

            '<div class="notif-item ' + (n.unread ? "unread" : "") + '" onclick="openNotification(' + n.id + ')">' +

            '<div class="notif-icon ' + iconClass.split(" ")[1] + '"><i class="fa-solid ' + iconClass.split(" ")[0] + '"></i></div>' +

            '<div class="notif-item-body">' +
            '<b>' + safe(n.title) + '</b>' +
            '<p>' + safe(n.message) + '</p>' +
            '</div>' +

            '<span class="notif-time">' + safe(n.time) + '</span>' +

            '</div>'

        );

    }).join("");

}

function openNotification(id) {

    let notif = notifications.find(function (n) { return n.id === id; });

    if (!notif) {

        return;

    }

    notif.unread = false;

    updateNotifBadge();
    renderNotifications();

    let targetButton = null;

    document.querySelectorAll(".nav button span").forEach(function (span) {

        if (span.textContent.trim().toLowerCase() === (names[notif.page] || "").toLowerCase()) {

            targetButton = span.closest("button");

        }

    });

    showPage(notif.page, targetButton);

}

function markAllRead() {

    notifications.forEach(function (n) {

        n.unread = false;

    });

    renderNotifications();
    updateNotifBadge();

    toast("All notifications marked as read");

}

function updateNotifBadge() {

    let count = notifications.filter(function (n) { return n.unread; }).length;
    let badge = document.getElementById("notifBadge");

    if (!badge) {

        return;

    }

    if (count > 0) {

        badge.textContent = count;
        badge.style.display = "inline-block";

    } else {

        badge.style.display = "none";

    }

}


/* =========================================
   SETTINGS / THEME
   ========================================= */

function setTheme(mode) {

    localStorage.setItem("livora-theme", mode);

    applyTheme(mode);

}

function applyTheme(mode) {

    let resolved = mode;

    if (mode === "system") {

        resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    }

    if (resolved === "dark") {

        document.documentElement.setAttribute("data-theme", "dark");

    } else {

        document.documentElement.removeAttribute("data-theme");

    }

    document.querySelectorAll(".theme-btn").forEach(function (btn) {

        btn.classList.remove("active");

    });

    let activeId = mode === "dark" ? "themeDark" : (mode === "system" ? "themeSystem" : "themeLight");
    let activeBtn = document.getElementById(activeId);

    if (activeBtn) {

        activeBtn.classList.add("active");

    }

}

function initTheme() {

    let saved = localStorage.getItem("livora-theme") || "light";

    applyTheme(saved);

}


/* =========================================
   MODAL / TOAST
   ========================================= */

function closeModal() {

    document.getElementById("modal").classList.remove("show");

}

function safe(text) {

    return String(text).replace(

        /[&<>"']/g,

        function (x) {

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

function toast(text) {

    let t = document.getElementById("toast");

    t.textContent = text;
    t.style.display = "block";

    clearTimeout(window.__toastTimer);

    window.__toastTimer = setTimeout(function () {

        t.style.display = "none";

    }, 2500);

}


/* =========================================
   APP INIT
   ========================================= */

function initApp() {

    renderLostFound();
    renderNotifications();
    updateNotifBadge();

}

document.addEventListener("DOMContentLoaded", function () {

    initTheme();

});


document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.getElementById("livoraChatButton");
    const chatWindow = document.getElementById("livoraChatWindow");
    const closeButton = document.getElementById("livoraChatClose");

    if (!chatButton || !chatWindow || !closeButton) {
        console.error("Livora AI chat elements not found.");
        return;
    }

    chatButton.addEventListener("click", function () {
        chatWindow.hidden = false;
        chatButton.style.display = "none";
        document.getElementById("livoraChatInput").focus();
    });

    closeButton.addEventListener("click", function () {
        chatWindow.hidden = true;
        chatButton.style.display = "inline-flex";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("livoraChatForm");
    const chatInput = document.getElementById("livoraChatInput");
    const chatMessages = document.getElementById("livoraChatMessages");

    if (!chatForm || !chatInput || !chatMessages) {
        console.error("Livora AI message elements not found.");
        return;
    }

    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const message = chatInput.value.trim();

        if (!message) return;

        // Display user's message
        const userMessage = document.createElement("div");
        userMessage.className = "user-message";
        userMessage.textContent = message;
        chatMessages.appendChild(userMessage);

        // Clear the input
        chatInput.value = "";

       // Temporary FAQ response
        const reply = document.createElement("div");
        reply.className = "ai-message";

        const question = message.toLowerCase().trim();
        let answer = "";

        if (/^(hi|hello|hey|hii|good morning|good evening)\b/.test(question)) {
            answer =
                "Hi! Welcome to Livora 💚 I can help you with mess, complaints, rooms, roommates and visitors. What would you like to know?";
        } else if (
            question.includes("mess") ||
            question.includes("food") ||
            question.includes("menu") ||
            question.includes("timing")
        ) {
            answer =
                "For the mess schedule, food menu and meal timings, please check the Mess section on your Livora dashboard. I don't have verified timings to share yet.";
        } else if (
            question.includes("complaint") ||
            question.includes("repair") ||
            question.includes("problem") ||
            question.includes("issue")
        ) {
            answer =
                "Need to report a hostel issue? Open the Complaints section on your Livora dashboard to submit or track your complaint.";
        } else if (
            question.includes("roommate") ||
            question.includes("room") ||
            question.includes("sharing")
        ) {
            answer =
                "Looking for room or roommate information? Visit the Room or Roommate Compatibility section on your Livora dashboard.";
        } else if (
            question.includes("visitor") ||
            question.includes("guest") ||
            question.includes("visit")
        ) {
            answer =
                "For visitor registration and visitor-related information, please open the Visitors section on your Livora dashboard.";
        } else if (
            question.includes("thank") ||
            question.includes("thanks")
        ) {
            answer =
                "You're welcome! 💚 I'm here to help make hostel life easier.";
        } else if (
            question.includes("help") ||
            question.includes("what can you do")
        ) {
            answer =
                "I can guide you to Livora's Mess, Complaints, Room, Roommate Compatibility and Visitors sections. Ask me about any of these!";
        } else {
            answer =
                "I'm still learning! 💚 Try asking me about mess, complaints, rooms, roommates or visitors.";
        }

        // Show typing indicator
        const typing = document.createElement("div");
        typing.className = "ai-message";
        typing.textContent = "Livora AI is typing...";
        typing.setAttribute("aria-live", "polite");

        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(function () {
            // If Clear Chat was used, don't add an old reply afterward
            if (!typing.isConnected) return;

            typing.remove();

            reply.textContent = answer;
            chatMessages.appendChild(reply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 700);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const quickReplies = document.getElementById("livoraQuickReplies");
    const chatInput = document.getElementById("livoraChatInput");
    const chatForm = document.getElementById("livoraChatForm");

    if (!quickReplies || !chatInput || !chatForm) {
        console.error("Livora quick-reply elements not found.");
        return;
    }

    quickReplies.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-question]");

        if (!button) return;

        chatInput.value = button.dataset.question;
        chatForm.requestSubmit();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const clearButton = document.getElementById("livoraChatClear");
    const chatMessages = document.getElementById("livoraChatMessages");

    if (!clearButton || !chatMessages) {
        console.error("Livora Clear Chat elements not found.");
        return;
    }

    clearButton.addEventListener("click", function () {
        chatMessages.replaceChildren();

        const welcomeMessage = document.createElement("div");
        welcomeMessage.className = "ai-message";
        welcomeMessage.textContent =
            "Hi! I'm Livora AI. How can I help you with your hostel-related questions?";

        chatMessages.appendChild(welcomeMessage);
    });
});

/* ===== LIVORA RANKED ROOMMATE RECOMMENDATIONS ===== */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("compatibilityForm");
    if (!form) return;

    const profiles = [
        {
            name: "Rahul Kumar",
            sleep: "regular",
            study: "quiet",
            clean: "very",
            noise: "low",
            routine: "balanced"
        },
        {
            name: "Vikram Sharma",
            sleep: "late",
            study: "group",
            clean: "moderate",
            noise: "high",
            routine: "night"
        },
        {
            name: "Arjun Verma",
            sleep: "early",
            study: "music",
            clean: "moderate",
            noise: "medium",
            routine: "morning"
        }
    ];

    const factors = [
        { key: "sleep", input: "prefSleep", label: "Sleeping Schedule", weight: 25 },
        { key: "study", input: "prefStudy", label: "Study Preference", weight: 25 },
        { key: "clean", input: "prefClean", label: "Cleanliness", weight: 20 },
        { key: "noise", input: "prefNoise", label: "Noise Preference", weight: 15 },
        { key: "routine", input: "prefRoutine", label: "Daily Routine", weight: 15 }
    ];

    function analyseCompatibility(event) {
        event.preventDefault();

        const preferences = {};

        for (const factor of factors) {
            const input = document.getElementById(factor.input);

            if (!input || !input.value) {
                alert("Please select all five preferences first.");
                return;
            }

            preferences[factor.key] = input.value;
        }

        // Compare all roommates and calculate weighted scores
        const ranked = profiles.map(function (profile) {
            let score = 0;
            const matched = [];
            const different = [];

            factors.forEach(function (factor) {
                const isMatch =
                    preferences[factor.key] === profile[factor.key];

                score += (isMatch ? 100 : 35) * factor.weight / 100;

                if (isMatch) {
                    matched.push(factor.label);
                } else {
                    different.push(factor.label);
                }
            });

            return {
                name: profile.name,
                score: Math.round(score),
                matched: matched,
                different: different
            };
        });

        // Sort from highest to lowest compatibility
        ranked.sort(function (a, b) {
            return b.score - a.score;
        });

        const best = ranked[0];

        const scoreElement = document.getElementById("compatScore");
        const labelElement = document.getElementById("compatLabel");
        const summaryElement = document.getElementById("compatSummary");
        const factorsElement = document.getElementById("compatFactors");
        const suggestionElement = document.getElementById("compatSuggestion");

        if (scoreElement) {
            scoreElement.textContent = best.score + "%";
        }

        if (labelElement) {
            labelElement.textContent =
                best.score >= 80 ? "Strong Match" :
                best.score >= 60 ? "Moderate Match" :
                "Needs Discussion";
        }

        if (summaryElement) {
            summaryElement.textContent =
                "Best match: " + best.name + ". " +
                best.matched.length + " of 5 preferences match.";
        }

        if (factorsElement) {
            factorsElement.innerHTML = factors.map(function (factor) {
                const matched =
                    preferences[factor.key] ===
                    profiles.find(p => p.name === best.name)[factor.key];

                const value = matched ? 100 : 35;

                return `
                    <div class="factor-row">
                        <div class="factor-label">
                            <span>${factor.label}</span>
                            <b>${matched ? "Match" : "Difference"}</b>
                        </div>
                        <div class="progress">
                            <div style="width:${value}%"></div>
                        </div>
                    </div>
                `;
            }).join("");
        }

        if (suggestionElement) {
            suggestionElement.textContent =
                "Similar preferences: " +
                (best.matched.join(", ") || "None") +
                ". Discuss differences: " +
                (best.different.join(", ") || "None") + ".";
        }

        // Display every roommate in ranked order
        const recommendationBox =
            document.getElementById("roommateRecommendations");

        if (recommendationBox) {
            recommendationBox.innerHTML = ranked.map(function (roommate, index) {
                const rank = [
                    "🥇 Best Match",
                    "🥈 Second Best Match",
                    "🥉 Third Best Match"
                ][index];

                return `
                    <article class="card" style="margin-top:12px;">
                        <h3>${rank}</h3>
                        <h4>${roommate.name}</h4>
                        <p><strong>Compatibility: ${roommate.score}%</strong></p>
                        <p>${roommate.matched.length} of 5 preferences match.</p>
                        <p><strong>Matches:</strong>
                            ${roommate.matched.join(", ") || "None"}</p>
                        <p><strong>Discuss:</strong>
                            ${roommate.different.join(", ") || "None"}</p>
                    </article>
                `;
            }).join("");
        }

        const dashboardScore =
            document.getElementById("dashCompatibility");

        if (dashboardScore) {
            dashboardScore.textContent = best.score + "%";
        }
    }

    form.addEventListener("submit", analyseCompatibility);
});