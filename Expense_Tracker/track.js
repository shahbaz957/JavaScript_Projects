document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expense-form");
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || []; // for storing expenses objects with unique id , name and amount
  let totalAmount = totalAmountCalculate();
  renderElement();
  updateTotal();
  // console.log(expenses);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    if (name !== "" && amount > 0 && !isNaN(amount)) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveLocalStorage();
      renderElement();
      updateTotal();
      // Clearing the Input

      nameInput.value = "";
      amountInput.value = "";
    }
  });

  function renderElement() {
    //
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
      ${expense.name} - $${expense.amount}
      <button data-id = "${expense.id}">Delete</button>
      `;
      expenseList.appendChild(li);
    });
  }

  // ************************* Deleting the ExpenseList *****************************
  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const elementID = e.target.getAttribute("data-id");
      expenses = expenses.filter((expense) => expense.id != elementID);
      saveLocalStorage();
      renderElement();
      updateTotal();
    }
  });

  function totalAmountCalculate() {
    // calculate the total amount using array of objects
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
  function saveLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function updateTotal() {
    totalAmount = totalAmountCalculate();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }
  console.log(totalAmount);
});
