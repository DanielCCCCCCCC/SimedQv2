import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabaseClient"; // Asegúrate de tener configurado supabaseClient

export const useMedicoStore = defineStore("medicoStore", () => {
  const medicos = ref([]);

  // Función para cargar médicos desde Supabase
  async function cargarMedicos() {
    const { data, error } = await supabase.from("medicos").select("*");
    if (error) {
      console.error("Error al cargar médicos:", error.message);
    } else {
      medicos.value = data;
    }
  }

  // Función para agregar un médico a la base de datos de Supabase
  async function agregarMedico(medico) {
    const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Reemplaza con tu tenant ID

    const { data, error } = await supabase
      .from("medicos")
      .insert([{ ...medico, tenant_Id: tenantId }]); // Eliminé el `id: Date.now()` porque Supabase debería gestionar el ID automáticamente.

    if (error) {
      console.error("Error al agregar médico:", error.message);
      return null; // Opcional: devuelve null si hay error para manejo adicional
    } else if (data && data.length > 0) {
      medicos.value.push(data[0]);
      return data[0]; // Retorna el médico agregado
    }
  }

  // Llamar a cargarMedicos al montar la store
  cargarMedicos();

  return {
    medicos,
    agregarMedico,
    cargarMedicos,
  };
});
