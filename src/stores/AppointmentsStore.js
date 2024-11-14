import { defineStore } from "pinia";
import { supabase } from "../supabaseClient";

export const useAppointmentsStore = defineStore("appointments", {
  state: () => ({
    appointments: [],
    appointmentsTrend: [],
  }),
  actions: {
    async fetchAppointments() {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          "id, title, startDate, endDate, allDay, repeat, description, nombre, medico, tipoCita"
        );

      if (error) {
        console.error("Error al obtener las citas:", error);
      } else {
        this.appointments = data || [];
        this.calculateAppointmentsTrend();
        console.log(this.appointments);
      }
    },
    async addAppointment(appointment) {
      const { data, error } = await supabase
        .from("appointments")
        .insert([appointment]);
      if (error) {
        console.error("Error al guardar la cita en Supabase:", error);
      } else {
        this.appointments.push(data[0]);
        this.calculateAppointmentsTrend();
      }
    },
    async updateAppointment(id, updates) {
      console.log("Actualizando cita con ID:", id, "y datos:", updates);
      const { error } = await supabase
        .from("appointments")
        .update(updates)
        .eq("id", id);
      if (error) {
        console.error("Error al actualizar la cita en Supabase:", error);
      } else {
        // Actualiza los datos localmente en el estado
        const index = this.appointments.findIndex((app) => app.id === id);
        if (index !== -1) {
          this.appointments[index] = {
            ...this.appointments[index],
            ...updates,
          };
        }
        this.calculateAppointmentsTrend();
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
        this.calculateAppointmentsTrend();
      }
    },
    calculateAppointmentsTrend() {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const groupedData = [];

      // Define los límites de cada semana (7 días)
      const startOfMonth = new Date(currentYear, currentMonth, 1);

      for (let i = 0; i < 5; i++) {
        const startOfWeek = new Date(startOfMonth);
        startOfWeek.setDate(startOfMonth.getDate() + i * 7);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        groupedData.push({
          period: `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`,
          count: 0,
        });
      }

      this.appointments.forEach((appointment) => {
        const date = new Date(appointment.startDate);

        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          groupedData.forEach((week, index) => {
            const startOfWeek = new Date(
              currentYear,
              currentMonth,
              1 + index * 7
            );
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 7); // Ajuste para incluir el último día

            if (date >= startOfWeek && date <= endOfWeek) {
              week.count++;
            }
          });
        }
      });

      this.appointmentsTrend = groupedData;
    },
  },
});
