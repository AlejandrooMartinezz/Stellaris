/* =============================================
   DATOS – PRODUCTOS (con imágenes emoji de relleno)
============================================= */
const productos = [
  {id:1, nombre:'Collar Pétalo Dorado', col:'rosae', cat:'colgantes', emoji:'📿', precio:485, desc:'Collar fino en oro rosa 18k con colgante de pétalo'},
  {id:2, nombre:'Collar Luminoso Rosae', col:'rosae', cat:'colgantes', emoji:'✨', precio:520, desc:'Collar delicado con diamantes en cadena de oro rosa'},
  {id:3, nombre:'Anillo Aurora', col:'rosae', cat:'anillos', emoji:'💍', precio:640, desc:'Anillo solitario en oro rosa con diamante central'},
  {id:4, nombre:'Anillo Flor de Rosae', col:'rosae', cat:'anillos', emoji:'🌸', precio:590, desc:'Anillo floral con micro-pavé en oro rosa 18k'},
  {id:5, nombre:'Pendientes Stellaris', col:'rosae', cat:'pendientes', emoji:'💎', precio:370, desc:'Par de pendientes en oro rosa con diamantes pavé'},
  {id:6, nombre:'Pulsera Lumière', col:'rosae', cat:'pulseras', emoji:'💛', precio:320, desc:'Pulsera fina de oro rosa con eslabones delicados'},
  {id:7, nombre:'Pulsera Rosae Éternelle', col:'rosae', cat:'pulseras', emoji:'🔮', precio:410, desc:'Pulsera tennis en oro rosa con diamantes'},
  {id:8, nombre:'Collar Zafiro Nocturno', col:'midnight', cat:'colgantes', emoji:'🌙', precio:720, desc:'Collar con zafiro azul natural en oro blanco 18k'},
  {id:9, nombre:'Collar Cielo Profundo', col:'midnight', cat:'colgantes', emoji:'🌌', precio:690, desc:'Collar con diamantes azules en cadena de oro blanco'},
  {id:10, nombre:'Pendientes Pavé Medianoche', col:'midnight', cat:'pendientes', emoji:'🔷', precio:430, desc:'Pendientes largos con diamantes pavé y zafiros'},
  {id:11, nombre:'Anillo Constelación', col:'midnight', cat:'anillos', emoji:'⭐', precio:750, desc:'Anillo con piedra central azul zafiro en oro blanco'},
  {id:12, nombre:'Pulsera Galaxia', col:'midnight', cat:'pulseras', emoji:'💫', precio:380, desc:'Pulsera en plata con toques de zafiro'},
  {id:13, nombre:'Pulsera Midnight Étoile', col:'midnight', cat:'pulseras', emoji:'🌟', precio:460, desc:'Pulsera tennis con diamantes azules'},
];

/* ===== ESTADO ===== */
let carrito = JSON.parse(localStorage.getItem('stellaris_carrito') || '[]');
let usuario = JSON.parse(localStorage.getItem('stellaris_usuario') || 'null');
let indiceProd = 0;
let indiceCol  = 0;
const visibles = () => window.innerWidth < 641 ? 1 : window.innerWidth < 901 ? 2 : 4;

/* ===== POPUP ===== */
function cerrarPopup() {
  document.getElementById('popup-overlay').style.display = 'none';
  sessionStorage.setItem('stellaris_popup','1');
}
function suscribirPopup() {
  const v = document.getElementById('popupEmail').value.trim();
  if(!v || !v.includes('@')) { toast('Introduce un correo válido.'); return; }
  toast('✦ ¡Gracias! Bienvenida a Stellaris.');
  cerrarPopup();
}

/* ===== BANNER ===== */
let iBanner = 0;
const pistaBanner = document.getElementById('pistaBanner');
const totalBanner = pistaBanner.children.length;
function moverBanner(n) { iBanner = (n + totalBanner) % totalBanner; pistaBanner.style.transform = `translateX(-${iBanner * 100}%)`; }
function bNext()   { moverBanner(iBanner + 1); }
function bBefore() { moverBanner(iBanner - 1); }
setInterval(bNext, 3800);

