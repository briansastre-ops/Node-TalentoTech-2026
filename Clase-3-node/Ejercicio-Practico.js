
const preciosBase = [1500, 3200, 850, 4100, 600, 12500, 990, 2300, 5400, 8900];


const preciosConIva = preciosBase.map(precio => precio * 1.21);

console.log("Reporte de Precios Actualizados:\n");

preciosConIva.forEach(precioFinal => {

  console.log(`El precio es: $${precioFinal.toFixed(2)}.- IVA incluido.`);
});

// Solucion 2

// const precios = [
//   { manzana: 100 }, // Producto manzana, precio sin IVA: 100
//   { pera: 200 }, // Producto pera, precio sin IVA: 200
//   { uva: 300 }, // Producto uva, precio sin IVA: 300
//   { naranja: 400 }, // Producto naranja, precio sin IVA: 400
//   { sandia: 500 }, // Producto sandía, precio sin IVA: 500
//   { banana: 600 }, // Producto banana, precio sin IVA: 600
//   { kiwi: 700 }, // Producto kiwi, precio sin IVA: 700
//   { mango: 800 }, // Producto mango, precio sin IVA: 800
//   { ciruela: 900 }, // Producto ciruela, precio sin IVA: 900
//   { durazno: 1000 }]; // Producto durazno, precio sin IVA: 1000
// // map recorre cada elemento; Object.values(item)[0] obtiene el número (precio); se multiplica por 1.21 para sumar el 21% de IVA. El resultado es un array solo de números (precios finales).
// const precios_con_iva = precios.map((item) => Object.values(item)[0] * 1.21);

// // forEach ejecuta una función por cada producto; item es el objeto actual e i es su posición (0, 1, 2…).
// precios.forEach((item, i) => {
//   // Object.keys(item)[0] toma la primera (y única) clave del objeto: el nombre del producto como string.
//   const nombre = Object.keys(item)[0];
//   // Template literal: imprime nombre, el precio con IVA en la misma posición i, y el texto fijo del reporte.
//   console.log(`El precio de ${nombre} es: $${precios_con_iva[i]}.- IVA incluido.`);
// });