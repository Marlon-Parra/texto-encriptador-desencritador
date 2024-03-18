const texto_Normal = document.querySelector("#texto_Normal");
const texto_Encriptado = document.querySelector("#campoResultado");

const matriz_code = [
  ["e", "enter"], // indice 0
  ["i", "imes"], // index 1
  ["a", "ai"], // index 2
  ["o", "ober"], // indice 3
  ["u", "ufat"], // index 4
];

function validarTextarea(textarea) {
  // Reemplazar caracteres con tilde por su equivalente sin tilde
  textarea.value = textarea.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Expresión regular que permite solo letras, números, espacios y saltos de línea
  let regex = /[^a-zA-Z0-9\n\r\s]/g;

  // Reemplazar cualquier caracter que no sea letra, número, espacio o salto de línea por una cadena vacía
  textarea.value = textarea.value.replace(regex, '');
}

function validarTexto(texto) {
  // Verificar si el texto contiene mayúsculas
  if (texto !== texto.toLowerCase()) {
    // Si contiene mayúsculas, convertir todo el texto a minúsculas
    texto = texto.toLowerCase();
  }
  return texto;
}

function encriptadorbtn() {
  let texto = texto_Normal.value;
  texto = validarTexto(texto); // Llamar a la función para validar el texto
  const textoEncriptado = encriptar(texto);
  texto_Encriptado.value = textoEncriptado;
}

function encriptar(fraseEncriptada) {
  for (let i = 0; i < matriz_code.length; i++) {
    if (fraseEncriptada.includes(matriz_code[i][0])) {
      fraseEncriptada = fraseEncriptada.replaceAll(matriz_code[i][0], matriz_code[i][1]);
    }
  }
  return fraseEncriptada;
}

function desencriptarbtn() {
  const mensaje = desencriptar(texto_Encriptado.value);
  texto_Encriptado.value = mensaje;
}

function desencriptar(fraseEncriptada) {
  // Dividir la frase encriptada en palabras
  const palabrasEncriptadas = fraseEncriptada.split(' ');

  // Crear un array para almacenar las palabras desencriptadas
  const palabrasDesencriptadas = [];

  // Iterar sobre cada palabra encriptada y desencriptarla
  palabrasEncriptadas.forEach(palabraEncriptada => {
    let palabraDesencriptada = palabraEncriptada; // Inicializar la palabra desencriptada con la palabra encriptada actual

    // Iterar sobre la matriz de código para encontrar la correspondencia
    matriz_code.forEach(par => {
      // Si la palabra encriptada incluye el código de la matriz, reemplazarlo por la letra original
      if (palabraEncriptada.includes(par[1])) {
        palabraDesencriptada = palabraDesencriptada.replaceAll(par[1], par[0]);
      }
    });

    // Agregar la palabra desencriptada al array de palabras desencriptadas
    palabrasDesencriptadas.push(palabraDesencriptada);
  });

  // Unir las palabras desencriptadas en una sola frase y devolverla
  return palabrasDesencriptadas.join(' ');
}

// Función para copiar el resultado al portapapeles
function copiarResultado() {
  let resultado = document.getElementById("campoResultado");
  resultado.select();
  document.execCommand("copy");
  // alert("¡Texto copiado!"); 
};

// Función para agregar elementos al historial
function agregarAlHistorial(texto, esEncriptado) {
  const historialContainer = document.getElementById('historial-container');
  const historialItem = document.createElement('div');
  historialItem.classList.add('historial-item');

  // Crear un elemento span para el texto y otro para indicar si está encriptado o desencriptado
  const textoSpan = document.createElement('span');
  textoSpan.innerText = texto;
  const estadoSpan = document.createElement('span');
  estadoSpan.innerText = esEncriptado ? ' (Encriptado)' : ' (Desencriptado)';
  
  // Agregar clases para estilos
  textoSpan.classList.add('texto-historial');
  estadoSpan.classList.add('estado-historial');

  // Agregar los spans al item del historial
  historialItem.appendChild(textoSpan);
  historialItem.appendChild(estadoSpan);

  // Agregar el item del historial al contenedor
  historialContainer.appendChild(historialItem);
}

// Modificar las funciones encriptadorbtn y desencriptarbtn para usar agregarAlHistorial
function encriptadorbtn() {
  let texto = texto_Normal.value;
  texto = validarTexto(texto);
  const textoEncriptado = encriptar(texto);
  texto_Encriptado.value = textoEncriptado;
  agregarAlHistorial(textoEncriptado, true); // Agregar al historial como encriptado
}

function desencriptarbtn() {
  let texto = texto_Encriptado.value;
  const textoDesencriptado = desencriptar(texto);
  texto_Encriptado.value = textoDesencriptado;
  agregarAlHistorial(textoDesencriptado, false); // Agregar al historial como desencriptado
}
