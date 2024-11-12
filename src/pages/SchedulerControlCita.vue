<template>
  <DxScheduler
    :data-source="appointments"
    :current-view="'week'"
    :current-date="currentDate"
    :time-zone="'America/Tegucigalpa'"
    :onAppointmentAdded="onAppointmentAdded"
    :onAppointmentUpdated="onAppointmentUpdated"
    :onAppointmentDeleted="onAppointmentDeleted"
  >
    <DxView type="day" />
    <DxView type="week" />
    <DxView type="month" />
  </DxScheduler>
</template>

<script>
import { DxScheduler, DxView } from "devextreme-vue/scheduler";
import { useAppointmentsStore } from "../stores/AppointmentsStore";
import { onMounted, ref, computed } from "vue";

export default {
  components: { DxScheduler, DxView },
  setup() {
    const store = useAppointmentsStore();
    const appointments = computed(() => store.appointments); // Usamos computed para que sea reactivo
    const currentDate = ref(new Date());

    onMounted(() => {
      store.fetchAppointments();
    });

    const onAppointmentAdded = async (e) => {
      try {
        const newAppointment = {
          title: e.appointmentData.text,
          startDate: e.appointmentData.startDate, // Sin conversión a UTC
          endDate: e.appointmentData.endDate, // Sin conversión a UTC
          allDay: e.appointmentData.allDay,
          repeat: e.appointmentData.repeat,
          descripcion: e.appointmentData.description, // Cambiado a 'descripcion' si es necesario
        };
        await store.addAppointment(newAppointment);
        console.log("Cita agregada exitosamente:", newAppointment);
      } catch (error) {
        console.error("Error al agregar la cita:", error);
      }
    };

    const onAppointmentUpdated = async (e) => {
      const updatedAppointment = {
        title: e.newData.text,
        startDate: new Date(e.newData.startDate).toISOString(),
        endDate: new Date(e.newData.endDate).toISOString(),
        allDay: e.newData.allDay,
        repeat: e.newData.repeat,
        descripcion: e.newData.description,
      };
      await store.updateAppointment(e.oldData.id, updatedAppointment);
    };

    const onAppointmentDeleted = async (e) => {
      await store.deleteAppointment(e.appointmentData.id);
    };

    return {
      appointments,
      currentDate,
      onAppointmentAdded,
      onAppointmentUpdated,
      onAppointmentDeleted,
    };
  },
};
</script>
