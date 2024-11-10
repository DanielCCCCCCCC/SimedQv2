// src/stores/multiStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabaseClient";

const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Tenant fijo

// Tienda para Especialidades Médicas
export const useEspecialidadMedicaStore = defineStore(
  "especialidadesMedicas",
  () => {
    const especialidades = ref([]);

    const cargarEspecialidades = async () => {
      const { data, error } = await supabase
        .from("especialidadesMedicas")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error al cargar especialidades:", error);
      } else {
        especialidades.value = data;
      }
    };

    const agregarEspecialidad = async (descripcion) => {
      const { data, error } = await supabase
        .from("especialidadesMedicas")
        .insert([{ descripcion, tenant_id: tenantId }]);

      if (error) {
        console.error("Error al agregar especialidad:", error);
      } else if (data && data[0]) {
        especialidades.value.push(data[0]);
      }
    };

    const eliminarUltimaEspecialidad = async () => {
      const ultimaEspecialidad =
        especialidades.value[especialidades.value.length - 1];
      if (!ultimaEspecialidad) return;

      const { error } = await supabase
        .from("especialidadesMedicas")
        .delete()
        .eq("id", ultimaEspecialidad.id);

      if (error) {
        console.error("Error al eliminar la especialidad:", error);
      } else {
        especialidades.value.pop();
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

// Tienda para Tipos de Estudios
export const useTiposEstudiosStore = defineStore("tiposEstudios", () => {
  const estudios = ref([]);

  const cargarEstudios = async () => {
    const { data, error } = await supabase
      .from("tiposEstudios")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar estudios:", error);
    } else {
      estudios.value = data;
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
    }
  };

  return {
    estudios,
    cargarEstudios,
    agregarEstudio,
    eliminarUltimoEstudio,
  };
});

// Tienda para Tipos de Medicamentos
export const useTiposMedicamentosStore = defineStore(
  "tiposMedicamentos",
  () => {
    const medicamentos = ref([]);

    const cargarMedicamentos = async () => {
      const { data, error } = await supabase
        .from("tiposMedicamentos")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error al cargar medicamentos:", error);
      } else {
        medicamentos.value = data;
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

// Tienda para Tipos de Pacientes
export const useTiposPacientesStore = defineStore("tiposPacientes", () => {
  const tpacientes = ref([]);

  const cargarPacientes = async () => {
    const { data, error } = await supabase
      .from("tiposPacientes")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar pacientes:", error);
    } else {
      tpacientes.value = data;
    }
  };

  const agregarPaciente = async (descripcion) => {
    const { data, error } = await supabase
      .from("tiposPacientes")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar paciente:", error);
    } else if (data && data[0]) {
      tpacientes.value.push(data[0]);
    }
  };

  const eliminarUltimoPaciente = async () => {
    const ultimoPaciente = tpacientes.value[tpacientes.value.length - 1];
    if (!ultimoPaciente) return;

    const { error } = await supabase
      .from("tiposPacientes")
      .delete()
      .eq("id", ultimoPaciente.id);

    if (error) {
      console.error("Error al eliminar el paciente:", error);
    } else {
      tpacientes.value.pop();
    }
  };

  return {
    tpacientes,
    cargarPacientes,
    agregarPaciente,
    eliminarUltimoPaciente,
  };
});

// Tienda para Grupos de Contactos
export const useGruposContactosStore = defineStore("gruposContactos", () => {
  const grupos = ref([]);

  const cargarGrupos = async () => {
    const { data, error } = await supabase
      .from("gruposContactos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar grupos:", error);
    } else {
      grupos.value = data;
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
    }
  };

  return {
    grupos,
    cargarGrupos,
    agregarGrupo,
    eliminarUltimoGrupo,
  };
});

// Tienda para Tipos de Citas
export const useTiposCitasStore = defineStore("tiposCitas", () => {
  const citas = ref([]);

  const cargarCitas = async () => {
    const { data, error } = await supabase
      .from("tiposCitas")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar citas:", error);
    } else {
      citas.value = data;
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
    }
  };

  return {
    citas,
    cargarCitas,
    agregarCita,
    eliminarUltimaCita,
  };
});
