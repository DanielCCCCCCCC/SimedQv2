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
          "id, title, startDate, endDate, allDay, repeat, description, nombrePaciente, medico, tipoCita"
        );

      if (error) {
        console.error("Error al obtener las citas:", error);
      } else {
        this.appointments = data || [];
        this.calculateAppointmentsTrend();
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
      const groupedData = {
        "Semana 1": 0,
        "Semana 2": 0,
        "Semana 3": 0,
        "Semana 4": 0,
      };

      console.log("Calculating 4-week trend for the current month...");

      // Obtiene el primer y último día del mes
      const startOfMonth = new Date(currentYear, currentMonth, 1);
      const endOfMonth = new Date(currentYear, currentMonth + 1, 0); // Último día del mes actual

      // Divide el mes en 4 intervalos (semanas)
      const daysInMonth = endOfMonth.getDate();
      const weekLength = Math.ceil(daysInMonth / 4); // Número de días aproximado por semana

      this.appointments.forEach((appointment) => {
        const date = new Date(appointment.startDate);

        // Verifica si la cita está en el mes actual
        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          const dayOfMonth = date.getDate();

          // Determina en qué "semana" cae el día del mes
          if (dayOfMonth <= weekLength) {
            groupedData["Semana 1"]++;
          } else if (dayOfMonth <= weekLength * 2) {
            groupedData["Semana 2"]++;
          } else if (dayOfMonth <= weekLength * 3) {
            groupedData["Semana 3"]++;
          } else {
            groupedData["Semana 4"]++;
          }
        }
      });

      // Transforma `groupedData` en un array de objetos [{ period, count }]
      this.appointmentsTrend = Object.keys(groupedData).map((period) => ({
        period,
        count: groupedData[period],
      }));

      console.log("Appointments Trend Data:", this.appointmentsTrend);
    },
  },
});
