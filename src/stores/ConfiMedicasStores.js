// src/stores/multiStore.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

function loadFromLocalStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Especialidades Médicas
export const useEspecialidadMedicaStore = defineStore("especialidades", () => {
  const especialidades = ref(loadFromLocalStorage("especialidades", []));
  const agregarEspecialidad = (descripcion) =>
    especialidades.value.push({ id: Date.now(), descripcion });
  const eliminarUltimaEspecialidad = () => especialidades.value.pop();
  watch(
    especialidades,
    (newVal) => saveToLocalStorage("especialidades", newVal),
    { deep: true }
  );
  return { especialidades, agregarEspecialidad, eliminarUltimaEspecialidad };
});

// Tipos de Estudios
export const useTiposEstudiosStore = defineStore("tiposEstudios", () => {
  const estudios = ref(loadFromLocalStorage("tiposEstudios", []));
  const agregarEstudio = (descripcion) =>
    estudios.value.push({ id: Date.now(), descripcion });
  const eliminarUltimoEstudio = () => estudios.value.pop();
  watch(estudios, (newVal) => saveToLocalStorage("tiposEstudios", newVal), {
    deep: true,
  });
  return { estudios, agregarEstudio, eliminarUltimoEstudio };
});

// Tipos de Medicamentos
export const useTiposMedicamentosStore = defineStore(
  "tiposMedicamentos",
  () => {
    const medicamentos = ref(loadFromLocalStorage("tiposMedicamentos", []));
    const agregarMedicamento = (descripcion) =>
      medicamentos.value.push({ id: Date.now(), descripcion });
    const eliminarUltimoMedicamento = () => medicamentos.value.pop();
    watch(
      medicamentos,
      (newVal) => saveToLocalStorage("tiposMedicamentos", newVal),
      { deep: true }
    );
    return { medicamentos, agregarMedicamento, eliminarUltimoMedicamento };
  }
);

// Tipos de Pacientes
export const useTiposPacientesStore = defineStore("tiposPacientes", () => {
  const pacientes = ref(loadFromLocalStorage("tiposPacientes", []));
  const agregarPaciente = (descripcion) =>
    pacientes.value.push({ id: Date.now(), descripcion });
  const eliminarUltimoPaciente = () => pacientes.value.pop();
  watch(pacientes, (newVal) => saveToLocalStorage("tiposPacientes", newVal), {
    deep: true,
  });
  return { pacientes, agregarPaciente, eliminarUltimoPaciente };
});

// Grupos de Contactos
export const useGruposContactosStore = defineStore("gruposContactos", () => {
  const grupos = ref(loadFromLocalStorage("gruposContactos", []));
  const agregarGrupo = (descripcion) =>
    grupos.value.push({ id: Date.now(), descripcion });
  const eliminarUltimoGrupo = () => grupos.value.pop();
  watch(grupos, (newVal) => saveToLocalStorage("gruposContactos", newVal), {
    deep: true,
  });
  return { grupos, agregarGrupo, eliminarUltimoGrupo };
});

// Tipos de Citas
export const useTiposCitasStore = defineStore("tiposCitas", () => {
  const citas = ref(loadFromLocalStorage("tiposCitas", []));
  const agregarCita = (descripcion) =>
    citas.value.push({ id: Date.now(), descripcion });
  const eliminarUltimaCita = () => citas.value.pop();
  watch(citas, (newVal) => saveToLocalStorage("tiposCitas", newVal), {
    deep: true,
  });
  return { citas, agregarCita, eliminarUltimaCita };
});
