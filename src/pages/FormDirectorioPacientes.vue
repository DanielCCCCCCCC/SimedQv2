<template>
  <div class="row">
    <PacienteActivoGraph />
    <PacientesAggMensualmente />
  </div>
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
      <q-tab name="Antecedentes" label="Antecedentes" icon="history" />
    </q-tabs>

    <!-- Contenido de pestañas principales -->
    <q-tab-panels v-model="tab" animated swipeable>
      <q-tab-panel name="Pacientes">
        <ListadoPacientes :activeTab="tab" @cambiar-tab="cambiarTab" />
      </q-tab-panel>

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
                <q-item-section>Más Datos</q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Contenido de subpestañas -->
          <div class="col-9">
            <q-tab-panels v-model="subTabFichaIdentificacion" animated>
              <q-tab-panel name="infoTecnica">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Información Técnica
                  </q-card-section>
                  <q-form class="q-gutter-md">
                    <q-input
                      v-model="pacienteSeleccionado.fechaRegistro"
                      label="Fecha de Registro"
                      outlined
                      dense
                      type="date"
                    />
                    <q-input
                      v-model="pacienteSeleccionado.codigo"
                      label="Codigo"
                      outlined
                      dense
                    />
                    <q-checkbox
                      v-model="pacienteSeleccionado.activo"
                      label="Activo"
                      dense
                    />

                    <q-select
                      v-model="pacienteSeleccionado.tipo"
                      :options="pacientes"
                      label="Tipo"
                      option-value="id"
                      option-label="descripcion"
                      outlined
                      dense
                      style="font-size: 14px; height: auto"
                    />

                    <q-input
                      v-model="pacienteSeleccionado.medico"
                      label="Medico"
                      :options="medicoNOptions"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="pacienteSeleccionado.medicoCabecera"
                      label="Medico Cabecera"
                      :options="medicoCabeceraOptions"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="pacienteSeleccionado.referidoPor"
                      label="Referido por"
                      :options="referidoPorOptions"
                      outlined
                      dense
                    />
                  </q-form>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="infoPersonal">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Información Personal
                  </q-card-section>
                  <q-form class="q-gutter-md">
                    <q-input
                      v-model="pacienteSeleccionado.dni"
                      label="DNI"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.nombres"
                      label="Nombres"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.apellidos"
                      label="Apellidos"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.fechaNacimiento"
                      label="Fecha de Nacimiento"
                      outlined
                      dense
                      type="date"
                    />
                    <q-select
                      v-model="pacienteSeleccionado.sexo"
                      label="Sexo"
                      :options="sexoOptions"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="pacienteSeleccionado.estadoCivil"
                      label="Estado Civil"
                      :options="estadoCivilOptions"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.observaciones"
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
                      v-model="pacienteSeleccionado.direccion"
                      label="Dirección"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.telCasa"
                      label="Telefono Casa"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.telPersonal"
                      label="Telefono Personal"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.email"
                      label="E-mail"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="pacienteSeleccionado.departamento"
                      label="Departamento"
                      :options="departamentoOptions"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="pacienteSeleccionado.municipio"
                      label="Municipio"
                      :options="municipioOptions"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.organizacion"
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
                      v-model="pacienteSeleccionado.conyugue"
                      label="Cónyugue"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.madre"
                      label="Madre"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.padre"
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
                    Más Datos
                  </q-card-section>
                  <q-form class="q-gutter-md">
                    <q-input
                      v-model="pacienteSeleccionado.escolaridad"
                      label="Escolaridad"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.ocupacion"
                      label="Ocupación"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="pacienteSeleccionado.grupoSanguineo"
                      label="Grupo Sanguineo"
                      :options="grupoSanguineoOptions"
                      outlined
                      dense
                    />
                    <q-input
                      v-model="pacienteSeleccionado.alergias"
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
import { useTiposPacientesStore } from "../stores/ConfiMedicasStores";

import { storeToRefs } from "pinia";
import ListadoPacientes from "./ListadoPacientes.vue";
import PacienteActivoGraph from "src/components/PacienteActivoGraph.vue";
import PacientesAggMensualmente from "src/components/PacientesAggMensualmente.vue";

//Inicializo las tiendas
const TiposPacientesStore = useTiposPacientesStore();

//acedemos a las propiedades de la tienda
const { pacientes } = storeToRefs(TiposPacientesStore);

const pacienteSeleccionado = ref({});

const tab = ref("Pacientes");
const subTabFichaIdentificacion = ref("infoTecnica");

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

// Función para iniciar un nuevo paciente en blanco
const iniciarNuevoPaciente = () => {
  pacienteSeleccionado.value = {
    id: null,

    fechaRegistro: "",
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
  tab.value = "FichaIdentificacion"; // Cambia a la pestaña de creación
};

const cambiarTab = ({ tab: nuevaTab, paciente }) => {
  tab.value = nuevaTab;
  pacienteSeleccionado.value = paciente ? { ...paciente } : {}; // Si no hay paciente, inicializa un objeto vacío
};

const guardarDatosFormulario = () => {
  if (pacienteSeleccionado.value.id) {
    // Modo edición
    const pacienteIndex = formIdentificacion.value.findIndex(
      (p) => p.id === pacienteSeleccionado.value.id
    );
    if (pacienteIndex !== -1) {
      formIdentificacion.value[pacienteIndex] = {
        ...pacienteSeleccionado.value,
      };
    }
  } else {
    // Modo creación: asignar un id único al nuevo paciente
    pacienteSeleccionado.value.id = Date.now();
    formIdentificacion.value.push({ ...pacienteSeleccionado.value });
  }

  alert("PACIENTE GUARDADO CON ÉXITO");
  tab.value = "Pacientes"; // Vuelve a la pestaña de la lista de pacientes
  iniciarNuevoPaciente(); // Reinicia el formulario para un nuevo paciente
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
