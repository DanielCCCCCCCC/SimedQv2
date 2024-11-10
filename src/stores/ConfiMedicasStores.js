// src/stores/multiStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabaseClient";

// Helper para cargar datos desde localStorage
function loadFromLocalStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

// Helper para guardar datos en localStorage
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Tenant fijo

// Tienda para Especialidades Médicas
export const useEspecialidadMedicaStore = defineStore(
  "especialidadesMedicas",
  () => {
    const especialidades = ref([]);

    const cargarEspecialidades = async () => {
      const { data, error } = await supabase
        .from("especialidadesMedicas") // Cambiado a "especialidadesMedicas"
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error al cargar especialidades:", error);
      } else {
        especialidades.value = data;
        localStorage.setItem(
          "especialidadesMedicas",
          JSON.stringify(especialidades.value)
        );
      }
    };

    const agregarEspecialidad = async (descripcion) => {
      const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Asegúrate de que el tenant_id sea el correcto
      const { data, error } = await supabase
        .from("especialidadesMedicas") // Cambiado a "especialidadesMedicas"
        .insert([{ descripcion, tenant_id: tenantId }]);

      if (error) {
        console.error("Error al agregar especialidad:", error);
      } else if (data && data[0]) {
        especialidades.value.push(data[0]);
        localStorage.setItem(
          "especialidadesMedicas",
          JSON.stringify(especialidades.value)
        );
      }
    };

    const eliminarUltimaEspecialidad = async () => {
      const ultimaEspecialidad =
        especialidades.value[especialidades.value.length - 1];
      if (!ultimaEspecialidad) return;

      const { error } = await supabase
        .from("especialidadesMedicas") // Cambiado a "especialidadesMedicas"
        .delete()
        .eq("id", ultimaEspecialidad.id);

      if (error) {
        console.error("Error al eliminar la especialidad:", error);
      } else {
        especialidades.value.pop();
        localStorage.setItem(
          "especialidadesMedicas",
          JSON.stringify(especialidades.value)
        );
      }
    };

    return {
      especialidades,
      cargarEspecialidades,
      agregarEspecialidad,
      eliminarUltimaEspecialidad,
    };
  }
);

//
//
///
//
//
//
//
//
///
//
// Tipos de Estudios
export const useTiposEstudiosStore = defineStore("tiposEstudios", () => {
  const estudios = ref(loadFromLocalStorage("tiposEstudios", []));

  const cargarEstudios = async () => {
    const { data, error } = await supabase
      .from("tiposEstudios")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar estudios:", error);
    } else {
      estudios.value = data;
      saveToLocalStorage("tiposEstudios", estudios.value);
    }
  };

  const agregarEstudio = async (descripcion) => {
    const { data, error } = await supabase
      .from("tiposEstudios")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar estudio:", error);
    } else if (data && data[0]) {
      estudios.value.push(data[0]);
      saveToLocalStorage("tiposEstudios", estudios.value);
    }
  };

  const eliminarUltimoEstudio = async () => {
    const ultimoEstudio = estudios.value[estudios.value.length - 1];
    if (!ultimoEstudio) return;

    const { error } = await supabase
      .from("tiposEstudios")
      .delete()
      .eq("id", ultimoEstudio.id);

    if (error) {
      console.error("Error al eliminar el estudio:", error);
    } else {
      estudios.value.pop();
      saveToLocalStorage("tiposEstudios", estudios.value);
    }
  };

  return {
    estudios,
    cargarEstudios,
    agregarEstudio,
    eliminarUltimoEstudio,
  };
});

//
//
///
//
//
//
//
//
///
//
// Tipos de Medicamentos
export const useTiposMedicamentosStore = defineStore(
  "tiposMedicamentos",

  () => {
    const medicamentos = ref(loadFromLocalStorage("tiposMedicamentos", []));
    const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Asegúrate de que el tenant_id sea el correcto

    const cargarMedicamentos = async () => {
      const { data, error } = await supabase
        .from("tiposMedicamentos")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error al cargar medicamentos:", error);
      } else {
        medicamentos.value = data;
        saveToLocalStorage("tiposMedicamentos", medicamentos.value);
      }
    };

    const agregarMedicamento = async (descripcion) => {
      const { data, error } = await supabase
        .from("tiposMedicamentos")
        .insert([{ descripcion, tenant_id: tenantId }]);

      if (error) {
        console.error("Error al agregar medicamento:", error);
      } else if (data && data[0]) {
        medicamentos.value.push(data[0]);
        saveToLocalStorage("tiposMedicamentos", medicamentos.value);
      }
    };

    const eliminarUltimoMedicamento = async () => {
      const ultimoMedicamento =
        medicamentos.value[medicamentos.value.length - 1];
      if (!ultimoMedicamento) return;

      const { error } = await supabase
        .from("tiposMedicamentos")
        .delete()
        .eq("id", ultimoMedicamento.id);

      if (error) {
        console.error("Error al eliminar el medicamento:", error);
      } else {
        medicamentos.value.pop();
        saveToLocalStorage("tiposMedicamentos", medicamentos.value);
      }
    };

    return {
      medicamentos,
      cargarMedicamentos,
      agregarMedicamento,
      eliminarUltimoMedicamento,
    };
  }
);

