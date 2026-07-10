// ===============================
// Expense Tracker System
// script.js
// ===============================

// Check Login
if (
    window.location.pathname.includes("dashboard.html") &&
    localStorage.getItem("login") !== "true"
) {
    window.location = "index.html";
}

// Load Data
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Update Dashboard
function updateDashboard() {

    let income = 0;
    let expense = 0;

    const historyTable = document.getElementById("historyTable");

    if (historyTable) {

        historyTable.innerHTML = "";

        transactions.forEach((transaction, index) => {

            if (transaction.type === "Income") {
                income += Number(transaction.amount);
            } else {
                expense += Number(transaction.amount);
            }

            historyTable.innerHTML += `
            <tr>
                <td>${transaction.title}</td>
                <td>${transaction.type}</td>
                <td>₹ ${transaction.amount}</td>
                <td>${transaction.date}</td>
                <td>
                    <button class="delete-btn"
                    onclick="deleteTransaction(${index})">
                    Delete
                    </button>
                </td>
            </tr>`;
        });

    }

    let balance = income - expense;

    document.getElementById("income").innerText = income.toFixed(2);
    document.getElementById("expense").innerText = expense.toFixed(2);
    document.getElementById("balance").innerText = balance.toFixed(2);

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add Transaction
function addTransaction() {

    let title = document.getElementById("title").value.trim();
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if (title === "" || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    let transaction = {
        title: title,
        amount: amount,
        type: type,
        date: new Date().toLocaleDateString()
    };

    transactions.push(transaction);

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

    updateDashboard();
}

// Delete Transaction
function deleteTransaction(index) {

    if (confirm("Delete this transaction?")) {
        transactions.splice(index, 1);
        updateDashboard();
    }

}

// Logout
function logout() {

    localStorage.removeItem("login");

    window.location = "index.html";

}

// Load Dashboard
if (document.getElementById("historyTable")) {
    updateDashboard();
}