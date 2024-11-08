<template>
  <q-page class="q-pa-md">
    <!-- Barra de navegación de pestañas -->
    <q-tabs
      v-model="tab"
      class="bg-white text-black q-mb-sm shadow-2 rounded-borders small-tabs"
    >
      <q-tab
        name="ClasificacionDiagnosticos"
        icon="list"
        label="Clasificación de Diagnósticos"
      />
      <q-tab name="Diagnosticos" icon="assignment" label="Diagnósticos" />
      <q-tab
        name="ControlesMedicion"
        icon="bar_chart"
        label="Controles de Medición"
      />
    </q-tabs>

    <q-tab-panels v-model="tab" animated swipeable>
      <!-- Pestaña: Clasificación de Diagnósticos -->
      <q-tab-panel name="ClasificacionDiagnosticos">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary">
            Clasificación de Diagnósticos
          </q-card-section>
          <q-form @submit.prevent="guardarClasificacion" class="q-gutter-md">
            <q-input
              v-model="clasificacionData.nombre"
              label="Nombre"
              outlined
              dense
              :error="!!formErrors.clasificacionNombre"
              :error-message="formErrors.clasificacionNombre"
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarClasificacion"
              />
              <q-btn
                label="Eliminar último agregado"
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
      <q-tab-panel name="Diagnosticos">
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
              :error="!!formErrors.diagnosticoDescripcion"
              :error-message="formErrors.diagnosticoDescripcion"
            />
            <q-select
              v-model="diagnosticoData.clasificacion"
              :options="opcionesClasificaciones"
              option-value="id"
              option-label="label"
              label="Clasificación"
              outlined
              dense
              :error="!!formErrors.diagnosticoClasificacion"
              :error-message="formErrors.diagnosticoClasificacion"
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarDiagnostico"
              />
              <q-btn
                label="Eliminar último agregado"
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
      <q-tab-panel name="ControlesMedicion">
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
              :error="!!formErrors.controlDescripcion"
              :error-message="formErrors.controlDescripcion"
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarControl"
              />
              <q-btn
                label="Eliminar último agregado"
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
import { ref, reactive, onMounted, computed } from "vue";
import { Notify } from "quasar";
import {
  useClasificacionDiagnosticosStore,
  useDiagnosticosStore,
  useControlesMedicionStore,
} from "../stores/DiagnosticosStores";
import { storeToRefs } from "pinia";

// Inicializar tiendas
const clasificacionDiagnosticosStore = useClasificacionDiagnosticosStore();
const diagnosticosStore = useDiagnosticosStore();
const controlesMedicionStore = useControlesMedicionStore();

// Datos reactivos
const clasificacionData = reactive({ nombre: "" });
const diagnosticoData = reactive({ descripcion: "", clasificacion: null });
const controlData = reactive({ descripcion: "" });

// Referencias a los datos de la tienda
const { clasificaciones } = storeToRefs(clasificacionDiagnosticosStore);

// Opciones de clasificación para el select
const opcionesClasificaciones = computed(() =>
  clasificaciones.value.map((clasificacion) => ({
    label: clasificacion.nombre,
    id: clasificacion.id,
  }))
);

// Estado de los errores de validación
const formErrors = reactive({
  clasificacionNombre: "",
  diagnosticoDescripcion: "",
  diagnosticoClasificacion: "",
  controlDescripcion: "",
});

// Cargar datos al montar el componente
onMounted(() => {
  clasificacionDiagnosticosStore.cargarClasificaciones();
  diagnosticosStore.cargarDiagnosticos();
  controlesMedicionStore.cargarControles();
});

// Funciones de guardar
const guardarClasificacion = () => {
  formErrors.clasificacionNombre = "";
  if (!clasificacionData.nombre) {
    formErrors.clasificacionNombre =
      "El nombre de la clasificación es obligatorio.";
    return;
  }
  clasificacionDiagnosticosStore.agregarClasificacion(clasificacionData.nombre);
  clasificacionData.nombre = ""; // Limpiar campo
  Notify.create({ message: "Clasificación guardada", color: "positive" });
};

const guardarDiagnostico = () => {
  formErrors.diagnosticoDescripcion = "";
  formErrors.diagnosticoClasificacion = "";

  if (!diagnosticoData.descripcion) {
    formErrors.diagnosticoDescripcion =
      "La descripción del diagnóstico es obligatoria.";
    return;
  }

  if (!diagnosticoData.clasificacion) {
    formErrors.diagnosticoClasificacion = "Seleccione una clasificación.";
    return;
  }

  // Extrae el ID de la clasificación, similar a la lógica de departamentoId
  const clasificacionId =
    typeof diagnosticoData.clasificacion === "object"
      ? diagnosticoData.clasificacion.id
      : diagnosticoData.clasificacion;

  diagnosticosStore.agregarDiagnostico(
    diagnosticoData.descripcion,
    clasificacionId
  );

  diagnosticoData.descripcion = "";
  diagnosticoData.clasificacion = null; // Reinicia el campo de selección
  Notify.create({ message: "Diagnóstico guardado", color: "positive" });
};

const guardarControl = () => {
  formErrors.controlDescripcion = "";
  if (!controlData.descripcion) {
    formErrors.controlDescripcion =
      "La descripción del control es obligatoria.";
    return;
  }
  controlesMedicionStore.agregarControl(controlData.descripcion);
  controlData.descripcion = ""; // Limpiar campo
  Notify.create({ message: "Control guardado", color: "positive" });
};

// Funciones para eliminar el último elemento
const eliminarUltimaClasificacion = () =>
  clasificacionDiagnosticosStore.eliminarUltimaClasificacion();
const eliminarUltimoDiagnostico = () =>
  diagnosticosStore.eliminarUltimoDiagnostico();
const eliminarUltimoControl = () =>
  controlesMedicionStore.eliminarUltimoControl();

// Tabs de control
const tab = ref("ClasificacionDiagnosticos");
</script>

<style scoped>
.q-card {
  max-width: 700px;
  margin: 0 auto;
}
.text-primary {
  color: #1976d2;
}
.small-tabs .q-tab {
  font-size: 8px;
  padding: 4px 9px;
}
</style>
