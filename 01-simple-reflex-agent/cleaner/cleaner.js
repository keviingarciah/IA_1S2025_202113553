// Conjunto para rastrear estados visitados
const visitedStates = new Set();

function getStateString(states) {
  return `${states[0]}-${states[1]}-${states[2]}`;
}

function updateLog(message) {
  const logElement = document.getElementById("log");
  logElement.innerHTML += message;
  // Hacer scroll hasta el final automáticamente
  logElement.scrollTop = logElement.scrollHeight;
}

function reflex_agent(location, state) {
  if (state == "SUCIO") return "LIMPIAR";
  else if (location == "A") return "DERECHA";
  else if (location == "B") return "IZQUIERDA";
}

function test(states) {
  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  var action_result = reflex_agent(location, state);

  // Agregar estado actual al conjunto de estados visitados
  const currentState = getStateString(states);
  visitedStates.add(currentState);

  // Mostrar cantidad de estados visitados
  updateLog(`<br>Estados únicos visitados: ${visitedStates.size} de 8`);

  // Verificar si se han visitado todos los estados posibles
  if (visitedStates.size === 8) {
    updateLog(
      "<br><br>¡Se han visitado todos los estados posibles! Terminando..."
    );
    return; // Terminar la ejecución
  }

  // Verificar si ambos estados están limpios
  if (states[1] == "LIMPIO" && states[2] == "LIMPIO") {
    var random = Math.floor(Math.random() * 2);
    if (random === 0) {
      states[1] = "SUCIO";
      updateLog("<br>Se ensució la ubicación A");
    } else {
      states[2] = "SUCIO";
      updateLog("<br>Se ensució la ubicación B");
    }
  }

  updateLog(
    "<br>Ubicación: "
      .concat(location)
      .concat(" | Acción: ")
      .concat(action_result)
  );

  if (action_result == "LIMPIAR") {
    if (location == "A") states[1] = "LIMPIO";
    else if (location == "B") states[2] = "LIMPIO";
  } else if (action_result == "DERECHA") states[0] = "B";
  else if (action_result == "IZQUIERDA") states[0] = "A";

  setTimeout(function () {
    test(states);
  }, 700);
}

var states = ["A", "SUCIO", "SUCIO"];
test(states);
