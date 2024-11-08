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

                <!-- ////////////////// -->
                <!-- ////////////////// -->
                <!-- ////////////////// -->
                <q-select
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.departamentoId"
                  :options="departamentos"
                  label="Departamento"
                  option-value="id"
                  option-label="descripcion"
                  outlined
                  dense
                  :error="!!hospitalErrors.departamentoId"
                  :error-message="hospitalErrors.departamentoId"
                />
                <q-select
                  class="q-mb-sm q-mr-sm"
                  v-model="hospitalData.municipioId"
                  :options="filteredMunicipios"
                  label="Municipio"
                  option-value="id"
                  option-label="descripcion"
                  outlined
                  dense
                  :error="!!hospitalErrors.municipioId"
                  :error-message="hospitalErrors.municipioId"
                />

                <!-- ////////////////// -->
                <!-- ////////////////// -->
                <!-- ////////////////// -->
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
import { ref, reactive, computed, watch, onMounted } from "vue";
import {
  useHospitalStore,
  useMedicamentoStore,
  useEstudioStore,
} from "../stores/DirectoriosStores";
import ListadoHospitales from "./ListadoHospitales.vue";
import ListadoMedicamentos from "./ListadoMedicamentos.vue";
const searchQuery = ref(""); // Para almacenar el término de búsqueda

//////////////

import {
  useDepartamentoStore,
  useMunicipioStore,
} from "../stores/DatosGeneralesStores";

//////////

import { Notify } from "quasar";
import { storeToRefs } from "pinia";

// Estado de las pestañas
const tab = ref("Hospitales");
const subTabMedicamento = ref("Info");
const subTabEstudio = ref("InfoEstudio");

// Inicializar tiendas
const hospitalStore = useHospitalStore();
const medicamentoStore = useMedicamentoStore();
const estudioStore = useEstudioStore();
const departamentoStore = useDepartamentoStore();
const municipioStore = useMunicipioStore();

// Acceso a propiedades reactivas de las tiendas
const { departamentos } = storeToRefs(departamentoStore);
const { municipios } = storeToRefs(municipioStore);

onMounted(async () => {
  await municipioStore.cargarMunicipios();
  console.log(
    "Municipios cargados en FormDirectorios.vue:",
    municipioStore.municipios
  );
});

// Datos reactivos para el hospital
const hospitalData = reactive({
  nombre: "",
  direccion: "",
  departamentoId: null,
  municipioId: null,
  telefono: "",
  email: "",
  web: "",
});

const onFilterMunicipios = (val) => {
  searchQuery.value = val;
};

// Computed para filtrar municipios basados en el departamento y el término de búsqueda
const filteredMunicipios = computed(() => {
  if (!hospitalData.departamentoId) {
    return [];
  }

  const departamentoId =
    typeof hospitalData.departamentoId === "object"
      ? hospitalData.departamentoId.id
      : hospitalData.departamentoId;

  // console.log("Todos los municipioss:", municipios.value); // Verificar aquí

  // Filtrar municipios por departamento y por término de búsqueda
  return municipios.value
    .filter((municipio) => municipio.departamentoId === departamentoId)
    .filter((municipio) =>
      municipio.descripcion
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    );
});

// Filtrado de municipios basado en el departamento seleccionado
// const filteredMunicipios = computed(() => {
//   if (!hospitalData.departamentoId) {
//     return [];
//   }
//   const departamentoId =
//     typeof hospitalData.departamentoId === "object"
//       ? hospitalData.departamentoId.id
//       : hospitalData.departamentoId;

//   console.log("Departamento seleccionado F.Filtrar LN482:", departamentoId);
//   console.log(municipios.value);
//   console.log(
//     "Municipios filtrados F.Filtrar LN483:",
//     municipios.departamentoId
//   );
//   return municipios.value.filter(
//     (municipios) => municipios.departamentoId === departamentoId
//   );
// });
// Watch para limpiar el municipio cuando cambia el departamento
watch(
  () => hospitalData.departamentoId,
  () => {
    hospitalData.municipioId = null;
  }
);

// console.log(municipios.value);
// console.log(departamentos.value);

// Manejo de errores en el formulario de hospitales
const hospitalErrors = reactive({
  nombre: "",
  direccion: "",
  departamentoId: "",
  municipioId: "",
  telefono: "",
  email: "",
  web: "",
});

// Guardar hospital con lógica de extracción de `departamentoId`
const guardarHospital = () => {
  if (!validarFormularioHospital()) {
    return;
  }

  hospitalErrors.departamentoId = "";
  hospitalErrors.departamentoId = "";

  if (!hospitalData.departamentoId) {
    hospitalErrors.departamentoId = "Seleccione un departamento.";
    return;
  }

  const departamentoId =
    typeof hospitalData.departamentoId === "object"
      ? hospitalData.departamentoId.id
      : hospitalData.departamentoId;

  // const municipioId =
  //   typeof hospitalData.municipioId === "object"
  //     ? hospitalData.municipioId.id
  //     : hospitalData.municipioId;

  // const hospitalInfo = {
  //   nombre: hospitalData.nombre,
  //   direccion: hospitalData.direccion,
  //   departamento_id: departamentoId, // Mapeo aquí a `departamento_id` para la base de datos
  //   municipio_id: municipioId, // Mismo ajuste para municipio
  //   telefono: hospitalData.telefono,
  //   email: hospitalData.email,
  //   web: hospitalData.web,
  // };
  console.log(
    "Departamento seleccionado F.Guardar LN581:",
    hospitalData.departamentoId
  );
  console.log(
    "Municipios filtrados F.Guardar LN582:",
    filteredMunicipios.value
  );

  hospitalStore.agregarHospital(hospitalInfo);

  // Limpiar los campos después de guardar
  Object.keys(hospitalData).forEach((key) => {
    hospitalData[key] = "";
  });
};

// Eliminar hospital
const eliminarHospital = (id) => {
  hospitalStore.eliminarHospital(id);
};

// Resto del código (similar al ejemplo anterior)
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
