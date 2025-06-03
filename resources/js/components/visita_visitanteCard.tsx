import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
          <h6>{fecha_ingreso}</h6>
          {fecha_salida && (
            <>
              <h3>Fecha Salida</h3>
              <h6>{fecha_salida}</h6>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}