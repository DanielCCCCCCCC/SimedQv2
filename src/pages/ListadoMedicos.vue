<template>
  <div class="row justify-center q-py-md">
    <h4 class="header-title">Médicos Existentes</h4>
  </div>

  <!-- Vista de tarjetas para dispositivos móviles -->
  <div v-if="isMobileView" class="card-container">
    <div v-for="medico in medicos" :key="medico.id" class="medico-card">
      <h5>{{ medico.nombre }}</h5>
      <p><strong>Especialidad:</strong> {{ medico.especialidadDescripcion }}</p>
      <p><strong>Celular:</strong> {{ medico.telefonoCasa }}</p>
      <p><strong>Email:</strong> {{ medico.email }}</p>
      <div class="card-actions">
        <q-btn
          icon="edit"
          label="Editar"
          color="primary"
          @click="onEditButtonClick(medico)"
        />
        <q-btn
          icon="delete"
          label="Eliminar"
          color="negative"
          @click="onDeleteButtonClick(medico.id)"
        />
      </div>
    </div>
  </div>

  <!-- DataGrid para pantallas grandes -->
  <div v-else id="app-container" class="q-mb-xl q-px-md q-pa-xs q-py-md">
    <DxDataGrid
      :data-source="medicos"
      :allow-column-reordering="true"
      :row-alternation-enabled="true"
      :show-borders="true"
      key-expr="id"
      :column-auto-width="false"
      :column-min-width="50"
      :width="responsiveWidth"
    >
      <DxColumn
        data-field="nombre"
        caption="Nombre Completo"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="direccion"
        caption="Dirección"
        :allow-sorting="true"
        :visible="false"
      ></DxColumn>
      <DxColumn
        data-field="especialidadDescripcion"
        caption="Especialidad"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="telefonoPersonal"
        caption="Teléfono"
        :allow-sorting="true"
        :visible="false"
      ></DxColumn>
      <DxColumn
        data-field="telefonoCasa"
        caption="Celular"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="email"
        caption="Correo Electrónico"
        :allow-sorting="true"
      ></DxColumn>

      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :popup="{
          title: 'Editar Información del Médico',
          showTitle: true,
          width: 700,
          height: 400,
        }"
      />

      <DxPaging :enabled="true" :page-size="10" />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />

      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" @click="onEditButtonClick" />
        <DxButton name="delete" icon="trash" @click="onDeleteButtonClick" />
      </DxColumn>
    </DxDataGrid>
  </div>
</template>

<script setup>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxFilterRow,
  DxHeaderFilter,
  DxButton,
  DxEditing,
} from "devextreme-vue/data-grid";
import { Notify } from "quasar";
import { useMedicoStore } from "../stores/MedicoStores";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

// Inicializamos la tienda
const medicoStore = useMedicoStore();
const { medicos } = storeToRefs(medicoStore);

// Detectar vista móvil
const isMobileView = computed(() => window.innerWidth < 600);

// Cargamos los médicos al montar el componente
onMounted(async () => {
  await medicoStore.cargarMedicos();
});

// Ancho responsivo para el DataGrid
const responsiveWidth = ref(window.innerWidth < 600 ? "100%" : "auto");
const updateWidth = () =>
  (responsiveWidth.value = window.innerWidth < 600 ? "100%" : "auto");

window.addEventListener("resize", updateWidth);
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

// Funciones para editar y eliminar un médico
const onEditButtonClick = async (medico) => {
  try {
    await medicoStore.actualizarMedico(medico);
    Notify.create({
      message: "Médico actualizado exitosamente",
      color: "positive",
      position: "top-right",
    });
  } catch (error) {
    console.error("Error al actualizar médico:", error);
    Notify.create({
      message: "Error al actualizar médico",
      color: "negative",
      position: "top-right",
    });
  }
};

const onDeleteButtonClick = async (id) => {
  try {
    await medicoStore.eliminarMedico(id);
    Notify.create({
      message: "Médico eliminado exitosamente",
      color: "positive",
      position: "top-right",
    });
  } catch (error) {
    console.error("Error al eliminar médico:", error);
    Notify.create({
      message: "Error al eliminar médico",
      color: "negative",
      position: "top-right",
    });
  }
};
</script>

<style scoped>
#app-container {
  padding: 0 4px;
  background-color: #ffffff;
  width: 100%;
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: -10px;
}

/* Estilos para la vista de tarjetas en móvil */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.medico-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.medico-card h5 {
  margin: 0 0 8px;
  font-size: 1.2em;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
</style>
