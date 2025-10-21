const TBody = document.getElementById('producto-tabla'); // <— unificá

document.getElementById('producto-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  const res = await fetch('/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert('✅ Todo bien');
  } else {
    alert('❌ Hubo un error');
  }
});

let currentId = 1;

function mostrarProducto(p) {
  TBody.innerHTML = `
    <tr>
      <td>${p.id}</td>
      <td><input value="${p.nombre}" data-field="nombre"></td>
      <td><input type="number" value="${p.precio ?? 0}" data-field="precio"></td>
      <td><input value="${p.descripcion ?? ''}" data-field="descripcion"></td>
      <td><input type="number" value="${p.cantidad ?? 0}" data-field="cantidad"></td>
      <td><input type="checkbox" ${p.activo ? 'checked' : ''} data-field="activo"></td>
    </tr>
  `;
  currentId = p.id;
}


document.getElementById('prev').addEventListener('click', async () => {
  if (currentId <= 1) return alert('🚫 Estás en el primero');
  const res = await fetch(`/productos/${currentId - 1}`);
  if (!res.ok) return alert('❌ No encontrado');
  mostrarProducto(await res.json());
});

document.getElementById('next').addEventListener('click', async () => {
  const res = await fetch(`/productos/${currentId + 1}`);
  if (!res.ok) return alert('🚫 No hay más productos');
  mostrarProducto(await res.json());
});

document.getElementById('guardar').addEventListener('click', async () => {
  const fila = TBody.querySelector('tr');
  const get = sel => fila.querySelector(`[data-field="${sel}"]`);
  const datos = {
    nombre: get('nombre').value,
    precio: Number(get('precio').value || 0),
    descripcion: get('descripcion').value,
    cantidad: parseInt(get('cantidad').value || '0', 10),
    activo: get('activo').checked
  };
  const res = await fetch(`/productos/${currentId}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(datos)
  });
  if (res.ok) alert('✅ Producto actualizado');
});


document.getElementById('eliminar').addEventListener('click', async () => {
  const res = await fetch(`/productos/${currentId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    alert('✅ Producto eliminado');
    TBody.innerHTML = '';
  } else {
    alert('❌ Error al eliminar');
  }
});


// Mostrar el primer producto al cargar
// Reemplazá la última línea:
(async () => {
  const res = await fetch('/productos/1');
  if (res.ok) mostrarProducto(await res.json());
})();
