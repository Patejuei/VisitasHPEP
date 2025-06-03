export interface VisitaData {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    direccion: string;
    rutPaciente: string;
    dvPaciente: string;
    rutVisitante: string;
    dvVisitante: string;
    idTarjeta: string;
}

export interface RestriccionData {
    id?: number;
    rutPaciente: string;
    dvPaciente: string;
    rutVisita: string;
    dvVisita: string;
    motivo: string;
}

export interface TableRowProps {
    visitante_nombre: string;
    visitante_apellido: string;
    fecha_ingreso: string;
    id: string;
    setSelection: any;
}

export interface VisitaViewData {
    fecha_ingreso: string;
    fecha_salida: string | null;
    id_tarjeta: string;
    paciente_apellido: string;
    paciente_nombre: string;
    paciente_rut: string;
    paciente_dv: string;
    paciente_apellido_materno: string;
    paciente_unidad: string;
    visitante_nombre: string;
    visitante_apellido: string;
    visitante_apellido_materno: string;
    visitante_rut: string;
    visitante_dv: string;
    visitante_telefono: string;
    visitante_direccion: string;
}
