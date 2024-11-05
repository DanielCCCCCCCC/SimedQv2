<template>
  <div class="row">
    <h4 class="header-title">Hospitales Existentes</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <dx-data-grid
      :data-source="hospitales"
      :allow-column-reordering="true"
      row-alternation-enabled="true"
      :rowAlternationEnabled="true"
      :show-borders="true"
      key-expr="nombre"
    >
      <!-- Columnas con ordenamiento habilitado -->
      <dx-column
        data-field="nombre"
        caption="Nombre del Hospital"
        :allow-sorting="true"
        :width="210"
      ></dx-column>
      <dx-column
        data-field="direccion"
        caption="Dirección"
        :allow-sorting="true"
        :min-width="390"
      ></dx-column>
      <dx-column
        data-field="municipio"
        caption="Municipio"
        :allow-sorting="true"
        :visible="false"
        :width="140"
      ></dx-column>
      <dx-column
        data-field="departamento"
        caption="Departamento"
        :allow-sorting="true"
        :visible="false"
        :width="140"
      ></dx-column>
      <dx-column
        data-field="telefono"
        caption="Teléfono"
        :allow-sorting="true"
        :visible="true"
        :width="120"
      ></dx-column>
      <dx-column
        data-field="email"
        caption="Correo Electrónico"
        :allow-sorting="true"
        :visible="true"
        :width="180"
      ></dx-column>
      <dx-column
        data-field="web"
        caption="Sitio Web"
        :allow-sorting="true"
        :visible="true"
        :width="120"
      ></dx-column>

      <!-- Configuración de edición de datos con título en la ventana modal -->
      <dx-editing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :popup="{
          title: 'Editar Información del Hospital',
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
} from "devextreme-vue/data-grid";
import { useHospitalStore } from "../stores/DirectoriosStores";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxFilterRow,
    DxHeaderFilter,
    DxEditing,
  },
  setup() {
    const hospitalStore = useHospitalStore();
    const hospitales = hospitalStore.hospitales; // Datos de la tienda de hospitales
    return {
      hospitales,
    };
  },
};
</script>

<style scoped>
#app-container {
  padding: 0 4px; /* Reducción del padding superior */
  background-color: #f9f9f9; /* Fondo claro */
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 1px 1px; /* Menor espacio superior, más espacio inferior */
  text-align: center; /* Centrado del título */
  flex: auto;
  margin-top: 50px;
}

.dx-data-grid {
  background-color: #ffffff; /* Fondo blanco para el DataGrid */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}
</style>
