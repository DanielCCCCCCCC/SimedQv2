<template>
  <q-page class="q-pa-md">
    <q-tabs
      v-model="tab"
      class="bg-white text-black q-mb-sm shadow-2 rounded-borders"
    >
      <q-tab name="Hospitales" icon="local_hospital" label="Hospitales" />
      <q-tab
        name="Medicamentos"
        icon="medication"
        label="Medicamentos y Otros"
      />
      <q-tab name="Estudios" icon="description" label="Exámenes y Estudios" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated swipeable>
      <!-- Pestaña: Hospitales -->
      <q-tab-panel name="Hospitales">
        <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
          <q-card-section class="text-h6 text-primary"
            >Hospitales</q-card-section
          >
          <q-form @submit.prevent="guardarHospital" class="q-gutter-md">
            <div class="row">
              <!-- Columna izquierda -->
              <div class="col">
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.nombre"
                  label="Nombre"
                  outlined
                  dense
                />
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.direccion"
                  label="Dirección"
                  outlined
                  dense
                />
                <q-select
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.departamentoSeleccionado"
                  :options="departamentos"
                  label="Departamento"
                  option-value="id"
                  option-label="descripcion"
                  outlined
                  dense
                />
                <q-select
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.municipioSeleccionado"
                  :options="filteredMunicipios"
                  label="Municipio"
                  option-value="id"
                  option-label="descripcion"
                  outlined
                  dense
                />
              </div>
              <!-- Columna derecha -->
              <div class="col">
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.telefono"
                  label="Teléfono Fijo"
                  outlined
                  dense
                  mask="####-####"
                />
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.email"
                  label="Email"
                  type="email"
                  outlined
                  dense
                />
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.web"
                  label="Web"
                  outlined
                  dense
                />
              </div>
            </div>
            <!-- Botones de acción -->
            <div class="row justify-end q-mt-md">
              <q-btn
                class="q-mb-sm q-mr-sm"
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarHospital"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarHospital"
                class="q-ml-sm q-mr-sm"
              />
            </div>
          </q-form>
          <ListadoHospitales />
        </q-card>
      </q-tab-panel>

      <!-- Pestaña: Medicamentos y Otros -->
      <q-tab-panel name="Medicamentos">
        <div class="row">
          <div class="col-3">
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                @click="subTabMedicamento = 'Info'"
                :active="subTabMedicamento === 'Info'"
              >
                <q-item-section>Información</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="subTabMedicamento = 'Config'"
                :active="subTabMedicamento === 'Config'"
              >
                <q-item-section>Configuración</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-9">
            <q-tab-panels v-model="subTabMedicamento" animated>
              <q-tab-panel name="Info">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary"
                    >Información de Medicamento</q-card-section
                  >
                  <q-form class="q-gutter-md">
                    <div class="row">
                      <div class="col">
                        <q-input
                          v-model="medicamentoData.codigo"
                          label="Código"
                          outlined
                          dense
                        />
                        <q-input
                          v-model="medicamentoData.descripcion"
                          label="Descripción"
                          outlined
                          dense
                        />
                      </div>
                      <div class="col">
                        <q-input
                          v-model="medicamentoData.tipo"
                          label="Tipo"
                          outlined
                          dense
                        />
                        <q-input
                          v-model="medicamentoData.indicaciones"
                          label="Indicaciones"
                          type="textarea"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                  </q-form>
                  <ListadoMedicamentos />
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="Config">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary"
                    >Configuración de Medicamento</q-card-section
                  >
                  <q-form class="q-gutter-md">
                    <div class="row">
                      <div class="col">
                        <q-input
                          v-model="medicamentoData.precioCosto"
                          label="Precio Costo"
                          outlined
                          dense
                        />
                        <q-input
                          v-model="medicamentoData.precioVenta"
                          label="Precio Venta"
                          outlined
                          dense
                        />
                      </div>
                      <div class="col">
                        <q-checkbox
                          v-model="medicamentoData.facturar"
                          label="Facturar"
                        />
                        <q-select
                          v-model="medicamentoData.status"
                          :options="statusOptions"
                          label="Status"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                    <div class="row justify-end q-mt-md">
                      <q-btn
                        label="Guardar"
                        color="primary"
                        icon="save"
                        @click="guardarMedicamento"
                      />
                    </div>
                  </q-form>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-tab-panel>

      <!-- Pestaña: Exámenes y Estudios -->
      <q-tab-panel name="Estudios">
        <div class="row">
          <div class="col-3">
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                @click="subTabEstudio = 'InfoEstudio'"
                :active="subTabEstudio === 'InfoEstudio'"
              >
                <q-item-section>Información</q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                @click="subTabEstudio = 'ConfigEstudio'"
                :active="subTabEstudio === 'ConfigEstudio'"
              >
                <q-item-section>Configuración</q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-9">
            <q-tab-panels v-model="subTabEstudio" animated>
              <q-tab-panel name="InfoEstudio">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary"
                    >Información de Examen/Estudio</q-card-section
                  >
                  <q-form class="q-gutter-md">
                    <div class="row">
                      <div class="col">
                        <q-input
                          v-model="estudioData.codigo"
                          label="Código"
                          outlined
                          dense
                        />
                        <q-input
                          v-model="estudioData.descripcion"
                          label="Descripción"
                          outlined
                          dense
                        />
                      </div>
                      <div class="col">
                        <q-input
                          v-model="estudioData.clase"
                          label="Clase de Estudio"
                          outlined
                          dense
                        />
                        <q-input
                          v-model="estudioData.indicaciones"
                          label="Indicaciones"
                          type="textarea"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                  </q-form>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="ConfigEstudio">
                <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
                  <q-card-section class="text-h6 text-primary"
                    >Configuración de Examen/Estudio</q-card-section
                  >
                  <q-form class="q-gutter-md">
                    <div class="row">
                      <div class="col">
                        <q-input
                          v-model="estudioData.precioCosto"
                          label="Precio Costo"
                          outlined
                          dense
                        />
                        <q-input
                          v-model="estudioData.precioVenta"
                          label="Precio Venta"
                          outlined
                          dense
                        />
                      </div>
                      <div class="col">
                        <q-checkbox
                          v-model="estudioData.facturar"
                          label="Facturar"
                        />
                        <q-select
                          v-model="estudioData.status"
                          :options="statusOptions"
                          label="Status"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                    <div class="row justify-end q-mt-md">
                      <q-btn
                        label="Guardar"
                        color="primary"
                        icon="save"
                        @click="guardarEstudio"
                      />
                    </div>
                  </q-form>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import {
  useHospitalStore,
  useMedicamentoStore,
  useEstudioStore,
} from "../stores/DirectoriosStores";
import ListadoHospitales from "./ListadoHospitales.vue";
import ListadoMedicamentos from "./ListadoMedicamentos.vue";
/////
import {
  useDepartamentoStore,
  useMunicipioStore,
} from "../stores/DatosGeneralesStores";

