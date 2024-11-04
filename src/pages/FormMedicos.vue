<template>
  <q-page class="q-pa-md flex flex-center" style="margin-top: -35px">
    <q-form
      class="bg-grey-1 shadow-2 q-pa-md rounded-xl"
      style="max-width: 550px; width: 100%"
    >
      <!-- Título -->
      <div class="text-center q-mb-md">
        <h1 class="text-h5 text-sky-900 uppercase">Agregar Médico Referente</h1>
      </div>

      <!-- Avatar y campos de contacto en dos columnas -->
      <div class="row q-col-gutter-sm">
        <!-- Columna Izquierda: Avatar -->
        <div class="col-12 col-md-3 flex flex-center q-mb-sm">
          <q-avatar size="96px" class="form-avatar">
            <q-icon name="person" size="48px" />
          </q-avatar>
        </div>

        <!-- Columna Derecha: Campos del Formulario -->
        <div class="col-12 col-md-9">
          <q-input
            v-model="formData.Nombre"
            label="Nombre"
            outlined
            dense
            style="font-size: 14px; height: auto"
            class="q-mb-sm"
          />
          <q-input
            v-model="formData.Direccion"
            label="Dirección"
            outlined
            dense
            style="font-size: 14px; height: auto"
            class="q-mb-sm"
          />
          <q-select
            v-model="formData.especialidadesSeleccionadas"
            :options="especialidades"
            label="Especialidad"
            option-value="id"
            option-label="descripcion"
            map-options
            outlined
            dense
            style="font-size: 14px; height: auto"
            class="q-mb-sm"
          />
        </div>
      </div>

      <!-- Segunda Fila de Campos: Teléfono y Celular en dos columnas -->
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.Telefono"
            label="Teléfono"
            outlined
            mask="####-####"
            dense
            style="font-size: 14px; height: auto"
            class="q-mb-sm"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.Celular"
            label="Celular"
            outlined
            mask="####-####"
            dense
            style="font-size: 14px; height: auto"
            class="q-mb-sm"
          />
        </div>
      </div>

      <!-- Tercera Fila de Campos: Email -->
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.Email"
            label="Email"
            type="email"
            outlined
            dense
            style="font-size: 14px; height: auto"
            class="q-mb-sm"
          />
        </div>
      </div>

      <!-- Botón de Guardar -->
      <div class="flex justify-center q-mt-sm">
        <q-btn
          label="Guardar Médico"
          color="primary"
          @click="guardarMedico"
          style="font-size: 14px; padding: 8px 16px"
          class="q-mb-xl"
        />
      </div>
    </q-form>
    <div class="q-mt-xl flex flex-center">
      <ListadoMedicos />
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";

import { useMedicoStore } from "../stores/MedicoStores";
import { useQuasar } from "quasar";
import ListadoMedicos from "./ListadoMedicos.vue";
import { useEspecialidadMedicaStore } from "../stores/ConfiMedicasStores";

// Inicializar la store de médicos
const medicoStore = useMedicoStore();
const EspecialidadMedicaStore = useEspecialidadMedicaStore();
const { especialidades } = storeToRefs(EspecialidadMedicaStore);

// Datos del formulario
const formData = reactive({
  Nombre: "",
  Direccion: "",
  especialidadesSeleccionadas: "",
  Telefono: "",
  Celular: "",
  Email: "",
});

// Inicializar Quasar
const $q = useQuasar();

// Función para guardar el médico en la store
function guardarMedico() {
  const nuevoMedico = { ...formData };
  console.log("Nuevo médico a agregar:", nuevoMedico);

  medicoStore.agregarMedico(nuevoMedico);
  console.log("Médicos después de agregar:", medicoStore.medicos);

  // Limpiar el formulario
  formData.Nombre = "";
  formData.Direccion = "";
  formData.especialidades = "";
  formData.Telefono = "";
  formData.Celular = "";
  formData.Email = "";
  alert("Medico guardado con exito");
}
</script>

<style scoped>
.q-page {
  min-height: 100vh; /* Ocupa toda la altura de la pantalla */
}

.form-avatar {
  background-color: #acb5c7;
  background-image: url("images/petersmith.png"); /* Reemplaza con la URL de la imagen deseada */
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.q-form {
  background-color: #042958; /* Fondo suave */
}

.q-btn {
  font-weight: bold;
}
</style>
