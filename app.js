const P=[
{id:1,name:"Wireless Headphones",cat:"Electronics",price:89,rating:4.6,emoji:"🎧",desc:"Over-ear Bluetooth headphones with 30-hour battery life and noise isolation."},
{id:2,name:"Smart Watch",cat:"Electronics",price:149,rating:4.4,emoji:"⌚",desc:"Track steps, sleep and heart rate. Water resistant with a 7-day battery."},
{id:3,name:"Running Shoes",cat:"Fashion",price:74,rating:4.5,emoji:"👟",desc:"Lightweight, breathable trainers with a cushioned sole for daily runs."},
{id:4,name:"Canvas Backpack",cat:"Fashion",price:49,rating:4.3,emoji:"🎒",desc:"20-litre backpack with a padded laptop sleeve and water-repellent canvas."},
{id:5,name:"Ceramic Mug Set",cat:"Home",price:28,rating:4.7,emoji:"☕",desc:"Set of four hand-glazed 350 ml mugs. Dishwasher and microwave safe."},
{id:6,name:"Desk Lamp",cat:"Home",price:39,rating:4.2,emoji:"💡",desc:"Dimmable LED lamp with three colour temperatures and a USB charging port."},
{id:7,name:"Yoga Mat",cat:"Sports",price:32,rating:4.6,emoji:"🧘",desc:"6 mm non-slip mat with alignment lines and a carry strap."},
{id:8,name:"Water Bottle",cat:"Sports",price:19,rating:4.8,emoji:"🥤",desc:"Insulated steel bottle that keeps drinks cold for 24 hours or hot for 12."}];
const CATS=[...new Set(P.map(p=>p.cat))],STEPS=["Order placed","Processing","Shipped","Out for delivery","Delivered"];
const FORMSPREE=""; // paste your Formspree endpoint here to receive contact messages by email
const $=(s,e=document)=>e.querySelector(s),app=$("#app");
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const money=n=>"$"+n.toFixed(2),esc=s=>String(s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";"),qs=new URLSearchParams(location.search);
const cart=()=>ls("cart",[]),count=()=>cart().reduce((a,i)=>a+i.q,0),find=id=>P.find(p=>p.id==id);
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("s");setTimeout(()=>t.classList.remove("s"),1800)}
function badge(){$("#badge").textContent=count()}
function add(id,q=1){const c=cart(),i=c.find(x=>x.id==id);i?i.q+=q:c.push({id:+id,q});sv("cart",c);badge();toast("Added to cart")}
const card=p=>`<div class="card"><a href="product.html?id=${p.id}"><div class="img">${p.emoji}</div></a><div class="b"><small>${p.cat}</small><a href="product.html?id=${p.id}"><h3>${p.name}</h3></a><div class="row"><b>${money(p.price)}</b><span class="mut">★ ${p.rating}</span></div><button class="btn" data-add="${p.id}">Add to cart</button></div></div>`;
// layout
const page=document.body.dataset.page,links=[["index.html","Home","home"],["shop.html","Shop","shop"],["track.html","Track order","track"],["contact.html","Contact","contact"]];
$("#h").innerHTML=`<div class="w"><a class="logo" href="index.html">Nook&amp;Co</a><nav>${links.map(l=>`<a href="${l[0]}" class="${l[2]==page?"on":""}">${l[1]}</a>`).join("")}<a href="cart.html" class="${page=="cart"?"on":""}">Cart (<span id="badge">0</span>)</a></nav></div>`;
$("#f").innerHTML=`<div class="w row"><span>© ${new Date().getFullYear()} Nook&amp;Co. Everyday things, well made.</span><span>Free shipping over $50</span></div>`;
document.addEventListener("click",e=>{const a=e.target.closest("[data-add]");if(a)add(a.dataset.add)});
badge();
const R={
home(){app.innerHTML=`<div class="w"><div class="hero"><div><h1>Good things for the way you live.</h1><p>Electronics, fashion, home and sports essentials, shipped fast and tracked every step.</p><p><a class="btn" href="shop.html">Shop all products</a> <a class="btn o" href="track.html">Track an order</a></p></div><div class="big">🛍️</div></div>
<section><h2>Shop by category</h2><div class="grid">${CATS.map(c=>`<a class="card" href="shop.html?cat=${c}"><div class="img">${P.find(p=>p.cat==c).emoji}</div><div class="b"><h3>${c}</h3><small>${P.filter(p=>p.cat==c).length} products</small></div></a>`).join("")}</div></section>
<section><h2>Top rated</h2><div class="grid">${[...P].sort((a,b)=>b.rating-a.rating).slice(0,4).map(card).join("")}</div></section></div>`},
shop(){let cat=qs.get("cat")||"All";app.innerHTML=`<div class="w"><section><h1>Shop</h1><div class="tools"><input id="q" type="search" placeholder="Search products" aria-label="Search" value="${esc(qs.get("q")||"")}"><select id="s" aria-label="Sort"><option value="">Featured</option><option value="l">Price: low to high</option><option value="h">Price: high to low</option><option value="r">Top rated</option></select></div><div class="chips" id="c"></div><div class="grid" id="g"></div></section></div>`;
const draw=()=>{$("#c").innerHTML=["All",...CATS].map(c=>`<button class="chip ${c==cat?"on":""}" data-c="${c}">${c}</button>`).join("");
let l=P.filter(p=>(cat=="All"||p.cat==cat)&&p.name.toLowerCase().includes($("#q").value.toLowerCase())),s=$("#s").value;
if(s=="l")l.sort((a,b)=>a.price-b.price);if(s=="h")l.sort((a,b)=>b.price-a.price);if(s=="r")l.sort((a,b)=>b.rating-a.rating);
$("#g").innerHTML=l.map(card).join("")||`<p>No products match. Try a different search or category.</p>`};
$("#c").onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;draw()}};$("#q").oninput=$("#s").onchange=draw;draw()},
product(){const p=find(qs.get("id"));if(!p){app.innerHTML=`<div class="w"><section><h1>Product not found</h1><a class="btn" href="shop.html">Back to shop</a></section></div>`;return}
document.title=p.name+" – Nook&Co";app.innerHTML=`<div class="w"><section><p><a href="shop.html?cat=${p.cat}" class="mut">← ${p.cat}</a></p><div class="two"><div class="card"><div class="img" style="font-size:150px">${p.emoji}</div></div><div><h1>${p.name}</h1><p class="mut">★ ${p.rating} · ${p.cat}</p><h2>${money(p.price)}</h2><p>${p.desc}</p><label for="n">Quantity</label><input id="n" type="number" min="1" max="20" value="1" style="width:90px"><p><button class="btn" id="a">Add to cart</button> <a class="btn o" href="cart.html">View cart</a></p></div></div></section>
<section><h2>You may also like</h2><div class="grid">${P.filter(x=>x.cat==p.cat&&x.id!=p.id||x.cat!=p.cat).slice(0,4).map(card).join("")}</div></section></div>`;
$("#a").onclick=()=>add(p.id,Math.max(1,Math.min(20,+$("#n").value||1)))},
cart(){const draw=()=>{const c=cart(),sub=c.reduce((a,i)=>a+find(i.id).price*i.q,0),ship=sub>50||!sub?0:5.99;
app.innerHTML=`<div class="w"><section><h1>Your cart</h1>${c.length?`<div class="two"><div>${c.map(i=>{const p=find(i.id);return`<div class="item"><span class="e">${p.emoji}</span><div class="row"><div><b>${p.name}</b><br><small>${money(p.price)}</small></div><div class="q"><button data-m="${p.id}" aria-label="Less">−</button> ${i.q} <button data-p="${p.id}" aria-label="More">+</button> <button data-r="${p.id}" aria-label="Remove">✕</button></div></div></div>`}).join("")}</div>
<form class="box" id="co"><p class="row"><span>Subtotal</span><b>${money(sub)}</b></p><p class="row"><span>Shipping</span><b>${ship?money(ship):"Free"}</b></p><p class="row"><span>Total</span><b>${money(sub+ship)}</b></p>
<label for="nm">Full name</label><input id="nm" required><label for="em">Email</label><input id="em" type="email" required><label for="ad">Delivery address</label><textarea id="ad" rows="2" required></textarea><p><button class="btn" style="width:100%">Place order</button></p></form></div>`:`<p>Your cart is empty.</p><a class="btn" href="shop.html">Browse products</a>`}</section></div>`;badge();
const f=$("#co");if(f)f.onsubmit=e=>{e.preventDefault();const id="NK-"+Math.floor(10000+Math.random()*90000),o=ls("orders",{});
o[id]={t:Date.now(),name:$("#nm").value,email:$("#em").value,total:sub+ship,items:c};sv("orders",o);sv("cart",[]);badge();
app.innerHTML=`<div class="w"><section><h1>Thank you!</h1><p class="ok">Order ${id} is confirmed.</p><p>Save this number to follow your delivery.</p><a class="btn" href="track.html?id=${id}">Track this order</a></section></div>`}};
app.onclick=e=>{const t=e.target,c=cart(),g=k=>c.find(i=>i.id==t.dataset[k]);
if(t.dataset.p)g("p").q++;else if(t.dataset.m){const i=g("m");i.q--;if(i.q<1)c.splice(c.indexOf(i),1)}else if(t.dataset.r)c.splice(c.indexOf(g("r")),1);else return;sv("cart",c);draw()};draw()},
track(){app.innerHTML=`<div class="w"><section><h1>Track your order</h1><form class="tools" id="t"><input id="id" placeholder="Order number, e.g. NK-10234" value="${esc(qs.get("id")||"")}" aria-label="Order number" required><button class="btn" style="flex:0 0 auto">Track</button></form><div id="r"></div><p class="mut">Try demo order NK-10001.</p></section></div>`;
const demo={"NK-10001":{t:Date.now()-2*86400000,total:117,items:[{id:1,q:1},{id:8,q:1}]}};
const go=()=>{const id=$("#id").value.trim().toUpperCase(),o={...demo,...ls("orders",{})}[id],r=$("#r");
if(!o){r.innerHTML=`<p class="err">No order found for “${esc(id)}”. Check the number and try again.</p>`;return}
const h=(Date.now()-o.t)/36e5,s=Math.min(4,Math.floor(h/12)); // demo: status advances every 12 hours
r.innerHTML=`<div class="box"><h3>Order ${esc(id)}</h3><p class="mut">Placed ${new Date(o.t).toLocaleString()} · ${money(o.total)}</p><ul class="steps">${STEPS.map((x,i)=>`<li class="${i<=s?"d":""}">${x}</li>`).join("")}</ul><p>${o.items.map(i=>find(i.id).emoji+" "+find(i.id).name+" × "+i.q).join("<br>")}</p></div>`};
$("#t").onsubmit=e=>{e.preventDefault();go()};if(qs.get("id"))go()},
contact(){app.innerHTML=`<div class="w"><section><div class="two"><div><h1>Contact us</h1><p>Questions about an order, a product or a return? Send us a message and we reply within one business day.</p><p class="mut">support@nookandco.example<br>Mon–Fri, 9:00–17:00</p></div><form class="box" id="cf"><label for="n">Name</label><input id="n" name="name" required><label for="e">Email</label><input id="e" name="email" type="email" required><label for="m">Message</label><textarea id="m" name="message" rows="5" required></textarea><p><button class="btn">Send message</button></p><p id="st" role="status"></p></form></div></section></div>`;
$("#cf").onsubmit=async e=>{e.preventDefault();const f=e.target,st=$("#st");try{if(FORMSPREE){const r=await fetch(FORMSPREE,{method:"POST",headers:{Accept:"application/json"},body:new FormData(f)});if(!r.ok)throw 0}
else sv("messages",[...ls("messages",[]),{n:f.name.value,e:f.email.value,m:f.message.value,t:Date.now()}]);
f.reset();st.className="ok";st.textContent="Message sent. We'll reply by email."}catch{st.className="err";st.textContent="Could not send. Please try again or email us directly."}}}};
R[page]();
