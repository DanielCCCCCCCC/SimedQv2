<template>
  <!-- @submit="guardarContacto" -->
  <q-page class="q-pa-md flex flex-center" style="margin-top: -70px">
    <q-form
      @submit.prevent="guardarContacto"
      class="bg-grey-2 shadow-2 q-pa-md rounded-xl"
      style="max-width: 600px; width: 100%"
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
            :error="!!formErrors.Nombre"
            :error-message="formErrors.Nombre"
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
            class="q-mb-sm"
          />

          <q-select
            v-model="formData.grupos"
            :options="grupos"
            label="Grupo"
            option-value="id"
            option-label="descripcion"
            outlined
            dense
            style="font-size: 14px; height: auto"
            class="q-mb-sm"
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
            class="q-mb-sm"
          />
          <q-select
            v-model="formData.selectedMunicipio"
            :options="filteredMunicipios"
            label="Municipio"
            option-value="id"
            option-label="descripcion"
            outlined
            dense
            :error="!!formErrors.selectedMunicipio"
            :error-message="formErrors.selectedMunicipio"
            class="q-mb-sm"
            :disable="!formData.selectedDepartamento"
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
            :error="!!formErrors.Email"
            :error-message="formErrors.Email"
            style="font-size: 14px; height: auto"
            class="q-mb-sm"
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
            class="q-mb-sm"
          />
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

      <div class="q-mt-sm">
        <q-input
          v-model="formData.Observaciones"
          label="Observaciones"
          type="textarea"
          outlined
          :autogrow="true"
          dense
          style="font-size: 14px; height: auto"
        />
      </div>

      <q-btn
        type="submit"
        label="Guardar Contacto"
        color="primary"
        class="q-mt-sm full-width"
        style="font-size: 14px; padding: 8px 16px"
      />
    </q-form>
  </q-page>
  <!-- <ListadoContactos /> -->
</template>

<script setup>
// import { Notify } from "quasar";
import { ref, reactive, computed, watch } from "vue";
import {
  useDepartamentoStore,
  useMunicipioStore,
} from "../stores/DatosGeneralesStores";
import { useGruposContactosStore } from "../stores/ConfiMedicasStores";
import { useContactStore } from "../stores/ContacStores"; // Asegúrate de que la ruta es correcta
import { storeToRefs } from "pinia";

// Importar las tiendas
const departamentoStore = useDepartamentoStore();
const municipioStore = useMunicipioStore();
const contactStore = useContactStore();
const GruposContactosStore = useGruposContactosStore();

// Obtener los datos de las tiendas
const { departamentos } = storeToRefs(departamentoStore);
const { municipios } = storeToRefs(municipioStore);
const { grupos } = storeToRefs(GruposContactosStore);

// Datos del formulario
const formData = reactive({
  Nombre: "",
  Direccion: "",
  Organizacion: "",
  Email: "",
  grupos: "",
  TelefonoCasa: "",
  Celular: "",
  Observaciones: "",
  selectedDepartamento: null,
  selectedMunicipio: null,
  // ... otros campos si es necesario
});

const filteredMunicipios = computed(() => {
  if (!formData.selectedDepartamento) {
    return [];
  }
  return municipios.value.filter(
    (municipio) => municipio.departamentoId === formData.selectedDepartamento.id
  );
});
const guardarContacto = () => {
  // Validar el formulario antes de proceder
  if (!validarFormulario()) {
    return;
  }

  const nuevoContacto = {
    ...formData,
    DepartamentoID: formData.selectedDepartamento
      ? formData.selectedDepartamento.id
      : null,
    DepartamentoDescripcion: formData.selectedDepartamento
      ? formData.selectedDepartamento.descripcion
      : null,
    MunicipioID: formData.selectedMunicipio
      ? formData.selectedMunicipio.id
      : null,
    MunicipioDescripcion: formData.selectedMunicipio
      ? formData.selectedMunicipio.descripcion
      : null,
    GrupoID: formData.grupos && formData.grupos.id ? formData.grupos.id : null,
    GrupoDescripcion:
      formData.grupos && formData.grupos.descripcion
        ? formData.grupos.descripcion
        : null,
  };

  // Remover las propiedades que no quieras guardar
  delete nuevoContacto.selectedDepartamento;
  delete nuevoContacto.selectedMunicipio;
  delete nuevoContacto.grupos; // Remover Grupo original si ya tienes propiedades desglosadas

  // Agregar el contacto a la tienda
  contactStore.agregarContacto(nuevoContacto);

  alert("Contacto creado Exitosamente");
  // Limpiar el formulario después de guardar
  Object.keys(formData).forEach((key) => {
    formData[key] = null;
  });
  // Mostrar una notificación de éxito

  // Opcional: Puedes redirigir al usuario o mostrar un mensaje de éxito
  console.log("Contacto guardado exitosamente");
};
const formErrors = reactive({
  Nombre: "",
  Email: "",
  selectedDepartamento: "",
  selectedMunicipio: "",
  // Agrega otros campos si es necesario
});

watch(
  () => formData.selectedDepartamento,
  () => {
    formData.selectedMunicipio = null;
    console.log("Departamento seleccionado:", formData.selectedDepartamento);
  }
);

watch(
  () => filteredMunicipios.value,
  (newVal) => {
    console.log("Municipios filtrados:", newVal);
  }
);
const validarFormulario = () => {
  let isValid = true;

  // Resetear errores anteriores
  Object.keys(formErrors).forEach((key) => {
    formErrors[key] = "";
  });

  // Validar Nombre
  if (!formData.Nombre || formData.Nombre.trim() === "") {
    formErrors.Nombre = "El nombre es requerido";
    isValid = false;
  }

  // Validar Email
  if (!formData.Email || formData.Email.trim() === "") {
    formErrors.Email = "El email es requerido";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.Email)) {
    formErrors.Email = "El email no es válido";
    isValid = false;
  }

  // Validar Departamento
  if (!formData.selectedDepartamento) {
    formErrors.selectedDepartamento = "Debe seleccionar un departamento";
    isValid = false;
  }

  // Validar Municipio
  if (!formData.selectedMunicipio) {
    formErrors.selectedMunicipio = "Debe seleccionar un municipio";
    isValid = false;
  }

  // Añadir otras validaciones si es necesario

  if (!isValid) {
    Notify.create({
      message: "Por favor, corrija los errores en el formulario",
      color: "red",
      position: "top-right",
    });
  }

  return isValid;
};
</script>

<style scoped>
.q-mb-sm {
  margin-bottom: 1em;
}
</style>
