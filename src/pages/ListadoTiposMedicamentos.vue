<template>
  <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
    <DxDataGrid
      :data-source="medicamentos"
      key-expr="id"
      :show-borders="true"
      class="custom-data-grid"
      :allow-column-reordering="true"
      :column-auto-width="true"
      :column-resizing-mode="'widget'"
      height="400px"
    >
      <DxColumn data-field="descripcion" caption="Tipo de Medicamento">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn
        data-field="created_at"
        caption="Fecha de Creación"
        data-type="date"
      >
        <DxRequiredRule />
      </DxColumn>

      <DxSummary>
        <DxGroupItem summary-type="count" displayFormat="{0} medicamentos" />
      </DxSummary>
      <DxColumnChooser :enabled="true" />
      <DxFilterRow :visible="true" />
      <DxSearchPanel :visible="true" />
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="false" />
    </DxDataGrid>
  </q-card>
</template>

<script setup>
import {
  DxDataGrid,
  DxColumn,
  DxRequiredRule,
  DxSummary,
  DxGroupItem,
  DxColumnChooser,
  DxFilterRow,
  DxSearchPanel,
  DxGroupPanel,
  DxGrouping,
} from "devextreme-vue/data-grid";
import { useTiposMedicamentosStore } from "../stores/ConfiMedicasStores";
import { storeToRefs } from "pinia";

const medicamentosStore = useTiposMedicamentosStore();
const { medicamentos } = storeToRefs(medicamentosStore);
medicamentosStore.cargarMedicamentos();
</script>
