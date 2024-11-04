import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAppointmentsStore = defineStore("appointments", () => {
  const appointments = ref(
    JSON.parse(localStorage.getItem("appointments")) || []
  );

  function addAppointment(appointment) {
    appointments.value.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments.value));
  }

  function updateAppointment(id, updatedData) {
    const index = appointments.value.findIndex((app) => app.id === id);
    if (index !== -1) {
      appointments.value[index] = {
        ...appointments.value[index],
        ...updatedData,
      };
      localStorage.setItem("appointments", JSON.stringify(appointments.value));
    }
  }

  // Computed para obtener las citas reactivamente
  const getAppointments = computed(() => appointments.value);

  return { appointments, addAppointment, updateAppointment, getAppointments };
});
