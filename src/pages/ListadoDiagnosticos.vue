<template>
  <div class="row">
    <h4 class="header-title">Diagnósticos</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <DxDataGrid
      :data-source="diagnosticos"
      :allow-column-reordering="true"
      :show-borders="true"
      class="custom-data-grid"
      :row-alternation-enabled="true"
      key-expr="id"
    >
      <DxScrolling mode="virtual" />
      <DxColumnChooser :enabled="true" />
      <DxSorting mode="multiple" />
      <DxHeaderFilter :visible="true" />
      <DxLoadPanel :show-pane="true" />

      <!-- Columnas para descripción y clasificación -->
      <DxColumn
        data-field="descripcion"
        caption="Descripción"
        :allow-sorting="true"
        min-width="150"
        width="200"
      ></DxColumn>
      <DxColumn
        data-field="clasificacionDescripcion"
        caption="Clasificación"
        :allow-sorting="true"
        min-width="150"
        width="200"
      ></DxColumn>

      <!-- Botones de acción -->
      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" />
        <DxButton name="delete" icon="trash" @click="onDeleteButtonClick" />
      </DxColumn>

      <!-- Configuración de edición -->
      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :popup="{
          title: 'Editar Diagnóstico',
          showTitle: true,
          width: 500,
          height: 300,
        }"
      />

      <!-- Paginación y filtros -->
      <DxPaging :enabled="true" :page-size="10" />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />
    </DxDataGrid>
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
  DxScrolling,
  DxSorting,
  DxLoadPanel,
} from "devextreme-vue/data-grid";
import { useDiagnosticosStore } from "../stores/DiagnosticosStores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { Notify } from "quasar";

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
    DxScrolling,
    DxSorting,
    DxLoadPanel,
  },
  setup() {
    const diagnosticoStore = useDiagnosticosStore();
    const { diagnosticos } = storeToRefs(diagnosticoStore);

    // Método para eliminar un diagnóstico
    const onDeleteButtonClick = async (e) => {
      const id = e.row.data.id;
      try {
        await diagnosticoStore.eliminarDiagnostico(id);
        Notify.create({
          message: "Diagnóstico eliminado exitosamente",
          color: "positive",
          position: "top-right",
        });
        console.log("Diagnóstico eliminado:", id);
      } catch (error) {
        Notify.create({
          message: "Error al eliminar el diagnóstico",
          color: "negative",
          position: "top-right",
        });
        console.error("Error al eliminar diagnóstico:", error);
      }
    };

    onMounted(async () => {
      await diagnosticoStore.cargarDiagnosticos();
    });

    return {
      diagnosticos,
      onDeleteButtonClick,
    };
  },
};
</script>

<style scoped>
#app-container {
  padding: 0 4px;
  background-color: #f9f9f9;
  width: 100%;
}

.custom-data-grid {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 1px 0 1px;
  text-align: center;
}
</style>
