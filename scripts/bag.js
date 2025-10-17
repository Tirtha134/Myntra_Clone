let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemObjects() {
  bagItemObjects = bagItems.map(itemId => {
    return items.find(item => item.id == itemId);
  });
}

function displayBagItems() {
  const container = document.querySelector('.bag-items-container');
  let html = '';
  bagItemObjects.forEach(item => {
    html += generateItemHTML(item);
  });
  container.innerHTML = html;
}

function generateItemHTML(item) {
  return `
  <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}" alt="${item.item_name}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>
    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">✖</div>
  </div>`;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter(id => id != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
  displayBagIcon();
}

function displayBagSummary() {
  const summary = document.querySelector('.bag-summary');
  let totalItems = bagItemObjects.length;
  let totalMRP = 0, totalDiscount = 0;

  bagItemObjects.forEach(item => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });

  let totalAmount = totalMRP - totalDiscount + 99;

  summary.innerHTML = `
  <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItems} Items)</div>
    <div class="price-item"><span>Total MRP</span><span>₹${totalMRP}</span></div>
    <div class="price-item"><span>Discount on MRP</span><span class="priceDetail-base-discount">-₹${totalDiscount}</span></div>
    <div class="price-item"><span>Convenience Fee</span><span>₹99</span></div>
    <hr>
    <div class="price-footer"><span>Total Amount</span><span>₹${totalAmount}</span></div>
  </div>
  <button class="btn-place-order">PLACE ORDER</button>
  `;
}
