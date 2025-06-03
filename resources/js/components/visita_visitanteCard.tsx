import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDateOptions } from "@/lib/utils";

interface VisitaVisitanteCardProps {
  nombre: string;
  apellido: string;
  apellido_materno: string;
  rut: string;
  dv: string;
  telefono: string;
  direccion: string;
  id_tarjeta: string;
  fecha_ingreso: string;
  fecha_salida: string | null;
}

export default function VisitaVisitanteCard({
  nombre,
  apellido,
  apellido_materno,
  rut,
  dv,
  telefono,
  direccion,
  id_tarjeta,
  fecha_ingreso,
  fecha_salida,
}: VisitaVisitanteCardProps) {
  const fechaIngreso = new Date(fecha_ingreso);
  const fechaSalida = fecha_salida ? new Date(fecha_salida) : null;

  return (
    <Card className="card w-full my-4">
      <CardHeader>
        <CardTitle className="card-title">Datos del Visitante</CardTitle>
      </CardHeader>
      <CardContent className="card-content">
        <div className="grid grid-cols-2 gap-4">
          <h3>Nombre</h3>
          <h6>{nombre} {apellido} {apellido_materno}</h6>
          <h3>RUT</h3>
          <h6>{rut} - {dv}</h6>
          <h3>Teléfono</h3>
          <h6>{telefono}</h6>
          <h3>Dirección</h3>
          <h6>{direccion}</h6>
          <h3>ID Tarjeta</h3>
          <h6>{id_tarjeta}</h6>
          <h3>Fecha Ingreso</h3>
          <h6>{fechaIngreso.toLocaleDateString("ES-cl", formatDateOptions)}</h6>
          {fecha_salida && (
            <>
              <h3>Fecha Salida</h3>
              <h6>{fechaSalida?.toLocaleDateString("ES-cl", formatDateOptions)}</h6>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}