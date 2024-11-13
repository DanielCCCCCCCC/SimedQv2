<template>
  <div class="row">
    <CitasAgendadas />
  </div>
  <div class="scheduler-container">
    <DxScheduler
      :data-source="appointments"
      :current-view="currentView"
      :current-date="currentDate"
      :time-zone="'America/Tegucigalpa'"
      :height="650"
      :cell-duration="30"
      :start-day-hour="8"
      :end-day-hour="21"
      :views="views"
      :first-day-of-week="1"
      :onAppointmentAdded="onAppointmentAdded"
      :onAppointmentUpdated="onAppointmentUpdated"
      :onAppointmentDeleted="onAppointmentDeleted"
      text-expr="title"
    >
      <DxView type="day" name="Día" />
      <DxView type="workWeek" name="Días Laborales" />
      <DxView type="week" name="Semana" />
      <DxView type="month" name="Mes" />
    </DxScheduler>
  </div>
</template>

<script setup>
import { DxScheduler, DxView } from "devextreme-vue/scheduler";
import { useAppointmentsStore } from "../stores/AppointmentsStore";
import CitasAgendadas from "src/components/CitasAgendadas.vue";
import { onMounted, ref, computed } from "vue";

// Usamos la tienda de citas
const store = useAppointmentsStore();
const appointments = computed(() => store.appointments);
const currentDate = ref(new Date());
const currentView = ref("month");
const views = ["day", "week", "workWeek", "month"];

// Ejecutamos la función de fetch al montar el componente
onMounted(() => {
  store.fetchAppointments();
});

// Manejo de eventos del Scheduler
const onAppointmentAdded = async (e) => {
  try {
    const newAppointment = {
      title: e.appointmentData.title || e.appointmentData.text,
      startDate: e.appointmentData.startDate,
      endDate: e.appointmentData.endDate,
      allDay: e.appointmentData.allDay,
      repeat: e.appointmentData.repeat,
      description: e.appointmentData.description,
    };
    await store.addAppointment(newAppointment);
    console.log("Cita agregada exitosamente:", newAppointment);
  } catch (error) {
    console.error("Error al agregar la cita:", error);
  }
};

const onAppointmentUpdated = async (e) => {
  const updatedAppointment = {
    title: e.newData.title,
    startDate: e.newData.startDate,
    endDate: e.newData.endDate,
    allDay: e.newData.allDay,
    repeat: e.newData.repeat,
    description: e.newData.description,
  };
  await store.updateAppointment(e.oldData.id, updatedAppointment);
};

const onAppointmentDeleted = async (e) => {
  await store.deleteAppointment(e.appointmentData.id);
};
</script>

<style scoped>
.scheduler-container {
  background-color: #f9fafc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.dx-scheduler .dx-scheduler-appointment {
  border-radius: 6px;
  background-color: #1976d2 !important;
  color: #ffffff !important;
}

.dx-scheduler .dx-scheduler-header-panel-cell {
  font-weight: bold;
  color: #333;
}

.dx-scheduler .dx-scheduler-time-panel-cell {
  font-size: 14px;
  color: #666;
}

.dx-scheduler .dx-scheduler-navigator-previous,
.dx-scheduler .dx-scheduler-navigator-next {
  color: #1976d2;
}

.dx-scheduler .dx-scheduler-navigator-caption {
  font-size: 18px;
  color: #1976d2;
  font-weight: bold;
}
</style>
