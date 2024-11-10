import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "../supabaseClient"; // Asegúrate de tener configurado supabaseClient
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { es } from "date-fns/locale";

export const useFichaIdentificacionStore = defineStore(
  "fichaIdentificacion",
  () => {
    const formIdentificacion = ref([]);
    const tenantId = "a780935f-76e7-46c7-98a3-b4c3ab9bb2c3"; // Reemplaza con tu tenant ID

    const cargarDatos = async () => {
      const { data, error } = await supabase
        .from("fichaIdentificacion")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error al cargar los datos de identificación:", error);
      } else {
        formIdentificacion.value = data || [];
      }
    };

    const guardarDatos = async (nuevoFormulario) => {
      const fechaRegistro = new Date().toLocaleDateString("en-CA");
      const { data, error } = await supabase
        .from("fichaIdentificacion")
        .insert([{ ...nuevoFormulario, fechaRegistro, tenant_id: tenantId }]);

      if (error) {
        console.error("Error al guardar los datos de identificación:", error);
      } else if (data && data[0]) {
        formIdentificacion.value.push(data[0]);
      }
    };

    const actualizarPaciente = async (pacienteActualizado) => {
      const { data, error } = await supabase
        .from("fichaIdentificacion")
        .update(pacienteActualizado)
        .eq("id", pacienteActualizado.id);

      if (error) {
        console.error("Error al actualizar los datos del paciente:", error);
      } else {
        const index = formIdentificacion.value.findIndex(
          (p) => p.id === pacienteActualizado.id
        );
        if (index !== -1) {
          formIdentificacion.value[index] = data[0];
        }
      }
    };

    const eliminarPaciente = async (id) => {
      const { error } = await supabase
        .from("fichaIdentificacion")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error al eliminar el paciente:", error);
      } else {
        formIdentificacion.value = formIdentificacion.value.filter(
          (p) => p.id !== id
        );
      }
    };

    const registrosPorDia = computed(() => {
      const inicioSemana = startOfWeek(new Date(), { weekStartsOn: 1 });
      const finSemana = endOfWeek(new Date(), { weekStartsOn: 1 });

      return eachDayOfInterval({ start: inicioSemana, end: finSemana }).map(
        (dia) => {
          const diaFormato = dia.toLocaleDateString("en-CA");
          return {
            day: format(dia, "EEEE", { locale: es }),
            registros: formIdentificacion.value.filter(
              (paciente) => paciente.fechaRegistro === diaFormato
            ).length,
          };
        }
      );
    });

    const totalActivos = computed(
      () => formIdentificacion.value.filter((p) => p.activo).length
    );
    const totalInactivos = computed(
      () => formIdentificacion.value.filter((p) => !p.activo).length
    );

    const dataGraficoPacientes = computed(() => [
      { estado: "Activos", cantidad: totalActivos.value },
      { estado: "Inactivos", cantidad: totalInactivos.value },
    ]);

    return {
      formIdentificacion,
      cargarDatos,
      guardarDatos,
      actualizarPaciente,
      eliminarPaciente,
      registrosPorDia,
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
