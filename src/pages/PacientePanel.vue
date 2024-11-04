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
            {{ form.nombres }}
            {{ form.apellidos }}
          </p>
          <div v-else>
            <q-input v-model="form.nombres" label="Nombre" outlined dense />
            <q-input v-model="form.apellidos" label="Apellido" outlined dense />
          </div>
        </div>
        <span
          class="status"
          :class="{
            'active-status': form.activo,
            'inactive-status': !form.activo,
          }"
        >
          {{ form.activo ? "Activo" : "Inactivo" }}
        </span>
      </div>
    </div>
    <div class="details">
      <!-- Información Personal -->

      <div class="detail-item">
        <h3 class="section-title">Información Personal</h3>
        <span class="label">Nombres</span>
        <q-input
          v-model="form.nombres"
          label="Nombre"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.nombres }}</div>
      </div>
      <div class="detail-item">
        <span class="label">Apellidos</span>
        <q-input
          v-model="form.apellidos"
          label="Apellido"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.apellidos }}</div>
      </div>
      <div class="detail-item">
        <span class="label">DNI</span>
        <q-input
          v-model="form.dni"
          label="DNI"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.dni }}</div>
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Fecha de Nacimiento</span>
        <q-input
          v-model="form.fechaNacimiento"
          label="Fecha de Nacimiento"
          outlined
          dense
        />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Sexo</span>
        <q-input v-model="form.sexo" label="Sexo" outlined dense />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Estado Civil</span>
        <q-input
          v-model="form.estadoCivil"
          label="Estado Civil"
          outlined
          dense
        />
      </div>

      <!-- Datos de Contacto -->
      <div class="detail-item">
        <h3 class="section-title">Datos de Contacto</h3>
        <span class="label">Teléfono</span>
        <q-input
          v-model="form.telPersonal"
          label="Teléfono"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.telPersonal }}</div>
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Teléfono Casa</span>
        <q-input v-model="form.telCasa" label="Teléfono Casa" outlined dense />
      </div>
      <div class="detail-item">
        <span class="label">Correo</span>
        <q-input
          v-model="form.correo"
          label="Correo"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.email }}</div>
      </div>
      <div class="detail-item">
        <span class="label">Dirección</span>
        <q-input
          v-model="form.direccion"
          label="Dirección"
          outlined
          dense
          v-if="isEditable"
        />
        <div v-else class="detail-text">{{ form.direccion }}</div>
      </div>

      <!-- Información Médica -->

      <div v-if="isEditable" class="detail-item">
        <h3 class="section-title">Información Médica</h3>
        <span class="label">Médico</span>
        <q-input v-model="form.medico" label="Médico" outlined dense />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Médico Cabecera</span>
        <q-input
          v-model="form.medicoCabecera"
          label="Médico Cabecera"
          outlined
          dense
        />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Tipo de Paciente</span>
        <q-input v-model="form.tipo" label="Tipo de Paciente" outlined dense />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Grupo Sanguíneo</span>
        <q-input
          v-model="form.grupoSanguineo"
          label="Grupo Sanguíneo"
          outlined
          dense
        />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Alergias</span>
        <q-input v-model="form.alergia" label="Alergias" outlined dense />
      </div>

      <!-- Información Familiar -->

      <div v-if="isEditable" class="detail-item">
        <h3 class="section-title">Información Familiar</h3>
        <span class="label">Conyugue</span>
        <q-input v-model="form.conyugue" label="Conyugue" outlined dense />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Madre</span>
        <q-input v-model="form.madre" label="Madre" outlined dense />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Padre</span>
        <q-input v-model="form.padre" label="Padre" outlined dense />
      </div>

      <!-- Otros -->

      <div v-if="isEditable" class="detail-item">
        <h3 class="section-title">Otros</h3>
        <span class="label">Organización</span>
        <q-input
          v-model="form.organizacion"
          label="Organización"
          outlined
          dense
        />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Ocupación</span>
        <q-input v-model="form.ocupacion" label="Ocupación" outlined dense />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Escolaridad</span>
        <q-input
          v-model="form.escolaridad"
          label="Escolaridad"
          outlined
          dense
        />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Observaciones</span>
        <q-input
          v-model="form.observaciones"
          label="Observaciones"
          outlined
          dense
        />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Departamento</span>
        <q-input
          v-model="form.departamento"
          label="Departamento"
          outlined
          dense
        />
      </div>
      <div v-if="isEditable" class="detail-item">
        <span class="label">Municipio</span>
        <q-input v-model="form.municipio" label="Municipio" outlined dense />
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
        @click="guardarEdicion"
        v-if="isEditable"
      />
      <DxButton name="edit" icon="edit" />
      <DxButton name="delete" icon="trash" />
      <!-- <q-btn label="Cerrar" color="secondary" @click="$emit('close')" /> -->
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useFichaIdentificacionStore } from "../stores/fichaIdentificacionStores";
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
    const form = ref({});
    const isEditable = ref(false);

    // Initialize form with prop data and watch for changes
    watch(
      () => props.paciente,
      (newPaciente) => {
        form.value = { ...newPaciente };
      },
      { immediate: true, deep: true }
    );

    const toggleEdit = () => {
      isEditable.value = !isEditable.value;
    };

    const guardarEdicion = () => {
      actualizarPaciente(form.value);
      isEditable.value = false;
      alert("Datos actualizados correctamente");
    };

    const visibleFields = {
      DNI: form.value.dni,
      Código: form.value.codigo,
      "Tipo de Paciente": form.value.tipo,
      "Médico Cabecera": form.value.medicoCabecera,
      Teléfono: form.value.telefono,
      Correo: form.value.correo,
      Dirección: form.value.direccion,
    };

    return {
      form,
      isEditable,
      toggleEdit,
      guardarEdicion,
      visibleFields,
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