/* ===== COLECCIONES CARRUSEL ===== */
const slides = ['slide-midnight','slide-rosae'];
function irColeccion(i) {
  slides.forEach(s => document.getElementById(s).classList.remove('on'));
  document.querySelectorAll('.c-punto').forEach(p => p.classList.remove('on'));
  indiceCol = i;
  document.getElementById(slides[i]).classList.add('on');
  document.querySelectorAll('.c-punto')[i].classList.add('on');
}
setInterval(() => irColeccion((indiceCol + 1) % slides.length), 6000);

/* ===== CARRUSEL MÁS AMADO ===== */
function renderizarMasAmado() {
  const pista = document.getElementById('pistaProd');
  const dots  = document.getElementById('dotsProd');
  pista.innerHTML = dots.innerHTML = '';
  const vis = visibles();
  const lista = productos.slice(0, 8);
  lista.forEach(p => {
    const s = document.createElement('div');
    s.className = 'prod-slide';
    s.style.minWidth = (100 / vis) + '%';
    s.innerHTML = `
      <div class="prod-card">
        <div class="prod-img">
          <span class="prod-badge badge-${p.col === 'rosae' ? 'r' : 'm'}">${p.col === 'rosae' ? 'Rosae Lux' : 'Midnight Sky'}</span>
          <div style="font-size:3.8rem;padding:28px">${p.emoji}</div>
          <div class="prod-hover"><button class="btn-add" onclick="anadirCarrito(${p.id})">+ AÑADIR AL CARRITO</button></div>
        </div>
        <h3 class="prod-nom">${p.nombre}</h3>
        <p class="prod-desc">${p.desc}</p>
        <p class="prod-price">${p.precio.toLocaleString('es-ES')},00 €</p>
      </div>`;
    pista.appendChild(s);
  });
  const totalSlides = Math.ceil(lista.length / vis);
  for(let i = 0; i < totalSlides; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' on' : '');
    d.onclick = () => irProd(i * vis);
    dots.appendChild(d);
  }
}
function irProd(idx) {
  const vis = visibles();
  const total = document.getElementById('pistaProd').children.length;
  indiceProd = Math.max(0, Math.min(idx, total - vis));
  document.getElementById('pistaProd').style.transform = `translateX(-${indiceProd * (100 / vis)}%)`;
  const dotActual = Math.floor(indiceProd / vis);
  document.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('on', i === dotActual));
}
function moverProd(dir) {
  const vis = visibles();
  irProd(indiceProd + dir * vis);
}
window.addEventListener('resize', () => {
  const vis = visibles();
  document.querySelectorAll('#pistaProd .prod-slide').forEach(s => s.style.minWidth = (100 / vis) + '%');
  irProd(indiceProd);
});

/* ===== CATÁLOGO ===== */
function renderizarCatalogo(filtro = 'todos') {
  const grid = document.getElementById('gridProd');
  const lista = productos.filter(p => {
    if(filtro === 'todos') return true;
    if(filtro === 'rosae' || filtro === 'midnight') return p.col === filtro;
    return p.cat === filtro;
  });
  grid.innerHTML = lista.map(p => `
    <div class="prod-card">
      <div class="prod-img" style="background:var(--rosa-fondo)">
        <span class="prod-badge badge-${p.col === 'rosae' ? 'r' : 'm'}">${p.col === 'rosae' ? 'Rosae Lux' : 'Midnight Sky'}</span>
        <div style="font-size:3.8rem;padding:36px">${p.emoji}</div>
        <div class="prod-hover"><button class="btn-add" onclick="anadirCarrito(${p.id})">+ AÑADIR AL CARRITO</button></div>
      </div>
      <p style="font-style:italic;font-size:.74rem;color:var(--rosa);margin:10px 0 3px">${p.col === 'rosae' ? 'Rosae Lux' : 'Midnight Sky'}</p>
      <h3 class="prod-nom">${p.nombre}</h3>
      <p class="prod-price">${p.precio.toLocaleString('es-ES')},00 €</p>
    </div>`).join('');
}
function filtrarCat(filtro) {
  renderizarCatalogo(filtro);
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('on'));
  const opts = ['todos','rosae','midnight','anillos','colgantes','pulseras','pendientes'];
  const idx = opts.indexOf(filtro);
  if(idx >= 0) document.querySelectorAll('.f-btn')[idx]?.classList.add('on');
}

