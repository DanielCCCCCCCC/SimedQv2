<template>
  <div class="row justify-center q-py-md">
    <h4 class="header-title">Contactos Existentes</h4>
  </div>
  <div id="app-container" class="q-mb-xl q-px-md q-pa-xs q-py-md">
    <DxDataGrid
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
      <DxColumn data-field="nombre" caption="Nombre" :allow-sorting="true" />
      <DxColumn
        data-field="direccion"
        caption="Dirección"
        :allow-sorting="true"
      />
      <DxColumn
        data-field="organizacion"
        caption="Organización"
        :allow-sorting="true"
      />
      <DxColumn
        data-field="grupo"
        caption="Grupo de Contacto"
        :allow-sorting="true"
        :visible="false"
      />
      <DxColumn
        data-field="municipio"
        caption="Municipio"
        :allow-sorting="true"
        :visible="false"
      />
      <DxColumn
        data-field="departamento"
        caption="Departamento"
        :allow-sorting="true"
        :visible="false"
      />
      <DxColumn data-field="email" caption="E-mail" :allow-sorting="true" />
      <DxColumn
        data-field="telefonoCasa"
        caption="Teléfono Casa"
        :allow-sorting="true"
      />
      <DxColumn
        data-field="telefonoTrabajo"
        caption="Teléfono Trabajo"
        :allow-sorting="true"
        :visible="false"
      />
      <DxColumn
        data-field="observaciones"
        caption="Observaciones"
        :allow-sorting="true"
        :visible="false"
      />

      <!-- Botones de acción -->
      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" />

        <DxButton name="delete" icon="trash" @click="handleDelete" />
      </DxColumn>

      <!-- Configuración de edición -->
      <DxEditing
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
      <DxPaging :enabled="true" :page-size="10" />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />
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
  DxEditing,
  DxButton,
} from "devextreme-vue/data-grid";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useContactStore } from "../stores/ContacStores";
import { Notify } from "quasar";
import { storeToRefs } from "pinia";

// Acceder a la tienda de contactos
const contactStore = useContactStore();
const { eliminarContacto, cargarContactos } = contactStore;
const { contactos } = storeToRefs(contactStore); // contactos es un ref, así que usa contactos.value en la data-source
const responsiveWidth = ref(window.innerWidth < 600 ? "100%" : "auto");

// Función para actualizar el ancho cuando cambia el tamaño de la ventana
const updateWidth = () => {
  responsiveWidth.value = window.innerWidth < 600 ? "100%" : "auto";
};

// Cargar los contactos al montar el componente
onMounted(async () => {
  await cargarContactos();
  console.log(contactos.value); // Verificar que los contactos se han cargado correctamente
  window.addEventListener("resize", updateWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWidth);
});

// Manejar la eliminación de un contacto
const handleDelete = async (e) => {
  const contactoId = e.row.data.id;
  try {
    await eliminarContacto(contactoId);
    Notify.create({
      message: "Contacto eliminado exitosamente",
      color: "green",
      position: "top-right",
    });
  } catch (error) {
    console.error("Error al eliminar el contacto:", error);
    Notify.create({
      message: "Error al eliminar el contacto",
      color: "red",
      position: "top-right",
    });
  }
};
</script>

<style scoped>
#app-container {
  margin-bottom: 100px;
  margin-left: 40px;
  margin-right: 40px;
  padding: 0 4px;
  background-color: #ffffff;
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: -40px;
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
