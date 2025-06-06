import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VisitaPacienteCard from '@/components/visita_pacienteCard';
import VisitaVisitanteCard from '@/components/visita_visitanteCard';
import { VisitaViewData } from '@/types/visits';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
export default function Visita({ id }: { id: string }) {
    const [visita, setVisita] = useState<VisitaViewData>({
        fecha_ingreso: '',
        fecha_salida: null,
        id_tarjeta: '',
        paciente_apellido: '',
        paciente_nombre: '',
        paciente_rut: '',
        paciente_dv: '',
        paciente_apellido_materno: '',
        paciente_unidad: '',
        visitante_nombre: '',
        visitante_apellido: '',
        visitante_apellido_materno: '',
        visitante_rut: '',
        visitante_dv: '',
        visitante_telefono: '',
        visitante_direccion: '',
    });
    useEffect(() => {
        fetch(route('visita', id))
            .then((response) => response.json())
            .then((data) => {
                setVisita(data);
            })
            .catch((error) => {
                console.error('Error fetching visita:', error);
            });
    }, []);
    return (
        <>
            <Head title={`Visita`} />
            <Card className="mx-12 my-4 h-full">
                <CardHeader>
                    <CardTitle>Informacion de la Visita <Link href={route('home')} className={buttonVariants({variant: "outline"})}> <ArrowLeft/>Volver</Link></CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <VisitaPacienteCard
                            nombre={visita.paciente_nombre}
                            apellido={visita.paciente_apellido}
                            apellido_materno={visita.paciente_apellido_materno}
                            rut={visita.paciente_rut}
                            dv={visita.paciente_dv}
                            unidad={visita.paciente_unidad}
                        />
                        <VisitaVisitanteCard
                            nombre={visita.visitante_nombre}
                            apellido={visita.visitante_apellido}
                            apellido_materno={visita.visitante_apellido_materno}
                            rut={visita.visitante_rut}
                            dv={visita.visitante_dv}
                            telefono={visita.visitante_telefono}
                            direccion={visita.visitante_direccion}
                            id_tarjeta={visita.id_tarjeta}
                            fecha_ingreso={visita.fecha_ingreso}
                            fecha_salida={visita.fecha_salida}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
