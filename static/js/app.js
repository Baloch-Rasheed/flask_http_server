// Simple e-commerce demo JS
// Renders products, handles cart state, and basic checkout (alert)

const PRODUCTS = [
  {id:1,name:'Coffee Mug',price:9.99,desc:'Ceramic mug, 12oz'},
  {id:2,name:'T-Shirt',price:19.99,desc:'100% cotton unisex tee'},
  {id:3,name:'Notebook',price:6.5,desc:'A5 lined notebook'},
  {id:4,name:'Sticker Pack',price:4.0,desc:'Set of 8 vinyl stickers'},
  {id:5,name:'Bluetooth Speaker',price:29.99,desc:'Compact portable speaker'}
];

const STORAGE_KEY = 'mini-shop-cart';
let cart = loadCart();

function loadCart(){
  try{const raw=localStorage.getItem(STORAGE_KEY);return raw?JSON.parse(raw):{} }catch(e){return {}}
}
function saveCart(){localStorage.setItem(STORAGE_KEY,JSON.stringify(cart))}

function formatPrice(n){return `$${n.toFixed(2)}`}

function renderProducts(){
  const out = document.getElementById('products');
  out.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'product';
    el.innerHTML = `
      <div class="thumb">${p.name}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">${formatPrice(p.price)}</div>
      <div style="margin-top:auto;display:flex;gap:8px;">
        <button class="btn" data-id="${p.id}" onclick="addToCart(${p.id})">Add</button>
        <button class="btn" onclick="alert('Quick view for ${p.name}')">View</button>
      </div>
    `;
    out.appendChild(el);
  })
}

function addToCart(id, qty=1){
  const key = String(id);
  cart[key] = (cart[key]||0) + qty;
  saveCart();
  renderCart();
}

function removeFromCart(id){
  const key = String(id);
  delete cart[key];
  saveCart();
  renderCart();
}

function changeQty(id, value){
  const key=String(id);
  value = Number(value)||0;
  if(value<=0){ removeFromCart(id); return; }
  cart[key]=value;
  saveCart();
  renderCart();
}

function cartTotal(){
  let total = 0; Object.keys(cart).forEach(k=>{
    const p = PRODUCTS.find(x=>x.id===Number(k));
    if(p) total += p.price * cart[k];
  });
  return total;
}

function updateCartCount(){
  const count = Object.values(cart).reduce((s,v)=>s+v,0);
  document.getElementById('cart-count').textContent = count;
}

function renderCart(){
  const el = document.getElementById('cart-items');
  el.innerHTML = '';
  const keys = Object.keys(cart);
  if(keys.length===0){ el.innerHTML = '<p class="empty">Your cart is empty.</p>'; }
  else{
    keys.forEach(k=>{
      const p = PRODUCTS.find(x=>x.id===Number(k));
      if(!p) return;
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = `
        <div class="meta">
          <div class="name">${p.name}</div>
          <div class="sub">${formatPrice(p.price)}</div>
        </div>
        <div class="qty">
          <input type="number" min="0" value="${cart[k]}" style="width:64px" onchange="changeQty(${p.id}, this.value)" />
          <div style="margin-top:6px"><button class="btn" onclick="removeFromCart(${p.id})">Remove</button></div>
        </div>
      `;
      el.appendChild(item);
    })
  }
  document.getElementById('cart-total').textContent = formatPrice(cartTotal());
  updateCartCount();
  document.getElementById('checkout').disabled = Object.keys(cart).length===0;
}

function toggleCartPanel(){
  const panel = document.getElementById('cart-panel');
  panel.classList.toggle('open');
  // simple focus
  if(panel.classList.contains('open')) panel.querySelector('input, button')?.focus();
}

function checkout(){
  const total = cartTotal();
  if(total<=0){ alert('Your cart is empty.'); return; }
  // Simple simulated checkout
  alert(`Thank you for your purchase! Total: ${formatPrice(total)}`);
  cart = {};
  saveCart();
  renderCart();
}

// expose to window for inline onclick handlers
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
window.toggleCartPanel = toggleCartPanel;
window.checkout = checkout;

// wire UI
window.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  renderCart();
  document.getElementById('cart-toggle').addEventListener('click', ()=>{
    // simple visual cue: scroll to cart or toggle open class
    const panel = document.getElementById('cart-panel');
    panel.scrollIntoView({behavior:'smooth',block:'center'});
  });
  document.getElementById('checkout').addEventListener('click', checkout);
});
