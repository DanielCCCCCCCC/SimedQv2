<template>
  <q-page class="q-pa-md">
    <q-tabs
      v-model="tab"
      class="bg-white text-black q-mb-sm shadow-2 rounded-borders small-tabs"
    >
      <!-- Pestañas -->
      <q-tab
        name="Departamentos y Municipios"
        icon="location_city"
        label="Departamentos y Municipios"
      />
      <q-tab name="Grupo Sanguíneo" icon="bloodtype" label="Grupo Sanguíneo" />
      <q-tab name="Escolaridad" icon="school" label="Escolaridad" />
      <q-tab name="Estado Civil" icon="favorite" label="Estado Civil" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated swipeable>
      <!-- Panel para Departamentos y Municipios -->
      <q-tab-panel name="Departamentos y Municipios">
        <div class="row">
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

          <div class="col-9">
            <q-tab-panels v-model="subTab" animated>
              <!-- Subpanel para Departamento -->
              <q-tab-panel name="Departamento">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Departamento
                  </q-card-section>
                  <q-form
                    @submit.prevent="guardarDepartamento"
                    class="q-gutter-md"
                  >
                    <q-input
                      v-model="departamentoData.descripcion"
                      label="Descripción"
                      outlined
                      dense
                      :error="!!formErrors.departamentoDescripcion"
                      :error-message="formErrors.departamentoDescripcion"
                    />
                    <div class="row justify-end q-mt-md">
                      <q-btn
                        label="Crear Departamento"
                        color="primary"
                        icon="add"
                        @click="guardarDepartamento"
                      />
                      <q-btn
                        label="Eliminar último agregado"
                        color="negative"
                        icon="delete"
                        @click="eliminarDepartamento"
                        class="q-ml-sm"
                      />
                    </div>
                  </q-form>
                </q-card>
              </q-tab-panel>

              <!-- Subpanel para Municipio -->
              <q-tab-panel name="Municipio">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary">
                    Municipio
                  </q-card-section>
                  <q-form
                    @submit.prevent="guardarMunicipio"
                    class="q-gutter-md"
                  >
                    <q-select
                      v-model="municipioData.departamentoId"
                      :options="departamentos"
                      option-value="id"
                      option-label="descripcion"
                      label="Departamento"
                      outlined
                      dense
                      :error="!!formErrors.municipioDepartamento"
                      :error-message="formErrors.municipioDepartamento"
                    />
                    <!-- @input="onDepartamentoSelected" -->
                    <q-input
                      v-model="municipioData.descripcion"
                      label="Descripción"
                      outlined
                      dense
                      :error="!!formErrors.municipioDescripcion"
                      :error-message="formErrors.municipioDescripcion"
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
          <q-card-section class="text-h6 text-primary">
            Grupo Sanguíneo
          </q-card-section>
          <q-form @submit.prevent="guardarGrupoSanguineo" class="q-gutter-md">
            <q-input
              v-model="grupoSanguineoData.descripcion"
              label="Descripción"
              outlined
              dense
              :error="!!formErrors.grupoSanguineoDescripcion"
              :error-message="formErrors.grupoSanguineoDescripcion"
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear Grupo Sanguíneo"
                color="primary"
                icon="add"
                @click="guardarGrupoSanguineo"
              />
              <q-btn
                label="Eliminar último agregado"
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
          <q-card-section class="text-h6 text-primary">
            Escolaridad
          </q-card-section>
          <q-form @submit.prevent="guardarEscolaridad" class="q-gutter-md">
            <q-input
              v-model="escolaridadData.descripcion"
              label="Descripción"
              outlined
              dense
              :error="!!formErrors.escolaridadDescripcion"
              :error-message="formErrors.escolaridadDescripcion"
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear Escolaridad"
                color="primary"
                icon="add"
                @click="guardarEscolaridad"
              />
              <q-btn
                label="Eliminar último agregado"
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
          <q-card-section class="text-h6 text-primary">
            Estado Civil
          </q-card-section>
          <q-form @submit.prevent="guardarEstadoCivil" class="q-gutter-md">
            <q-input
              v-model="estadoCivilData.descripcion"
              label="Descripción"
              outlined
              dense
              :error="!!formErrors.estadoCivilDescripcion"
              :error-message="formErrors.estadoCivilDescripcion"
            />
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear Estado Civil"
                color="primary"
                icon="add"
                @click="guardarEstadoCivil"
              />
              <q-btn
                label="Eliminar último agregado"
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
import { ref, reactive, onMounted, watch } from "vue";
import {
  useDepartamentoStore,
  useMunicipioStore,
  useGrupoSanguineoStore,
  useEscolaridadStore,
  useEstadoCivilStore,
} from "../stores/DatosGeneralesStores";
import { storeToRefs } from "pinia";

