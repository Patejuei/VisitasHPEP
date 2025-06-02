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

import { VisitaData } from "@/types/visits";


export default function Ingreso() {
  const [datosVisita, setDatosVisita] = useState<VisitaData>({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: 0,
    direccion: "",
    rutPaciente: "",
    dvPaciente: "",
    rutVisitante: "",
    dvVisitante: ""
  })
  const [verificar, setVerificar] = useState("NoVerificado");

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
    <CardContent className="flex h-full justify-left">
      <IngresoVerificacion data={datosVisita} setData={setDatosVisita} state={verificar} setState={setVerificar} />
    </CardContent>
  </Card>
  <Toaster richColors visibleToasts={10}/>
</>
}