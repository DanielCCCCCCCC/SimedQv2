<template>
  <DxPieChart
    id="pie"
    :data-source="internetLanguages"
    type="doughnut"
    title="Top Internet Languages"
    palette="Soft Pastel"
  >
    <DxSeries argument-field="language" value-field="percent">
      <DxSmallValuesGrouping :top-count="3" mode="topN" />
      <DxLabel
        :visible="true"
        :customize-text="customizeLabel"
        format="fixedPoint"
      >
        <DxConnector :visible="true" :width="1" />
      </DxLabel>
    </DxSeries>
    <DxExport :enabled="true" />
    <DxLegend horizontal-alignment="center" vertical-alignment="bottom" />
  </DxPieChart>
  <!-- /////////////////// -->
  <!-- /////////////////// -->
  <!-- /////////////////// -->

  <!-- /////////////////// -->
  <q-page class="q-pa-md">
    <!-- Barra de pestañas principales -->
    <q-tabs
      v-model="tab"
      class="bg-white text-black q-mb-sm shadow-2 rounded-borders"
    >
      <q-tab name="Pacientes" label="Pacientes" icon="person" />
      <q-tab
        name="FichaIdentificacion"
        label="Ficha de Identificación"
        icon="assignment_ind"
      />
      <!-- <q-tab name="MasDatos" label="Más Datos" icon="info" /> -->
      <q-tab name="Antecedentes" label="Antecedentes" icon="history" />
    </q-tabs>

    <!-- Contenido de pestañas principales -->
    <q-tab-panels v-model="tab" animated swipeable>
      <!-- Pestaña: Ficha de pacientes -->
      <q-tab-panel name="Pacientes">
        <ListadoPacientes :activeTab="tab" @cambiar-tab="tab = $event" />
      </q-tab-panel>

      <!-- Pestaña: Ficha de Identificación -->
      <q-tab-panel name="FichaIdentificacion">
        <div class="row">
          <!-- Lista de subpestañas vertical -->
          <div class="col-3">
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                @click="subTabFichaIdentificacion = 'infoTecnica'"
                :active="subTabFichaIdentificacion === 'infoTecnica'"
              >
                <q-item-section>Información Técnica</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="subTabFichaIdentificacion = 'infoPersonal'"
                :active="subTabFichaIdentificacion === 'infoPersonal'"
              >
                <q-item-section>Información Personal</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="subTabFichaIdentificacion = 'infoContacto'"
                :active="subTabFichaIdentificacion === 'infoContacto'"
              >
                <q-item-section>Información de Contacto</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="subTabFichaIdentificacion = 'infoFamiliar'"
                :active="subTabFichaIdentificacion === 'infoFamiliar'"
              >
                <q-item-section>Información Familiar</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="subTabFichaIdentificacion = 'masDatos'"
                :active="subTabFichaIdentificacion === 'masDatos'"
              >
                <q-item-section>Mas Datos</q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Contenido de subpestañas -->
          <div class="col-9">
            <q-tab-panels v-model="subTabFichaIdentificacion" animated>
              <!-- Subpestaña: Información Técnica -->
              <q-tab-panel name="infoTecnica">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Información Técnica
                  </q-card-section>
                  <q-form class="q-gutter-md">
                    <q-input
                      v-model="form.codigo"
                      label="Codigo"
                      outlined
                      dense
                    />

                    <q-checkbox
                      v-model="form.activo"
                      label="Activo"
                      dense
                      color="primary"
                    />
                    <q-select
                      v-model="form.tipo"
                      label="Tipo"
                      :options="tipoOptions"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.medico"
                      label="Medico"
                      :options="medicoNOptions"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="form.medicoCabecera"
                      label="Medico Cabecera"
                      :options="medicoCabeceraOptions"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="form.referidoPor"
                      label="Referido por"
                      :options="referidoPorOptions"
                      outlined
                      dense
                    />
                  </q-form>
                </q-card>
              </q-tab-panel>

              <!-- Subpestaña: Información Personal -->
              <q-tab-panel name="infoPersonal">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Información Personal
                  </q-card-section>

                  <q-form class="q-gutter-md">
                    <q-input v-model="form.dni" label="DNI" outlined dense />
                    <q-input
                      v-model="form.nombres"
                      label="Nombres"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.apellidos"
                      label="Apellidos"
                      outlined
                      dense
                    />
                    <!-- Campo de Fecha de Nacimiento tipo fecha -->
                    <q-input
                      v-model="form.fechaNacimiento"
                      label="Fecha de Nacimiento"
                      outlined
                      dense
                      type="date"
                    />
                    <q-select
                      v-model="form.sexo"
                      label="Sexo"
                      :options="sexoOptions"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="form.estadoCivil"
                      label="Estado Civil"
                      :options="estadoCivilOptions"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.observaciones"
                      label="Observaciones"
                      type="textarea"
                      outlined
                      dense
                    />
                  </q-form>
                </q-card>
              </q-tab-panel>

              <!-- Subpestaña: Información de Contacto -->
              <q-tab-panel name="infoContacto">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Información de Contacto
                  </q-card-section>
                  <q-form class="q-gutter-md">
                    <q-input
                      v-model="form.direccion"
                      label="Dirección"
                      outlined
                      dense
                    />
                    <!-- Campo de Estado -->
                    <q-input
                      v-model="form.estado"
                      label="Estado"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.telCasa"
                      label="Telefono Casa"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.telPersonal"
                      label="Telefono Personal"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.email"
                      label="E-mail"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="form.departamento"
                      label="Departamento"
                      :options="departamentoOptions"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="form.municipio"
                      label="Municipio"
                      :options="municipioOptions"
                      outlined
                      dense
                    />

                    <q-input
                      v-model="form.organizacion"
                      label="Organización"
                      outlined
                      dense
                    />
                  </q-form>
                </q-card>
              </q-tab-panel>

              <!-- Subpestaña: Información Familiar -->
              <q-tab-panel name="infoFamiliar">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Información Familiar
                  </q-card-section>
                  <q-form class="q-gutter-md">
                    <q-input
                      v-model="form.conyugue"
                      label="Cónyugue"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.madre"
                      label="Madre"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.padre"
                      label="Padre"
                      outlined
                      dense
                    />
                  </q-form>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="masDatos">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Mas Datos
                  </q-card-section>
                  <q-form class="q-gutter-md">
                    <q-input
                      v-model="form.escolaridad"
                      label="Escolaridad"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="form.ocupacion"
                      label="Ocupación"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="form.grupoSanguineo"
                      label="Grupo Sanguineo"
                      :options="grupoSanguineoOptions"
                      outlined
                      dense
                    />

                    <q-input
                      v-model="form.alergias"
                      label="Alergias"
                      type="textarea"
                      outlined
                      dense
                    />
                  </q-form>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>

        <div class="row justify-center q-mt-md">
          <q-btn
            label="Guardar Formulario"
            color="primary"
            @click="guardarDatosFormulario"
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
  <div>
    <p>Total de pacientes activos: {{ totalActivos }}</p>
    <p>Total de pacientes inactivos: {{ totalInactivos }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFichaIdentificacionStore } from "../stores/fichaIdentificacionStores";