// Tipos de Pacientes
export const useTiposPacientesStore = defineStore("tiposPacientes", () => {
  const pacientes = ref(loadFromLocalStorage("tiposPacientes", []));

  const cargarPacientes = async () => {
    const { data, error } = await supabase
      .from("tiposPacientes")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar pacientes:", error);
    } else {
      pacientes.value = data;
      saveToLocalStorage("tiposPacientes", pacientes.value);
    }
  };

  const agregarPaciente = async (descripcion) => {
    const { data, error } = await supabase
      .from("tiposPacientes")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar paciente:", error);
    } else if (data && data[0]) {
      pacientes.value.push(data[0]);
      saveToLocalStorage("tiposPacientes", pacientes.value);
    }
  };

  const eliminarUltimoPaciente = async () => {
    const ultimoPaciente = pacientes.value[pacientes.value.length - 1];
    if (!ultimoPaciente) return;

    const { error } = await supabase
      .from("tiposPacientes")
      .delete()
      .eq("id", ultimoPaciente.id);

    if (error) {
      console.error("Error al eliminar el paciente:", error);
    } else {
      pacientes.value.pop();
      saveToLocalStorage("tiposPacientes", pacientes.value);
    }
  };

  return {
    pacientes,
    cargarPacientes,
    agregarPaciente,
    eliminarUltimoPaciente,
  };
});

// Grupos de Contactos
export const useGruposContactosStore = defineStore("gruposContactos", () => {
  const grupos = ref(loadFromLocalStorage("gruposContactos", []));

  const cargarGrupos = async () => {
    const { data, error } = await supabase
      .from("gruposContactos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar grupos:", error);
    } else {
      grupos.value = data;
      saveToLocalStorage("gruposContactos", grupos.value);
    }
  };

  const agregarGrupo = async (descripcion) => {
    const { data, error } = await supabase
      .from("gruposContactos")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar grupo:", error);
    } else if (data && data[0]) {
      grupos.value.push(data[0]);
      saveToLocalStorage("gruposContactos", grupos.value);
    }
  };

  const eliminarUltimoGrupo = async () => {
    const ultimoGrupo = grupos.value[grupos.value.length - 1];
    if (!ultimoGrupo) return;

    const { error } = await supabase
      .from("gruposContactos")
      .delete()
      .eq("id", ultimoGrupo.id);

    if (error) {
      console.error("Error al eliminar el grupo:", error);
    } else {
      grupos.value.pop();
      saveToLocalStorage("gruposContactos", grupos.value);
    }
  };

  return {
    grupos,
    cargarGrupos,
    agregarGrupo,
    eliminarUltimoGrupo,
  };
});

// Tipos de Citas
export const useTiposCitasStore = defineStore("tiposCitas", () => {
  const citas = ref(loadFromLocalStorage("tiposCitas", []));

  const cargarCitas = async () => {
    const { data, error } = await supabase
      .from("tiposCitas")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar citas:", error);
    } else {
      citas.value = data;
      saveToLocalStorage("tiposCitas", citas.value);
    }
  };

  const agregarCita = async (descripcion) => {
    const { data, error } = await supabase
      .from("tiposCitas")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar cita:", error);
    } else if (data && data[0]) {
      citas.value.push(data[0]);
      saveToLocalStorage("tiposCitas", citas.value);
    }
  };

  const eliminarUltimaCita = async () => {
    const ultimaCita = citas.value[citas.value.length - 1];
    if (!ultimaCita) return;

    const { error } = await supabase
      .from("tiposCitas")
      .delete()
      .eq("id", ultimaCita.id);

    if (error) {
      console.error("Error al eliminar la cita:", error);
    } else {
      citas.value.pop();
      saveToLocalStorage("tiposCitas", citas.value);
    }
  };

  return {
    citas,
    cargarCitas,
    agregarCita,
    eliminarUltimaCita,
  };
});
