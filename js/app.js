const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;


    // console.log(ciudad);
    // console.log(pais);

    if (ciudad === '', pais === '') {
        //Hubo un error
        mostrarError('Ambos campos son obligatorios')
        return;
    }

    //Consultariamos la API
    consultarAPI(ciudad, pais);

}
function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        /*Crear Alerta*/
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
            'max.w.md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>`;

        container.appendChild(alerta);

        //se elimine la alerta despues de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000)
    }
}

function consultarAPI(ciudad, pais) {
    const appId = 'b870a5e6858ec365d46e3647c0df9674';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner(); // Muestra Spinner de carga

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado)
            if (resultado.cod === '404') {
                mostrarError('Ciudad no encontrada');
            }
            limpiarHTML()
            mostrarClima(resultado)
        })

}

function mostrarClima(datos) {
    const { name, main: { temp, feels_like, temp_max, temp_min } } = datos;
    const centigrados = kACentigrados(temp);
    const max = kACentigrados(temp_max);
    const min = kACentigrados(temp_min);
    const sensaT = kACentigrados(feels_like);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Info del Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados.toFixed(1)} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const t_max = document.createElement('div');
    t_max.classList.add('text-xl');
    t_max.innerHTML = `Max: ${max.toFixed(1)} &#8451`;

    const t_min = document.createElement('div');
    t_min.classList.add('text-xl');
    t_min.innerHTML = `Min: ${min.toFixed(1)} &#8451`;

    const sTer = document.createElement('div');
    sTer.classList.add('text-xl');
    sTer.innerHTML = `Sensación Térmica: ${sensaT.toFixed(1)} &#8451`;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(t_max);
    resultadoDiv.appendChild(t_min);
    resultadoDiv.appendChild(sTer);


    resultado.appendChild(resultadoDiv);
}
//Helper
const kACentigrados = temp => temp - 273.15;


function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
    <div class="sk-circle">
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>
</div>
    `;

    resultado.appendChild(divSpinner);
}