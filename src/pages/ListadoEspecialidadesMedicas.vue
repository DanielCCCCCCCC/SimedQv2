<template>
  <q-card class="q-pa-sm q-mt-md bg-grey-1 rounded shadow-2xl">
    <DxDataGrid
      :data-source="especialidades"
      key-expr="id"
      :show-borders="true"
      class="custom-data-grid"
      :allow-column-reordering="true"
      :column-auto-width="true"
      :column-resizing-mode="'widget'"
      height="400px"
    >
      <DxColumn data-field="descripcion" caption="Especialidad Médica">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn
        data-field="created_at"
        caption="Fecha de Creación"
        data-type="date"
        :format="{ type: 'shortDate' }"
      >
        <DxRequiredRule />
      </DxColumn>

      <DxSummary>
        <DxGroupItem summary-type="count" displayFormat="{0} especialidades" />
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
import { useEspecialidadMedicaStore } from "../stores/ConfiMedicasStores";
import { storeToRefs } from "pinia";

// Instancia de la tienda y referencia reactiva
const especialidadesStore = useEspecialidadMedicaStore();
const { especialidades } = storeToRefs(especialidadesStore);
especialidadesStore.cargarEspecialidades();
</script>

<style scoped>
.custom-data-grid {
  font-size: 14px;
  color: #333;
}

.q-card {
  max-width: 600px;
  margin: 0 auto;
}

.text-primary {
  color: #1976d2;
}
</style>
