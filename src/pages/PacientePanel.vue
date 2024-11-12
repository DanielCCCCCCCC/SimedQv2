<template>
  <div class="paciente-details-card">
    <button class="close-button" @click="$emit('close')">&times;</button>

    <div class="header">
      <img
        :src="form.photo || 'https://via.placeholder.com/100'"
        alt="Foto del paciente"
        class="patient-photo"
      />
      <div class="header-info">
        <div class="name-container">
          <p id="titulo" v-if="!isEditable">
            {{ form.nombres }} {{ form.apellidos }}
          </p>
          <div v-else>
            <q-input v-model="form.nombres" label="Nombre" outlined dense />
            <q-input v-model="form.apellidos" label="Apellido" outlined dense />
          </div>
        </div>
        <!-- Checkbox para el estado Activo/Inactivo en modo edición -->
        <span
          class="status"
          :class="{
            'active-status': form.activo,
            'inactive-status': !form.activo,
          }"
        >
          {{ form.activo ? "Activo" : "Inactivo" }}
        </span>
        <q-checkbox
          v-if="isEditable"
          v-model="form.activo"
          label="Estado Activo"
          color="primary"
          dense
        />
      </div>
    </div>
    <div class="details">
      <!-- Información Personal -->
      <div class="detail-item">
        <h3 class="section-title">Información Personal</h3>
        <q-input
          v-model="form.nombres"
          label="Nombre"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.nombres }}</div>

        <q-input
          v-model="form.apellidos"
          label="Apellido"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.apellidos }}</div>

        <q-input
          v-model="form.dni"
          label="DNI"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.dni }}</div>

        <q-input
          v-if="isEditable"
          v-model="form.fechaNacimiento"
          label="Fecha de Nacimiento"
          outlined
          dense
          type="date"
        />
        <q-input
          v-if="isEditable"
          v-model="form.sexo"
          label="Sexo"
          outlined
          dense
        />

        <!-- Estado Civil -->
        <q-select
          v-if="isEditable"
          v-model="form.estadoCivil"
          :options="estadosCiviles"
          label="Estado Civil"
          option-value="id"
          option-label="descripcion"
          outlined
          dense
        />
      </div>

      <!-- Datos de Contacto -->
      <div class="detail-item">
        <h3 class="section-title">Datos de Contacto</h3>
        <q-input
          v-model="form.telPersonal"
          label="Teléfono"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.telPersonal }}</div>

        <q-input
          v-if="isEditable"
          v-model="form.telCasa"
          label="Teléfono Casa"
          outlined
          dense
        />
        <q-input
          v-model="form.correo"
          label="Correo"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.email }}</div>

        <q-input
          v-model="form.direccion"
          label="Dirección"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.direccion }}</div>

        <!-- Departamento y Municipio -->
        <q-select
          v-if="isEditable"
          v-model="form.departamento"
          :options="departamentos"
          option-value="id"
          option-label="descripcion"
          label="Departamento"
          outlined
          dense
        />

        <q-select
          v-if="isEditable"
          v-model="form.municipio"
          :options="filteredMunicipios"
          option-value="id"
          option-label="descripcion"
          label="Municipio"
          outlined
          dense
        />

        <q-input
          v-model="form.organizacion"
          label="Organización"
          outlined
          dense
          v-if="isEditable"
        />
      </div>

      <!-- Información Médica -->
      <div class="detail-item">
        <h3 class="section-title">Información Médica</h3>
        <q-input
          v-if="isEditable"
          v-model="form.medico"
          label="Médico"
          outlined
          dense
        />
        <q-input
          v-if="isEditable"
          v-model="form.medicoCabecera"
          label="Médico Cabecera"
          outlined
          dense
        />

        <!-- Tipo de Paciente y Grupo Sanguíneo -->
        <q-select
          v-if="isEditable"
          v-model="form.tipo"
          :options="tpacientes"
          option-value="id"
          option-label="descripcion"
          label="Tipo de Paciente"
          outlined
          dense
        />

        <q-select
          v-if="isEditable"
          v-model="form.grupoSanguineo"
          :options="gruposSanguineos"
          option-value="id"
          option-label="descripcion"
          label="Grupo Sanguíneo"
          outlined
          dense
        />

        <q-input
          v-if="isEditable"
          v-model="form.alergia"
          label="Alergias"
          outlined
          dense
        />
      </div>

      <!-- Información Familiar -->
      <div class="detail-item">
        <h3 class="section-title">Información Familiar</h3>
        <q-input
          v-if="isEditable"
          v-model="form.conyugue"
          label="Conyugue"
          outlined
          dense
        />
        <q-input
          v-if="isEditable"
          v-model="form.madre"
          label="Madre"
          outlined
          dense
        />
        <q-input
          v-if="isEditable"
          v-model="form.padre"
          label="Padre"
          outlined
          dense
        />
      </div>

      <!-- Otros -->
      <div class="detail-item">
        <h3 class="section-title">Otros</h3>
        <q-input
          v-if="isEditable"
          v-model="form.organizacion"
          label="Organización"
          outlined
          dense
        />
        <q-input
          v-if="isEditable"
          v-model="form.ocupacion"
          label="Ocupación"
          outlined
          dense
        />

        <!-- Escolaridad -->
        <q-select
          v-if="isEditable"
          v-model="form.escolaridad"
          :options="escolaridades"
          option-value="id"
          option-label="descripcion"
          label="Escolaridad"
          outlined
          dense
        />

        <q-input
          v-if="isEditable"
          v-model="form.observaciones"
          label="Observaciones"
          outlined
          dense
        />
      </div>
    </div>

    <div class="actions">
      <q-btn
        label="Editar"
        color="primary"
        @click="toggleEdit"
        v-if="!isEditable"
      />
      <q-btn
        label="Guardar"
        color="positive"
        @click="guardarDatosFormulario"
        v-if="isEditable"
      />
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
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

