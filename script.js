console.log("JS pieslēgts un darbojas");

const productEl = document.getElementById("product");
const qtyEl = document.getElementById("qty");
const shippingEl = document.getElementById("shipping");
const promoEl = document.getElementById("promo");
const btn = document.getElementById("calcBtn");
const resultEl = document.getElementById("result");

const prices = {
  t_krekls: 12.99,
  kapuce: 29.99,
  kruze: 7.50
};

const shippingPrices = {
  pakomats: 2.50,
  kurjers: 5.00,
  sanemt: 0.00
};


function calculateTotal(productKey, qty, shippingKey, promo) {
  const itemPrice = prices[productKey];
  const shipPrice = shippingPrices[shippingKey];

  let subtotal = itemPrice * qty;
  let discount = 0;

  if (promo === true) {
    discount = subtotal * 0.10;
  }

  const total = subtotal - discount + shipPrice;

  return {
    itemPrice,
    shipPrice,
    subtotal,
    discount,
    total
  };
}

btn.addEventListener("click", () => {
  resultEl.textContent = "";
  resultEl.className = "result";
  document.body.classList.remove("highlight");

  const productKey = productEl.value;
  const shippingKey = shippingEl.value;

  const qtyRaw = qtyEl.value.trim();

  if (qtyRaw === "") {
    resultEl.textContent = "Kļūda: ievadi daudzumu.";
    resultEl.classList.add("err");
    return;
  }

  const qty = Number(qtyRaw);

  if (!Number.isInteger(qty) || qty <= 0) {
    resultEl.textContent = "Kļūda: daudzumam jābūt veselam skaitlim, kas lielāks par 0.";
    resultEl.classList.add("err");
    return;
  }

  const data = calculateTotal(productKey, qty, shippingKey, promoEl.checked);

  resultEl.classList.add("ok");
  resultEl.textContent =
    "Cena par 1 gab.: " + data.itemPrice.toFixed(2) + " € | " +
    "Daudzums: " + qty + " | " +
    "Piegāde: " + data.shipPrice.toFixed(2) + " € | " +
    "Atlaide: -" + data.discount.toFixed(2) + " € | " +
    "Kopā: " + data.total.toFixed(2) + " €";

  if (data.total > 50) {
    document.body.classList.add("highlight");
  }
});
