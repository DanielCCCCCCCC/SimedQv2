// src/stores/ConfiMedicasStores.js
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

// Tienda para Hospitales
export const useHospitalStore = defineStore("hospitalStore", () => {
  const hospitales = ref(loadFromLocalStorage("hospitales", []));

  const agregarHospital = (hospital) => {
    hospitales.value.push({ id: Date.now(), ...hospital });
  };

  const eliminarHospital = (id) => {
    hospitales.value = hospitales.value.filter((h) => h.id !== id);
  };

  watch(
    hospitales,
    (newHospitales) => {
      saveToLocalStorage("hospitales", newHospitales);
    },
    { deep: true }
  );

  return { hospitales, agregarHospital, eliminarHospital };
});

///
///
///
///
//
///
///Tienda para Medicamentos
export const useMedicamentoStore = defineStore("medicamentoStore", () => {
  const medicamentos = ref(loadFromLocalStorage("medicamentos", []));

  const agregarMedicamento = (medicamento, configuracion) => {
    if (!medicamentos.value.some((m) => m.codigo === medicamento.codigo)) {
      medicamentos.value.push({
        id: Date.now(),
        ...medicamento,
        configuracion: { ...configuracion },
      });
    } else {
      console.warn("Este medicamento ya existe.");
    }
  };

  const eliminarMedicamento = (id) => {
    const index = medicamentos.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      medicamentos.value.splice(index, 1);
    } else {
      console.warn("El medicamento no fue encontrado.");
    }
  };
  watch(
    medicamentos,
    (newMedicamentos) => {
      saveToLocalStorage("medicamentos", newMedicamentos);
    },
    { deep: true }
  );

  return { medicamentos, agregarMedicamento, eliminarMedicamento };
});

///
///
///
///
//
///

// Tienda para Exámenes y Estudios
export const useEstudioStore = defineStore("estudioStore", () => {
  const estudios = ref(loadFromLocalStorage("estudios", []));

  const agregarEstudio = (estudio) => {
    // Fusionar los datos de estudio y configuración en un solo objeto
    estudios.value.push({
      id: Date.now(),
      ...estudio,
    });
  };

  const eliminarEstudio = (id) => {
    estudios.value = estudios.value.filter((e) => e.id !== id);
  };

  watch(
    estudios,
    (newEstudios) => {
      saveToLocalStorage("estudios", newEstudios);
    },
    { deep: true }
  );

  return { estudios, agregarEstudio, eliminarEstudio };
});
