// Definimos los estados posibles
const possibleStates = [
  { location: "A", stateA: "SUCIO", stateB: "SUCIO" },
  { location: "A", stateA: "SUCIO", stateB: "LIMPIO" },
  { location: "A", stateA: "LIMPIO", stateB: "SUCIO" },
  { location: "A", stateA: "LIMPIO", stateB: "LIMPIO" },
  { location: "B", stateA: "SUCIO", stateB: "SUCIO" },
  { location: "B", stateA: "SUCIO", stateB: "LIMPIO" },
  { location: "B", stateA: "LIMPIO", stateB: "SUCIO" },
  { location: "B", stateA: "LIMPIO", stateB: "LIMPIO" },
];

// Set para trackear estados visitados
const visitedStates = new Set();

function reflex_agent(location, state) {
  if (state == "SUCIO") return "LIMPIAR";
  else if (location == "A") return "DERECHA";
  else if (location == "B") return "IZQUIERDA";
}

function checkAllStatesVisited(states) {
  const stateKey = `${states[0]}-${states[1]}-${states[2]}`;
  visitedStates.add(stateKey);
  return visitedStates.size === 8;
}

function simulateDirty(states) {
  if (states[1] === "LIMPIO" && states[2] === "LIMPIO") {
    // Simular ensuciamiento
    for (const possibleState of possibleStates) {
      const stateKey = `${states[0]}-${possibleState.stateA}-${possibleState.stateB}`;
      if (!visitedStates.has(stateKey)) {
        if (states[1] === "LIMPIO" && possibleState.stateA === "SUCIO") {
          states[1] = "SUCIO";
          document.getElementById("log").innerHTML +=
            "<br>Acción externa: Ensuciar A";
          break;
        } else if (states[2] === "LIMPIO" && possibleState.stateB === "SUCIO") {
          states[2] = "SUCIO";
          document.getElementById("log").innerHTML +=
            "<br>Acción externa: Ensuciar B";
          break;
        }
      }
    }
  }
}

function test(states) {
  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  var action_result = reflex_agent(location, state);

  // Imprimir estado actual
  document.getElementById("log").innerHTML += "<br><br><b>Posición actual: "
    .concat(location)
    .concat(" | A = ")
    .concat(states[1])
    .concat(", B = ")
    .concat(states[2])
    .concat("</b>");

  document.getElementById("log").innerHTML += "<br>Acción: ".concat(
    action_result
  );

  // Actualizar estados según la acción
  if (action_result == "LIMPIAR") {
    if (location == "A") states[1] = "LIMPIO";
    else if (location == "B") states[2] = "LIMPIO";
  } else if (action_result == "DERECHA") states[0] = "B";
  else if (action_result == "IZQUIERDA") states[0] = "A";

  // Verificar si todos los estados han sido visitados
  if (checkAllStatesVisited(states)) {
    document.getElementById("log").innerHTML +=
      "<br><br><b>Todos los estados posibles han sido visitados</b>";
    return;
  }

  // Simular ensuciamiento si es necesario
  simulateDirty(states);

  // Verificar nuevamente después de ensuciar
  if (checkAllStatesVisited(states)) {
    document.getElementById("log").innerHTML +=
      "<br><br><b>Todos los estados posibles han sido visitados</b>";
    return;
  }

  setTimeout(function () {
    test(states);
  }, 2000);
}

var states = ["A", "SUCIO", "SUCIO"];
test(states);
