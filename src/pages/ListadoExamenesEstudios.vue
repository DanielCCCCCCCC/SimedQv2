<template>
  <div class="row">
    <h4 class="header-title">Estudios</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <DxDataGrid
      :data-source="estudios"
      :allow-column-reordering="true"
      :show-borders="true"
      class="custom-data-grid"
      :row-alternation-enabled="true"
      key-expr="id"
    >
      <!-- Columnas de Estudios -->
      <DxColumn
        data-field="descripcion"
        caption="Tipo de Estudio"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="created_at"
        caption="Fecha de Creación"
        data-type="date"
        :allow-sorting="true"
      ></DxColumn>

      <!-- Columna de botones de acción -->
      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" />
        <DxButton name="delete" icon="trash" @click="onDeleteButtonClick" />
      </DxColumn>

      <!-- Resumen de estudios -->
      <DxSummary>
        <DxGroupItem summary-type="count" display-format="{0} estudios" />
      </DxSummary>

      <!-- Edición de datos en ventana modal -->
      <DxEditing
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
      <DxPaging :enabled="true" :page-size="10" />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />
      <DxColumnChooser :enabled="true" />
      <DxSearchPanel :visible="true" />
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
  DxSummary,
  DxGroupItem,
  DxColumnChooser,
  DxSearchPanel,
  DxButton,
} from "devextreme-vue/data-grid";
import { useEstudioStore } from "../stores/DirectoriosStores";
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
    DxSummary,
    DxGroupItem,
    DxColumnChooser,
    DxSearchPanel,
    DxButton,
  },
  setup() {
    const estudioStore = useEstudioStore();
    const { estudios } = storeToRefs(estudioStore);

    // Función para eliminar un estudio
    const onDeleteButtonClick = async (e) => {
      const id = e.row.data.id;
      try {
        await estudioStore.eliminarEstudio(id);
        Notify.create({
          message: "Estudio eliminado exitosamente",
          color: "positive",
          position: "top-right",
        });
      } catch (error) {
        console.error("Error al eliminar estudio:", error);
        Notify.create({
          message: "Error al eliminar estudio",
          color: "negative",
          position: "top-right",
        });
      }
    };

    onMounted(async () => {
      await estudioStore.cargarEstudios();
    });

    return {
      estudios,
      onDeleteButtonClick,
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

.custom-data-grid {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
