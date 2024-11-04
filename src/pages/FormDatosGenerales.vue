<template>
  <q-page class="q-pa-md">
    <!-- Barra de navegación de pestañas -->
    <q-tabs
      v-model="tab"
      class="bg-white text-black q-mb-sm shadow-2 rounded-borders small-tabs"
    >
      <q-tab
        name="Departamentos y Municipios"
        icon="location_city"
        label="Departamentos y Municipios"
      />
      <q-tab
        clickable
        v-ripple
        @click="
          $router.push({
            name: 'Departamentos y Municipios',
            query: { subTab: 'Grupo Sanguíneo' },
          })
        "
        name="Grupo Sanguíneo"
        icon="bloodtype"
        label="Grupo Sanguíneo"
      />
      <q-tab name="Escolaridad" icon="school" label="Escolaridad" />
      <q-tab name="Estado Civil" icon="favorite" label="Estado Civil" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated swipeable>
      <!-- Panel para Departamentos y Municipios -->
      <q-tab-panel name="Departamentos y Municipios">
        <div class="row">
          <!-- Lista de subpestañas vertical en el lado izquierdo -->
          <div class="col-3">
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                @click="subTab = 'Departamento'"
                :active="subTab === 'Departamento'"
              >
                <q-item-section>Departamento</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="subTab = 'Municipio'"
                :active="subTab === 'Municipio'"
              >
                <q-item-section>Municipio</q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Contenido de cada subpestaña en el lado derecho -->
          <div class="col-9">
            <q-tab-panels v-model="subTab" animated>
              <!-- Subpanel para Departamento -->
              <q-tab-panel name="Departamento">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary"
                    >Departamento</q-card-section
                  >
                  <q-form
                    @submit.prevent="guardarDepartamento"
                    class="q-gutter-md"
                  >
                    <q-input
                      v-model="departamentoData.descripcion"
                      label="Descripción"
                      outlined
                      dense
                    />
                    <div class="row justify-end q-mt-md">
                      <q-btn
                        label="Crear Departamento"
                        color="primary"
                        icon="add"
                        @click="guardarDepartamento"
                      />
                      <q-btn
                        label="Eliminar ultimo agregado"
                        color="negative"
                        icon="delete"
                        @click="eliminarDepartamento"
                        class="q-ml-sm"
                      />
                    </div>
                  </q-form>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="Municipio">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary"
                    >Municipio</q-card-section
                  >
                  <q-form
                    @submit.prevent="guardarMunicipio"
                    class="q-gutter-md"
                  >
                    <!-- Select para escoger el departamento -->
                    <q-select
                      v-model="municipioData.departamentoId"
                      :options="departamentoStore.departamentos"
                      option-value="id"
                      option-label="descripcion"
                      label="Departamento"
                      outlined
                      dense
                    />
                    <!-- Input para la descripción del municipio -->
                    <q-input
                      v-model="municipioData.descripcion"
                      label="Descripción"
                      outlined
                      dense
                    />
                    <div class="row justify-end q-mt-md">
                      <q-btn
                        label="Crear Municipio"
                        color="primary"
                        icon="add"
                        @click="guardarMunicipio"
                      />
                      <q-btn
                        label="Eliminar último agregado"
                        color="negative"
                        icon="delete"
                        @click="eliminarMunicipio"
                        class="q-ml-sm"
                      />
                    </div>
                  </q-form>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-tab-panel>

      <!-- Panel para Grupo Sanguíneo -->
      <q-tab-panel name="Grupo Sanguíneo">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Grupo Sanguíneo</q-card-section
          >
          <q-form @submit.prevent="guardarGrupoSanguineo" class="q-gutter-md">
            <q-input
              v-model="grupoSanguineoData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear Grupo Sanguíneo"
                color="primary"
                icon="add"
                @click="guardarGrupoSanguineo"
              />
              <q-btn
                label="Eliminar ultimo agregado"
                color="negative"
                icon="delete"
                @click="eliminarGrupoSanguineo"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Panel para Escolaridad -->
      <q-tab-panel name="Escolaridad">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Escolaridad</q-card-section
          >
          <q-form @submit.prevent="guardarEscolaridad" class="q-gutter-md">
            <q-input
              v-model="escolaridadData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear Escolariadad"
                color="primary"
                icon="add"
                @click="guardarEscolaridad"
              />
              <q-btn
                label="Eliminar ultimo agregado "
                color="negative"
                icon="delete"
                @click="eliminarEscolaridad"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-tab-panel>

      <!-- Panel para Estado Civil -->
      <q-tab-panel name="Estado Civil">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Estado Civil</q-card-section
          >
          <q-form @submit.prevent="guardarEstadoCivil" class="q-gutter-md">
            <q-input
              v-model="estadoCivilData.descripcion"
              label="Descripción"
              outlined
              dense
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear Estado Civil"
                color="primary"
                icon="add"
                @click="guardarEstadoCivil"
              />
              <q-btn
                label="Eliminar ultimo agregado"
                color="negative"
                icon="delete"
                @click="eliminarEstadoCivil"
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
  useDepartamentoStore,
  useMunicipioStore,
  useGrupoSanguineoStore,
  useEscolaridadStore,
  useEstadoCivilStore,
} from "../stores/DatosGeneralesStores";

