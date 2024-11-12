// AppointmentsStore.js
import { defineStore } from "pinia";
import { supabase } from "../supabaseClient"; // Asegúrate de importar el cliente de Supabase correctamente

export const useAppointmentsStore = defineStore("appointments", {
  state: () => ({
    appointments: [], // Define `appointments` en el estado
  }),
  actions: {
    async fetchAppointments() {
      const { data, error } = await supabase.from("appointments").select("*");
      if (error) {
        console.error("Error al obtener las citas:", error);
      } else {
        console.log("Citas obtenidas de Supabase:", data); // Confirmación de los datos obtenidos
        this.appointments = data; // Asegúrate de usar `this` para acceder al estado
      }
    },
    async addAppointment(appointment) {
      const { data, error } = await supabase
        .from("appointments")
        .insert([appointment]);
      if (error) {
        console.error("Error al guardar la cita en Supabase:", error);
      } else {
        this.appointments.push(data[0]); // Usa `this` para acceder al estado
      }
    },
    async updateAppointment(id, updates) {
      const { error } = await supabase
        .from("appointments")
        .update(updates)
        .eq("id", id);
      if (error) {
        console.error("Error al actualizar la cita en Supabase:", error);
      } else {
        const index = this.appointments.findIndex((app) => app.id === id);
        if (index !== -1) {
          this.appointments[index] = {
            ...this.appointments[index],
            ...updates,
          };
        }
      }
    },
    async deleteAppointment(id) {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error al eliminar la cita en Supabase:", error);
      } else {
        this.appointments = this.appointments.filter((app) => app.id !== id);
      }
    },
  },
});
