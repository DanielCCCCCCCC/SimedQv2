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
            <q-input
              v-model="clasificacionData.nombre"
              label="Nombre"
              outlined
              dense
              :error="!!clasificacionErrors.nombre"
              :error-message="clasificacionErrors.nombre"
            />
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
                @click="eliminarUltimaClasificacion"
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
              :error="!!diagnosticoErrors.descripcion"
              :error-message="diagnosticoErrors.descripcion"
            />
            <q-select
              v-model="diagnosticoData.clasificacion"
              :options="opcionesClasificaciones"
              label="Clasificación"
              outlined
              dense
              :error="!!diagnosticoErrors.clasificacion"
              :error-message="diagnosticoErrors.clasificacion"
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
                @click="eliminarUltimoDiagnostico"
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
              :error="!!controlErrors.descripcion"
              :error-message="controlErrors.descripcion"
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
                @click="eliminarUltimoControl"
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
import { ref, reactive, computed } from "vue";
import { Notify } from "quasar";
import {
  useClasificacionDiagnosticosStore,
  useDiagnosticosStore,
  useControlesMedicionStore,
} from "../stores/DiagnosticosStores";
import { storeToRefs } from "pinia";

// Estado para las pestañas activas
const tab = ref("ClasficicacionDiagnosticos");

// Tiendas y datos reactivos
const clasificacionDiagnosticosStore = useClasificacionDiagnosticosStore();
const diagnosticosStore = useDiagnosticosStore();
const controlesMedicionStore = useControlesMedicionStore();

// Accede a propiedades reactivas
const { clasificaciones } = storeToRefs(clasificacionDiagnosticosStore);

// Computed para opciones de select
const opcionesClasificaciones = computed(() =>
  clasificaciones.value.map((clasificacion) => ({
    label: clasificacion.nombre,
    value: clasificacion.id,
  }))
);

// Datos y errores de cada sección
const clasificacionData = reactive({ nombre: "" });
const clasificacionErrors = reactive({ nombre: "" });
const diagnosticoData = reactive({ descripcion: "", clasificacion: "" });
const diagnosticoErrors = reactive({ descripcion: "", clasificacion: "" });
const controlData = reactive({ descripcion: "" });
const controlErrors = reactive({ descripcion: "" });

// Función de validación genérica
const validarCampo = (data, errors, campo) => {
  errors[campo] = data[campo].trim() ? "" : `El campo ${campo} es obligatorio.`;
  return !errors[campo];
};

// Funciones de guardar
const guardarClasificacion = () => {
  if (validarCampo(clasificacionData, clasificacionErrors, "nombre")) {
    clasificacionDiagnosticosStore.agregarClasificacion({
      nombre: clasificacionData.nombre,
    });
    clasificacionData.nombre = ""; // Limpiar
    Notify.create({ message: "Clasificación guardada", color: "positive" });
  }
};

const guardarDiagnostico = () => {
  if (
    validarCampo(diagnosticoData, diagnosticoErrors, "descripcion") &&
    validarCampo(diagnosticoData, diagnosticoErrors, "clasificacion")
  ) {
    diagnosticosStore.agregarDiagnostico({ ...diagnosticoData });
    diagnosticoData.descripcion = "";
    diagnosticoData.clasificacion = "";
    Notify.create({ message: "Diagnóstico guardado", color: "positive" });
  }
};

const guardarControl = () => {
  if (validarCampo(controlData, controlErrors, "descripcion")) {
    controlesMedicionStore.agregarControl({
      descripcion: controlData.descripcion,
    });
    controlData.descripcion = ""; // Limpiar
    Notify.create({ message: "Control guardado", color: "positive" });
  }
};

// Funciones para eliminar el último elemento
const eliminarUltimaClasificacion = () => {
  if (clasificaciones.value.length > 0) {
    const lastItem = clasificaciones.value[clasificaciones.value.length - 1];
    clasificacionDiagnosticosStore.eliminarClasificacion(lastItem.id);
  }
};

const eliminarUltimoDiagnostico = () => {
  if (diagnosticosStore.diagnosticos.length > 0) {
    const lastItem =
      diagnosticosStore.diagnosticos[diagnosticosStore.diagnosticos.length - 1];
    diagnosticosStore.eliminarDiagnostico(lastItem.id);
  }
};

const eliminarUltimoControl = () => {
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