import { storeToRefs } from "pinia";

const tab = ref("Hospitales");
const subTabMedicamento = ref("Info");
const subTabEstudio = ref("InfoEstudio");

// Inicializamos al tienda
const hospitalStore = useHospitalStore();
const medicamentoStore = useMedicamentoStore();
const estudioStore = useEstudioStore();
const DepartamentoStore = useDepartamentoStore();
const MunicipioStore = useMunicipioStore();

//Accedermos a las propiedades reactivas
const { departamentos } = storeToRefs(DepartamentoStore);
const { municipios } = storeToRefs(MunicipioStore);

const hospitalData = reactive({
  nombre: "",
  direccion: "",
  departamentoSeleccionado: "",
  municipioSeleccionado: "",
  telefono: "",
  email: "",
  web: "",
});

const formErrors = reactive({
  nombre: "",
  direccion: "",
  departamentoSeleccionado: "",
  municipioSeleccionado: "",
  telefono: "",
  email: "",
  web: "",
});

const filteredMunicipios = computed(() => {
  if (!hospitalData.departamentoSeleccionado) {
    return [];
  }
  return municipios.value.filter(
    (municipio) =>
      municipio.departamentoId === hospitalData.departamentoSeleccionado.id
  );
});

const medicamentoData = reactive({
  codigo: "",
  descripcion: "",
  tipo: "",
  indicaciones: "",
  precioCosto: "",
  precioVenta: "",
  facturar: false,
  status: "",
});

