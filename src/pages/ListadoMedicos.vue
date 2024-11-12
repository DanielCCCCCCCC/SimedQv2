<template>
  <div class="row justify-center q-py-md">
    <h4 class="header-title">Médicos Existentes</h4>
  </div>
  <div id="app-container" class="q-mb-xl q-px-md q-pa-xs q-py-md">
    <DxDataGrid
      :data-source="medicosConEspecialidad"
      :allow-column-reordering="true"
      :row-alternation-enabled="true"
      :show-borders="true"
      key-expr="id"
      :column-auto-width="false"
      :column-min-width="50"
      :width="responsiveWidth"
    >
      <!-- Columnas con ordenamiento habilitado -->
      <DxColumn
        data-field="nombre"
        caption="Nombre Completo"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="direccion"
        caption="Dirección"
        :allow-sorting="true"
        :visible="false"
      ></DxColumn>
      <DxColumn
        data-field="especialidadDescripcion"
        caption="Especialidad"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="telefonoPersonal"
        caption="Teléfono"
        :allow-sorting="true"
        :visible="false"
      ></DxColumn>
      <DxColumn
        data-field="telefonoCasa"
        caption="Celular"
        :allow-sorting="true"
      ></DxColumn>
      <DxColumn
        data-field="email"
        caption="Correo Electrónico"
        :allow-sorting="true"
      ></DxColumn>

      <!-- Configuración de edición de datos con título en la ventana modal -->
      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :popup="{
          title: 'Editar Información del Médico',
          showTitle: true,
          width: 700,
          height: 400,
        }"
      />

      <!-- Paginación y filtros -->
      <DxPaging :enabled="true" :page-size="10" />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />

      <!-- Botones de acción -->
      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" />
        <DxButton name="delete" icon="trash" />
      </DxColumn>
    </DxDataGrid>
  </div>
</template>
<script setup>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxFilterRow,
  DxHeaderFilter,
  DxButton,
  DxEditing,
} from "devextreme-vue/data-grid";
import { DxCheckBox } from "devextreme-vue/check-box";

import { useMedicoStore } from "../stores/MedicoStores";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

// Inicializamos la tienda
const medicoStore = useMedicoStore();
const { medicos } = storeToRefs(medicoStore);

// Cargamos los médicos al montar el componente
onMounted(async () => {
  await medicoStore.cargarMedicos();
});

// Computed para obtener los médicos con la descripción de especialidad
const medicosConEspecialidad = computed(() => {
  return medicos.value.map((medico) => ({
    ...medico,
    especialidadDescripcion: medico.especialidadesSeleccionadas || "N/A",
  }));
});

// Ancho responsivo
const responsiveWidth = ref(window.innerWidth < 600 ? "100%" : "auto");

// Función para actualizar el ancho cuando cambia el tamaño de la ventana
const updateWidth = () => {
  responsiveWidth.value = window.innerWidth < 600 ? "100%" : "auto";
};

// Escucha los cambios de tamaño de la ventana
window.addEventListener("resize", updateWidth);

// Remover el EventListener cuando el componente se desmonte
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<style scoped>
#app-container {
  padding: 0 4px;
  background-color: #ffffff;
  width: 100%;
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: -10px;
}

.custom-data-grid {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Ajustes responsivos */
@media (max-width: 600px) {
  .header-title {
    font-size: 1.2rem;
  }
  .custom-data-grid {
    font-size: 0.9rem;
  }
}

@media (max-width: 400px) {
  .header-title {
    font-size: 1rem;
  }
  .custom-data-grid {
    font-size: 0.8rem;
  }
}
</style>
