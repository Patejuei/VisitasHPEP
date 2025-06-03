import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface VisitaPacienteCardProps {
  nombre: string;
  apellido: string;
  apellido_materno: string;
  rut: string;
  dv: string;
  unidad: string;
}

export default function VisitaPacienteCard({
  nombre,
  apellido,
  apellido_materno,
  rut,
  dv,
  unidad,
}: VisitaPacienteCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Datos del Paciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <h3>Nombre</h3>
          <h6>{nombre} {apellido} {apellido_materno}</h6>
          <h3>RUT</h3>
          <h6>{rut} - {dv}</h6>
          <h3>Unidad</h3>
          <h6>{unidad}</h6>
        </div>
      </CardContent>
    </Card>
  );
}