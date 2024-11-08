import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { supabase } from "../supabaseClient";

// Tienda para Departamentos
export const useDepartamentoStore = defineStore("departamentos", () => {
  const departamentos = reactive(
    JSON.parse(localStorage.getItem("departamentos")) || []
  );
  const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3";

  const cargarDepartamentos = async () => {
    const { data, error } = await supabase
      .from("departamentos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar departamentos:", error);
    } else {
      departamentos.value = data;
      localStorage.setItem("departamentos", JSON.stringify(departamentos));
    }
  };

  const agregarDepartamento = async (descripcion) => {
    const { data, error } = await supabase
      .from("departamentos")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar departamento:", error);
    } else if (data && data[0]) {
      departamentos.push(data[0]);
      localStorage.setItem("departamentos", JSON.stringify(departamentos));
    }
  };

  const eliminarUltimoDepartamento = async () => {
    const ultimoDepartamento = departamentos[departamentos.length - 1];
    if (!ultimoDepartamento) return;

    const { error } = await supabase
      .from("departamentos")
      .delete()
      .eq("id", ultimoDepartamento.id);

    if (error) {
      console.error("Error al eliminar el departamento:", error);
    } else {
      departamentos.pop();
      localStorage.setItem("departamentos", JSON.stringify(departamentos));
    }
  };

  return {
    departamentos,
    cargarDepartamentos,
    agregarDepartamento,
    eliminarUltimoDepartamento,
  };
});

// Tienda para Municipios
export const useMunicipioStore = defineStore("municipios", () => {
  const municipios = reactive(
    JSON.parse(localStorage.getItem("municipios")) || []
  );
  const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3";

  const cargarMunicipios = async () => {
    const { data, error } = await supabase
      .from("municipios")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar municipios:", error);
    } else {
      municipios.splice(0, municipios.length, ...data); // Actualiza el array de manera reactiva
      localStorage.setItem("municipios", JSON.stringify(municipios));
    }
  };

  const agregarMunicipio = async (descripcion, departamentoId) => {
    const { data, error } = await supabase
      .from("municipios")
      .insert([{ descripcion, departamentoId, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar municipio:", error);
    } else if (data && data[0]) {
      municipios.push(data[0]);
      localStorage.setItem("municipios", JSON.stringify(municipios));
    }
  };

  const eliminarUltimoMunicipio = async () => {
    const ultimoMunicipio = municipios[municipios.length - 1];
    if (!ultimoMunicipio) return;

    const { error } = await supabase
      .from("municipios")
      .delete()
      .eq("id", ultimoMunicipio.id);

    if (error) {
      console.error("Error al eliminar el municipio:", error);
    } else {
      municipios.pop();
      localStorage.setItem("municipios", JSON.stringify(municipios));
    }
  };

  return {
    municipios,
    cargarMunicipios,
    agregarMunicipio,
    eliminarUltimoMunicipio,
  };
});

// Tienda para Grupo Sanguíneo
export const useGrupoSanguineoStore = defineStore("grupoSanguineo", () => {
  const gruposSanguineos = ref(
    JSON.parse(localStorage.getItem("grupoSanguineo")) || []
  );
  const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Tenant fijo

  const cargarGruposSanguineos = async () => {
    const { data, error } = await supabase
      .from("grupoSanguineo")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar los grupos sanguíneos:", error);
    } else {
      gruposSanguineos.value = data;
      localStorage.setItem(
        "grupoSanguineo",
        JSON.stringify(gruposSanguineos.value)
      );
    }
  };

  const agregarGrupoSanguineo = async (descripcion) => {
    const { data, error } = await supabase
      .from("grupoSanguineo")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar grupo sanguíneo:", error);
    } else if (data && data[0]) {
      gruposSanguineos.value.push(data[0]);
      localStorage.setItem(
        "grupoSanguineo",
        JSON.stringify(gruposSanguineos.value)
      );
    }
  };

  const eliminarUltimoGrupoSanguineo = async () => {
    const ultimoGrupo =
      gruposSanguineos.value[gruposSanguineos.value.length - 1];
    if (!ultimoGrupo) return;

    const { error } = await supabase
      .from("grupoSanguineo")
      .delete()
      .eq("id", ultimoGrupo.id);

    if (error) {
      console.error("Error al eliminar el grupo sanguíneo:", error);
    } else {
      gruposSanguineos.value.pop();
      localStorage.setItem(
        "grupoSanguineo",
        JSON.stringify(gruposSanguineos.value)
      );
    }
  };

  return {
    gruposSanguineos,
    cargarGruposSanguineos,
    agregarGrupoSanguineo,
    eliminarUltimoGrupoSanguineo,
  };
});

