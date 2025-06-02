import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner";
import IngresoVerificacion from "@/components/ingreso-verificacion";
import { Head } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { VisitaData } from "@/types/visits";
import IngresoMainForm from "@/components/ingreso-mainForm";


export default function Ingreso() {
  const [datosVisita, setDatosVisita] = useState<VisitaData>({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    direccion: "",
    rutPaciente: "",
    dvPaciente: "",
    rutVisitante: "",
    dvVisitante: "",
    idTarjeta: "",
  })
  const [verificar, setVerificar] = useState(false);

  return <>
  <Head title="Ingreso de Visitas" />
  <Card className="mx-12 my-4 h-full">
    <CardHeader className="flex align-center">
      <CardTitle>Ingreso de Visitas
        <span className="ml-8">
        <Link href={route('home')} className={buttonVariants({variant: "outline"})}> <ArrowLeft/>Volver</Link>
        </span>
      </CardTitle>
      <CardDescription>
        Registre la entrada de una visita al hospital.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex h-full flex-col justify-left">
      <IngresoVerificacion data={datosVisita} setData={setDatosVisita} state={verificar} setState={setVerificar} />
      <Separator className="my-4"/>
      <IngresoMainForm values={datosVisita} setValues={setDatosVisita} verify={verificar}/>
    </CardContent>
  </Card>
  <Toaster richColors visibleToasts={10}/>
</>
}