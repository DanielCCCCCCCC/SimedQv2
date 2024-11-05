<template>
  <q-page class="q-pa-md flex flex-center" style="margin-top: -35px">
    <q-form
      class="bg-grey-1 shadow-2 q-pa-md rounded-xl"
      style="max-width: 550px; width: 100%"
      @submit.prevent="guardarMedico"
    >
      <div class="text-center q-mb-md">
        <h1 class="text-h5 text-sky-900 uppercase">Agregar Médico Referente</h1>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-3 flex flex-center q-mb-sm">
          <q-avatar size="96px" class="form-avatar">
            <q-icon name="person" size="48px" />
          </q-avatar>
        </div>

        <div class="col-12 col-md-9">
          <q-input
            v-model="formData.Nombre"
            label="Nombre"
            outlined
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.Nombre"
            :error-message="formErrors.Nombre"
          />
          <q-input
            v-model="formData.Direccion"
            label="Dirección"
            outlined
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.Direccion"
            :error-message="formErrors.Direccion"
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
            :error="!!formErrors.Especialidad"
            :error-message="formErrors.Especialidad"
          />
        </div>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.Telefono"
            label="Teléfono"
            outlined
            mask="####-####"
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.Telefono"
            :error-message="formErrors.Telefono"
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
            :error="!!formErrors.Celular"
            :error-message="formErrors.Celular"
          />
        </div>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.Email"
            label="Email"
            type="email"
            outlined
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.Email"
            :error-message="formErrors.Email"
          />
        </div>
      </div>

      <div class="flex justify-center q-mt-sm">
        <q-btn
          label="Guardar Médico"
          color="primary"
          type="submit"
          style="font-size: 14px; padding: 8px 16px"
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
import { useQuasar, Notify } from "quasar";
import { storeToRefs } from "pinia";

import { useMedicoStore } from "../stores/MedicoStores";
import ListadoMedicos from "./ListadoMedicos.vue";
import { useEspecialidadMedicaStore } from "../stores/ConfiMedicasStores";

const medicoStore = useMedicoStore();
const EspecialidadMedicaStore = useEspecialidadMedicaStore();
const { especialidades } = storeToRefs(EspecialidadMedicaStore);

const formData = reactive({
  Nombre: "",
  Direccion: "",
  especialidadesSeleccionadas: "",
  Telefono: "",
  Celular: "",
  Email: "",
});

const formErrors = reactive({
  Nombre: "",
  Direccion: "",
  Especialidad: "",
  Telefono: "",
  Celular: "",
  Email: "",
});

const validarFormulario = () => {
  let isValid = true;

  formErrors.Nombre = !formData.Nombre ? "El nombre es obligatorio" : "";
  formErrors.Direccion = !formData.Direccion
    ? "La dirección es obligatoria"
    : "";
  formErrors.Especialidad = !formData.especialidadesSeleccionadas
    ? "Seleccione una especialidad"
    : "";
  formErrors.Telefono =
    formData.Telefono && formData.Telefono.length === 9
      ? ""
      : "El teléfono debe tener el formato ####-####";
  formErrors.Celular =
    formData.Celular && formData.Celular.length === 9
      ? ""
      : "El celular debe tener el formato ####-####";
  formErrors.Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)
    ? ""
    : "Ingrese un email válido";

  isValid = Object.values(formErrors).every((error) => error === "");

  if (!isValid) {
    Notify.create({
      message: "Por favor, corrija los errores en el formulario",
      color: "red",
      position: "top-right",
    });
  }

  return isValid;
};

function guardarMedico() {
  if (validarFormulario()) {
    medicoStore.agregarMedico({ ...formData });

    Object.keys(formData).forEach((key) => {
      formData[key] = "";
    });

    Notify.create({
      message: "Médico guardado con éxito",
      color: "green",
      position: "top-right",
    });
  }
}
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}

.form-avatar {
  background-color: #acb5c7;
  background-image: url("images/petersmith.png");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.q-form {
  background-color: #042958;
}

.q-btn {
  font-weight: bold;
}
</style>
