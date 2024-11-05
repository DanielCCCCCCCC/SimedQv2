<template>
  <div>
    <h5 class="titulo">Estado de Pacientes</h5>
    <DxPieChart
      id="pie"
      :data-source="dataGraficoPacientes"
      type="doughnut"
      palette="Soft Pastel"
      width="350"
      height="250"
    >
      <DxSeries argument-field="estado" value-field="cantidad">
        <DxLabel :visible="true">
          <DxConnector :visible="true" />
        </DxLabel>
      </DxSeries>
      <DxExport :enabled="false" />
      <DxLegend
        :margin="0"
        horizontal-alignment="right"
        vertical-alignment="top"
      />
      <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip">
        <DxFormat />
      </DxTooltip>
    </DxPieChart>
  </div>
</template>

<script setup lang="js">
import { useFichaIdentificacionStore } from "../stores/fichaIdentificacionStores";
import DxPieChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxLabel,
  DxConnector,
  DxExport,
} from "devextreme-vue/pie-chart";

// Cargar la tienda
const fichaIdentificacionStore = useFichaIdentificacionStore();

// Acceder a `dataGraficoPacientes` directamente de la tienda
const { dataGraficoPacientes } = fichaIdentificacionStore;

const customizeTooltip = ({ valueText, percent }) => ({
  text: `${valueText} - ${(percent * 100).toFixed(2)}%`,
});
</script>

<style>
#pie {
  margin-left: 50px;
  margin-top: -30px;
}
.titulo {
  margin-top: 10px;
  font-family: "Segoe UI Light", "Helvetica Neue", "Trebuchet MS", "Verdana",
    "sans-serif";
  text-align: center;
}
</style>
