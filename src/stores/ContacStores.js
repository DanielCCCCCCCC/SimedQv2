import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabaseClient"; // Asegúrate de que este archivo esté configurado correctamente

export const useContactStore = defineStore("contactStore", () => {
  const contactos = ref([]);
  const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3";

  // Cargar contactos desde la base de datos
  const cargarContactos = async () => {
    try {
      const { data, error } = await supabase
        .from("contactos")
        .select("*")
        .eq("tenant_Id", tenantId);

      if (error) {
        console.error("Error al cargar contactos:", error.message);
      } else {
        contactos.value = data || [];
        console.log("Contactos cargados:", contactos.value);
      }
    } catch (err) {
      console.error("Error al conectar con Supabase:", err);
    }
  };

  // Agregar un contacto a la base de datos
  const agregarContacto = async (contacto) => {
    try {
      const { data, error } = await supabase
        .from("contactos")
        .insert([{ ...contacto, tenant_Id: tenantId }])
        .select();
      console.log("Ln35 store " + contacto.value);
      if (error) {
        console.error("Error al agregar contacto:", error.message);
      } else if (data && data.length > 0) {
        contactos.value.push(data[0]);
        console.log("Contacto agregado:", data[0]);
      } else {
        console.warn("Contacto agregado, pero sin datos devueltos.");
      }
    } catch (err) {
      console.error("Error al conectar con Supabase:", err);
    }
  };

  // Eliminar un contacto de la base de datos y de la lista local
  const eliminarContacto = async (contactoId) => {
    try {
      const { error } = await supabase
        .from("contactos")
        .delete()
        .eq("id", contactoId)
        .eq("tenant_id", tenantId);

      if (error) {
        console.error("Error al eliminar contacto:", error.message);
      } else {
        // Si la eliminación es exitosa en la base de datos, eliminar el contacto de la lista local
        contactos.value = contactos.value.filter(
          (contacto) => contacto.id !== contactoId
        );
        console.log("Contacto eliminado:", contactoId);
      }
    } catch (err) {
      console.error("Error al conectar con Supabase:", err);
    }
  };

  return {
    contactos,
    cargarContactos,
    agregarContacto,
    eliminarContacto,
  };
});
