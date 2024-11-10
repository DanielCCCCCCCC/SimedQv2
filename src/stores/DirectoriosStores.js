// src/stores/ConfiMedicasStores.js
import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";
import { supabase } from "../supabaseClient";

// Helper para cargar y guardar en localStorage
function loadFromLocalStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//
//
//
//
//
//
//
// Función agregarHospital en la store
export const useHospitalStore = defineStore("hospitalStore", () => {
  const hospitales = ref([]);
  // Función en tu store o componente para agregar el hospital y actualizar el DataGrid
  const agregarHospital = async (hospitalInfo) => {
    const tenant_Id = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3";
    const hospitalConTenant = { ...hospitalInfo, tenant_Id };

    try {
      const { data, error } = await supabase
        .from("hospitales")
        .insert([hospitalConTenant], { returning: "minimal" }); // Cambia a 'representation' si aún no retorna datos

      if (error) {
        console.error("Error al agregar hospital:", error);
        throw new Error(error.message);
      }

      if (data && data.length > 0) {
        hospitales.value.push(data[0]); // Actualiza el DataGrid si recibe datos
      } else {
        console.warn("No se recibieron datos de Supabase."); // Se muestra si el retorno es vacío o 'minimal'
      }
    } catch (err) {
      console.error("Error en agregarHospital:", err.message);
    }
  };

  const eliminarHospital = async (id) => {
    try {
      const { error } = await supabase.from("hospitales").delete().eq("id", id);

      if (error) {
        console.error("Error al eliminar hospital:", error);
      } else {
        hospitales.value = hospitales.value.filter((h) => h.id !== id);
      }
    } catch (err) {
      console.error("Error en eliminarHospital:", err.message);
    }
  };

  return { hospitales, agregarHospital, eliminarHospital };
});

//
//
//
//
//
//
//
///
///Tienda para Medicamentos
export const useMedicamentoStore = defineStore("medicamentoStore", () => {
  const medicamentos = ref(loadFromLocalStorage("medicamentos", []));
  const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3";

  const cargarMedicamentos = async () => {
    const { data, error } = await supabase
      .from("medicamentos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar medicamentos:", error);
    } else {
      medicamentos.value = data;
      saveToLocalStorage("medicamentos", medicamentos.value);
    }
  };

  const agregarMedicamento = async (medicamento) => {
    const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3";

    // Verifica si el medicamento ya existe
    if (!medicamentos.value.some((m) => m.codigo === medicamento.codigo)) {
      const { data, error } = await supabase
        .from("medicamentos")
        .insert([{ ...medicamento, tenant_Id: tenantId }])
        .select(); // Asegura que siempre intente devolver los datos insertados

      if (error) {
        console.error("Error al agregar medicamento:", error);
        return; // Sal de la función si hay un error
      }

      // Verifica si `data` tiene contenido antes de acceder al primer elemento
      if (data && data.length > 0) {
        medicamentos.value.push(data[0]);
        saveToLocalStorage("medicamentos", medicamentos.value);
      } else {
        console.warn("No se devolvieron datos después de la inserción.");
      }
    } else {
      console.warn("Este medicamento ya existe.");
    }
  };

  const eliminarMedicamento = async (id) => {
    const { error } = await supabase.from("medicamentos").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar medicamento:", error);
    } else {
      medicamentos.value = medicamentos.value.filter((m) => m.id !== id);
      saveToLocalStorage("medicamentos", medicamentos.value);
    }
  };

  watch(
    medicamentos,
    (newMedicamentos) => {
      saveToLocalStorage("medicamentos", newMedicamentos);
    },
    { deep: true }
  );

  return {
    medicamentos,
    cargarMedicamentos,
    agregarMedicamento,
    eliminarMedicamento,
  };
});

///
///
///
///
//
///
// Tienda para Estudios
export const useEstudioStore = defineStore("examenesEstudios", () => {
  const estudios = ref(loadFromLocalStorage("examenesEstudios", []));
  const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3";

  const cargarEstudios = async () => {
    const { data, error } = await supabase
      .from("examenesEstudios")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al cargar estudios:", error);
    } else if (data) {
      estudios.value = data;
      saveToLocalStorage("examenesEstudios", estudios.value);
    }
  };

  const agregarEstudio = async (estudioInfo) => {
    const { data, error } = await supabase.from("examenesEstudios").insert([
      {
        ...estudioInfo,
        tenant_id: tenantId,
        updated_at: new Date().toISOString(), // Agrega la fecha/hora actual
      },
    ]);

    if (error) {
      console.error("Error al agregar estudio:", error);
    } else if (data && data.length > 0) {
      estudios.value.push(data[0]);
      saveToLocalStorage("examenesEstudios", estudios.value);
    }
  };

  const eliminarUltimoEstudio = async () => {
    const ultimoEstudio = estudios.value[estudios.value.length - 1];
    if (!ultimoEstudio) return;

    const { error } = await supabase
      .from("examenesEstudios")
      .delete()
      .eq("id", ultimoEstudio.id);

    if (error) {
      console.error("Error al eliminar el estudio:", error);
    } else {
      estudios.value.pop();
      saveToLocalStorage("examenesEstudios", estudios.value);
    }
  };

  onMounted(cargarEstudios);

  return {
    estudios,
    cargarEstudios,
    agregarEstudio,
    eliminarUltimoEstudio,
  };
});
