import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useContactStore = defineStore("contactStore", () => {
  const contactos = ref(JSON.parse(localStorage.getItem("contactos") || "[]"));

  const agregarContacto = (contacto) => {
    // contacto.ID = Date.now(); // o contactos.value.length + 1 si no se va a borrar ningún contacto
    contactos.value.push({ id: Date.now(), ...contacto });
  };

  const obtenerContactos = () => {
    return contactos.value;
  };

  // Guardar en localStorage cada vez que cambian los contactos
  watch(
    contactos,
    (newContactos) => {
      localStorage.setItem("contactos", JSON.stringify(newContactos));
    },
    { deep: true }
  );

  return {
    contactos,
    agregarContacto,
    obtenerContactos,
  };
});
