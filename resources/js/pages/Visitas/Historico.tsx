import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from '@/components/visitas/columns';
import { DataTable } from '@/components/visitas/data-table';
import { VisitaHistoricoData } from '@/types/visits';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {Link} from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Historico() {
    const [visitas, setVisitas] = useState<VisitaHistoricoData[]>([
        {
            id: 0,
            fecha_ingreso: '',
            fecha_salida: null,
            paciente_nombre: '',
            paciente_apellido: '',
            visitante_nombre: '',
            visitante_apellido: '',
        },
    ]);
    useEffect(() => {
        fetch(route('visitas.indexAll')).then((response) =>
            response.json().then((data) => {
                console.log(data);
                setVisitas(data);
            }),
        );
    }, []);
    return (
        <>
            <Head title="Historico de Visitas" />
            <Card className="mx-12 my-4 h-full">
                <CardHeader>
                    <CardTitle>Historico de Visitas
                        <Link href={route('home')} className={buttonVariants({variant: "outline"}) + ' ml-8'}> <ArrowLeft/>Volver</Link>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex h-full flex-col items-center justify-center">
                    <DataTable columns={columns} data={visitas} />
                </CardContent>
            </Card>
        </>
    );
}