import { storeToRefs } from "pinia";
import ListadoPacientes from "./ListadoPacientes.vue";
import {
  useDepartamentoStore,
  useMunicipioStore,
} from "../stores/DatosGeneralesStores";

const tab = ref("Pacientes");
const subTabFichaIdentificacion = ref("infoTecnica");
// const tab = ref("Pacientes");

// Instancia de la store
const fichaIdentificacionStore = useFichaIdentificacionStore();
const {
  grupoSanguineoOptions,
  formIdentificacion,
  guardarDatos,
  tipoOptions,
  medicoCabeceraOptions,
  referidoPorOptions,
  departamentoOptions,
  municipioOptions,
  sexoOptions,
  estadoCivilOptions,
  medicoNOptions,
  totalActivos,
  totalInactivos,
} = storeToRefs(fichaIdentificacionStore);

import DxPieChart, {
  DxSmallValuesGrouping,
  DxLegend,
  DxSeries,
  DxLabel,
  DxConnector,
  DxExport,
} from "devextreme-vue/pie-chart";

const customizeLabel = ({ argumentText, valueText }) =>
  `${argumentText}: ${valueText}%`;

// Definir el formulario inicial
const form = ref({
  codigo: "",
  activo: true,
  tipo: "",
  dni: "",
  medico: "",
  medicoCabecera: "",
  referidoPor: "",
  nombres: "",
  apellidos: "",
  direccion: "",
  estado: "",
  municipio: "",
  sexo: "",
  fechaNacimiento: "",
  estadoCivil: "",
  conyugue: "",
  madre: "",
  padre: "",
  organizacion: "",
  observaciones: "",
  escolaridad: "",
  ocupacion: "",
  grupoSanguineo: "",
  VIH: "",
  telCasa: "",
  telPersonal: "",
  email: "",
  alergias: "",
});

const resetFormData = () => {
  form.value = {
    codigo: "",
    activo: true,
    tipo: "",
    dni: "",
    medico: "",
    medicoCabecera: "",
    referidoPor: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    estado: "",
    municipio: "",
    sexo: "",
    fechaNacimiento: "",
    estadoCivil: "",
    conyugue: "",
    madre: "",
    padre: "",
    organizacion: "",
    observaciones: "",
    escolaridad: "",
    ocupacion: "",
    grupoSanguineo: "",
    VIH: "",
    telCasa: "",
    telPersonal: "",
    email: "",
    alergias: "",
  };
};

// Función para guardar y limpiar los datos del formulario
const guardarDatosFormulario = () => {
  fichaIdentificacionStore.guardarDatos(form.value);
  alert("PACIENTE GUARDADO CON EXITO");
  resetFormData(); // Limpiar después de guardar
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