export default {
  name: "PacientePanel",
  props: {
    paciente: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const fichaIdentificacionStore = useFichaIdentificacionStore();
    const { actualizarPaciente } = fichaIdentificacionStore;
    const form = reactive({ ...props.paciente });
    const isEditable = ref(false);

    const {
      tpacientes,
      estadosCiviles,
      departamentos,
      municipios,
      gruposSanguineos,
      escolaridades,
    } = storeToRefs({
      tpacientes: useTiposPacientesStore().tpacientes,
      estadosCiviles: useEstadoCivilStore().estadosCiviles,
      departamentos: useDepartamentoStore().departamentos,
      municipios: useMunicipioStore().municipios,
      gruposSanguineos: useGrupoSanguineoStore().gruposSanguineos,
      escolaridades: useEscolaridadStore().escolaridades,
    });

    const filteredMunicipios = computed(() => {
      if (!form.departamento) return [];
      return municipios.value.filter(
        (municipio) => municipio.departamentoId === form.departamento.id
      );
    });

    // Función para asignar los valores seleccionados en los select
    const setSelectedValues = () => {
      form.tipo =
        tpacientes.value.find((tipo) => tipo.id === props.paciente.tipoId) ||
        null;

      form.estadoCivil =
        estadosCiviles.value.find(
          (estado) => estado.id === props.paciente.estadoCivilId
        ) || null;

      form.departamento =
        departamentos.value.find(
          (depto) => depto.id === props.paciente.departamentoId
        ) || null;

      form.municipio =
        municipios.value.find(
          (muni) => muni.id === props.paciente.municipioId
        ) || null;

      form.escolaridad =
        escolaridades.value.find(
          (esc) => esc.id === props.paciente.escolaridadId
        ) || null;

      form.grupoSanguineo =
        gruposSanguineos.value.find(
          (grupo) => grupo.id === props.paciente.grupoSanguineoId
        ) || null;
    };

    // Watch para detectar cambios en el paciente seleccionado y actualizar el formulario
    watch(
      () => props.paciente,
      (newPaciente) => {
        Object.assign(form, newPaciente);
        setSelectedValues();
      },
      { immediate: true, deep: true }
    );

    // Llamar a setSelectedValues al montar el componente
    onMounted(setSelectedValues);

    const toggleEdit = () => {
      isEditable.value = !isEditable.value;
    };

    const guardarDatosFormulario = () => {
      const pacienteActualizado = {
        id: form.id,
        fechaRegistro: form.fechaRegistro,
        codigo: form.codigo,
        activo: form.activo,
        tipoId: form.tipo?.id || null,
        tipoDescripcion: form.tipo?.descripcion || "",
        medico: form.medico || "",
        dni: form.dni || "",
        nombres: form.nombres || "",
        apellidos: form.apellidos || "",
        fechaNacimiento: form.fechaNacimiento || "",
        sexo: form.sexo || "",
        estadoCivilId: form.estadoCivil?.id || null,
        estadoCivilDescripcion: form.estadoCivil?.descripcion || "",
        observaciones: form.observaciones || "",
        direccion: form.direccion || "",
        telCasa: form.telCasa || "",
        telPersonal: form.telPersonal || "",
        email: form.email || "",
        departamentoId: form.departamento?.id || null,
        departamentoDescripcion: form.departamento?.descripcion || "",
        municipioId: form.municipio?.id || null,
        municipioDescripcion: form.municipio?.descripcion || "",
        organizacion: form.organizacion || "",
        conyugue: form.conyugue || "",
        madre: form.madre || "",
        padre: form.padre || "",
        escolaridadId: form.escolaridad?.id || null,
        escolaridadDescripcion: form.escolaridad?.descripcion || "",
        ocupacion: form.ocupacion || "",
        grupoSanguineoId: form.grupoSanguineo?.id || null,
        grupoSanguineoDescripcion: form.grupoSanguineo?.descripcion || "",
        alergias: form.alergias || "",
        vih: form.vih ?? false,
        tenant_id: form.tenant_id || null,
      };

      console.log("Datos para actualizar:", pacienteActualizado);

      if (!pacienteActualizado.id) {
        console.error(
          "El ID del paciente es indefinido. No se puede actualizar."
        );
        return;
      }

      actualizarPaciente(pacienteActualizado)
        .then(() => {
          isEditable.value = false;
          alert("Datos actualizados correctamente");
        })
        .catch((error) => {
          console.error("Error al actualizar los datos del paciente:", error);
        });
    };

    return {
      form,
      isEditable,
      toggleEdit,
      guardarDatosFormulario,
      tpacientes,
      estadosCiviles,
      departamentos,
      municipios,
      gruposSanguineos,
      escolaridades,
      filteredMunicipios,
    };
  },
};
</script>

<style scoped>
.paciente-details-card {
  padding-top: 35px;
  padding-left: 14px;
  background-color: #ffffff;
  border-radius: 8px;
  max-width: 400px;
  width: 285px;
  margin: auto;
  margin-top: 40px;
  position: relative;
}

#titulo {
  font-size: 20px;
  margin: 0;
}

.name-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #333;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 5px;
}

.patient-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
}

.header-info {
  flex: 1;
}

.status {
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
}

.active-status {
  color: #28a745;
  background-color: #e6f4ea;
}

.inactive-status {
  color: #dc3545;
  background-color: #f8d7da;
}

.details {
  margin-bottom: 20px;
}

.detail-item {
  margin-bottom: 15px;
}

.label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

.detail-text {
  font-size: 14px;
  padding: 4px 0;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
