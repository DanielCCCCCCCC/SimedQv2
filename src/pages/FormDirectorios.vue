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
                  :error="!!hospitalErrors.nombre"
                  :error-message="hospitalErrors.nombre"
                />
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.direccion"
                  label="Dirección"
                  outlined
                  dense
                  :error="!!hospitalErrors.direccion"
                  :error-message="hospitalErrors.direccion"
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
                  :error="!!hospitalErrors.departamentoSeleccionado"
                  :error-message="hospitalErrors.departamentoSeleccionado"
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
                  :error="!!hospitalErrors.municipioSeleccionado"
                  :error-message="hospitalErrors.municipioSeleccionado"
                />
              </div>
              <!-- Columna derecha -->
              <div class="col">
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.telefono"
                  label="Teléfono "
                  outlined
                  dense
                  mask="####-####"
                  :error="!!hospitalErrors.telefono"
                  :error-message="hospitalErrors.telefono"
                />
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.email"
                  label="Email"
                  type="email"
                  outlined
                  dense
                  :error="!!hospitalErrors.email"
                  :error-message="hospitalErrors.email"
                />
                <q-input
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.web"
                  label="Web"
                  outlined
                  dense
                  :error="!!hospitalErrors.web"
                  :error-message="hospitalErrors.web"
                />
              </div>
            </div>
            <!-- Botones de acción -->
            <div class="row justify-end q-mt-md">
              <q-btn
                label="Crear"
                color="primary"
                icon="add"
                @click="guardarHospital"
                class="q-mb-sm q-mr-sm"
              />
              <q-btn
                label="Eliminar"
                color="negative"
                icon="delete"
                @click="eliminarHospital"
                class="q-mb-sm q-mr-sm"
              />
            </div>
          </q-form>
        </q-card>
        <ListadoHospitales />
      </q-tab-panel>
      <!--  -->
      <!--  -->

      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
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
                          class="q-mb-sm q-mr-sm"
                          v-model="medicamentoData.codigo"
                          label="Código"
                          outlined
                          dense
                          :error="!!medicamentoErrors.codigo"
                          :error-message="medicamentoErrors.codigo"
                        />
                        <q-input
                          class="q-mb-sm q-mr-sm"
                          v-model="medicamentoData.descripcion"
                          label="Descripción"
                          outlined
                          dense
                          :error="!!medicamentoErrors.descripcion"
                          :error-message="medicamentoErrors.descripcion"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          class="q-mb-sm q-mr-sm"
                          v-model="medicamentoData.tipo"
                          label="Tipo"
                          outlined
                          dense
                          :error="!!medicamentoErrors.tipo"
                          :error-message="medicamentoErrors.tipo"
                        />
                        <q-input
                          class="q-mb-sm q-mr-sm"
                          v-model="medicamentoData.indicaciones"
                          label="Indicaciones"
                          type="textarea"
                          outlined
                          dense
                          :error="!!medicamentoErrors.indicaciones"
                          :error-message="medicamentoErrors.indicaciones"
                        />
                      </div>
                    </div>
                  </q-form>
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
                          class="q-mb-sm q-mr-sm"
                          v-model="medicamentoData.precioCosto"
                          label="Precio Costo"
                          outlined
                          dense
                          :error="!!medicamentoErrors.precioCosto"
                          :error-message="medicamentoErrors.precioCosto"
                        />
                        <q-input
                          class="q-mb-sm q-mr-sm"
                          v-model="medicamentoData.precioVenta"
                          label="Precio Venta"
                          outlined
                          dense
                          :error="!!medicamentoErrors.precioCosto"
                          :error-message="medicamentoErrors.precioVenta"
                        />
                      </div>
                      <div class="col">
                        <q-checkbox
                          class="q-mb-sm q-mr-sm"
                          v-model="medicamentoData.facturar"
                          label="Facturar"
                          :error="!!medicamentoErrors.facturar"
                          :error-message="medicamentoErrors.facturar"
                        />
                        <q-select
                          class="q-mb-sm q-mr-sm"
                          v-model="medicamentoData.status"
                          :options="statusOptions"
                          label="Status"
                          outlined
                          dense
                          :error="!!medicamentoErrors.status"
                          :error-message="medicamentoErrors.status"
                        />
                      </div>
                    </div>
                  </q-form>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
            <div class="row justify-end q-mt-md">
              <q-btn
                class="q-mb-sm q-mr-sm"
                label="Guardar"
                color="primary"
                icon="save"
                @click="guardarMedicamento"
              />
            </div>
          </div>
        </div>
        <ListadoMedicamentos />
      </q-tab-panel>
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->

      <!-- Pestaña: Exámenes y Estudios -->
      <q-tab-panel name="Estudios">
        <div class="row">
          <div class="col-3">
            <q-list bordered>
              <q-item
                class="q-mb-sm q-mr-sm"
                clickable
                v-ripple
                @click="subTabEstudio = 'InfoEstudio'"
                :active="subTabEstudio === 'InfoEstudio'"
              >
                <q-item-section>Información</q-item-section>
              </q-item>
              <q-item
                class="q-mb-sm q-mr-sm"
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
                          class="q-mb-sm q-mr-sm"
                          :error="!!estudioErrors.codigo"
                          :error-message="estudioErrors.codigo"
                        />
                        <q-input
                          v-model="estudioData.descripcion"
                          label="Descripción"
                          outlined
                          dense
                          class="q-mb-sm q-mr-sm"
                          :error="!!estudioErrors.descripcion"
                          :error-message="estudioErrors.descripcion"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          v-model="estudioData.tipo"
                          label="Tipo"
                          outlined
                          dense
                          class="q-mb-sm q-mr-sm"
                          :error="!!estudioErrors.tipo"
                          :error-message="estudioErrors.tipo"
                        />
                        <q-input
                          v-model="estudioData.indicaciones"
                          label="Indicaciones"
                          type="textarea"
                          outlined
                          dense
                          class="q-mb-sm q-mr-sm"
                          :error="!!estudioErrors.indicaciones"
                          :error-message="estudioErrors.indicaciones"
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
                          class="q-mb-sm q-mr-sm"
                          :error="!!estudioErrors.precioCosto"
                          :error-message="estudioErrors.precioCosto"
                        />
                        <q-input
                          v-model="estudioData.precioVenta"
                          label="Precio Venta"
                          outlined
                          dense
                          class="q-mb-sm q-mr-sm"
                          :error="!!estudioErrors.precioVenta"
                          :error-message="estudioErrors.precioVenta"
                        />
                      </div>
                      <div class="col">
                        <q-checkbox
                          class="q-mb-sm q-mr-sm"
                          v-model="estudioData.facturar"
                          label="Facturar"
                          :error="!!estudioErrors.facturar"
                          :error-message="estudioErrors.facturar"
                        />
                        <q-select
                          v-model="estudioData.status"
                          :options="statusOptions"
                          label="Status"
                          outlined
                          dense
                          class="q-mb-sm q-mr-sm"
                          :error="!!estudioErrors.status"
                          :error-message="estudioErrors.status"
                        />
                      </div>
                    </div>
                  </q-form>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
            <div class="row justify-end q-mt-md">
              <q-btn
                class="q-mb-sm q-mr-sm"
                label="Guardar"
                color="primary"
                icon="save"
                @click="guardarEstudio"
              />
            </div>
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
import { Notify } from "quasar";

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
const { medicamentos } = storeToRefs(medicamentoStore);

