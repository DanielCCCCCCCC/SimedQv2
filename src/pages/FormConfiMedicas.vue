<template>
  <q-page class="q-pa-md">
    <!-- Barra de navegación de pestañas -->
    <q-tabs
      v-model="tab"
      class="bg-white text-black q-mb-sm shadow-2 rounded-borders small-tabs"
    >
      <q-tab
        name="Especialidades Médicas"
        icon="medical_services"
        label="Especialidades Médicas"
      />
      <q-tab
        name="Tipos de Estudios"
        icon="description"
        label="Tipos de Estudios"
      />
      <q-tab
        name="Tipos de Medicamentos"
        icon="medication"
        label="Tipos de Medicamentos"
      />
      <q-tab
        name="Tipos de Pacientes"
        icon="people"
        label="Tipos de Pacientes"
      />
      <q-tab
        name="Grupos de Contactos"
        icon="group"
        label="Grupos de Contactos"
      />
      <q-tab name="Tipos de Citas" icon="event" label="Tipos de Citas" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated swipeable>
      <!-- Panel para Especialidades Médicas -->
      <q-tab-panel name="Especialidades Médicas">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Especialidades Médicas</q-card-section
          >
          <q-form @submit.prevent="guardarEspecialidad" class="q-gutter-md">
            <q-input
              v-model="especialidadData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarEspecialidad"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarEspecialidad"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Panel para Tipos de Estudios -->
      <q-tab-panel name="Tipos de Estudios">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Tipos de Estudios</q-card-section
          >
          <q-form @submit.prevent="guardarEstudio" class="q-gutter-md">
            <q-input
              v-model="estudioData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarEstudio"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarEstudio"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Panel para Tipos de Medicamentos -->
      <q-tab-panel name="Tipos de Medicamentos">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Tipos de Medicamentos</q-card-section
          >
          <q-form @submit.prevent="guardarMedicamento" class="q-gutter-md">
            <q-input
              v-model="medicamentoData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarMedicamento"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarMedicamento"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Panel para Tipos de Pacientes -->
      <q-tab-panel name="Tipos de Pacientes">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Tipos de Pacientes</q-card-section
          >
          <q-form @submit.prevent="guardarPaciente" class="q-gutter-md">
            <q-input
              v-model="pacienteData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarPaciente"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarPaciente"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Panel para Grupos de Contactos -->
      <q-tab-panel name="Grupos de Contactos">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Grupos de Contactos</q-card-section
          >
          <q-form @submit.prevent="guardarGrupoContacto" class="q-gutter-md">
            <q-input
              v-model="grupoContactoData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarGrupoContacto"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarGrupoContacto"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Panel para Tipos de Citas -->
      <q-tab-panel name="Tipos de Citas">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Tipos de Citas</q-card-section
          >
          <q-form @submit.prevent="guardarCita" class="q-gutter-md">
            <q-input
              v-model="citaData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarCita"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarCita"
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
  useEspecialidadMedicaStore,
  useTiposEstudiosStore,
  useTiposMedicamentosStore,
  useTiposPacientesStore,
  useGruposContactosStore,
  useTiposCitasStore,
} from "../stores/ConfiMedicasStores";

// Estado para las pestañas activas
const tab = ref("Especialidades Médicas");

// Estados de los formularios para cada tipo
const especialidadData = ref({ descripcion: "" });
const estudioData = ref({ descripcion: "" });
const medicamentoData = ref({ descripcion: "" });
const pacienteData = ref({ descripcion: "" });
const grupoContactoData = ref({ descripcion: "" });
const citaData = ref({ descripcion: "" });

// Tiendas para cada tipo
const especialidadStore = useEspecialidadMedicaStore();
const tiposEstudiosStore = useTiposEstudiosStore();
const tiposMedicamentosStore = useTiposMedicamentosStore();
const tiposPacientesStore = useTiposPacientesStore();
const gruposContactosStore = useGruposContactosStore();
const tiposCitasStore = useTiposCitasStore();

// Funciones para guardar y eliminar en cada sección
const guardarEspecialidad = () => {
  especialidadStore.agregarEspecialidad(especialidadData.value.descripcion);
  especialidadData.value.descripcion = "";
};
const eliminarEspecialidad = () =>
  especialidadStore.eliminarUltimaEspecialidad();

const guardarEstudio = () => {
  tiposEstudiosStore.agregarEstudio(estudioData.value.descripcion);
  estudioData.value.descripcion = "";
};
const eliminarEstudio = () => tiposEstudiosStore.eliminarUltimoEstudio();

const guardarMedicamento = () => {
  tiposMedicamentosStore.agregarMedicamento(medicamentoData.value.descripcion);
  medicamentoData.value.descripcion = "";
};
const eliminarMedicamento = () =>
  tiposMedicamentosStore.eliminarUltimoMedicamento();

const guardarPaciente = () => {
  tiposPacientesStore.agregarPaciente(pacienteData.value.descripcion);
  pacienteData.value.descripcion = "";
};
const eliminarPaciente = () => tiposPacientesStore.eliminarUltimoPaciente();

const guardarGrupoContacto = () => {
  gruposContactosStore.agregarGrupo(grupoContactoData.value.descripcion);
  grupoContactoData.value.descripcion = "";
};
const eliminarGrupoContacto = () => gruposContactosStore.eliminarUltimoGrupo();

const guardarCita = () => {
  tiposCitasStore.agregarCita(citaData.value.descripcion);
  citaData.value.descripcion = "";
};
const eliminarCita = () => tiposCitasStore.eliminarUltimaCita();
</script>

<style scoped>
.q-card {
  max-width: 700px;
  margin: 0 auto;
}

.text-primary {
  color: #1976d2;
}

/* Estilo para reducir el tamaño de la letra en las pestañas */
.small-tabs .q-tab {
  font-size: 8px; /* Reduce el tamaño de la letra */
  padding: 4px 9px; /* Ajusta el padding para ocupar menos espacio */
}
</style>
