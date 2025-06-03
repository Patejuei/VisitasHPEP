export interface VisitaData {
      nombre: string,
      apellido_paterno: string,
      apellido_materno: string,
      telefono: string,
      direccion: string,
      rutPaciente : string,
      dvPaciente : string,
      rutVisitante : string,
      dvVisitante : string,
      idTarjeta: string
}

export interface RestriccionData {
      id?: number,
      rutPaciente: string,
      dvPaciente: string,
      rutVisita: string,
      dvVisita: string,
      motivo: string,
}

export interface TableRowProps {
    visitante_nombre: string;
    visitante_apellido: string;
    fecha_ingreso: string;
    id: string;
}