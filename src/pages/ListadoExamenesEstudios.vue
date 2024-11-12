<template>
  <div class="row">
    <h4 class="header-title">Estudios</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <dx-data-grid
      :data-source="estudios"
      :allow-column-reordering="true"
      :show-borders="true"
      class="custom-data-grid"
      :row-alternation-enabled="true"
      key-expr="id"
    >
      <!-- Columnas de Estudios -->
      <dx-column
        data-field="descripcion"
        caption="Tipo de Estudio"
        :allow-sorting="true"
      ></dx-column>
      <dx-column
        data-field="created_at"
        caption="Fecha de Creación"
        data-type="date"
        :allow-sorting="true"
      ></dx-column>

      <!-- Columna de botones de acción -->
      <dx-column type="buttons">
        <dx-button name="edit" icon="edit" />
        <dx-button name="delete" icon="trash" />
      </dx-column>

      <!-- Resumen de estudios -->
      <dx-summary>
        <dx-group-item summary-type="count" display-format="{0} estudios" />
      </dx-summary>

      <!-- Edición de datos en ventana modal -->
      <dx-editing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :popup="{
          title: 'Editar Información del Estudio',
          showTitle: true,
          width: 700,
          height: 400,
        }"
      />

      <!-- Paginación y filtros -->
      <dx-paging :enabled="true" :page-size="10" />
      <dx-filter-row :visible="true" />
      <dx-header-filter :visible="true" />
      <dx-column-chooser :enabled="true" />
      <dx-search-panel :visible="true" />
    </dx-data-grid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxFilterRow,
  DxHeaderFilter,
  DxEditing,
  DxSummary,
  DxGroupItem,
  DxColumnChooser,
  DxSearchPanel,
  DxButton,
} from "devextreme-vue/data-grid";
import { useEstudioStore } from "../stores/DirectoriosStores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxFilterRow,
    DxHeaderFilter,
    DxEditing,
    DxSummary,
    DxGroupItem,
    DxColumnChooser,
    DxSearchPanel,
    DxButton,
  },
  setup() {
    const estudioStore = useEstudioStore();
    const { estudios } = storeToRefs(estudioStore); // Acceso a la tienda de estudios
    onMounted(async () => {
      await estudioStore.cargarEstudios();
    });
    return {
      estudios,
    };
  },
};
</script>

<style scoped>
#app-container {
  padding: 0 4px;
  background-color: #f9f9f9;
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 1px 0 1px;
  text-align: center;
}

.dx-data-grid {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
