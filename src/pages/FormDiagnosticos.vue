<template>
  <q-page class="q-pa-md">
    <!-- Barra de navegación de pestañas -->
    <q-tabs
      v-model="tab"
      class="bg-white text-black q-mb-sm shadow-2 rounded-borders"
    >
      <q-tab
        name="ClasficicacionDiagnosticos"
        icon="list"
        label="Clasificación de diagnósticos"
      />
      <q-tab name="Diagnósticos" icon="assignment" label="Diagnósticos" />
      <q-tab
        name="Controles de Medición"
        icon="bar_chart"
        label="Controles de Medición"
      />
    </q-tabs>

    <q-tab-panels v-model="tab" animated swipeable>
      <!-- Pestaña: Clasificación de Diagnósticos -->
      <q-tab-panel name="ClasficicacionDiagnosticos">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Clasificación de Diagnósticos</q-card-section
          >
          <q-form @submit.prevent="guardarClasificacion" class="q-gutter-md">
            <q-input v-model="formData.nombre" label="Nombre" outlined dense />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarClasificacion"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarClasificacion"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Pestaña: Diagnósticos -->
      <q-tab-panel name="Diagnósticos">
        <q-card class="q-pa-lg q-mb-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Diagnósticos</q-card-section
          >
          <q-form @submit.prevent="guardarDiagnostico" class="q-gutter-md">
            <q-input
              v-model="diagnosticoData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <q-input
              v-model="diagnosticoData.clasificacion"
              label="Clasificación"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarDiagnostico"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarDiagnostico"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Pestaña: Controles de Medición -->
      <q-tab-panel name="Controles de Medición">
        <q-card class="q-pa-lg q-mb-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Controles de Medición</q-card-section
          >
          <q-form @submit.prevent="guardarControl" class="q-gutter-md">
            <q-input
              v-model="controlData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarControl"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarControl"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import {
  useClasificacionDiagnosticosStore,
  useDiagnosticosStore,
  useControlesMedicionStore,
} from "../stores/DiagnosticosStores";

// Estado para las pestañas activas
const tab = ref("ClasficicacionDiagnosticos");

// Acceder a las tiendas
const clasificacionStore = useClasificacionDiagnosticosStore();
const diagnosticosStore = useDiagnosticosStore();
const controlesMedicionStore = useControlesMedicionStore();

// Estado del formulario para Clasificación de Diagnósticos
const formData = ref({ nombre: "" });

// Estado del formulario para Diagnósticos
const diagnosticoData = ref({ descripcion: "", clasificacion: "" });

// Estado del formulario para Controles de Medición
const controlData = ref({ descripcion: "" });

// Función para agregar una nueva clasificación
const guardarClasificacion = () => {
  if (formData.value.nombre.trim() !== "") {
    clasificacionStore.agregarClasificacion(formData.value.nombre);
    formData.value.nombre = ""; // Limpiar el campo después de agregar
  }
};

// Función para eliminar la última clasificación
const eliminarClasificacion = () => {
  if (clasificacionStore.clasificaciones.length > 0) {
    const lastItem =
      clasificacionStore.clasificaciones[
        clasificacionStore.clasificaciones.length - 1
      ];
    clasificacionStore.eliminarClasificacion(lastItem.id);
  }
};

// Función para agregar un nuevo diagnóstico
const guardarDiagnostico = () => {
  if (
    diagnosticoData.value.descripcion.trim() !== "" &&
    diagnosticoData.value.clasificacion.trim() !== ""
  ) {
    diagnosticosStore.agregarDiagnostico(
      diagnosticoData.value.descripcion,
      diagnosticoData.value.clasificacion
    );
    diagnosticoData.value.descripcion = ""; // Limpiar campos
    diagnosticoData.value.clasificacion = "";
  }
};

// Función para eliminar el último diagnóstico
const eliminarDiagnostico = () => {
  if (diagnosticosStore.diagnosticos.length > 0) {
    const lastItem =
      diagnosticosStore.diagnosticos[diagnosticosStore.diagnosticos.length - 1];
    diagnosticosStore.eliminarDiagnostico(lastItem.id);
  }
};

// Función para agregar un nuevo control de medición
const guardarControl = () => {
  if (controlData.value.descripcion.trim() !== "") {
    controlesMedicionStore.agregarControl(controlData.value.descripcion);
    controlData.value.descripcion = ""; // Limpiar campo después de agregar
  }
};

// Función para eliminar el último control de medición
const eliminarControl = () => {
  if (controlesMedicionStore.controles.length > 0) {
    const lastItem =
      controlesMedicionStore.controles[
        controlesMedicionStore.controles.length - 1
      ];
    controlesMedicionStore.eliminarControl(lastItem.id);
  }
};
</script>

<style scoped>
.q-card {
  max-width: 700px;
  margin: 0 auto;
}

.text-primary {
  color: #1976d2;
}
</style>
