
// script.js

// Mapa de códigos para cada ejemplo
const codeExamples = {
  // Sintaxis
  'sintaxis': `// Comentarios
// de una línea
/* de
múltiples
líneas */

// Declaración de variables
var nombre = "Juan"; // Antigua forma, evita usarla
let apellido = "Pérez"; // Variable reasignable
const edad = 30; // Constante, no se puede reasignar

console.log(nombre, apellido, edad);`,

  // Estructuras de Control
  'estructuras': `let edad = 18;
if (edad >= 18) {
  console.log("Eres mayor de edad.");
} else {
  console.log("Eres menor de edad.");
}`,

  'estructuras2': `let dia = 2;
switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  default:
    console.log("Otro día");
}`,

  'bucles': `for (let i = 0; i < 3; i++) { console.log(i); }`,

  'bucles2': `let contador = 0;
while (contador < 3) {
  console.log(contador);
  contador++;
}`,

  'bucles3': `let x = 0;
do {
  console.log(x);
  x++;
} while (x < 3);`,

  'bucles4': `const frutas = ["manzana", "banana", "naranja"];
for (const fruta of frutas) {
  console.log(fruta);
}`,

  'bucles5': `const persona = { nombre: "Ana", edad: 25 };
for (const clave in persona) {
  console.log(clave + ": " + persona[clave]);
}`,

  // Tipos de Datos
  'tipos': `let nombre = "Diego";
let edad = 30;
let esMayor = edad >= 18;
let vacio = null;
let noDefinido;
let id = Symbol('id');
let grande = 123456789012345678901234567890n;

console.log(typeof nombre); // "string"
console.log(typeof edad); // "number"
console.log(typeof esMayor); // "boolean"
console.log(typeof vacio); // "object" (es un error histórico)
console.log(typeof noDefinido); // "undefined"
console.log(typeof id); // "symbol"
console.log(typeof grande); // "bigint"`,

  // Operadores
  'operadores': `let a = 10;
let b = 3;
console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.333...
console.log(a % b); // 1
console.log(a ** b); // 1000 (potencia)`,

  'operadores2': `let x = 5;
let y = "5";
console.log(x == y); // true (comparación débil)
console.log(x === y); // false (comparación estricta)
console.log(x != y); // false
console.log(x !== y); // true`,

  'operadores3': `let verdadero = true;
let falso = false;
console.log(verdadero && falso); // false
console.log(verdadero || falso); // true
console.log(!verdadero); // false`,

  // Funciones
  'funciones': `function saludar(nombre) {
  return \`Hola, \${nombre}\`;
}
console.log(saludar("Diego"));`,

  'funciones2': `const duplicar = (num) => num * 2;
console.log(duplicar(5));`,

  'funciones3': `(function() {
  console.log("¡Esto se ejecuta inmediatamente!");
})();`,

  // Objetos
  'objetos': `const persona = {
  nombre: "Diego",
  edad: 30,
  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  }
};
console.log(persona.saludar());`,

  'objetos2': `console.log(persona.nombre); // "Diego"
console.log(persona["edad"]); // 30
persona.nuevoCampo = "Valor";
console.log(persona.nuevoCampo);`,

  // Arrays
  'arrays': `const frutas = ["manzana", "pera", "naranja"];
const mayus = frutas.map(f => f.toUpperCase());
console.log(mayus);`,

  'arrays2': `const numeros = [1, 2, 3, 4, 5];
numeros.push(6); // Agrega al final
numeros.pop(); // Elimina del final
numeros.shift(); // Elimina del inicio
numeros.unshift(0); // Agrega al inicio
console.log(numeros);`,

  // Strings
  'strings': `const texto = "Hola Mundo";
console.log(texto.toUpperCase());
console.log(texto.includes("Mundo"));
console.log(texto.substring(0, 4)); // "Hola"
console.log(texto.split(" ")); // ["Hola", "Mundo"]`,

  // Asincronía
  'asincronia': `const promesa = new Promise((resolve) => {
  setTimeout(() => resolve("¡Promesa resuelta!"), 1000);
});
promesa.then(console.log);`,

  'asincronia2': `async function esperar() {
  const resultado = await promesa;
  console.log(resultado);
}
esperar();`,

  // Métodos y Utilidades
  'metodos': `const numeros = [1, 2, 3, 4, 5];
const suma = numeros.reduce((a, b) => a + b, 0);
const pares = numeros.filter(n => n % 2 === 0);
const duplicados = numeros.map(n => n * 2);

console.log("Suma:", suma);
console.log("Pares:", pares);
console.log("Duplicados:", duplicados);`,

  // Patrones de Diseño
  'patrones': `function Coche(marca) {
  this.marca = marca;
  this.arrancar = function() {
    return \`\${this.marca} está en marcha\`;
  };
}
const miCoche = new Coche("Toyota");
console.log(miCoche.arrancar());`,

  // JS Avanzado
  'arrow': `const duplicar = x => x * 2;
console.log(duplicar(5));`,

  'destructure': `const persona = { nombre: "Ana", edad: 25 };
const { nombre, edad } = persona;
console.log(nombre);`,

  'spread': `const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2);`,

  'clases': `class Animal {
  constructor(nombre) { this.nombre = nombre; }
  hablar() { return \`\${this.nombre} hace ruido.\`; }
}
const perro = new Animal("Firulais");
console.log(perro.hablar());`,

  'proxies': `const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : \`Propiedad "\${prop}" no encontrada.\`;
  }
};
const proxy = new Proxy({a: 1}, handler);
console.log(proxy.a); // 1
console.log(proxy.b); // Propiedad "b" no encontrada.`
};

