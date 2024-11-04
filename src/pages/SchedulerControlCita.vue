<template>
  <div>
    <DxScheduler
      :data-source="appointments"
      time-zone="America/Los_Angeles"
      :current-date="currentDate"
      :height="600"
      :show-all-day-panel="true"
      :first-day-of-week="1"
      :start-day-hour="8"
      :end-day-hour="18"
      current-view="month"
      :ref="schedulerRefKey"
    />
    <DxButton class="bg-warning" text="Agregar tarea" @click="addAppointment" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { DxScheduler } from "devextreme-vue/scheduler";
import { DxButton } from "devextreme-vue/button";
import { useAppointmentsStore } from "src/stores/AppointmentsStore.js";

// Referencia del componente DxScheduler
const schedulerRefKey = "my-scheduler";

// Instancia de la tienda de Pinia
const appointmentsStore = useAppointmentsStore();

// Computed para obtener las citas desde la tienda reactivamente
const appointments = computed(() => appointmentsStore.appointments);

// Fecha actual para el calendario
const currentDate = new Date();

// Cargar citas almacenadas en la tienda cuando se monta el componente
onMounted(() => {
  if (!appointments.value.length) {
    // Cargar citas desde localStorage si es necesario
    const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
    if (storedAppointments) {
      storedAppointments.forEach((app) =>
        appointmentsStore.addAppointment(app)
      );
    }
  }
});

// Método para agregar una cita a la tienda
function addAppointment() {
  const newAppointment = {
    id: Date.now(),
    text: "Website Re-Design Plan",
    startDate: new Date("2024-11-01T09:30:00.000Z"),
    endDate: new Date("2024-11-01T11:30:00.000Z"),
    description: "Revisión del diseño del sitio web",
  };

  appointmentsStore.addAppointment(newAppointment);

  // Verificar si el DxScheduler necesita una actualización manual
  if (scheduler.value) {
    scheduler.value.instance.getDataSource().reload();
  }
}

// Computed para acceder a la instancia de DxScheduler a través de la referencia
const scheduler = computed(() => {
  return schedulerRefKey && this.$refs[schedulerRefKey]?.instance;
});
</script>
