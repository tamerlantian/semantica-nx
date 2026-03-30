import { DiaCalendario, ProgramacionEmpleado, TurnoCalendario } from '../models/programacion.model';

/** Extrae los códigos de turno únicos de todas las programaciones (campos dia_1..dia_31). */
export function extraerTurnosUnicos(programaciones: ProgramacionEmpleado[]): string[] {
  const turnosSet = new Set<string>();

  for (const prog of programaciones) {
    for (let d = 1; d <= 31; d++) {
      const valor = prog[`dia_${d}` as keyof ProgramacionEmpleado] as string | null;
      if (valor) {
        turnosSet.add(valor);
      }
    }
  }

  return [...turnosSet];
}

/** Construye una estructura de semanas con días para renderizar un calendario mensual. */
export function buildCalendarioMensual(
  programaciones: ProgramacionEmpleado[],
  anio: number,
  mes: number,
): DiaCalendario[][] {
  const totalDias = new Date(anio, mes, 0).getDate();
  const primerDiaSemana = (new Date(anio, mes - 1, 1).getDay() + 6) % 7; // lunes=0

  const dias: DiaCalendario[] = [];

  // Padding antes del día 1
  for (let i = 0; i < primerDiaSemana; i++) {
    dias.push({ dia: 0, esDelMes: false, turnos: [] });
  }

  // Días del mes
  for (let d = 1; d <= totalDias; d++) {
    const key = `dia_${d}` as keyof ProgramacionEmpleado;
    const turnos: TurnoCalendario[] = [];

    for (const prog of programaciones) {
      const valor = prog[key];
      if (valor) {
        turnos.push({
          codigo: valor as string,
          cliente: prog.tercero_nombre_corto,
          puesto: prog.puesto_nombre,
        });
      }
    }

    dias.push({ dia: d, esDelMes: true, turnos });
  }

  // Padding después del último día para completar la última semana
  while (dias.length % 7 !== 0) {
    dias.push({ dia: 0, esDelMes: false, turnos: [] });
  }

  // Agrupar en semanas de 7 días
  const semanas: DiaCalendario[][] = [];
  for (let i = 0; i < dias.length; i += 7) {
    semanas.push(dias.slice(i, i + 7));
  }

  return semanas;
}
