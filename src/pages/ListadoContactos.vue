<template>
  <div class="row justify-center q-py-md">
    <h4 class="header-title">Contactos Existentes</h4>
  </div>

  <!-- Vista de tarjetas para dispositivos móviles -->
  <div v-if="isMobileView" class="card-container">
    <div v-for="contacto in contactos" :key="contacto.id" class="contact-card">
      <h5>{{ contacto.nombre }}</h5>
      <p><strong>Dirección:</strong> {{ contacto.direccion }}</p>
      <p><strong>Organización:</strong> {{ contacto.organizacion }}</p>
      <p><strong>Email:</strong> {{ contacto.email }}</p>
      <p><strong>Teléfono Casa:</strong> {{ contacto.telefonoCasa }}</p>
      <div class="card-actions">
        <q-btn
          icon="edit"
          label="Editar"
          color="primary"
          @click="handleEdit(contacto)"
        />
        <q-btn
          icon="delete"
          label="Eliminar"
          color="negative"
          @click="handleDelete(contacto.id)"
        />
      </div>
    </div>
  </div>

  <!-- DataGrid para pantallas grandes -->
  <div v-else id="app-container" class="q-mb-xl q-px-md q-pa-xs q-py-md">
    <DxDataGrid
      :data-source="contactos"
      :allow-column-reordering="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      key-expr="id"
      :width="responsiveWidth"
    >
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
      <DxPaging :enabled="true" :page-size="10" />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />
      <DxColumn type="buttons">
        <DxButton name="edit" icon="edit" />
        <DxButton name="delete" icon="trash" @click="handleDelete" />
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
  DxEditing,
  DxButton,
} from "devextreme-vue/data-grid";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useContactStore } from "../stores/ContacStores";
import { Notify } from "quasar";
import { storeToRefs } from "pinia";

// Acceder a la tienda de contactos
const contactStore = useContactStore();
const { eliminarContacto, cargarContactos } = contactStore;
const { contactos } = storeToRefs(contactStore);

// Detectar vista móvil
const isMobileView = computed(() => window.innerWidth < 600);

// Ancho responsivo para el DataGrid en pantallas grandes
const responsiveWidth = ref(window.innerWidth < 600 ? "100%" : "auto");
const updateWidth = () =>
  (responsiveWidth.value = window.innerWidth < 600 ? "100%" : "auto");

onMounted(async () => {
  await cargarContactos();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

// Manejar la eliminación de un contacto
const handleDelete = async (contactoId) => {
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

const handleEdit = (contacto) => {
  // Lógica de edición aquí
};
</script>

<style scoped>
#app-container {
  padding: 0 4px;
  background-color: #ffffff;
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: -10px;
}

/* Vista de tarjetas en dispositivos móviles */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.contact-card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-card h5 {
  margin: 0 0 8px;
  font-size: 1.2em;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
</style>