/* ===== CARRITO ===== */
function anadirCarrito(id) {
  const p = productos.find(x => x.id === id);
  if(!p) return;
  const e = carrito.find(x => x.id === id);
  if(e) e.cantidad++;
  else carrito.push({...p, cantidad:1});
  guardarCarrito(); renderizarCarrito();
  toast(`✦ "${p.nombre}" añadido al carrito`);
}
function quitarCarrito(id) {
  const i = carrito.findIndex(x => x.id === id);
  if(i < 0) return;
  if(carrito[i].cantidad > 1) carrito[i].cantidad--;
  else carrito.splice(i, 1);
  guardarCarrito(); renderizarCarrito();
}
function guardarCarrito() { localStorage.setItem('stellaris_carrito', JSON.stringify(carrito)); }
function renderizarCarrito() {
  const cont  = document.getElementById('carritoItems');
  const vacio = document.getElementById('carritoVacio');
  const badge = document.getElementById('badgeC');
  const totalEl = document.getElementById('carritoTotal');
  const total = carrito.reduce((s,i) => s + i.precio * i.cantidad, 0);
  const uds   = carrito.reduce((s,i) => s + i.cantidad, 0);
  badge.style.display = uds > 0 ? 'flex' : 'none';
  badge.textContent   = uds;
  totalEl.textContent = `${total.toLocaleString('es-ES')},00 €`;
  vacio.style.display = carrito.length === 0 ? 'block' : 'none';
  cont.querySelectorAll('.ca-item').forEach(x => x.remove());
  carrito.forEach(item => {
    const d = document.createElement('div');
    d.className = 'ca-item';
    d.innerHTML = `
      <div class="ca-emoji">${item.emoji}</div>
      <div class="ca-info">
        <div class="ca-nom">${item.nombre}</div>
        <div class="ca-price">${(item.precio * item.cantidad).toLocaleString('es-ES')},00 €</div>
      </div>
      <div class="ca-ctrl">
        <button class="btn-q" onclick="quitarCarrito(${item.id})">−</button>
        <span style="font-size:.86rem;min-width:16px;text-align:center">${item.cantidad}</span>
        <button class="btn-q" onclick="anadirCarrito(${item.id})">+</button>
      </div>`;
    cont.appendChild(d);
  });
}
function toggleCarrito() {
  const p = document.getElementById('panel-carrito');
  const o = document.getElementById('overlay');
  if(p.classList.contains('open')) { p.classList.remove('open'); o.classList.remove('on'); }
  else { cerrarModales(); p.classList.add('open'); o.classList.add('on'); }
}
function finalizarCompra() {
  if(carrito.length === 0) { toast('Tu carrito está vacío.'); return; }
  toast('✦ Gracias por tu pedido. Recibirás confirmación pronto.');
  carrito = []; guardarCarrito(); renderizarCarrito(); toggleCarrito();
}

/* ===== MODALES ===== */
function abrirContacto(e) { if(e)e.preventDefault(); cerrarPanel(); document.getElementById('modal-contacto').classList.add('on'); document.getElementById('overlay').classList.add('on'); }
function abrirSesion() { if(usuario){toast(`Sesión activa: ${usuario.nombre}`);return;} cerrarPanel(); document.getElementById('modal-sesion').classList.add('on'); document.getElementById('overlay').classList.add('on'); }
function cerrarModales() { document.querySelectorAll('.modal').forEach(m=>m.classList.remove('on')); document.getElementById('overlay').classList.remove('on'); cerrarPanel(); }
function cerrarPanel() { document.getElementById('panel-carrito').classList.remove('open'); }

