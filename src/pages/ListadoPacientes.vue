<template>
  <div class="view-wrapper list-page view-wrapper-paciente-list">
    <dx-data-grid
      ref="dataGrid"
      :data-source="formIdentificacion"
      :allow-column-reordering="true"
      :rowAlternationEnabled="true"
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
      <dx-scrolling mode="virtual" />
      <dx-column-chooser :enabled="false" />
      <dx-sorting mode="multiple" />
      <dx-header-filter :visible="true" />
      <dx-load-panel :show-pane="false" />
      <dx-selection
        select-all-mode="allPages"
        show-check-boxes-mode="always"
        mode="multiple"
      />
      <dx-search-panel
        :width="300"
        :visible="true"
        placeholder="Buscar Paciente"
      />

      <!-- Columnas -->
      <dx-column
        data-field="medico"
        caption="Médico"
        :min-width="120"
        :width="130"
        :visible="true"
      />
      <dx-column
        data-field="codigo"
        caption="Código"
        :allow-editing="false"
        :min-width="100"
        :width="140"
        :visible="true"
      />
      <dx-column
        data-field="nombres"
        caption="Nombre"
        sort-order="asc"
        :min-width="120"
        :width="140"
        :visible="true"
      />
      <dx-column
        data-field="apellidos"
        caption="Apellidos"
        sort-order="asc"
        :min-width="120"
        :width="140"
        :visible="true"
      />
      <dx-column
        data-field="fechaNacimiento"
        caption="F. Nacimiento"
        data-type="date"
        :min-width="115"
        :width="125"
        :visible="false"
      />

      <dx-column
        data-field="tipo"
        caption="Tipo"
        :width="100"
        :visible="true"
      />
      <dx-column data-field="dni" caption="DNI" :width="140" :visible="true" />
      <dx-column
        data-field="email"
        caption="E-mail"
        :width="180"
        :visible="true"
      />
      <!-- <dx-column
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
      </dx-column> -->

      <dx-column
        data-field="medicoCabecera"
        caption="Médico Cabecera"
        :width="150"
        :visible="false"
      />
      <dx-column
        data-field="referidoPor"
        caption="Referido por"
        :width="130"
        :visible="false"
      />

      <dx-column
        data-field="sexo"
        caption="Sexo"
        :width="80"
        :visible="false"
      />
      <dx-column
        data-field="estadoCivil"
        caption="Estado Civil"
        :width="100"
        :visible="false"
      />
      <dx-column
        data-field="observaciones"
        caption="Observaciones"
        :width="150"
        :visible="false"
      />
      <dx-column
        data-field="direccion"
        caption="Dirección"
        :width="150"
        :visible="false"
      />
      <dx-column
        data-field="telCasa"
        caption="Teléfono Casa"
        :width="100"
        :visible="false"
      />
      <dx-column
        data-field="telPersonal"
        caption="Teléfono Personal"
        :width="120"
        :visible="false"
      />

      <dx-column
        data-field="municipio"
        caption="Municipio"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="departamento"
        caption="Departamento"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="organizacion"
        caption="Organización"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="conyugue"
        caption="Cónyugue"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="madre"
        caption="Madre"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="padre"
        caption="Padre"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="escolaridad"
        caption="Escolaridad"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="ocupacion"
        caption="Ocupación"
        :width="120"
        :visible="false"
      />
      <dx-column
        data-field="grupoSanguineo"
        caption="Grupo Sanguíneo"
        :width="100"
        :visible="false"
      />
      <dx-column
        data-field="alergias"
        caption="Alergias"
        :width="150"
        :visible="false"
      />
      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" @click="onEditButtonClick" />
        <DxButton name="delete" icon="trash" />
      </DxColumn>
    </dx-data-grid>

    <!-- Panel de Paciente al lado derecho -->
    <transition name="slide-fade">
      <div v-if="isPanelOpened" class="paciente-info-panel">
        <button class="close-button" @click="onClose">&times;</button>
        <paciente-panel :paciente="panelData" @close="onClose" />
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
    // DxCheckBox,
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
      // Actualiza el estado del checkbox en la tienda o base de datos según sea necesario
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
