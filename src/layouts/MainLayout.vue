<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>SIMED</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <!-- Agenda Section -->
        <q-expansion-item
          class="bg-grey-4 shadow-2 text-dark"
          label="Agenda"
          icon="event"
        >
          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/controlCitas' }"
            clickable
            @click="navigateTo('/controlCitas')"
          >
            <q-item-section>Control de Citas</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/contactos' }"
            clickable
            @click="navigateTo('/contactos')"
          >
            <q-item-section>Contactos</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/medicos' }"
            clickable
            @click="navigateTo('/medicos')"
          >
            <q-item-section>Médicos</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Expediente Section -->
        <q-expansion-item
          class="bg-grey-4 text-dark shadow-2"
          label="Expediente"
          icon="folder"
        >
          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/visor-pacientes' }"
            clickable
            @click="navigateTo('/visor-pacientes')"
          >
            <q-item-section>Visor de pacientes</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/abrir-expedientes' }"
            clickable
            @click="navigateTo('/abrir-expedientes')"
          >
            <q-item-section>Abrir expedientes</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/recetas' }"
            clickable
            @click="navigateTo('/recetas')"
          >
            <q-item-section>Recetas</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/control-medicion' }"
            clickable
            @click="navigateTo('/control-medicion')"
          >
            <q-item-section>Control de medición</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Administración y Mantenimiento Section -->
        <q-expansion-item
          class="bg-grey-4 text-dark shadow-2"
          label="Administración y Mantenimiento"
          icon="build"
        >
          <q-item
            class="bg-grey-1 text-dark"
            :class="{
              'selected-item': selectedRoute === '/directoriopacientes',
            }"
            clickable
            @click="navigateTo('/directoriopacientes')"
          >
            <q-item-section>Directorio Pacientes</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/directorios' }"
            clickable
            @click="navigateTo('/directorios')"
          >
            <q-item-section>Sección de Directorios</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/diagnosticos' }"
            clickable
            @click="navigateTo('/diagnosticos')"
          >
            <q-item-section>Sección de Diagnosticos</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
            :class="{
              'selected-item': selectedRoute === '/configuracionesMedicas',
            }"
            clickable
            @click="navigateTo('/configuracionesMedicas')"
          >
            <q-item-section>Configuraciones Médicas</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            :class="{ 'selected-item': selectedRoute === '/datosGenerales' }"
            clickable
            @click="navigateTo('/datosGenerales')"
          >
            <q-item-section>Datos Generales</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
      <div class="q-mt-sm">
        <!-- <CitasAgendadas /> -->
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
// import CitasAgendadas from "src/components/CitasAgendadas.vue";
const leftDrawerOpen = ref(false);
const router = useRouter();
const route = useRoute();

const selectedRoute = ref(route.path); // Ruta activa inicial

// Observa cambios en la ruta actual para actualizar el seleccionado
watch(route, (newRoute) => {
  selectedRoute.value = newRoute.path;
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const navigateTo = (path) => {
  selectedRoute.value = path; // Actualiza la ruta seleccionada
  router.push(path);
};
</script>

<style scoped>
.selected-item {
  background-color: #86b8e3 !important; /* Color de fondo para el enlace seleccionado */
  color: white !important; /* Color de texto para el enlace seleccionado */
}
</style>
