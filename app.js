const API_URL = 'https://paec-mxd6.onrender.com';

const form = document.getElementById('formMaterial');
const lista = document.getElementById('listaMateriales');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(form).entries());

  await fetch(`${API_URL}/materiales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

  form.reset();
  cargarMateriales();
});

async function cargarMateriales() {
  lista.innerHTML = '';
  const res = await fetch(`${API_URL}/materiales`);
  const materiales = await res.json();

  materiales.forEach(mat => {
    const item = document.createElement('li');
    item.innerHTML = `
      ${mat.nombre} - ${mat.descripcion} (${mat.cantidadKg} kg)
      <button onclick="eliminar('${mat._id}')">Eliminar</button>
      <button onclick="editar('${mat._id}', '${mat.nombre}', '${mat.descripcion}', ${mat.cantidadKg})">Editar</button>
    `;
    lista.appendChild(item);
  });
}

async function eliminar(id) {
  await fetch(`${API_URL}/materiales/${id}`, {
    method: 'DELETE'
  });
  cargarMateriales();
}

function editar(id, nombre, descripcion, cantidadKg) {
  form.nombre.value = nombre;
  form.descripcion.value = descripcion;
  form.cantidadKg.value = cantidadKg;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form).entries());

    await fetch(`${API_URL}/materiales/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    form.reset();
    form.onsubmit = defaultSubmit;
    cargarMateriales();
  };
}

const defaultSubmit = form.onsubmit;
cargarMateriales();