// Estado para las pestañas activas
const tab = ref("Departamentos y Municipios");
const subTab = ref("Departamento");

// Estados de los formularios para cada tipo
const departamentoData = ref({ descripcion: "" });
const municipioData = ref({ descripcion: "", departamentoId: "" });
const grupoSanguineoData = ref({ descripcion: "" });
const escolaridadData = ref({ descripcion: "" });
const estadoCivilData = ref({ descripcion: "" });

// Tiendas para cada tipo
const departamentoStore = useDepartamentoStore();
const municipioStore = useMunicipioStore();
const grupoSanguineoStore = useGrupoSanguineoStore();
const escolaridadStore = useEscolaridadStore();
const estadoCivilStore = useEstadoCivilStore();

// Funciones para guardar y eliminar en cada sección
const guardarDepartamento = () => {
  departamentoStore.agregarDepartamento(departamentoData.value.descripcion);
  departamentoData.value.descripcion = "";
};
const eliminarDepartamento = () =>
  departamentoStore.eliminarUltimoDepartamento();

function guardarMunicipio() {
  if (municipioData.value.descripcion && municipioData.value.departamentoId) {
    municipioStore.agregarMunicipio(
      municipioData.value.descripcion,
      municipioData.value.departamentoId
    );
  } else {
    // Notificación o mensaje de error si los campos están vacíos
    this.$q.notify({
      type: "negative",
      message: "Por favor, complete todos los campos antes de guardar.",
      position: "top-right",
    });
  }
}
// Función para eliminar el último municipio agregado
function eliminarMunicipio() {
  municipioStore.eliminarUltimoMunicipio();
}
const guardarGrupoSanguineo = () => {
  grupoSanguineoStore.agregarGrupoSanguineo(
    grupoSanguineoData.value.descripcion
  );
  grupoSanguineoData.value.descripcion = "";
};
const eliminarGrupoSanguineo = () =>
  grupoSanguineoStore.eliminarUltimoGrupoSanguineo();

const guardarEscolaridad = () => {
  escolaridadStore.agregarEscolaridad(escolaridadData.value.descripcion);
  escolaridadData.value.descripcion = "";
};
const eliminarEscolaridad = () => escolaridadStore.eliminarUltimaEscolaridad();

const guardarEstadoCivil = () => {
  estadoCivilStore.agregarEstadoCivil(estadoCivilData.value.descripcion);
  estadoCivilData.value.descripcion = "";
};
const eliminarEstadoCivil = () => estadoCivilStore.eliminarUltimoEstadoCivil();
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
  font-size: 8px;
  padding: 4px 9px;
}
</style>