const estudioData = reactive({
  codigo: "",
  descripcion: "",
  clase: "",
  indicaciones: "",
  precioCosto: "",
  precioVenta: "",
  facturar: false,
  status: "",
});

const statusOptions = ["Activo", "Inactivo"];

// Apartado del agregar hospital

const validarFormulario = () => {
  // Limpiar errores anteriores
  var isValid = true;
  Object.keys(formErrors).forEach((key) => {
    formErrors[key] = "";
  });

  // Validar nombre
  if (!hospitalData.nombre || hospitalData.nombre.trim() === "") {
    formErrors.nombre = "El nombre es requerido";
    isValid = false;
  }

  // Validar dirección
  if (!hospitalData.direccion || hospitalData.direccion.trim() === "") {
    formErrors.direccion = "La dirección es requerida";
    isValid = false;
  }

  // Validar departamento
  if (!hospitalData.departamentoSeleccionado) {
    formErrors.departamentoSeleccionado = "Debe seleccionar un departamento";
    isValid = false;
  }

  // Validar municipio
  if (!hospitalData.municipioSeleccionado) {
    formErrors.municipioSeleccionado = "Debe seleccionar un municipio";
    isValid = false;
  }

  // Validar teléfono
  if (!hospitalData.telefono || !/^\d{4}-\d{4}$/.test(hospitalData.telefono)) {
    formErrors.telefono =
      "El teléfono es requerido y debe tener el formato ####-####";
    isValid = false;
  }

  // Validar email
  if (!hospitalData.email || hospitalData.email.trim() === "") {
    formErrors.email = "El email es requerido";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(hospitalData.email)) {
    formErrors.email = "El email no es válido";
    isValid = false;
  }

  // Validar web (opcional, solo si se quiere validar)
  if (
    hospitalData.web &&
    !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[\w-]*)?$/.test(hospitalData.web)
  ) {
    formErrors.web = "La URL no es válida";
    isValid = false;
  }

  return isValid;
};

const guardarHospital = () => {
  if (!validarFormulario()) {
    return; // Detener la función si la validación falla
  }

  hospitalStore.agregarHospital({ ...hospitalData });

  Object.keys(hospitalData).forEach((key) => {
    hospitalData[key] = "";
  });
};

const eliminarHospital = (id) => {
  hospitalStore.eliminarHospital(id);
};

// Apartado de guardar Medicamentoo

const guardarMedicamento = () => {
  medicamentoStore.agregarMedicamento(medicamentoData.value);
  medicamentoData.value = {
    codigo: "",
    descripcion: "",
    tipo: "",
    indicaciones: "",
    precioCosto: "",
    precioVenta: "",
    facturar: false,
    status: "",
  };
};

const eliminarMedicamento = (id) => {
  medicamentoStore.eliminarMedicamento(id);
};

const guardarEstudio = () => {
  estudioStore.agregarEstudio(estudioData.value);
  estudioData.value = {
    codigo: "",
    descripcion: "",
    clase: "",
    indicaciones: "",
    precioCosto: "",
    precioVenta: "",
    facturar: false,
    status: "",
  };
};

const eliminarEstudio = (id) => {
  estudioStore.eliminarEstudio(id);
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

.q-list {
  width: 100%;
}
</style>
