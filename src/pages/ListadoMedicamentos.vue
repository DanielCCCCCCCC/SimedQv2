<template>
  <div class="row">
    <h4 class="header-title">Medicamentos y Otros</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <dx-data-grid
      :data-source="medicamentos"
      :allow-column-reordering="true"
      :show-borders="true"
      class="custom-data-grid"
      :row-alternation-enabled="true"
      key-expr="codigo"
    >
      <!-- Columnas con ordenamiento habilitado -->
      <dx-column
        data-field="codigo"
        caption="Código"
        :allow-sorting="true"
      ></dx-column>
      <dx-column
        data-field="descripcion"
        caption="Descripción"
        :allow-sorting="true"
      ></dx-column>
      <dx-column
        data-field="tipo"
        caption="Tipo"
        :allow-sorting="true"
        :visible="false"
      ></dx-column>
      <dx-column
        data-field="indicaciones"
        caption="Indicaciones"
        :allow-sorting="true"
        :visible="false"
      ></dx-column>
      <dx-column
        data-field="precioCosto"
        caption="Precio Costo"
        :allow-sorting="true"
        :visible="false"
      ></dx-column>
      <dx-column
        data-field="precioVenta"
        caption="Precio Venta"
        :allow-sorting="true"
      ></dx-column>
      <dx-column
        data-field="facturar"
        caption="Facturar"
        :allow-sorting="true"
        :visible="false"
      ></dx-column>
      <dx-column
        data-field="status"
        caption="Status"
        :allow-sorting="true"
      ></dx-column>

      <!-- Configuración de botones de acción -->
      <dx-column type="buttons">
        <!-- Botón de edición con ícono -->
        <dx-button name="edit" icon="edit" />
        <!-- Botón de eliminación con ícono -->
        <dx-button name="delete" icon="trash" />
      </dx-column>

      <!-- Configuración de edición de datos con título en la ventana modal -->
      <dx-editing
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
    // const medicamentos = medicamentoStore.medicamentos; // Datos de la tienda de medicamentos
    onMounted(async () => {
      await medicamentoStore.cargarMedicamentos();
    });
    return {
      medicamentos,
    };
  },
};

// setup() {
//     const hospitalStore = useHospitalStore();
//     const { hospitales } = storeToRefs(hospitalStore); // Datos de la tienda de hospitales
//     onMounted(async () => {
//       await hospitalStore.cargarHospitales();
//     });
//     return {
//       hospitales,
//     };
//   },
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
