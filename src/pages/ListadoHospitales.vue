<template>
  <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
    <DxDataGrid
      :data-source="hospitales"
      key-expr="id"
      :show-borders="true"
      class="custom-data-grid"
      :allow-column-reordering="true"
      :column-auto-width="true"
      height="400px"
    >
      <DxColumn data-field="nombre" caption="Nombre" />
      <DxColumn data-field="direccion" caption="Dirección" />

      <DxColumn data-field="departamento_id" caption="Departamento" />
      <DxColumn data-field="municipio" caption="Municipio" />
      <DxColumn data-field="estado" caption="Estado" />
      <DxColumn data-field="telefono" caption="Teléfono" />
      <DxColumn data-field="email" caption="Email" />
      <DxColumn data-field="web" caption="Sitio Web" />

      <!-- Agregar resumen de conteo de hospitales -->
      <DxSummary>
        <DxGroupItem summary-type="count" displayFormat="{0} hospitales" />
      </DxSummary>

      <DxColumnChooser :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxSearchPanel :visible="true" />
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
    </DxDataGrid>

    <!-- Botones para agregar y eliminar hospitales
    <div class="row justify-end q-mt-md">
      <q-btn
        label="Agregar Hospital"
        color="primary"
        icon="add"
        @click="abrirFormularioAgregar"
      />
      <q-btn
        label="Eliminar Último"
        color="negative"
        icon="delete"
        @click="eliminarUltimoHospital"
        class="q-ml-sm"
      />
    </div> -->

    <!-- Formulario de entrada para agregar un hospital
    <q-dialog v-model="mostrarFormulario">
      <q-card>
        <q-card-section class="text-h6">Agregar Hospital</q-card-section>
        <q-form @submit.prevent="agregarNuevoHospital" class="q-gutter-md">
          <q-input v-model="nuevoHospital.nombre" label="Nombre" outlined />
          <q-input
            v-model="nuevoHospital.direccion"
            label="Dirección"
            outlined
          />
          <q-input
            v-model="nuevoHospital.municipio"
            label="Municipio"
            outlined
          />
          <q-input v-model="nuevoHospital.estado" label="Estado" outlined />
          <q-input v-model="nuevoHospital.telefono" label="Teléfono" outlined />
          <q-input v-model="nuevoHospital.email" label="Email" outlined />
          <q-input v-model="nuevoHospital.web" label="Sitio Web" outlined />
          <q-btn label="Agregar" type="submit" color="primary" />
          <q-btn label="Cancelar" flat @click="mostrarFormulario = false" />
        </q-form>
      </q-card>
    </q-dialog> -->
  </q-card>
</template>
<script setup>
import {
  DxDataGrid,
  DxColumn,
  DxSummary,
  DxGroupItem,
  DxColumnChooser,
  DxFilterRow,
  DxSearchPanel,
  DxGroupPanel,
  DxGrouping,
} from "devextreme-vue/data-grid";
import { ref, onMounted } from "vue";
import { useHospitalStore } from "../stores/DirectoriosStores";
import { storeToRefs } from "pinia";

const hospitalStore = useHospitalStore();
const { hospitales } = storeToRefs(hospitalStore);

const mostrarFormulario = ref(false);
const nuevoHospital = ref({
  nombre: "",
  direccion: "",
  municipio: "",
  estado: "",
  telefono: "",
  email: "",
  web: "",
});

// Cargar los hospitales al montar el componente
onMounted(async () => {
  await hospitalStore.cargarHospitales();
});

const abrirFormularioAgregar = () => {
  mostrarFormulario.value = true;
};

const agregarNuevoHospital = async () => {
  await hospitalStore.agregarHospital(nuevoHospital.value);
  mostrarFormulario.value = false;
  Object.keys(nuevoHospital.value).forEach(
    (key) => (nuevoHospital.value[key] = "")
  );
};

const eliminarUltimoHospital = async () => {
  if (hospitales.value.length > 0) {
    const ultimoHospital = hospitales.value[hospitales.value.length - 1];
    await hospitalStore.eliminarHospital(ultimoHospital.id);
  }
};
</script>