// Inicializar tiendas
const departamentoStore = useDepartamentoStore();
const municipioStore = useMunicipioStore();
const grupoSanguineoStore = useGrupoSanguineoStore();
const escolaridadStore = useEscolaridadStore();
const estadoCivilStore = useEstadoCivilStore();

// Datos reactivos
const departamentoData = reactive({ descripcion: "" });
const municipioData = reactive({ descripcion: "", departamentoId: null });
const grupoSanguineoData = reactive({ descripcion: "" });
const escolaridadData = reactive({ descripcion: "" });
const estadoCivilData = reactive({ descripcion: "" });

// Referencias a los datos
const { departamentos } = storeToRefs(departamentoStore);

// Estado de los errores de validación
const formErrors = reactive({
  departamentoDescripcion: "",
  municipioDepartamento: "",
  municipioDescripcion: "",
  grupoSanguineoDescripcion: "",
  escolaridadDescripcion: "",
  estadoCivilDescripcion: "",
});

// Cargar departamentos al montar el componente
onMounted(() => {
  departamentoStore.cargarDepartamentos();
});

// Validaciones y funciones
const validarMunicipioData = () => {
  formErrors.municipioDepartamento = "";
  formErrors.municipioDescripcion = "";

  let isValid = true;

  if (!municipioData.departamentoId) {
    formErrors.municipioDepartamento = "Seleccione un departamento.";
    isValid = false;
  }

  if (!municipioData.descripcion) {
    formErrors.municipioDescripcion =
      "La descripción del municipio es obligatoria.";
    isValid = false;
  }

  return isValid;
};

const guardarDepartamento = () => {
  formErrors.departamentoDescripcion = "";
  if (!departamentoData.descripcion) {
    formErrors.departamentoDescripcion =
      "La descripción del departamento es obligatoria.";
    return;
  }
  departamentoStore.agregarDepartamento(departamentoData.descripcion);
  departamentoData.descripcion = "";
};

const guardarMunicipio = () => {
  formErrors.municipioDepartamento = "";

  if (!municipioData.departamentoId) {
    formErrors.municipioDepartamento = "Seleccione un departamento.";
    return;
  }

  //A ESTE CODIGO SE LE RUGEGA 🙏
  const departamentoId =
    typeof municipioData.departamentoId === "object"
      ? municipioData.departamentoId.id
      : municipioData.departamentoId;

  municipioStore.agregarMunicipio(
    municipioData.descripcion,
    departamentoId,
    "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"
  );

  municipioData.descripcion = "";
  municipioData.departamentoId = null;
};

// Funciones para eliminar el último agregado
const eliminarDepartamento = () => {
  departamentoStore.eliminarUltimoDepartamento();
};

const eliminarMunicipio = () => {
  municipioStore.eliminarUltimoMunicipio();
};

// Función para seleccionar el ID del departamento
// const onDepartamentoSelected = (departamento) => {
//   municipioData.departamentoId = departamento.id;
// };

// Tabs de control
const tab = ref("Departamentos y Municipios");
const subTab = ref("Departamento");
</script>

<style scoped>
.q-card {
  max-width: 700px;
  margin: 0 auto;
}
.text-primary {
  color: #1976d2;
}
.small-tabs .q-tab {
  font-size: 8px;
  padding: 4px 9px;
}
</style>
