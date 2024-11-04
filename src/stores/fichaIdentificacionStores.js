import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";

export const useFichaIdentificacionStore = defineStore(
  "fichaIdentificacion",
  () => {
    // Intenta cargar los datos desde LocalStorage al iniciar la store
    const formIdentificacion = ref(
      JSON.parse(localStorage.getItem("fichaIdentificacion") || "[]")
    );

    function guardarDatos(nuevoFormulario) {
      if (!Array.isArray(formIdentificacion.value)) {
        formIdentificacion.value = [];
      }
      formIdentificacion.value.push({ id: Date.now(), ...nuevoFormulario });
      console.log(formIdentificacion.value);
      // Actualiza LocalStorage cada vez que se agrega un nuevo formulario
      localStorage.setItem(
        "fichaIdentificacion",
        JSON.stringify(formIdentificacion.value)
      );
    }

    function actualizarPaciente(pacienteActualizado) {
      const index = formIdentificacion.value.findIndex(
        (p) => p.id === pacienteActualizado.id
      );
      if (index !== -1) {
        formIdentificacion.value[index] = pacienteActualizado;
        localStorage.setItem(
          "fichaIdentificacion",
          JSON.stringify(formIdentificacion.value)
        );
      }
    }

    function eliminarPaciente(id) {
      formIdentificacion.value = formIdentificacion.value.filter(
        (p) => p.id !== id
      );
      localStorage.setItem(
        "fichaIdentificacion",
        JSON.stringify(formIdentificacion.value)
      );
    }

    // Computed para contar pacientes activos
    const totalActivos = computed(() => {
      return formIdentificacion.value.filter((paciente) => paciente.activo)
        .length;
    });

    // Computed para contar pacientes inactivos
    const totalInactivos = computed(() => {
      return formIdentificacion.value.filter((paciente) => !paciente.activo)
        .length;
    });

    // Arreglo reactivo para usar en gráficos
    const dataGraficoPacientes = computed(() => {
      return [
        { estado: "Activos", cantidad: totalActivos.value },
        { estado: "Inactivos", cantidad: totalInactivos.value },
      ];
    });

    // Observa los cambios en `formIdentificacion` para actualizar LocalStorage automáticamente
    watch(
      formIdentificacion,
      (newFormIdentificacion) => {
        localStorage.setItem(
          "fichaIdentificacion",
          JSON.stringify(newFormIdentificacion)
        );
      },
      { deep: true }
    );

    return {
      formIdentificacion,
      guardarDatos,
      actualizarPaciente,
      eliminarPaciente,
      totalActivos,
      totalInactivos,
      dataGraficoPacientes,
      tipoOptions: ref(["Tipo1", "Tipo2", "Tipo3"]),
      medicoNOptions: ref(["Medico1", "Medico2", "Medico3"]),
      medicoOptions: ref(["Medico1", "Medico2", "Medico3"]),
      medicoCabeceraOptions: ref(["MedicoCab1", "MedicoCab2"]),
      referidoPorOptions: ref(["Referido1", "Referido2"]),
      departamentoOptions: ref(["Estado1", "Estado2"]),
      municipioOptions: ref(["Municipio1", "Municipio2"]),
      sexoOptions: ref(["Masculino", "Femenino"]),
      estadoCivilOptions: ref(["Soltero", "Casado", "Viudo"]),
      grupoSanguineoOptions: ref([
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ]),
    };
  }
);
