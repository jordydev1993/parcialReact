# PostFlow — Parcial React

Aplicación de gestión de publicaciones desarrollada con React + Vite como trabajo práctico parcial.

## Demo en vivo

[https://jordydev1993.github.io/parcialReact/](https://jordydev1993.github.io/parcialReact/)

---

## Integrantes

| Nombre |
|---|
| Lozano Melani |
| Galvan Camila |
| Martinez Sofia |
| Huansi Jordy |

---

## Tecnologías utilizadas

- React 19
- React Router DOM 7
- Vite 8
- CSS puro (variables, grid, animaciones)

---

## Instalación y ejecución local

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

### Pasos

**1. Clonar el repositorio**

```bash
git clone https://github.com/jordydev1993/parcialReact.git
cd parcialReact
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Ejecutar en modo desarrollo**

```bash
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

**4. Compilar para producción**

```bash
npm run build
```

**5. Previsualizar el build de producción**

```bash
npm run preview
```

---

## Deploy a GitHub Pages

```bash
npm run deploy
```

Este comando ejecuta el build automáticamente y publica el resultado en la rama `gh-pages`.

---

## Funcionalidades implementadas

- CRUD completo de publicaciones (crear, leer, editar, eliminar)
- Formulario con contador de caracteres, validaciones visuales y vista previa en tiempo real
- Tema claro / oscuro con Context API (persiste entre navegaciones)
- Hook personalizado `usePostForm` reutilizable para crear y editar
- `useRef` para autofocus en el primer campo del formulario
- Dashboard de estadísticas en tiempo real (total, creadas, eliminadas, visibles)
- Animaciones de entrada en páginas, cards y modal (200–300 ms)
- Búsqueda y filtros en tiempo real
- Notificaciones toast
- Diseño responsivo
