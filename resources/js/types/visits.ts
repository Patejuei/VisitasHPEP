export interface VisitaData {
      nombre: string,
      apellido_paterno: string,
      apellido_materno: string,
      telefono: number,
      direccion: string,
      rutPaciente : string,
      dvPaciente : string,
      rutVisitante : string,
      dvVisitante : string,
}

export interface RestriccionData {
      id?: number,
      rutPaciente: string,
      dvPaciente: string,
      rutVisitante: string,
      dvVisitante: string,
      motivo: string,
}