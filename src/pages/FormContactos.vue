<template>
  <q-page class="q-pa-md flex flex-center" style="margin-top: -70px">
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
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import {
  useDepartamentoStore,
  useMunicipioStore,
} from "../stores/DatosGeneralesStores";
import { useContactStore } from "../stores/ContacStores"; // Asegúrate de que la ruta es correcta
import { storeToRefs } from "pinia";
import { useQuasar, Notify } from "quasar";

// Importar las tiendas
const departamentoStore = useDepartamentoStore();
const municipioStore = useMunicipioStore();
const contactStore = useContactStore();

// Obtener los datos de las tiendas
const { departamentos } = storeToRefs(departamentoStore);
const { municipios } = storeToRefs(municipioStore);

// Datos del formulario
const formData = reactive({
  Nombre: "",
  Direccion: "",
  Organizacion: "",
  Email: "",
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

// Función para guardar el contacto en la tienda
function guardarContacto() {
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
