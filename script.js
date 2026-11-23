
let preguntas = [
    {
        pregunta: "¿Dónde nació Cristiano Ronaldo?",
        opciones: ["España", "Portugal", "Brasil", "Argentina"],
        correcta: 1
    },
    {
        pregunta: "¿En qué equipo comenzó su carrera profesional?",
        opciones: ["Real Madrid", "Juventus", "Sporting Lisboa", "Al Nassr"],
        correcta: 2
    },
    {
        pregunta: "¿Cuántos Balones de Oro ha ganado?",
        opciones: ["3", "4", "5", "6"],
        correcta: 2
    },
    {
        pregunta: "¿En qué año ganó su primera Champions League?",
        opciones: ["2006", "2008", "2010", "2012"],
        correcta: 1
    },
    {
        pregunta: "¿Con qué selección juega Cristiano Ronaldo?",
        opciones: ["Brasil", "España", "Portugal", "Italia"],
        correcta: 2
    },
    {
        pregunta: "¿En qué equipo jugó antes del Real Madrid?",
        opciones: ["Manchester United", "Juventus", "Chelsea", "Bayern"],
        correcta: 0
    },
    {
        pregunta: "¿Cuántas Champions League ha ganado?",
        opciones: ["3", "4", "5", "6"],
        correcta: 2
    },
    {
        pregunta: "¿En qué año ganó Portugal la Eurocopa?",
        opciones: ["2012", "2014", "2016", "2018"],
        correcta: 2
    },
    {
        pregunta: "¿Cómo se llama el equipo donde juega desde 2023?",
        opciones: ["Al Hilal", "Al Nassr", "Al Ittihad", "Al Ahli"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es su apodo más conocido?",
        opciones: ["Messi", "Neymar", "CR7", "Mbappé"],
        correcta: 2
    }
];

let numero = 0;
let puntos = 0;
let tiempo = 60;
let intervalo;
let respondido = false;

let pregunta = document.getElementById("pregunta");
let opciones = document.getElementById("opciones");
let mensaje = document.getElementById("mensaje");
let temporizador = document.getElementById("temporizador");
let puntaje = document.getElementById("puntaje");
let numeroPregunta = document.getElementById("numeroPregunta");
let siguiente = document.getElementById("siguiente");
let resultadoFinal = document.getElementById("resultadoFinal");

// Mostrar pregunta
function mostrarPregunta() {

    clearInterval(intervalo);

    tiempo = 60;
    respondido = false;

    siguiente.disabled = true;
    mensaje.textContent = "";
    opciones.innerHTML = "";

    pregunta.textContent = preguntas[numero].pregunta;

    numeroPregunta.textContent =
        "Pregunta " + (numero + 1) + " de " + preguntas.length;

    puntaje.textContent = "Puntos: " + puntos;

    // Crear botones de respuestas
    preguntas[numero].opciones.forEach(function (opcion, i) {

        let boton = document.createElement("button");

        boton.textContent = opcion;
        boton.classList.add("opcion");

        boton.addEventListener("click", function () {
            responder(i, boton);
        });

        opciones.appendChild(boton);

    });

    iniciarTiempo();
}

// Temporizador
function iniciarTiempo() {

    temporizador.textContent = "Tiempo: " + tiempo;

    intervalo = setInterval(function () {

        tiempo--;

        temporizador.textContent = "Tiempo: " + tiempo;

        if (tiempo <= 0) {

            clearInterval(intervalo);

            if (!respondido) {

                respondido = true;
                puntos--;

                mensaje.textContent =
                    "¡Tiempo terminado! La respuesta era: " +
                    preguntas[numero].opciones[preguntas[numero].correcta];

                mostrarCorrecta();
                actualizarPuntos();

                siguiente.disabled = false;
            }
        }

    }, 1000);
}

// Responder pregunta
function responder(respuesta, boton) {

    if (respondido) {
        return;
    }

    respondido = true;
    clearInterval(intervalo);

    let correcta = preguntas[numero].correcta;

    if (respuesta == correcta) {

        puntos++;
        boton.classList.add("correcta");

        mensaje.textContent = "¡Correcto! Muy bien.";

    } else {

        puntos--;

        boton.classList.add("incorrecta");

        mensaje.textContent =
            "Incorrecto. La respuesta correcta es: " +
            preguntas[numero].opciones[correcta];

    }

    mostrarCorrecta();
    actualizarPuntos();

    siguiente.disabled = false;
}

// Mostrar respuesta correcta
function mostrarCorrecta() {

    let botones = document.querySelectorAll(".opcion");

    botones.forEach(function (boton, i) {

        boton.disabled = true;

        if (i == preguntas[numero].correcta) {
            boton.classList.add("correcta");
        }

    });
}

// Actualizar puntos
function actualizarPuntos() {
    puntaje.textContent = "Puntos: " + puntos;
}

// Siguiente pregunta
siguiente.addEventListener("click", function () {

    numero++;

    if (numero < preguntas.length) {

        mostrarPregunta();

    } else {

        finalizarQuiz();

    }

});

// Resultado final
function finalizarQuiz() {

    clearInterval(intervalo);

    pregunta.textContent = "¡Examen terminado!";

    opciones.innerHTML = "";
    siguiente.style.display = "none";
    temporizador.style.display = "none";

    mensaje.textContent = "";

    resultadoFinal.innerHTML =
        "Tu puntaje final es: " + puntos +
        " puntos de " + preguntas.length +
        "<br><br>¡Gracias por participar!";

}

// Comenzar el quiz
mostrarPregunta();
