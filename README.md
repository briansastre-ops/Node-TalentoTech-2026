# 🛒 Pre-Entrega TechLab — Brian Sastre

Proyecto integrador del curso TechLab. Consta de dos partes: un **Backend en Node.js** que consume la FakeStore API desde la terminal, y un **Frontend en React** que muestra los productos en una interfaz visual.

---

## 📁 Estructura del proyecto

```
Pre_Entrega_TechLab/
├── Backend-API/
│   ├── index.js
│   └── package.json
└── FrontEnd-React/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Backend — Node.js CLI

Interactúa con la [FakeStore API](https://fakestoreapi.com) directamente desde la terminal usando los métodos HTTP **GET**, **POST** y **DELETE**.

### Requisitos

- Node.js v24 o superior (usa `fetch` nativo)

### Instalación

```bash
cd Pre_Entrega_TechLab/Backend-API
npm install
```

### Uso

```bash
npm run start <MÉTODO> <RUTA> [PARÁMETROS]
```

#### GET — Listar todos los productos

```bash
npm run start GET products
```

#### GET — Ver un producto por ID

```bash
npm run start GET products/1
```

#### POST — Crear un nuevo producto

```bash
npm run start POST products "Remera Negra" 29.99 "men's clothing"
```

> Parámetros en orden: `título` `precio` `categoría`

#### DELETE — Eliminar un producto por ID

```bash
npm run start DELETE products/1
```

---

## 🖥️ Frontend — React + Vite + Tailwind CSS

Muestra el catálogo completo de productos de la FakeStore API en una grilla de tarjetas responsive.

### Requisitos

- Node.js v20.19 o superior

### Instalación

```bash
cd Pre_Entrega_TechLab/FrontEnd-React
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

Abre el navegador en `http://localhost:5173`

### Generar build de producción

```bash
npm run build
```

### Previsualizar el build

```bash
npm run preview
```

---

## 🧰 Tecnologías utilizadas

| Área | Tecnología |
|------|------------|
| Runtime | Node.js v24 |
| Frontend | React 19 + Vite 8 |
| Estilos | Tailwind CSS v4 |
| API externa | [FakeStore API](https://fakestoreapi.com) |
| HTTP | Fetch nativo (Node.js y browser) |

---

## 📌 Conceptos aplicados

- `async/await` y manejo de errores con `try/catch/finally`
- Promesas y fetch de APIs REST
- React Hooks: `useState`, `useEffect`
- Renderizado condicional y listas con `.map()`
- Argumentos de terminal con `process.argv`
- Estilos utilitarios con Tailwind CSS

---

## 👤 Autor

**Brian Sastre** — Proyecto Pre-Entrega TechLab
