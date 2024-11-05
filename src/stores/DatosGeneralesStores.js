// src/stores/configuracionStore.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";

function loadFromLocalStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  if (saved) {
    const parsed = JSON.parse(saved);
    // Convierte los IDs a números
    parsed.forEach((item) => {
      if (item.id) item.id = Number(item.id);
      if (item.departamentoId)
        item.departamentoId = Number(item.departamentoId);
    });
    return parsed;
  }
  return defaultValue;
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Tienda para Departamentos
export const useDepartamentoStore = defineStore("departamentos", () => {
  const departamentos = ref(loadFromLocalStorage("departamentos", []));

  const agregarDepartamento = (descripcion) => {
    departamentos.value.push({ id: Date.now(), descripcion });
  };

  const eliminarUltimoDepartamento = () => {
    departamentos.value.pop();
  };
  console.log(departamentos.value);
  watch(
    departamentos,
    (newVal) => saveToLocalStorage("departamentos", newVal),
    { deep: true }
  );

  return { departamentos, agregarDepartamento, eliminarUltimoDepartamento };
});

export const useMunicipioStore = defineStore("municipios", () => {
  const municipios = ref(loadFromLocalStorage("municipios", []));

  const agregarMunicipio = (municipio) => {
    municipios.value.push(municipio);
  };

  const eliminarUltimoMunicipio = () => {
    municipios.value.pop();
  };

  watch(municipios, (newVal) => saveToLocalStorage("municipios", newVal), {
    deep: true,
  });

  return { municipios, agregarMunicipio, eliminarUltimoMunicipio };
});

//
//
//
//
// Tienda para Grupo Sanguíneo
export const useGrupoSanguineoStore = defineStore("grupoSanguineo", () => {
  const gruposSanguineos = ref(loadFromLocalStorage("grupoSanguineo", []));

  const agregarGrupoSanguineo = (descripcion) => {
    gruposSanguineos.value.push({ id: Date.now(), descripcion });
  };

  const eliminarUltimoGrupoSanguineo = () => {
    gruposSanguineos.value.pop();
  };

  watch(
    gruposSanguineos,
    (newVal) => saveToLocalStorage("grupoSanguineo", newVal),
    { deep: true }
  );

  return {
    gruposSanguineos,
    agregarGrupoSanguineo,
    eliminarUltimoGrupoSanguineo,
  };
});

// Tienda para Escolaridad
export const useEscolaridadStore = defineStore("escolaridad", () => {
  const escolaridades = ref(loadFromLocalStorage("escolaridad", []));

  const agregarEscolaridad = (descripcion) => {
    escolaridades.value.push({ id: Date.now(), descripcion });
  };

  const eliminarUltimaEscolaridad = () => {
    escolaridades.value.pop();
  };

  watch(escolaridades, (newVal) => saveToLocalStorage("escolaridad", newVal), {
    deep: true,
  });

  return { escolaridades, agregarEscolaridad, eliminarUltimaEscolaridad };
});

// Tienda para Estado Civil
export const useEstadoCivilStore = defineStore("estadoCivil", () => {
  const estadosCiviles = ref(loadFromLocalStorage("estadoCivil", []));

  const agregarEstadoCivil = (descripcion) => {
    estadosCiviles.value.push({ id: Date.now(), descripcion });
  };

  const eliminarUltimoEstadoCivil = () => {
    estadosCiviles.value.pop();
  };

  watch(estadosCiviles, (newVal) => saveToLocalStorage("estadoCivil", newVal), {
    deep: true,
  });

  return { estadosCiviles, agregarEstadoCivil, eliminarUltimoEstadoCivil };
});
