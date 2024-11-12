<template>
  <div class="view-wrapper list-page view-wrapper-paciente-list">
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

      <!-- Opciones -->
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

      <!-- Columnas -->
      <DxColumn
        data-field="medico"
        caption="Médico"
        :min-width="120"
        :width="160"
        :visible="true"
      />
      <DxColumn
        data-field="codigo"
        caption="Código"
        :allow-editing="false"
        :min-width="100"
        :width="110"
        :visible="true"
      />
      <DxColumn
        data-field="nombres"
        caption="Nombre"
        sort-order="asc"
        :min-width="120"
        :width="160"
        :visible="true"
      />
      <DxColumn
        data-field="apellidos"
        caption="Apellidos"
        sort-order="asc"
        :min-width="120"
        :width="160"
        :visible="true"
      />
      <DxColumn
        data-field="fechaNacimiento"
        caption="F. Nacimiento"
        data-type="date"
        :min-width="115"
        :width="125"
        :visible="false"
      />
      <DxColumn
        data-field="municipioDescripcion"
        caption="Municipio"
        :width="120"
        :visible="false"
      />
      <DxColumn
        data-field="tipoDescripcion"
        caption="Tipo"
        :width="100"
        :visible="true"
      />
      <DxColumn data-field="dni" caption="DNI" :width="140" :visible="true" />
      <DxColumn
        data-field="email"
        caption="E-mail"
        :width="150"
        :visible="false"
      />
      <!-- <DxCheckBox v-model="checked" text="Active" /> -->

      <DxColumn
        data-field="activo"
        caption="Activo"
        data-type="boolean"
        :width="90"
        :visible="true"
      >
        <template #cell="{ data }">
          <DxCheckBox
            v-model="data.activo"
            :value="data.activo"
            @value-changed="onCheckboxChange(data)"
          />
        </template>
      </DxColumn>

      <DxColumn
        data-field="medicoCabecera"
        caption="Médico Cabecera"
        :width="150"
        :visible="false"
      />
      <DxColumn
        data-field="referidoPor"
        caption="Referido por"
        :width="130"
        :visible="false"
      />

      <DxColumn data-field="sexo" caption="Sexo" :width="80" :visible="false" />
      <DxColumn
        data-field="estadoCivilDescripcion"
        caption="Estado Civil"
        :width="100"
        :visible="false"
      />
      <DxColumn
        data-field="observaciones"
        caption="Observaciones"
        :width="150"
        :visible="false"
      />
      <DxColumn
        data-field="direccion"
        caption="Dirección"
        :width="150"
        :visible="false"
      />

      <DxColumn
        data-field="telCasa"
        caption="Teléfono Casa"
        :width="100"
        :visible="false"
      />
      <DxColumn
        data-field="telPersonal"
        caption="Teléfono Personal"
        :width="120"
        :visible="false"
      />

      <DxColumn
        data-field="departamentoDescripcion"
        caption="Departamento"
        :width="120"
        :visible="false"
      />
      <DxColumn
        data-field="organizacion"
        caption="Organización"
        :width="120"
        :visible="false"
      />
      <DxColumn
        data-field="conyugue"
        caption="Cónyugue"
        :width="120"
        :visible="false"
      />
      <DxColumn
        data-field="madre"
        caption="Madre"
        :width="120"
        :visible="false"
      />
      <DxColumn
        data-field="padre"
        caption="Padre"
        :width="120"
        :visible="false"
      />
      <DxColumn
        data-field="escolaridad"
        caption="Escolaridad"
        :width="120"
        :visible="false"
      />
      <DxColumn
        data-field="ocupacion"
        caption="Ocupación"
        :width="120"
        :visible="false"
      />
      <DxColumn
        data-field="grupoSanguineoDescripcion"
        caption="Grupo Sanguíneo"
        :width="100"
        :visible="false"
      />
      <DxColumn
        data-field="alergias"
        caption="Alergias"
        :width="150"
        :visible="false"
      />
      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" @click="onEditButtonClick" />
        <DxButton name="delete" icon="trash" @click="onDeleteButtonClick" />
      </DxColumn>
    </DxDataGrid>

    <!-- Panel de Paciente al lado derecho -->
    <transition name="slide-fade">
      <div v-if="isPanelOpened" class="paciente-info-panel">
        <button class="close-button" @click="onClose">&times;</button>
        <PacientePanel :paciente="panelData" @close="onClose" />
      </div>
    </transition>
  </div>
</template>

<script>
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
import DxCheckBox from "devextreme-vue/check-box"; // Importa DxCheckBox desde el módulo correcto
import { useFichaIdentificacionStore } from "../stores/fichaIdentificacionStores";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import PacientePanel from "./PacientePanel.vue";

export default {
  name: "ListadoPacientes",
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxColumnChooser,
    DxSorting,
    DxHeaderFilter,
    DxLoadPanel,
    DxSelection,
    DxSearchPanel,
    PacientePanel,
    DxEditing,
    DxButton,
  },
  props: {
    activeTab: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const fichaIdentificacionStore = useFichaIdentificacionStore();
    const { formIdentificacion } = storeToRefs(fichaIdentificacionStore);
    const responsiveWidth = ref(window.innerWidth < 600 ? "100%" : "auto");

    const updateWidth = () => {
      responsiveWidth.value = window.innerWidth < 600 ? "100%" : "auto";
    };

    const onEditButtonClick = (e) => {
      emit("cambiar-tab", { tab: "FichaIdentificacion", paciente: e.row.data });
    };

    const onCheckboxChange = (data) => {
      fichaIdentificacionStore.updateActivo(data.id, data.activo);
    };

    onMounted(() => {
      window.addEventListener("resize", updateWidth);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateWidth);
    });

    return {
      formIdentificacion,
      responsiveWidth,
      fichaIdentificacionStore, // Devolvemos la tienda para acceder desde `methods`
      onEditButtonClick,
      onCheckboxChange,
    };
  },
  data() {
    return {
      focusedRowKey: null,
      isPanelOpened: false,
      panelData: null,
    };
  },
  methods: {
    onDeleteButtonClick(e) {
      const id = e.row.data.id;
      this.fichaIdentificacionStore // Ahora `fichaIdentificacionStore` está disponible en `this`
        .eliminarPaciente(id)
        .then(() => {
          this.$q.notify({
            message: "Paciente eliminado exitosamente",
            color: "positive",
            position: "top-right",
          });
        })
        .catch((error) => {
          console.error("Error al eliminar el paciente:", error);
          this.$q.notify({
            message: "Error al eliminar el paciente",
            color: "negative",
            position: "top-right",
          });
        });
    },
    renderTipo(data) {
      return data.value ? data.value.descripcion : "";
    },
    rowClick(e) {
      this.focusedRowKey = e.key;
      this.panelData = e.data;
      this.isPanelOpened = true;
    },
    onClose() {
      this.isPanelOpened = false;
    },
  },
};
</script>

<style scoped>
.view-wrapper-paciente-list {
  /* Estilos personalizados */
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
.slide-fade-leave-to /* .slide-fade-leave-active en Vue <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