/* ===== CONTACTO ===== */
function toggleEmail() {
  document.getElementById('fEmail').classList.toggle('vis');
  document.getElementById('btnCorreo').classList.toggle('on');
}
function llamarAhora()  { toast('📞 Llamando al 690 968 481...'); window.location.href='tel:690968481'; }
function reservarCita() { toast('📅 Abriendo agenda de citas...'); }
function enviarForm() {
  const motivo = document.getElementById('motivo').value;
  const nombre = document.getElementById('nombreC').value.trim();
  const apell  = document.getElementById('apellidoC').value.trim();
  const email  = document.getElementById('emailC').value.trim();
  if(!motivo||!nombre||!apell||!email) { toast('Completa los campos obligatorios (*)'); return; }
  toast('✦ Consulta enviada. Te responderemos pronto.');
  document.getElementById('fEmail').classList.remove('vis');
  document.getElementById('btnCorreo').classList.remove('on');
  ['motivo','msgC','nombreC','apellidoC','emailC','telC'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
}

/* ===== SESIÓN ===== */
function iniciarSesion() {
  const email = document.getElementById('lEmail').value.trim();
  const pwd   = document.getElementById('lPwd').value;
  if(!email||!pwd) { toast('Introduce tu email y contraseña.'); return; }
  const usuarios = JSON.parse(localStorage.getItem('stellaris_usuarios') || '[]');
  const u = usuarios.find(x => x.email === email && x.password === pwd);
  if(!u) { toast('Credenciales incorrectas.'); return; }
  usuario = {nombre:u.nombre, email:u.email};
  localStorage.setItem('stellaris_usuario', JSON.stringify(usuario));
  actualizarUsr(); cerrarModales();
  toast(`✦ Bienvenida de nuevo, ${u.nombre}.`);
}
function crearCuenta() {
  const nombre = document.getElementById('rNombre').value.trim();
  const apell  = document.getElementById('rApellido').value.trim();
  const email  = document.getElementById('rEmail').value.trim();
  const pwd    = document.getElementById('rPwd').value;
  const conf   = document.getElementById('rConf').value;
  if(!nombre||!apell||!email||!pwd||!conf) { toast('Completa todos los campos obligatorios (*)'); return; }
  if(pwd !== conf)    { toast('Las contraseñas no coinciden.'); return; }
  if(pwd.length < 6)  { toast('La contraseña debe tener al menos 6 caracteres.'); return; }
  const usuarios = JSON.parse(localStorage.getItem('stellaris_usuarios') || '[]');
  if(usuarios.find(u => u.email === email)) { toast('Ya existe una cuenta con este correo.'); return; }
  usuarios.push({nombre, apellido:apell, email, password:pwd});
  localStorage.setItem('stellaris_usuarios', JSON.stringify(usuarios));
  usuario = {nombre, email};
  localStorage.setItem('stellaris_usuario', JSON.stringify(usuario));
  actualizarUsr(); cerrarModales();
  toast(`✦ Cuenta creada. Bienvenida, ${nombre}.`);
}
function olvidoPwd() {
  const email = document.getElementById('lEmail').value.trim();
  if(!email) { toast('Introduce tu correo para restablecer la contraseña.'); return; }
  toast('✦ Instrucciones enviadas a tu correo.');
}
function cerrarSesion() {
  usuario = null; localStorage.removeItem('stellaris_usuario');
  actualizarUsr(); toast('Sesión cerrada correctamente.');
}
function actualizarUsr() {
  const c = document.getElementById('estadoUsr');
  if(usuario) c.innerHTML = `<span>Hola, ${usuario.nombre}</span><button class="btn-logout" onclick="cerrarSesion()">Salir</button>`;
  else c.innerHTML = '';
}

/* ===== SUSCRIPCIÓN FOOTER ===== */
function suscribirFooter() {
  const v = document.getElementById('emailSus').value.trim();
  if(!v||!v.includes('@')) { toast('Introduce un correo válido.'); return; }
  toast('✦ ¡Gracias! Te has suscrito a Stellaris.');
  document.getElementById('emailSus').value = '';
}

/* ===== TOAST ===== */
let timerToast;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('vis');
  clearTimeout(timerToast);
  timerToast = setTimeout(() => el.classList.remove('vis'), 3500);
}

/* ===== INICIALIZACIÓN ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderizarMasAmado();
  renderizarCatalogo();
  renderizarCarrito();
  actualizarUsr();
  // Popup (1 vez por sesión)
  if(!sessionStorage.getItem('stellaris_popup')) {
    setTimeout(() => { document.getElementById('popup-overlay').style.display = 'flex'; }, 1200);
  }
});