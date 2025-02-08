// Constantes para posiciones y estados
const LEFT_POSITION = "A";
const RIGHT_POSITION = "B";
const DIRTY_STATE = "SUCIO";
const CLEAN_STATE = "LIMPIO";
const LEFT_ACTION = "IZQUIERDA";
const RIGHT_ACTION = "DERECHA";
const CLEAN_ACTION = "LIMPIAR";
const MESS_ACTION = "ENSUCIAR";

// Función para obtener número aleatorio
function getRandom() {
  return Math.floor(Math.random() * 2);
}

// Función para actualizar el log con scroll automático y estilo mejorado
function updateLog(message, isAction = false) {
  const logElement = document.getElementById("log");
  const timestamp = new Date().toLocaleTimeString();

  const messageWithStyle = isAction
    ? `<div style="color: #2ecc71; margin: 5px 0; padding: 5px; border-left: 3px solid #27ae60">
      ${timestamp} - ${message}
    </div>`
    : `<div style="margin: 5px 0;">
      ${timestamp} - ${message}
    </div>`;

  logElement.innerHTML += messageWithStyle;
  logElement.scrollTop = logElement.scrollHeight;
}

// Array para rastrear estados visitados
const traversedStates = [];

// Función para agregar nuevos estados
const addState = (newState) => {
  const [robot, aState, bState] = newState;
  const posibleStates = traversedStates.find((state) => {
    const [r, a, b] = state;
    return a === aState && b === bState && robot === r;
  });
  if (!posibleStates) {
    traversedStates.push([...newState]);
    console.log({ traversedStates });
  }
};

function reflex_agent(location, state) {
  if (state === DIRTY_STATE && getRandom() === 1) return CLEAN_ACTION;
  if (state === CLEAN_STATE && getRandom() === 1) return MESS_ACTION;

  if (location === LEFT_POSITION) return RIGHT_ACTION;
  if (location === RIGHT_POSITION) return LEFT_ACTION;
}

function test(states) {
  // Verificar si se han visitado todos los estados
  if (traversedStates.length === 8) {
    updateLog(`
      <div style="background-color: #3498db; color: white; padding: 10px; border-radius: 5px; margin: 10px 0;">
        <h3 style="margin: 0;">¡Todos los estados han sido recorridos!</h3>
        <ul style="margin: 10px 0;">
        ${[...traversedStates]
          .map(
            (state) => `
            <li>${state[0]}: ${state[1]} - ${state[2]}</li>
        `
          )
          .join("")}
        </ul>
      </div>
    `);
    return;
  }

  addState(states);

  const [location, leftState, rightState] = states;
  const state = location === LEFT_POSITION ? leftState : rightState;
  const action_result = reflex_agent(location, state);

  // Actualizar estado actual con estilo
  updateLog(`
    <div style="background-color: #f8f9fa; padding: 5px; border-radius: 3px;">
      Estado: 
      <span style="color: ${
        leftState === DIRTY_STATE ? "#e74c3c" : "#27ae60"
      }">A: ${leftState}</span> | 
      <span style="color: ${
        rightState === DIRTY_STATE ? "#e74c3c" : "#27ae60"
      }">B: ${rightState}</span> 
      <span style="font-weight: bold;">Ubicación: ${location}</span> | 
      <span style="color: #3498db">Acción: ${action_result}</span>
    </div>
  `);

  if (action_result === CLEAN_ACTION) {
    if (location === LEFT_POSITION) {
      states[1] = CLEAN_STATE;
      updateLog("🧹 Limpiando ubicación A", true);
    } else if (location === RIGHT_POSITION) {
      states[2] = CLEAN_STATE;
      updateLog("🧹 Limpiando ubicación B", true);
    }
  }

  if (action_result === MESS_ACTION) {
    if (location === LEFT_POSITION) {
      states[1] = DIRTY_STATE;
      updateLog("💩 Ensuciando ubicación A", true);
    } else if (location === RIGHT_POSITION) {
      states[2] = DIRTY_STATE;
      updateLog("💩 Ensuciando ubicación B", true);
    }
  } else if (action_result === RIGHT_ACTION) {
    states[0] = RIGHT_POSITION;
    updateLog("➡️ Moviendo a la derecha", true);
  } else if (action_result === LEFT_ACTION) {
    states[0] = LEFT_POSITION;
    updateLog("⬅️ Moviendo a la izquierda", true);
  }

  setTimeout(() => test(states), 1000);
}

const states = [LEFT_POSITION, DIRTY_STATE, DIRTY_STATE];
test(states);