// Tienda para Escolaridad
export const useEscolaridadStore = defineStore("escolaridad", () => {
  const escolaridades = ref(
    JSON.parse(localStorage.getItem("escolaridad")) || []
  );
  const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Tenant fijo

  const cargarEscolaridades = async () => {
    const { data, error } = await supabase
      .from("escolaridad")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar escolaridades:", error);
    } else {
      escolaridades.value = data;
      localStorage.setItem("escolaridad", JSON.stringify(escolaridades.value));
    }
  };

  const agregarEscolaridad = async (descripcion) => {
    const { data, error } = await supabase
      .from("escolaridad")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar escolaridad:", error);
    } else if (data && data[0]) {
      escolaridades.value.push(data[0]);
      localStorage.setItem("escolaridad", JSON.stringify(escolaridades.value));
    }
  };

  const eliminarUltimaEscolaridad = async () => {
    const ultimaEscolaridad =
      escolaridades.value[escolaridades.value.length - 1];
    if (!ultimaEscolaridad) return;

    const { error } = await supabase
      .from("escolaridad")
      .delete()
      .eq("id", ultimaEscolaridad.id);

    if (error) {
      console.error("Error al eliminar la escolaridad:", error);
    } else {
      escolaridades.value.pop();
      localStorage.setItem("escolaridad", JSON.stringify(escolaridades.value));
    }
  };

  return {
    escolaridades,
    cargarEscolaridades,
    agregarEscolaridad,
    eliminarUltimaEscolaridad,
  };
});

// Tienda para Estado Civil
export const useEstadoCivilStore = defineStore("estadoCivil", () => {
  const estadosCiviles = ref(
    JSON.parse(localStorage.getItem("estadoCivil")) || []
  );
  const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Tenant fijo

  const cargarEstadosCiviles = async () => {
    const { data, error } = await supabase
      .from("estadoCivil")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar estados civiles:", error);
    } else {
      estadosCiviles.value = data;
      localStorage.setItem("estadoCivil", JSON.stringify(estadosCiviles.value));
    }
  };

  const agregarEstadoCivil = async (descripcion) => {
    const { data, error } = await supabase
      .from("estadoCivil")
      .insert([{ descripcion, tenant_id: tenantId }]);

    if (error) {
      console.error("Error al agregar estado civil:", error);
    } else if (data && data[0]) {
      estadosCiviles.value.push(data[0]);
      localStorage.setItem("estadoCivil", JSON.stringify(estadosCiviles.value));
    }
  };

  const eliminarUltimoEstadoCivil = async () => {
    const ultimoEstado = estadosCiviles.value[estadosCiviles.value.length - 1];
    if (!ultimoEstado) return;

    const { error } = await supabase
      .from("estadoCivil")
      .delete()
      .eq("id", ultimoEstado.id);

    if (error) {
      console.error("Error al eliminar el estado civil:", error);
    } else {
      estadosCiviles.value.pop();
      localStorage.setItem("estadoCivil", JSON.stringify(estadosCiviles.value));
    }
  };

  return {
    estadosCiviles,
    cargarEstadosCiviles,
    agregarEstadoCivil,
    eliminarUltimoEstadoCivil,
  };
});
