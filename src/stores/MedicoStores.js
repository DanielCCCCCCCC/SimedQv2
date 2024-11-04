import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useMedicoStore = defineStore("medicoStore", () => {
  // Intenta cargar los datos desde LocalStorage al iniciar la store
  const medicos = ref(JSON.parse(localStorage.getItem("medicos") || "[]"));

  function agregarMedico(medico) {
    medicos.value.push({ id: Date.now(), ...medico });
    console.log(medicos.value);
    // Actualiza LocalStorage cada vez que se agrega un nuevo médico
    localStorage.setItem("medicos", JSON.stringify(medicos.value));
  }

  // Observa los cambios en `medicos` para actualizar LocalStorage
  watch(
    medicos,
    (newMedicos) => {
      localStorage.setItem("medicos", JSON.stringify(newMedicos));
    },
    { deep: true }
  );

  return { medicos, agregarMedico };
});
