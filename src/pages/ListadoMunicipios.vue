<template>
  <div id="app-container">
    <DxDataGrid
      id="dataGrid"
      :data-source="municipios"
      key-expr="id"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :allow-column-reordering="true"
      @exporting="exportGrid"
    >
      <!-- Agrupación por departamento -->
      <DxColumn
        data-field="departamentoDescripcion"
        :group-index="0"
        sort-order="asc"
      >
        <DxRequiredRule />
      </DxColumn>

      <!-- Columna para el nombre del municipio -->
      <DxColumn data-field="descripcion" caption="Municipio">
        <DxRequiredRule />
      </DxColumn>

      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxSearchPanel :visible="true" />
      <DxGroupPanel :visible="true" />
      <DxSummary>
        <DxGroupItem summary-type="count" displayFormat="{0} municipios" />
      </DxSummary>
      <!-- Cambiado a auto-expand-all="false" -->
      <DxGrouping :auto-expand-all="false" />
      <DxToolbar>
        <DxItem name="groupPanel" />
        <DxItem location="after" template="button-template" />
        <DxItem name="exportButton" />
        <DxItem name="columnChooserButton" />
        <DxItem name="searchPanel" />
      </DxToolbar>
      <template #button-template>
        <!-- <DxButton
          :text="expanded ? 'Collapse All' : 'Expand All'"
          :width="136"
          @click="toggleExpand"
        /> -->
      </template>
      <DxExport :enabled="true" :formats="['xlsx', 'pdf']" />
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxRequiredRule,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxSearchPanel,
  DxGroupPanel,
  DxSummary,
  DxGroupItem,
  DxGrouping,
  DxToolbar,
  DxItem,
} from "devextreme-vue/data-grid";
import { DxButton } from "devextreme-vue/button";
import { useMunicipioStore } from "../stores/DatosGeneralesStores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

export default {
  name: "App",
  components: {
    DxDataGrid,
    DxColumn,
    DxRequiredRule,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxSearchPanel,
    DxGroupPanel,
    DxSummary,
    DxGroupItem,
    DxGrouping,
    DxToolbar,
    DxItem,
    // DxExport,
    // DxButton,
  },
  setup() {
    const municipioStore = useMunicipioStore();
    const { municipios } = storeToRefs(municipioStore);
    const expanded = ref(false); // Inicialmente en false para mantener los grupos contraídos

    // Cargar municipios cuando el componente se monta
    onMounted(async () => {
      await municipioStore.cargarMunicipios();
    });

    const toggleExpand = () => {
      expanded.value = !expanded.value;
    };

    return {
      municipios,
      expanded,
      toggleExpand,
    };
  },
  methods: {
    exportGrid(e) {
      if (e.format === "xlsx") {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Main sheet");
        exportDataGrid({
          worksheet: worksheet,
          component: e.component,
        }).then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "DataGrid.xlsx"
            );
          });
        });
        e.cancel = true;
      } else if (e.format === "pdf") {
        const doc = new jsPDF();
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: e.component,
        }).then(() => {
          doc.save("DataGrid.pdf");
        });
      }
    },
  },
};
</script>

<style>
#dataGrid {
  height: 500px;
}

#app-container {
  width: 900px;
  position: relative;
}
</style>
