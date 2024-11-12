<template>
  <div class="row">
    <h4 class="header-title">Clasificación de Diagnósticos</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <DxDataGrid
      :data-source="clasificaciones"
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

      <!-- Columna para nombre de clasificación -->
      <DxColumn
        data-field="nombre"
        caption="Nombre de Clasificación"
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
          title: 'Editar Clasificación',
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
import { useClasificacionDiagnosticosStore } from "../stores/DiagnosticosStores";
import { Notify } from "quasar";
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
    DxScrolling,
    DxSorting,
    DxLoadPanel,
  },
  setup() {
    const clasificacionStore = useClasificacionDiagnosticosStore();
    const { clasificaciones } = storeToRefs(clasificacionStore);

    // Método para eliminar una clasificación
    const onDeleteButtonClick = async (e) => {
      const id = e.row.data.id;
      try {
        await clasificacionStore.eliminarClasificacion(id);
        Notify.create({
          message: "Clasificación eliminada exitosamente",
          color: "positive",
          position: "top-right",
        });
        console.log("Clasificación eliminada:", id);
      } catch (error) {
        Notify.create({
          message: "Error al eliminar la clasificación",
          color: "negative",
          position: "top-right",
        });
        console.error("Error al eliminar clasificación:", error);
      }
    };

    onMounted(async () => {
      await clasificacionStore.cargarClasificaciones();
    });

    return {
      clasificaciones,
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
