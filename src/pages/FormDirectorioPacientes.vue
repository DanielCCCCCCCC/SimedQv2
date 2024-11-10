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
                      :options="tpacientes"
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
                      outlined
                      dense
                    />
                    <!-- <q-select
                      v-model="pacienteSeleccionado.medicoCabecera"
                      label="Medico Cabecera"
                      :options="medicoCabeceraOptions"
                      outlined
                      dense
                    /> -->
                    <!-- <q-select
                      v-model="pacienteSeleccionado.referidoPor"
                      label="Referido por"
                      :options="referidoPorOptions"
                      outlined
                      dense
                    /> -->
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
                    <q-input
                      v-model="pacienteSeleccionado.sexo"
                      label="Sexo"
                      outlined
                      dense
                    />

                    <!--  -->
                    <!--  -->
                    <!--  -->
                    <!--  -->
                    <!--  -->
                    <!--  -->
                    <!--  -->
                    <q-select
                      v-model="pacienteSeleccionado.estadoCivil"
                      :options="estadosCiviles"
                      option-value="id"
                      option-label="descripcion"
                      label="Estado Civil"
                      outlined
                      dense
                    />
                    <!--  -->
                    <!--  -->
                    <!--  -->
                    <!--  -->
                    <!--  -->
                    <!--  -->
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
                      :options="departamentos"
                      option-value="id"
                      option-label="descripcion"
                      outlined
                      dense
                    />
                    <q-select
                      v-model="pacienteSeleccionado.municipio"
                      label="Municipio"
                      :options="municipios"
                      option-value="id"
                      option-label="descripcion"
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
                    <q-select
                      v-model="pacienteSeleccionado.escolaridad"
                      :options="escolaridades"
                      option-value="id"
                      option-label="descripcion"
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
                      :options="gruposSanguineos"
                      option-value="id"
                      option-label="descripcion"
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
    <!-- <p>Total de pacientes activos: {{ totalActivos }}</p>
    <p>Total de pacientes inactivos: {{ totalInactivos }}</p> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useFichaIdentificacionStore } from "../stores/fichaIdentificacionStores";
import { useTiposPacientesStore } from "../stores/ConfiMedicasStores";
import {
  useEstadoCivilStore,
  useDepartamentoStore,
  useMunicipioStore,
  useGrupoSanguineoStore,
  useEscolaridadStore,
} from "../stores/DatosGeneralesStores";
import { storeToRefs } from "pinia";
import ListadoPacientes from "./ListadoPacientes.vue";
import PacienteActivoGraph from "src/components/PacienteActivoGraph.vue";
import PacientesAggMensualmente from "src/components/PacientesAggMensualmente.vue";

// Inicializo las tiendas
const TiposPacientesStore = useTiposPacientesStore();
const fichaIdentificacionStore = useFichaIdentificacionStore();
const EstadoCivilStore = useEstadoCivilStore();
const DepartamentoStore = useDepartamentoStore();
const MunicipioStore = useMunicipioStore();
const GrupoSanguineoStore = useGrupoSanguineoStore();
const EscolaridadStore = useEscolaridadStore();

// Acceso a las propiedades de la tienda
const { tpacientes } = storeToRefs(TiposPacientesStore);
const { estadosCiviles } = storeToRefs(EstadoCivilStore);
const { departamentos } = storeToRefs(DepartamentoStore);
const { municipios } = storeToRefs(MunicipioStore);
const { gruposSanguineos } = storeToRefs(GrupoSanguineoStore);
const { escolaridades } = storeToRefs(EscolaridadStore);

// Objeto reactivo para almacenar los datos del paciente
const pacienteSeleccionado = reactive({
  fechaRegistro: "", // Inicializa vacío para que se seleccione manualmente
  codigo: "",
  activo: false,
  tipo: null,
  medico: "",
  // medicoCabecera: null,
  // referidoPor: "",
  dni: "",
  nombres: "",
  apellidos: "",
  fechaNacimiento: "",
  sexo: "",
  estadoCivil: null,
  observaciones: "",
  direccion: "",
  telCasa: "",
  telPersonal: "",
  email: "",
  departamento: null,
  municipio: null,
  organizacion: "",
  conyugue: "",
  madre: "",
  padre: "",
  escolaridad: "",
  ocupacion: "",
  grupoSanguineo: "",
  alergias: "",
});

const tab = ref("Pacientes");
const subTabFichaIdentificacion = ref("infoTecnica");
const cambiarTab = ({ tab: nuevaTab, paciente }) => {
  tab.value = nuevaTab;
  pacienteSeleccionado.value = paciente ? { ...paciente } : {}; // Si no hay paciente, inicializa un objeto vacío
};

// Cargar datos al montar el componente
onMounted(async () => {
  await EstadoCivilStore.cargarEstadosCiviles();
  await TiposPacientesStore.cargarPacientes();
  await DepartamentoStore.cargarDepartamentos();
  await MunicipioStore.cargarMunicipios();
  await GrupoSanguineoStore.cargarGruposSanguineos();
  await EscolaridadStore.cargarEscolaridades();
});

