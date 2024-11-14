<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form
      class="bg-grey-1 shadow-2 q-pa-md rounded-xl formS"
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
            v-model="formData.nombre"
            label="Nombre"
            outlined
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.nombre"
            :error-message="formErrors.nombre"
          />
          <q-input
            v-model="formData.direccion"
            label="Dirección"
            outlined
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.direccion"
            :error-message="formErrors.direccion"
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
            :error="!!formErrors.especialidadesSeleccionadas"
            :error-message="formErrors.especialidadesSeleccionadas"
          />
        </div>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.telefonoPersonal"
            label="Teléfono"
            outlined
            mask="####-####"
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.telefonoPersonal"
            :error-message="formErrors.telefonoPersonal"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.telefonoCasa"
            label="telefonoCasa"
            outlined
            mask="####-####"
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.telefonoCasa"
            :error-message="formErrors.telefonoCasa"
          />
        </div>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.email"
            label="Email"
            type="email"
            outlined
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.email"
            :error-message="formErrors.email"
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
import { reactive, onMounted } from "vue";
import { Notify } from "quasar";
import { storeToRefs } from "pinia";

import { useMedicoStore } from "../stores/MedicoStores";
import ListadoMedicos from "./ListadoMedicos.vue";
import { useEspecialidadMedicaStore } from "../stores/ConfiMedicasStores";
import CitasAgendadas from "src/components/CitasAgendadas.vue";

const medicoStore = useMedicoStore();
const especialidadMedicaStore = useEspecialidadMedicaStore();
const { especialidades } = storeToRefs(especialidadMedicaStore);

// Cargar datos al montar el componente
onMounted(async () => {
  await especialidadMedicaStore.cargarEspecialidades(); // Corrección aquí
});

const formData = reactive({
  nombre: "",
  direccion: "",
  especialidadesSeleccionadas: "",
  telefonoPersonal: "",
  telefonoCasa: "",
  email: "",
});

const formErrors = reactive({
  nombre: "",
  direccion: "",
  especialidadesSeleccionadas: "",
  telefonoPersonal: "",
  telefonoCasa: "",
  email: "",
});

const validarFormulario = () => {
  let isValid = true;

  // Validaciones de campos requeridos
  formErrors.nombre = !formData.nombre ? "El nombre es obligatorio" : "";
  formErrors.direccion = !formData.direccion
    ? "La dirección es obligatoria"
    : "";
  formErrors.especialidadesSeleccionadas = !formData.especialidadesSeleccionadas
    ? "Seleccione una especialidad"
    : "";

  // Validaciones de formato de teléfono
  formErrors.telefonoPersonal =
    formData.telefonoPersonal && formData.telefonoPersonal.length === 9
      ? ""
      : "El teléfono debe tener el formato ####-####";
  formErrors.telefonoCasa =
    formData.telefonoCasa && formData.telefonoCasa.length === 9
      ? ""
      : "El teléfono de casa debe tener el formato ####-####";

  // Validación de formato de correo electrónico
  formErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ? ""
    : "Ingrese un email válido";

  // Comprobación de errores
  isValid = Object.values(formErrors).every((error) => error === "");

  // Mostrar notificación si hay errores
  if (!isValid) {
    Notify.create({
      message: "Por favor, corrija los errores en el formulario",
      color: "red",
      position: "top-right",
    });
  }

  return isValid;
};

async function guardarMedico() {
  if (validarFormulario()) {
    const especialidadId =
      typeof formData.especialidadesSeleccionadas === "object"
        ? formData.especialidadesSeleccionadas.id
        : formData.especialidadesSeleccionadas;
    const especialidadDescripcion =
      typeof formData.especialidadesSeleccionadas === "object"
        ? formData.especialidadesSeleccionadas.descripcion
        : ""; // Si no es un objeto, asigna una cadena vacía o el valor predeterminado

    const medicoInfo = {
      nombre: formData.nombre,
      direccion: formData.direccion,
      especialidadId: especialidadId,
      especialidadDescripcion: especialidadDescripcion,

      telefonoPersonal: formData.telefonoPersonal,
      telefonoCasa: formData.telefonoCasa,
      email: formData.email,
    };

    await medicoStore.agregarMedico({ ...medicoInfo });

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
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.q-form {
  background-color: #0f6eea;
  margin-top: 10px;
  margin-bottom: -40px;
}

.q-btn {
  font-weight: bold;
}

.formS {
  border-top-left-radius: 40px; /* Esquina superior izquierda */
  border-top-right-radius: 15px; /* Esquina superior derecha */
  border-bottom-right-radius: 40px; /* Esquina inferior derecha */
  border-bottom-left-radius: 25px; /* Esquina inferior izquierda */
}
</style>