const hospitalData = reactive({
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

const hospitalErrors = reactive({
  nombre: "",
  direccion: "",
  departamentoSeleccionado: "",
  municipioSeleccionado: "",
  telefono: "",
  email: "",
  web: "",
});

const validarFormularioHospital = () => {
  let isValid = true;

  hospitalErrors.nombre = hospitalData.nombre
    ? ""
    : "El nombre es obligatorio.";
  hospitalErrors.direccion = hospitalData.direccion
    ? ""
    : "La dirección es obligatoria.";
  hospitalErrors.departamentoSeleccionado =
    hospitalData.departamentoSeleccionado ? "" : "Seleccione un departamento.";
  hospitalErrors.municipioSeleccionado = hospitalData.municipioSeleccionado
    ? ""
    : "Seleccione un municipio.";

  // Validación del teléfono: Debe cumplir con el formato ####-####
  hospitalErrors.telefono =
    hospitalData.telefono && hospitalData.telefono.length === 9
      ? ""
      : "El teléfono debe tener el formato ####-####.";

  // Validación del email: Expresión regular para verificar el formato
  hospitalErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hospitalData.email)
    ? ""
    : "Ingrese un email válido.";

  // Validación de la URL del sitio web: Campo opcional, pero si está lleno, debe tener el formato correcto
  hospitalErrors.web =
    hospitalData.web && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(hospitalData.web)
      ? "Ingrese una URL válida (debe comenzar con http:// o https://)."
      : "";

  // Verificar si no hay errores
  isValid = Object.values(hospitalErrors).every((error) => error === "");

  if (!isValid) {
    Notify.create({
      message: "Por favor, corrija los errores en el formulario",
      color: "red",
      position: "top-right",
    });
  }

  return isValid;
};

const guardarHospital = () => {
  if (!validarFormularioHospital()) {
    return;
  }

  hospitalStore.agregarHospital({ ...hospitalData });

  Object.keys(hospitalData).forEach((key) => {
    hospitalData[key] = "";
  });
};

const eliminarHospital = (id) => {
  hospitalStore.eliminarHospital(id);
};
//
//
//
//
//
//
//
//
//
//
//
//
//APARTADO DE MEDICAMENTOS Y OTROS
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

const medicamentoErrors = reactive({
  codigo: "",
  descripcion: "",
  tipo: "",
  indicaciones: "",
  precioCosto: "",
  precioVenta: "",
  status: "",
});

const validarFormularioMedicamento = () => {
  let isValid = true;

  medicamentoErrors.codigo = medicamentoData.codigo
    ? ""
    : "El código es obligatorio.";
  medicamentoErrors.descripcion = medicamentoData.descripcion
    ? ""
    : "La descripción es obligatoria.";
  medicamentoErrors.tipo = medicamentoData.tipo
    ? ""
    : "Seleccione un tipo de medicamento.";
  medicamentoErrors.indicaciones = medicamentoData.indicaciones
    ? ""
    : "Ingrese las indicaciones de uso.";

  // Validación de precios: Verifica que sean números y positivos
  medicamentoErrors.precioCosto =
    medicamentoData.precioCosto &&
    !isNaN(medicamentoData.precioCosto) &&
    medicamentoData.precioCosto > 0
      ? ""
      : "Ingrese un precio de costo válido.";

  medicamentoErrors.precioVenta =
    medicamentoData.precioVenta &&
    !isNaN(medicamentoData.precioVenta) &&
    medicamentoData.precioVenta > 0
      ? ""
      : "Ingrese un precio de venta válido.";

  // Validación de status
  medicamentoErrors.status = medicamentoData.status ? "" : "Ingrese el estado";

  // Verificar si no hay errores
  isValid = Object.values(medicamentoErrors).every((error) => error === "");

  if (!isValid) {
    Notify.create({
      message: "Por favor, corrija los errores en el formulario",
      color: "red",
      position: "top-right",
    });
  }

  return isValid;
};

const guardarMedicamento = () => {
  if (!validarFormularioMedicamento()) {
    return;
  }

  // Guardar en la store
  medicamentoStore.agregarMedicamento({ ...medicamentoData });

  // Limpiar cada propiedad sin perder la reactividad
  Object.keys(medicamentoData).forEach((key) => {
    medicamentoData[key] = key === "facturar" ? false : "";
  });
};

const eliminarMedicamento = (id) => {
  medicamentoStore.eliminarMedicamento(id);
};

//
//
//
//
//
//
//
//
//
//
//
//
// APARTADO DE ESTUDIOS
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

const estudioErrors = reactive({
  codigo: "",
  descripcion: "",
  clase: "",
  indicaciones: "",
  precioCosto: "",
  precioVenta: "",
  status: "",
  facturar: "",
});

const validarFormularioEstudio = () => {
  let isValid = true;

  // Validaciones para los campos básicos del estudio/examen
  estudioErrors.codigo = estudioData.codigo ? "" : "El código es obligatorio.";
  estudioErrors.descripcion = estudioData.descripcion
    ? ""
    : "La descripción es obligatoria.";
  estudioErrors.indicaciones = estudioData.indicaciones
    ? ""
    : "La clase es obligatoria.";
  estudioErrors.indicaciones = estudioData.indicaciones
    ? ""
    : "Las indicaciones son obligatorias.";

  // Validación de precios: Asegúrate de que sean números y positivos
  estudioErrors.precioCosto =
    estudioData.precioCosto &&
    !isNaN(estudioData.precioCosto) &&
    estudioData.precioCosto > 0
      ? ""
      : "Ingrese un precio de costo válido.";

  estudioErrors.precioVenta =
    estudioData.precioVenta &&
    !isNaN(estudioData.precioVenta) &&
    estudioData.precioVenta > 0
      ? ""
      : "Ingrese un precio de venta válido.";

  // Validación de status
  estudioErrors.status = estudioData.status
    ? ""
    : "Seleccione un estado para el estudio.";

  // Verificar si no hay errores
  isValid = Object.values(estudioErrors).every((error) => error === "");

  if (!isValid) {
    Notify.create({
      message: "Por favor, corrija los errores en el formulario",
      color: "red",
      position: "top-right",
    });
  }

  return isValid;
};

const guardarEstudio = () => {
  if (!validarFormularioEstudio()) {
    return;
  }

  // Guardar en la store
  estudioStore.agregarEstudio({ ...estudioData });

  // Limpiar cada propiedad sin perder la reactividad
  Object.keys(estudioData).forEach((key) => {
    estudioData[key] = key === "facturar" ? false : "";
  });
};

const eliminarEstudio = (id) => {
  estudioStore.eliminarEstudio(id);
};

const statusOptions = ["Activo", "Inactivo"];
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
