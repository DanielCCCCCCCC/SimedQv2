<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form
      class="bg-grey-2 shadow-2 q-pa-md rounded-xl"
      style="max-width: 600px; width: 100%"
      @submit.prevent="guardarContacto"
    >
      <h1 class="text-h4 text-sky-500 text-center q-mb-md uppercase">
        Agregar Contacto
      </h1>

      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-3 flex flex-center">
          <q-avatar color="blue" size="96px" class="form-avatar">
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
        </div>
      </div>

      <div class="row q-mt-sm q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.Organizacion"
            label="Organización"
            outlined
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.Organizacion"
            :error-message="formErrors.Organizacion"
          />
          <q-select
            v-model="formData.Grupo"
            :options="grupos"
            label="Grupo"
            option-value="id"
            option-label="descripcion"
            outlined
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.Grupo"
            :error-message="formErrors.Grupo"
          />
        </div>

        <div class="col-12 col-md-6">
          <q-select
            v-model="formData.selectedDepartamento"
            :options="departamentos"
            label="Departamento"
            option-value="id"
            option-label="descripcion"
            map-options
            outlined
            dense
            :error="!!formErrors.selectedDepartamento"
            :error-message="formErrors.selectedDepartamento"
          />
          <q-select
            v-model="formData.selectedMunicipio"
            :options="filteredMunicipios"
            label="Municipio"
            option-value="id"
            option-label="descripcion"
            outlined
            dense
            :disable="!formData.selectedDepartamento"
            :error="!!formErrors.selectedMunicipio"
            :error-message="formErrors.selectedMunicipio"
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

        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.TelefonoCasa"
            label="Teléfono Casa"
            outlined
            mask="####-####"
            dense
            style="font-size: 14px; height: auto"
            :error="!!formErrors.TelefonoCasa"
            :error-message="formErrors.TelefonoCasa"
          />
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

      <div class="q-mt-sm">
        <q-input
          v-model="formData.Observaciones"
          label="Observaciones"
          type="textarea"
          outlined
          :autogrow="true"
          dense
          :error="!!formErrors.Observaciones"
          :error-message="formErrors.Observaciones"
          style="font-size: 14px; height: auto"
        />
      </div>

      <q-btn
        type="submit"
        label="Guardar Contacto"
        color="primary"
        class="q-mt-sm full-width"
        style="font-size: 14px; padding: 8px 2px"
      />
    </q-form>
  </q-page>
  <div>
    <ListadoContactos />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import {
  useDepartamentoStore,
  useMunicipioStore,
} from "../stores/DatosGeneralesStores";
import { useGruposContactosStore } from "src/stores/ConfiMedicasStores";
import { useContactStore } from "../stores/ContacStores"; // Asegúrate de que la ruta es correcta
import { storeToRefs } from "pinia";
import { useQuasar, Notify } from "quasar";
import ListadoContactos from "./ListadoContactos.vue";

// Importar las tiendas
const departamentoStore = useDepartamentoStore();
const municipioStore = useMunicipioStore();
const contactStore = useContactStore();
const gruposContactosStore = useGruposContactosStore();

// Obtener los datos de las tiendas
const { departamentos } = storeToRefs(departamentoStore);
const { municipios } = storeToRefs(municipioStore);
const { grupos } = storeToRefs(gruposContactosStore);

// Datos del formulario
const formData = reactive({
  Nombre: "",
  Direccion: "",
  Organizacion: "",
  Email: "",
  Grupo: "",
  TelefonoCasa: "",
  Celular: "",
  Observaciones: "",
  selectedDepartamento: null,
  selectedMunicipio: null,
});

// Computed para filtrar los municipios según el departamento seleccionado
const filteredMunicipios = computed(() => {
  if (!formData.selectedDepartamento) {
    return [];
  }
  return municipios.value.filter(
    (municipio) => municipio.departamentoId === formData.selectedDepartamento.id
  );
});

// Watch para limpiar el municipio cuando cambia el departamento
watch(
  () => formData.selectedDepartamento,
  () => {
    formData.selectedMunicipio = null;
  }
);

const formErrors = reactive({
  Nombre: "",
  Direccion: "",
  Organizacion: "",
  Email: "",
  TelefonoCasa: "",
  Grupo: "",
  Celular: "",
  Observaciones: "",
  selectedDepartamento: "",
  selectedMunicipio: "",
});
const validarFormulario = () => {
  let isValid = true;

  formErrors.Nombre = !formData.Nombre ? "El nombre es obligatorio" : "";
  formErrors.Direccion = !formData.Direccion
    ? "La dirección es obligatoria"
    : "";
  formErrors.Organizacion = !formData.Organizacion
    ? "La organización es obligatoria"
    : "";
  formErrors.Grupo = !formData.Grupo ? "El grupo es obligatorio" : "";
  formErrors.Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)
    ? ""
    : "Ingrese un email válido";

  formErrors.TelefonoCasa =
    formData.TelefonoCasa && formData.TelefonoCasa.length === 9
      ? ""
      : "El teléfono debe tener el formato ####-####";

  formErrors.Celular =
    formData.Celular && formData.Celular.length === 9
      ? ""
      : "El celular debe tener el formato ####-####";

  formErrors.selectedDepartamento = formData.selectedDepartamento
    ? ""
    : "Seleccione un departamento";

  formErrors.selectedMunicipio = formData.selectedMunicipio
    ? ""
    : "Seleccione un municipio";

  // Revisar si hay algún error
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

// Función para guardar el contacto en la tienda
function guardarContacto() {
  if (!validarFormulario()) {
    return;
  }

  // Validación básica
  if (!formData.Nombre || !formData.Email) {
    Notify.create({
      message: "Por favor, completa los campos requeridos",
      color: "red",
      position: "top-right",
    });
    return;
  }

  // Agregar el contacto a la tienda
  contactStore.agregarContacto({ ...formData });

  // Limpiar el formulario
  Object.keys(formData).forEach((key) => {
    formData[key] =
      key === "selectedDepartamento" || key === "selectedMunicipio" ? null : "";
  });

  Notify.create({
    message: "Contacto guardado exitosamente",
    color: "green",
    position: "top-right",
  });
}
</script>

<style scoped>
.q-mb-sm {
  margin-bottom: 1em;
}
</style>
