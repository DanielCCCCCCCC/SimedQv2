<template>
  <div class="row justify-center q-py-md">
    <h4 class="header-title">Médicos Existentes</h4>
  </div>
  <div id="app-container" class="q-mb-xl q-px-md q-pa-xs q-py-md">
    <dx-data-grid
      :data-source="medicosConEspecialidad"
      :allow-column-reordering="true"
      :rowAlternationEnabled="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      key-expr="id"
      :column-auto-width="false"
      :column-min-width="50"
      :width="responsiveWidth"
    >
      <!-- Columnas con ordenamiento habilitado -->
      <dx-column
        data-field="Nombre"
        caption="Nombre Completo"
        :allow-sorting="true"
      ></dx-column>
      <dx-column
        data-field="Direccion"
        caption="Dirección"
        :allow-sorting="true"
        :visible="false"
      ></dx-column>
      <dx-column
        data-field="Especialidad"
        caption="Especialidad"
        :allow-sorting="true"
      ></dx-column>
      <dx-column
        data-field="Telefono"
        caption="Teléfono"
        :allow-sorting="true"
        :visible="false"
      ></dx-column>
      <dx-column
        data-field="Celular"
        caption="Celular"
        :allow-sorting="true"
      ></dx-column>
      <dx-column
        data-field="Email"
        caption="Correo Electrónico"
        :allow-sorting="true"
      ></dx-column>

      <!-- Configuración de edición de datos con título en la ventana modal -->
      <dx-editing
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
      <dx-paging :enabled="true" :page-size="10" />
      <dx-filter-row :visible="true" />
      <dx-header-filter :visible="true" />

      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" />
        <DxButton name="delete" icon="trash" />
      </DxColumn>
    </dx-data-grid>
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

// importamos las tiendas
import { useMedicoStore } from "../stores/MedicoStores";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useEspecialidadMedicaStore } from "src/stores/ConfiMedicasStores";

// Inicializamos la tienda
const medicoStore = useMedicoStore();
const EspecialidadMedicaStore = useEspecialidadMedicaStore();

// Inicializamos las propiedades reactivas
const { medicos } = storeToRefs(medicoStore);
const { especialidades } = storeToRefs(EspecialidadMedicaStore);

// Computed para obtener los médicos con la descripción de especialidad
const medicosConEspecialidad = computed(() => {
  return medicos.value.map((medico) => {
    // Verifica si especialidadesSeleccionadas contiene una descripción válida
    return {
      ...medico,
      Especialidad: medico.especialidadesSeleccionadas
        ? medico.especialidadesSeleccionadas.descripcion
        : "N/A",
    };
  });
});

// Ancho responsivo
const responsiveWidth = ref(window.innerWidth < 600 ? "100%" : "auto");

// Función para actualizar el ancho cuando cambia el tamaño de la ventana
const updateWidth = () => {
  responsiveWidth.value = window.innerWidth < 600 ? "100%" : "auto";
};

// Escucha los cambios de tamaño de la ventana
onMounted(() => {
  window.addEventListener("resize", updateWidth);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWidth);
});
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

.dx-data-grid {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Ajustes responsivos */
@media (max-width: 600px) {
  .header-title {
    font-size: 1.2rem;
  }

  .dx-data-grid {
    font-size: 0.9rem;
  }
}

@media (max-width: 400px) {
  .header-title {
    font-size: 1rem;
  }

  .dx-data-grid {
    font-size: 0.8rem;
  }
}
</style>
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
