const revenue = document.getElementById("revenue"),
  calculatorForm = document.getElementById("calculator_form"),
  itemPrice = document.getElementById("item_price"),
  workedDays = document.getElementById("worked_days"),
  result = document.getElementById("result"),
  resultDays = document.getElementById("result_days"),
  resultDesc = document.getElementById("result_desc"),
  resultAmount = document.getElementById("result_amount");

function animateNumberGrowth(
  element,
  startValue,
  endValue,
  duration = 1000,
  formatFunc = null
) {
  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeOutQuad = (progress) => progress * (2 - progress);
    const currentValue =
      startValue + (endValue - startValue) * easeOutQuad(progress);

    element.textContent =
      progress === 1
        ? formatFunc
          ? formatFunc(endValue)
          : endValue.toFixed(2)
        : formatFunc
        ? formatFunc(currentValue)
        : currentValue.toFixed(2);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function showResult(days) {
  result.classList.remove("hidden");
  resultDays.innerText = days.toFixed(2);
  let desc;
  switch (true) {
    case days < 1:
      desc =
        "Custa menos que um dia de trabalho. Parece acessível, mas é bom ficar atento!";
      break;
    case days >= 1 && days < 7:
      desc =
        "Menos que uma semana de trabalho. Vale a pena refletir, mas parece viável.";
      break;
    case days >= 7 && days < 30:
      desc =
        "Mais que uma semana de trabalho. Está começando a pesar, pense bem antes de decidir.";
      break;
    case days >= 30 && days < 365:
      let months = Math.ceil(days / 30);
      desc = `Quase ${months} meses (${Math.round(
        days
      )} dias). Está começando a exigir esforço significativo, vale a pena avaliar as prioridades.`;
      break;
    case days >= 365:
      desc =
        "Mais que um ano de trabalho. É preciso pensar com calma, organizar bem as finanças para não comprometer a estabilidade.";
      break;
  }
  resultDesc.innerText = desc;
}

function calculateDays() {
  const revenueValue = revenue.value,
    itemPriceValue = itemPrice.value,
    workedDaysValue = workedDays.value;

  if (!revenueValue || !itemPriceValue || !workedDaysValue) {
    return;
  }

  const perDay = revenueValue / workedDaysValue;
  const days = itemPriceValue / perDay;

  animateNumberGrowth(resultDays, 0, days);

  animateNumberGrowth(resultAmount, 0, perDay, 1000, formatCurrency);

  showResult(days);
}

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateDays();
});
