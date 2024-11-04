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
        <q-item class="bg-primary text-dark"> </q-item>

        <q-expansion-item
          class="bg-grey-4 shadow-2 text-dark"
          label="Agenda"
          icon="event"
        >
          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/controlCitas')"
          >
            <q-item-section>Control de Citas</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/contactos')"
          >
            <q-item-section>Contactos</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
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
            clickable
            @click="navigateTo('/visor-pacientes')"
          >
            <q-item-section>Visor de pacientes</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/abrir-expedientes')"
          >
            <q-item-section>Abrir expedientes</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/recetas')"
          >
            <q-item-section>Recetas</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
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
            clickable
            @click="navigateTo('/directoriopacientes')"
          >
            <q-item-section>Directorio Pacientes</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/directorios')"
          >
            <q-item-section>Sección de Directorios</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/diagnosticos')"
          >
            <q-item-section>Sección de Diagnosticos</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/configuracionesMedicas')"
          >
            <q-item-section>Configuraciones Médicas</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/datosGenerales')"
          >
            <q-item-section>Datos Generales</q-item-section>
          </q-item>
        </q-expansion-item>
        <!--
        <q-expansion-item
          class="bg-grey-4 shadow-2 text-dark"
          label="Datos Generales"
          icon="General information"
        >
          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/depaMuni')"
          >
            <q-item-section>Departamentos y municipios</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/grupSanguineo')"
          >
            <q-item-section>Grupo Sanguineo</q-item-section>
          </q-item>
          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/escolaridad')"
          >
            <q-item-section>Escolaridad</q-item-section>
          </q-item>

          <q-item
            class="bg-grey-1 text-dark"
            clickable
            @click="navigateTo('/estadoCivil')"
          >
            <q-item-section>Estado Civil</q-item-section>
          </q-item>
        </q-expansion-item> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const leftDrawerOpen = ref(false);
const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped></style>