// Función para ejecutar ejemplos
function runExample(id) {
  const output = document.getElementById(`${id}-output`);
  if (!output) {
    console.error(`Elemento de salida para '${id}' no encontrado.`);
    return;
  }

  const code = codeExamples[id];

  if (typeof code === 'undefined') {
    output.textContent = "⚠️ Código no encontrado para este ejemplo.";
    return;
  }

  // Limpiar salida anterior
  output.textContent = '';

  try {
    // Redirigir console.log a output
    const originalLog = console.log;
    console.log = (...args) => {
      const logMessage = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
      output.textContent += logMessage + '\n';
    };

    // Ejecutar el código
    eval(code);

    // Restaurar console.log original
    console.log = originalLog;

    // Si no hubo logs, indicarlo
    if (output.textContent.trim() === '') {
      output.textContent = "✅ Ejecutado (sin salida).";
    }
  } catch (err) {
    // Restaurar console.log en caso de error
    console.log = originalLog;
    output.textContent = `❌ Error: ${err.message}`;
  }
}

// Búsqueda en tiempo real
document.getElementById('search-input').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const sections = document.querySelectorAll('#wiki-content .card');
  const allTextNodes = document.querySelectorAll('#wiki-content .card h2, #wiki-content .card h3, #wiki-content .card p, #wiki-content .card ul, #wiki-content .card li, #wiki-content .card code');

  // Resetear ocultamiento
  sections.forEach(section => section.style.display = '');
  allTextNodes.forEach(node => {
    node.classList.remove('highlight');
  });

  if (query.trim() === '') {
    return;
  }

  // Ocultar secciones que no coincidan
  sections.forEach(section => {
    const textContent = section.textContent.toLowerCase();
    if (textContent.includes(query)) {
      section.style.display = '';
      // Resaltar coincidencias en títulos y párrafos
      const elementsToCheck = section.querySelectorAll('h2, h3, p, ul, li, code');
      elementsToCheck.forEach(el => {
        if (el.textContent.toLowerCase().includes(query)) {
          el.classList.add('highlight');
        }
      });
    } else {
      section.style.display = 'none';
    }
  });
});

// Añadir estilo para resaltar texto encontrado
const style = document.createElement('style');
style.textContent = `
  .highlight {
    background-color: rgba(255, 255, 0, 0.3);
    padding: 2px 4px;
    border-radius: 3px;
    font-weight: bold;
    color: #ffeb3b;
  }
`;
document.head.appendChild(style);

// Desplazamiento suave al hacer clic en enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
