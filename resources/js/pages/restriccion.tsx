import FormRutInput from '@/components/formRutInput';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Toaster } from 'sonner';

export default function Restriccion() {
    return (
        <>
            <Head title="Ingreso de Restricción de Visitas" />
            <Card className="mx-12 my-4 h-full">
                <CardHeader className="align-center flex">
                    <CardTitle>
                        Ingreso de Restricción de Visitas
                        <Link className={buttonVariants({ variant: 'outline' })} href={route('home')}>
                            <ArrowLeft />
                            Volver
                        </Link>
                    </CardTitle>
                    <CardDescription>Registre una restricción de visita para un paciente.</CardDescription>
                </CardHeader>
                <CardContent className="justify-left flex h-full">
                    <FormRutInput />
                </CardContent>
            </Card>
            <Toaster richColors />
        </>
    );
}
