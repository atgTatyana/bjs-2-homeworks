"use strict"
function solveEquation(a, b, c) {
  let arr = [];
  let discriminant = b ** 2 - 4 * a * c;
  if (discriminant === 0) {
    arr[0] = -b / (2 * a);
  } else if (discriminant > 0) {
      arr[0] = (-b + Math.sqrt(discriminant)) / (2 * a);
      arr[1] = (-b - Math.sqrt(discriminant)) / (2 * a);
  }
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  if (isNaN(percent) || isNaN(contribution) || isNaN(amount) || isNaN(countMonths)) {
    return false;
  }
  percent = +percent;
  contribution = +contribution;
  amount = +amount;
  countMonths = +countMonths;
  let percentMonth = percent / 100 / 12;
  let credit = amount - contribution;
  let payment = credit * (percentMonth + (percentMonth / (((1 + percentMonth) ** countMonths) - 1)));
  let totalPayment = (payment * countMonths).toFixed(2);
  return +totalPayment;
} 