// Función para guardar el formulario en la tienda
const guardarDatosFormulario = () => {
  // Convierte `fechaRegistro` a Date si no está vacío
  if (pacienteSeleccionado.fechaRegistro) {
    pacienteSeleccionado.fechaRegistro = new Date(
      pacienteSeleccionado.fechaRegistro
    );
  }

  // Extraer `id` y `descripcion` del tipo de paciente seleccionado
  const tipoPacienteSeleccionado = tpacientes.value.find(
    (d) =>
      d.id ===
      (typeof pacienteSeleccionado.tipo === "object"
        ? pacienteSeleccionado.tipo.id
        : pacienteSeleccionado.tipo)
  );
  const tipoId = tipoPacienteSeleccionado?.id || null;
  const tipoDescripcion = tipoPacienteSeleccionado?.descripcion || "";

  // Extraer `id` y `descripcion` del estado civil seleccionado
  const estadoCivilSeleccionado = estadosCiviles.value.find(
    (e) =>
      e.id ===
      (typeof pacienteSeleccionado.estadoCivil === "object"
        ? pacienteSeleccionado.estadoCivil.id
        : pacienteSeleccionado.estadoCivil)
  );
  const estadoCivilId = estadoCivilSeleccionado?.id || null;
  const estadoCivilDescripcion = estadoCivilSeleccionado?.descripcion || "";

  // Extraer `id` y `descripcion` del departamento seleccionado
  const departamentoSeleccionado = departamentos.value.find(
    (d) =>
      d.id ===
      (typeof pacienteSeleccionado.departamento === "object"
        ? pacienteSeleccionado.departamento.id
        : pacienteSeleccionado.departamento)
  );
  const departamentoId = departamentoSeleccionado?.id || null;
  const departamentoDescripcion = departamentoSeleccionado?.descripcion || "";

  // Extraer `id` y `descripcion` del municipio seleccionado
  const municipioSeleccionado = municipios.value.find(
    (m) =>
      m.id ===
      (typeof pacienteSeleccionado.municipio === "object"
        ? pacienteSeleccionado.municipio.id
        : pacienteSeleccionado.municipio)
  );
  const municipioId = municipioSeleccionado?.id || null;
  const municipioDescripcion = municipioSeleccionado?.descripcion || "";

  // Extraer `id` y `descripcion` de la escolaridad seleccionada
  const escolaridadSeleccionada = escolaridades.value.find(
    (s) =>
      s.id ===
      (typeof pacienteSeleccionado.escolaridad === "object"
        ? pacienteSeleccionado.escolaridad.id
        : pacienteSeleccionado.escolaridad)
  );
  const escolaridadId = escolaridadSeleccionada?.id || null;
  const escolaridadDescripcion = escolaridadSeleccionada?.descripcion || "";

  // Extraer `id` y `descripcion` del grupo sanguíneo seleccionado
  const grupoSanguineoSeleccionado = gruposSanguineos.value.find(
    (g) =>
      g.id ===
      (typeof pacienteSeleccionado.grupoSanguineo === "object"
        ? pacienteSeleccionado.grupoSanguineo.id
        : pacienteSeleccionado.grupoSanguineo)
  );
  const grupoSanguineoId = grupoSanguineoSeleccionado?.id || null;
  const grupoSanguineoDescripcion =
    grupoSanguineoSeleccionado?.descripcion || "";

  // Guarda los datos en la tienda usando fichaIdentificacionStore
  fichaIdentificacionStore.guardarDatos({
    fechaRegistro: pacienteSeleccionado.fechaRegistro,
    codigo: pacienteSeleccionado.codigo,
    activo: pacienteSeleccionado.activo,
    tipoId,
    tipoDescripcion,
    medico: pacienteSeleccionado.medico,
    dni: pacienteSeleccionado.dni,
    nombres: pacienteSeleccionado.nombres,
    apellidos: pacienteSeleccionado.apellidos,
    fechaNacimiento: pacienteSeleccionado.fechaNacimiento,
    sexo: pacienteSeleccionado.sexo,
    estadoCivilId,
    estadoCivilDescripcion,
    observaciones: pacienteSeleccionado.observaciones,
    direccion: pacienteSeleccionado.direccion,
    telCasa: pacienteSeleccionado.telCasa,
    telPersonal: pacienteSeleccionado.telPersonal,
    email: pacienteSeleccionado.email,
    departamentoId,
    departamentoDescripcion,
    municipioId,
    municipioDescripcion,
    organizacion: pacienteSeleccionado.organizacion,
    conyugue: pacienteSeleccionado.conyugue,
    madre: pacienteSeleccionado.madre,
    padre: pacienteSeleccionado.padre,
    escolaridadId,
    escolaridadDescripcion,
    ocupacion: pacienteSeleccionado.ocupacion,
    grupoSanguineoId,
    grupoSanguineoDescripcion,
    alergias: pacienteSeleccionado.alergias,
    vih: pacienteSeleccionado.vih ?? false, // Asegura que `vih` tenga un valor predeterminado de `false` si está vacío
  });

  // Limpiar el formulario después de guardar
  Object.keys(pacienteSeleccionado).forEach(
    (key) => (pacienteSeleccionado[key] = "")
  );
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
