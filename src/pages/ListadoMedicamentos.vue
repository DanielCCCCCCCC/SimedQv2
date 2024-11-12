<template>
  <div class="row">
    <h4 class="header-title">Medicamentos y Otros</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <DxDataGrid
      :data-source="medicamentos"
      :allow-column-reordering="true"
      :show-borders="true"
      class="custom-data-grid"
      :row-alternation-enabled="true"
      key-expr="codigo"
    >
      <!-- Columnas con ordenamiento habilitado -->
      <DxColumn
        data-field="codigo"
        caption="Código"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="descripcion"
        caption="Descripción"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="tipo"
        caption="Tipo"
        :allow-sorting="true"
        :visible="false"
      ></DxColumn>
      <DxColumn
        data-field="indicaciones"
        caption="Indicaciones"
        :allow-sorting="true"
        :visible="false"
      ></DxColumn>
      <DxColumn
        data-field="precioCosto"
        caption="Precio Costo"
        :allow-sorting="true"
        :visible="false"
      ></DxColumn>
      <DxColumn
        data-field="precioVenta"
        caption="Precio Venta"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="facturar"
        caption="Facturar"
        :allow-sorting="true"
        :visible="false"
      ></DxColumn>
      <DxColumn
        data-field="status"
        caption="Status"
        :allow-sorting="true"
      ></DxColumn>

      <!-- Configuración de botones de acción -->
      <DxColumn type="buttons">
        <!-- Botón de edición con ícono -->
        <DxButton name="edit" icon="edit" />
        <!-- Botón de eliminación con ícono -->
        <DxButton name="delete" icon="trash" />
      </DxColumn>

      <!-- Configuración de edición de datos con título en la ventana modal -->
      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :popup="{
          title: 'Editar Información del Medicamento',
          showTitle: true,
          width: 700,
          height: 400,
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
} from "devextreme-vue/data-grid";
import { useMedicamentoStore } from "../stores/DirectoriosStores";
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
  },
  setup() {
    const medicamentoStore = useMedicamentoStore();
    const { medicamentos } = storeToRefs(medicamentoStore);

    onMounted(async () => {
      await medicamentoStore.cargarMedicamentos();
    });

    return {
      medicamentos,
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
