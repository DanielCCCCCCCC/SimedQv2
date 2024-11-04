<template>
  <div class="row justify-center q-py-md">
    <h4 class="header-title">Contactos Existentes</h4>
  </div>
  <div id="app-container" class="q-mb-xl q-px-md q-pa-xs q-py-md">
    <dx-data-grid
      :data-source="contactos"
      :allow-column-reordering="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      key-expr="id"
      :column-auto-width="false"
      :column-min-width="50"
      :width="responsiveWidth"
    >
      <!-- Columnas de datos de contacto -->
      <dx-column data-field="Nombre" caption="Nombre" :allow-sorting="true" />
      <dx-column
        data-field="Direccion"
        caption="Dirección"
        :allow-sorting="true"
      />
      <dx-column
        data-field="Organizacion"
        caption="Organización"
        :allow-sorting="true"
      />
      <dx-column
        data-field="Grupo"
        caption="Grupo"
        :allow-sorting="true"
        :visible="false"
      />
      <dx-column
        data-field="Municipio"
        caption="Municipio"
        :allow-sorting="true"
        :visible="false"
      />
      <dx-column
        data-field="departamento"
        caption="Departamento"
        :allow-sorting="true"
        :visible="false"
      />
      <dx-column
        data-field="Email"
        caption="Correo Electrónico"
        :allow-sorting="true"
      />
      <dx-column
        data-field="Web"
        caption="Página Web"
        :allow-sorting="true"
        :visible="false"
      />
      <dx-column
        data-field="TelefonoCasa"
        caption="Teléfono Casa"
        :allow-sorting="true"
      />
      <dx-column
        data-field="TelefonoTrabajo"
        caption="Teléfono Trabajo"
        :allow-sorting="true"
        :visible="false"
      />
      <dx-column
        data-field="Observaciones"
        caption="Observaciones"
        :allow-sorting="true"
        :visible="false"
      />

      <dx-column
        data-field="Fax"
        caption="Fax"
        :allow-sorting="true"
        :visible="false"
      />
      <dx-column data-field="Celular" caption="Celular" :allow-sorting="true" />

      <!-- Configuración de edición de datos con título en la ventana modal -->
      <dx-editing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        :popup="{
          title: 'Editar Información del Contacto',
          showTitle: true,
          width: 700,
          height: 470,
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
import { useContactStore } from "../stores/ContacStores";
import { ref, onMounted, onBeforeUnmount } from "vue";

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
    const contactStore = useContactStore();
    const contactos = contactStore.contactos;

    // Ancho responsivo
    const responsiveWidth = ref(window.innerWidth < 600 ? "100%" : "auto");

    // Función para actualizar el ancho cuando cambia el tamaño de la ventana
    const updateWidth = () => {
      responsiveWidth.value = window.innerWidth < 600 ? "100%" : "auto";
    };

    // Escucha los cambios de tamaño de la ventana
    onMounted(() => window.addEventListener("resize", updateWidth));
    onBeforeUnmount(() => window.removeEventListener("resize", updateWidth));

    return {
      contactos,
      responsiveWidth,
    };
  },
};
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
