<template>
  <div class="view-wrapper list-page view-wrapper-paciente-list">
    <!-- Vista de tarjetas para dispositivos móviles -->
    <div v-if="isMobileView" class="card-container">
      <div
        v-for="paciente in formIdentificacion"
        :key="paciente.id"
        class="paciente-card"
        @click="openPanel(paciente)"
      >
        <h5>{{ paciente.nombres }} {{ paciente.apellidos }}</h5>
        <p><strong>Código:</strong> {{ paciente.codigo }}</p>
        <p><strong>Médico:</strong> {{ paciente.medicoNombre }}</p>
        <p><strong>Tipo:</strong> {{ paciente.tipoDescripcion }}</p>
        <p><strong>DNI:</strong> {{ paciente.dni }}</p>
      </div>
    </div>

    <!-- DataGrid para pantallas grandes -->
    <div v-else>
      <DxDataGrid
        ref="dataGrid"
        :data-source="formIdentificacion"
        :allow-column-reordering="true"
        :row-alternation-enabled="true"
        :focused-row-enabled="true"
        :focused-row-key="focusedRowKey"
        :key-expr="'id'"
        :show-borders="true"
        height="100%"
        class="grid theme-dependent"
        @row-click="rowClick"
      >
        <DxEditing
          :allow-updating="true"
          :allow-adding="true"
          :allow-deleting="true"
          mode="popup"
        />
        <DxScrolling mode="virtual" />
        <DxColumnChooser :enabled="true" />
        <DxSorting mode="multiple" />
        <DxHeaderFilter :visible="true" />
        <DxLoadPanel :show-pane="true" />
        <DxSelection
          select-all-mode="allPages"
          show-check-boxes-mode="always"
          mode="multiple"
        />
        <DxSearchPanel
          :width="300"
          :visible="true"
          placeholder="Buscar Paciente"
        />

        <!-- Columnas de la tabla -->
        <DxColumn
          data-field="medicoNombre"
          caption="Médico"
          :min-width="120"
          :width="160"
        />
        <DxColumn
          data-field="codigo"
          caption="Código"
          :allow-editing="false"
          :min-width="100"
          :width="110"
        />
        <DxColumn
          data-field="nombres"
          caption="Nombre"
          sort-order="asc"
          :min-width="120"
          :width="160"
        />
        <DxColumn
          data-field="apellidos"
          caption="Apellidos"
          sort-order="asc"
          :min-width="120"
          :width="160"
        />
        <DxColumn
          data-field="fechaNacimiento"
          caption="F. Nacimiento"
          data-type="date"
          :min-width="115"
          :width="125"
          :visible="false"
        />
        <DxColumn data-field="tipoDescripcion" caption="Tipo" :width="100" />
        <DxColumn data-field="dni" caption="DNI" :width="140" />
        <DxColumn
          data-field="activo"
          caption="Activo"
          data-type="boolean"
          :width="90"
        >
          <template #cell="{ data }">
            <DxCheckBox
              v-model="data.activo"
              :value="data.activo"
              @value-changed="onCheckboxChange(data)"
            />
          </template>
        </DxColumn>
        <DxColumn type="buttons">
          <DxButton name="edit" icon="edit" @click="onEditButtonClick" />
          <DxButton name="delete" icon="trash" @click="onDeleteButtonClick" />
        </DxColumn>
      </DxDataGrid>
    </div>

    <!-- Panel de Paciente al lado derecho -->
    <transition name="slide-fade">
      <div v-if="isPanelOpened" class="paciente-info-panel">
        <button class="close-button" @click="onClose">&times;</button>
        <PacientePanel :paciente="panelData" @close="onClose" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxColumnChooser,
  DxSorting,
  DxHeaderFilter,
  DxLoadPanel,
  DxSelection,
  DxSearchPanel,
  DxEditing,
  DxButton,
} from "devextreme-vue/data-grid";
import DxCheckBox from "devextreme-vue/check-box";
import { useFichaIdentificacionStore } from "../stores/fichaIdentificacionStores";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import PacientePanel from "./PacientePanel.vue";
import { Notify } from "quasar";
const emit = defineEmits(["cambiar-tab"]);

const fichaIdentificacionStore = useFichaIdentificacionStore();
const { formIdentificacion } = storeToRefs(fichaIdentificacionStore);

const responsiveWidth = ref(window.innerWidth < 600 ? "100%" : "auto");
const isMobileView = computed(() => window.innerWidth < 600);

const updateWidth = () =>
  (responsiveWidth.value = window.innerWidth < 600 ? "100%" : "auto");

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const focusedRowKey = ref(null);
const isPanelOpened = ref(false);
const panelData = ref(null);

const openPanel = (paciente) => {
  panelData.value = paciente;
  isPanelOpened.value = true;
};

// Método para manejar el clic en el botón de editar
const onEditButtonClick = (e) => {
  // Emitimos el evento con la pestaña a cambiar y los datos del paciente seleccionado
  emit("cambiar-tab", { tab: "FichaIdentificacion", paciente: e.row.data });
};

const onCheckboxChange = (data) => {
  fichaIdentificacionStore.updateActivo(data.id, data.activo);
};

const onDeleteButtonClick = (e) => {
  fichaIdentificacionStore
    .eliminarPaciente(e.row.data.id)
    .then(() => {
      Notify.create({
        message: "Paciente eliminado exitosamente",
        color: "positive",
        position: "top-right",
      });
    })
    .catch((error) => {
      console.error("Error al eliminar el paciente:", error);
      Notify.create({
        message: "Error al eliminar el paciente",
        color: "negative",
        position: "top-right",
      });
    });
};

const rowClick = (e) => {
  focusedRowKey.value = e.key;
  panelData.value = e.data;
  isPanelOpened.value = true;
};

const onClose = () => {
  isPanelOpened.value = false;
};
</script>

<style scoped>
.view-wrapper-paciente-list {
  /* Estilos personalizados */
}

.paciente-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
  cursor: pointer;
}

.card-container {
  padding: 16px;
}

.paciente-info-panel {
  position: fixed;
  top: 5px;
  right: 0;
  width: 320px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
