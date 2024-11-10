// src/stores/multiStore.js
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { supabase } from "../supabaseClient";

// ID del tenant fijo
const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3";

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

    const cargarClasificaciones = async () => {
      const { data, error } = await supabase
        .from("clasificacionDiagnosticos")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error al cargar clasificaciones:", error);
      } else if (data) {
        clasificaciones.value = data;
        saveToLocalStorage("clasificaciones", clasificaciones.value);
      }
    };

    const agregarClasificacion = async (nombre) => {
      const { data, error } = await supabase
        .from("clasificacionDiagnosticos")
        .insert([{ nombre, tenant_id: tenantId }]);

      if (error) {
        console.error("Error al agregar clasificación:", error);
      } else if (data && data.length > 0) {
        // Verificar que data no es null y tiene elementos
        clasificaciones.value.push(data[0]);
        saveToLocalStorage("clasificaciones", clasificaciones.value);
      }
    };

    const eliminarUltimaClasificacion = async () => {
      const ultimaClasificacion =
        clasificaciones.value[clasificaciones.value.length - 1];
      if (!ultimaClasificacion) return;

      const { error } = await supabase
        .from("clasificacionDiagnosticos")
        .delete()
        .eq("id", ultimaClasificacion.id);

      if (error) {
        console.error("Error al eliminar la clasificación:", error);
      } else {
        clasificaciones.value.pop();
        saveToLocalStorage("clasificaciones", clasificaciones.value);
      }
    };

    onMounted(cargarClasificaciones);

    return {
      clasificaciones,
      cargarClasificaciones,
      agregarClasificacion,
      eliminarUltimaClasificacion,
    };
  }
);

// Tienda para Diagnósticos
export const useDiagnosticosStore = defineStore("diagnosticos", () => {
  const diagnosticos = ref(loadFromLocalStorage("diagnosticos", []));

  const cargarDiagnosticos = async () => {
    const { data, error } = await supabase
      .from("diagnosticos")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar diagnósticos:", error);
    } else if (data) {
      diagnosticos.value = data;
      saveToLocalStorage("diagnosticos", diagnosticos.value);
    }
  };
  const agregarDiagnostico = async (
    descripcion,
    clasificacionId,
    clasificacionDescripcion
  ) => {
    const { data, error } = await supabase.from("diagnosticos").insert([
      {
        descripcion,
        clasificacionId,
        clasificacionDescripcion,
        tenant_id: tenantId,
      },
    ]);

    if (error) {
      console.error("Error al agregar diagnóstico:", error);
    } else if (data && data.length > 0) {
      diagnosticos.value.push(data[0]);
      saveToLocalStorage("diagnosticos", diagnosticos.value);
    }
  };

  const eliminarUltimoDiagnostico = async () => {
    const ultimoDiagnostico = diagnosticos.value[diagnosticos.value.length - 1];
    if (!ultimoDiagnostico) return;

    const { error } = await supabase
      .from("diagnosticos")
      .delete()
      .eq("id", ultimoDiagnostico.id);

    if (error) {
      console.error("Error al eliminar el diagnóstico:", error);
    } else {
      diagnosticos.value.pop();
      saveToLocalStorage("diagnosticos", diagnosticos.value);
    }
  };

  onMounted(cargarDiagnosticos);

  return {
    diagnosticos,
    cargarDiagnosticos,
    agregarDiagnostico,
    eliminarUltimoDiagnostico,
  };
});

// Tienda para Controles de Medición
export const useControlesMedicionStore = defineStore(
  "controlesMedicion",
  () => {
    const controles = ref(loadFromLocalStorage("controles", []));

    const cargarControles = async () => {
      const { data, error } = await supabase
        .from("controles")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error al cargar controles:", error);
      } else if (data) {
        controles.value = data;
        saveToLocalStorage("controles", controles.value);
      }
    };

    const agregarControl = async (descripcion) => {
      const { data, error } = await supabase
        .from("controles")
        .insert([{ descripcion, tenant_id: tenantId }]);

      if (error) {
        console.error("Error al agregar control:", error);
      } else if (data && data.length > 0) {
        // Verificar que data no es null y tiene elementos
        controles.value.push(data[0]);
        saveToLocalStorage("controles", controles.value);
      }
    };

    const eliminarUltimoControl = async () => {
      const ultimoControl = controles.value[controles.value.length - 1];
      if (!ultimoControl) return;

      const { error } = await supabase
        .from("controles")
        .delete()
        .eq("id", ultimoControl.id);

      if (error) {
        console.error("Error al eliminar el control:", error);
      } else {
        controles.value.pop();
        saveToLocalStorage("controles", controles.value);
      }
    };

    onMounted(cargarControles);

    return {
      controles,
      cargarControles,
      agregarControl,
      eliminarUltimoControl,
    };
  }
);
