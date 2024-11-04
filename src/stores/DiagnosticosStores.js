// src/stores/multiStore.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

// Helper para cargar y guardar en localStorage
function loadFromLocalStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Tienda para Clasificación de Diagnósticos
export const useClasificacionDiagnosticosStore = defineStore(
  "clasificacionDiagnosticos",
  () => {
    const clasificaciones = ref(loadFromLocalStorage("clasificaciones", []));

    const agregarClasificacion = (nombre) => {
      clasificaciones.value.push({ id: Date.now(), ...nombre });
    };

    const eliminarClasificacion = (id) => {
      clasificaciones.value = clasificaciones.value.filter(
        (clasificacion) => clasificacion.id !== id
      );
    };

    // Observa los cambios en `clasificaciones` y los guarda en `localStorage`
    watch(
      clasificaciones,
      (newClasificaciones) => {
        saveToLocalStorage("clasificaciones", newClasificaciones);
      },
      { deep: true }
    );

    return { clasificaciones, agregarClasificacion, eliminarClasificacion };
  }
);

// Tienda para Diagnósticos
export const useDiagnosticosStore = defineStore("diagnosticos", () => {
  const diagnosticos = ref(loadFromLocalStorage("diagnosticos", []));

  const agregarDiagnostico = (descripcion, clasificacion) => {
    diagnosticos.value.push({ id: Date.now(), descripcion, clasificacion });
  };

  const eliminarDiagnostico = (id) => {
    diagnosticos.value = diagnosticos.value.filter(
      (diagnostico) => diagnostico.id !== id
    );
  };

  // Observa los cambios en `diagnosticos` y los guarda en `localStorage`
  watch(
    diagnosticos,
    (newDiagnosticos) => {
      saveToLocalStorage("diagnosticos", newDiagnosticos);
    },
    { deep: true }
  );

  return { diagnosticos, agregarDiagnostico, eliminarDiagnostico };
});

// Tienda para Controles de Medición
export const useControlesMedicionStore = defineStore(
  "controlesMedicion",
  () => {
    const controles = ref(loadFromLocalStorage("controles", []));

    const agregarControl = (descripcion) => {
      controles.value.push({ id: Date.now(), descripcion });
    };

    const eliminarControl = (id) => {
      controles.value = controles.value.filter((control) => control.id !== id);
    };

    // Observa los cambios en `controles` y los guarda en `localStorage`
    watch(
      controles,
      (newControles) => {
        saveToLocalStorage("controles", newControles);
      },
      { deep: true }
    );

    return { controles, agregarControl, eliminarControl };
  }
);
