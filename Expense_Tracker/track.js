// track.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expense-form");
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");

  let total = 0;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const amount = parseInt(amountInput.value);

    if (name === "" || amount < 0 || isNaN(amount)) {
      alert("Please Enter Valid Name and Amount");
      nameInput.value = "";
      amountInput.value = "";
    }
    const li = document.createElement("li");
    li.innerHTML = `
    ${name} - $${amount.toFixed(2)}
    <button class = "delete-btn">Delete</button>
    `;
    expenseList.appendChild(li);

    // Delete Logic

    li.querySelector(".delete-btn").addEventListener("click", () => {
      total -= amount;
      expenseList.removeChild(li);
      updateTotal();
    });
    total += amount;
    updateTotal();
    form.reset();
  });

  function updateTotal() {
    totalAmount.textContent = total.toFixed(2);
  }
});
