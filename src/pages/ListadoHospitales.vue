<template>
  <div class="row">
    <h4 class="header-title">Hospitales</h4>
  </div>
  <div id="app-container" class="q-mb-xl">
    <DxDataGrid
      :data-source="hospitales"
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

      <!-- Columnas con ordenamiento habilitado -->
      <DxColumn
        data-field="nombre"
        caption="Nombre"
        :allow-sorting="true"
        min-width="150"
        width="180"
      ></DxColumn>
      <DxColumn
        data-field="direccion"
        caption="Dirección"
        :allow-sorting="true"
        min-width="150"
        width="140"
      ></DxColumn>
      <DxColumn
        data-field="departamentoDescripcion"
        caption="Departamento"
        :allow-sorting="true"
        min-width="100"
        width="130"
      ></DxColumn>
      <DxColumn
        data-field="municipioDescripcion"
        caption="Municipio"
        :allow-sorting="true"
        min-width="100"
        width="120"
      ></DxColumn>
      <DxColumn
        data-field="telefono"
        caption="Teléfono"
        :allow-sorting="true"
        min-width="100"
        width="100"
      ></DxColumn>
      <DxColumn
        data-field="email"
        caption="Email"
        :allow-sorting="true"
        min-width="100"
        width="160"
      ></DxColumn>
      <DxColumn
        data-field="web"
        caption="Sitio Web"
        :allow-sorting="true"
        min-width="100"
        width="150"
      ></DxColumn>

      <!-- Botones de acción para editar y eliminar -->
      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" />
        <DxButton name="delete" icon="trash" />
      </DxColumn>

      <!-- Configuración de edición de datos con ventana modal -->
      <DxEditing
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
import { useHospitalStore } from "../stores/DirectoriosStores";
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
    const hospitalStore = useHospitalStore();
    const { hospitales } = storeToRefs(hospitalStore); // Datos de la tienda de hospitales
    onMounted(async () => {
      await hospitalStore.cargarHospitales();
    });
    return {
      hospitales,
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
