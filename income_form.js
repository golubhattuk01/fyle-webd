document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#incomeForm");
  form.addEventListener("submit", handleFormSubmit);
});

function calculateTax(ageGroup, netIncome) {
  if (netIncome <= 8) return 0; // No tax for income ≤ 8 Lakhs

  const excessIncome = netIncome - 8;
  let taxRate;

  switch (ageGroup) {
    case "<40":
      taxRate = 0.3;
      break;
    case "40-59":
      taxRate = 0.4;
      break;
    case ">=60":
      taxRate = 0.1;
      break;
    default:
      throw new Error("Invalid age group");
  }

  return excessIncome * taxRate;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const grossIncome =
    parseFloat(document.getElementById("grossIncome").value) || 0;
  const extraIncome =
    parseFloat(document.getElementById("extraIncome").value) || 0;
  const deductions =
    parseFloat(document.getElementById("deductions").value) || 0;
  const ageGroup = document.getElementById("ageGroup").value;

  if (!ageGroup) {
    alert("Age group is mandatory");
    return;
  }

  const netIncome = (grossIncome + extraIncome - deductions) / 100000; // Convert to Lakhs
  const tax = calculateTax(ageGroup, netIncome);

  // Update modal content
  document.getElementById("netIncome").textContent = `${netIncome.toFixed(2)}`; // Fixed to 2 decimal places
  document.getElementById("taxAmount").textContent = `${tax.toFixed(2)}`; // Fixed to 2 decimal places

  // Show the modal
  $("#resultModal").modal("show");
}
