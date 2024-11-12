<template>
  <div class="row">
    <h4 class="header-title">Estados Civiles</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <dx-data-grid
      :data-source="estadosCiviles"
      :allow-column-reordering="true"
      :show-borders="true"
      class="custom-data-grid"
      :row-alternation-enabled="true"
      key-expr="id"
    >
      <dx-scrolling mode="virtual" />
      <dx-column-chooser :enabled="true" />
      <dx-sorting mode="multiple" />
      <dx-header-filter :visible="true" />
      <dx-load-panel :show-pane="true" />

      <!-- Columna para descripción -->
      <dx-column
        data-field="descripcion"
        caption="Descripción"
        :allow-sorting="true"
        min-width="150"
        width="200"
      ></dx-column>

      <!-- Botones de acción -->
      <dx-column type="buttons">
        <dx-button name="edit" icon="edit" />
        <dx-button name="delete" icon="trash" />
      </dx-column>

      <!-- Configuración de edición -->
      <dx-editing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :popup="{
          title: 'Editar Estado Civil',
          showTitle: true,
          width: 500,
          height: 300,
        }"
      />

      <!-- Paginación y filtros -->
      <dx-paging :enabled="true" :page-size="10" />
      <dx-filter-row :visible="true" />
      <dx-header-filter :visible="true" />
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
  DxButton,
  DxColumnChooser,
} from "devextreme-vue/data-grid";
import { useEstadoCivilStore } from "../stores/DatosGeneralesStores";
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
    DxButton,
    DxColumnChooser,
  },
  setup() {
    const estadoCivilStore = useEstadoCivilStore();
    const { estadosCiviles } = storeToRefs(estadoCivilStore);
    onMounted(async () => {
      await estadoCivilStore.cargarEstadosCiviles();
    });
    return {
      estadosCiviles,
    };
  },
};
</script>

<style scoped>
#app-container {
  padding: 0 4px;
  background-color: #f9f9f9;
  width: 100%; /* Ajuste para que ocupe el 100% del ancho disponible */
}

.custom-data-grid {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; /* Hacer que el DataGrid ocupe el 100% del ancho del contenedor */
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 1px 0 1px;
  text-align: center;
}
</style>
