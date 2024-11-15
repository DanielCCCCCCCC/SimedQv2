<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="toggleLeftDrawer"
          aria-label="Menu"
        />
        <q-toolbar-title>SIMED</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="layout" show-if-above bordered>
      <q-list>
        <!-- Agenda Section -->
        <q-expansion-item class="sidebar-expansion" label="Agenda" icon="event">
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/controlCitas' }"
            clickable
            @click="navigateTo('/controlCitas')"
          >
            <q-item-section>Control de Citas</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/controlCitasv2' }"
            clickable
            @click="navigateTo('/controlCitasv2')"
          >
            <q-item-section>Control de Citas V2</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/contactos' }"
            clickable
            @click="navigateTo('/contactos')"
          >
            <q-item-section>Contactos</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/medicos' }"
            clickable
            @click="navigateTo('/medicos')"
          >
            <q-item-section>Médicos</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Expediente Section -->
        <q-expansion-item
          class="sidebar-expansion"
          label="Expediente"
          icon="folder"
        >
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/visor-pacientes' }"
            clickable
            @click="navigateTo('/visor-pacientes')"
          >
            <q-item-section>Visor de pacientes</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/abrir-expedientes' }"
            clickable
            @click="navigateTo('/abrir-expedientes')"
          >
            <q-item-section>Abrir expedientes</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/recetas' }"
            clickable
            @click="navigateTo('/recetas')"
          >
            <q-item-section>Recetas</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/control-medicion' }"
            clickable
            @click="navigateTo('/control-medicion')"
          >
            <q-item-section>Control de medición</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Administración y Mantenimiento Section -->
        <q-expansion-item
          class="sidebar-expansion"
          label="Administración y Mantenimiento"
          icon="build"
        >
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/directoriopacientes' }"
            clickable
            @click="navigateTo('/directoriopacientes')"
          >
            <q-item-section>Directorio Pacientes</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/directorios' }"
            clickable
            @click="navigateTo('/directorios')"
          >
            <q-item-section>Sección de Directorios</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/diagnosticos' }"
            clickable
            @click="navigateTo('/diagnosticos')"
          >
            <q-item-section>Sección de Diagnosticos</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/configuracionesMedicas' }"
            clickable
            @click="navigateTo('/configuracionesMedicas')"
          >
            <q-item-section>Configuraciones Médicas</q-item-section>
          </q-item>
          <q-item
            class="sidebar-item"
            :class="{ active: selectedRoute === '/datosGenerales' }"
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

const leftDrawerOpen = ref(false);
const router = useRouter();
const route = useRoute();
const selectedRoute = ref(route.path);

watch(route, (newRoute) => {
  selectedRoute.value = newRoute.path;
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const navigateTo = (path) => {
  selectedRoute.value = path;
  router.push(path);
};
</script>

<style scoped>
.layout {
  background-color: #1f1f1f;
  color: #e0e0e0;
}

.sidebar-expansion {
  color: #e0e0e0;
  background-color: #333333;
}

.sidebar-item {
  background-color: transparent;
  color: #e0e0e0;
  transition: background-color 0.3s, color 0.3s;
}

.sidebar-item.active {
  background-color: #1e88e5;
  color: white;
}

.sidebar-item:hover {
  background-color: #3b82f6;
  color: white;
}
</style>

<!--
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
            :class="{ 'selected-item': selectedRoute === '/controlCitasv2' }"
            clickable
            @click="navigateTo('/controlCitasv2')"
          >
            <q-item-section>Control de Citas V2</q-item-section>
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
const leftDrawerOpen = ref(false);
const router = useRouter();
const route = useRoute();

const selectedRoute = ref(route.path);
watch(route, (newRoute) => {
  selectedRoute.value = newRoute.path;
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const navigateTo = (path) => {
  selectedRoute.value = path;
  router.push(path);
};
</script>

<style scoped>
.selected-item {
  background-color: #86b8e3 !important;
  color: white !important;
}
</style> -->
