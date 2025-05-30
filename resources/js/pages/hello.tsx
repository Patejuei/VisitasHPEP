import { HomeTableRow } from '@/components/home-tablerow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, Link } from '@inertiajs/react';

export default function Hello() {
    const reg_visitas = [
        { id: '1', name: 'Juan Perez', date: '2023-10-01 10:00' },
        { id: '2', name: 'Maria Lopez', date: '2023-10-01 11:00' },
        // Puedes agregar más registros de visitas aquí
    ];
    return (
        <>
            <Head title="Seleccione Requerimiento" />
            <Card className="mx-12 my-4 h-full">
                <CardHeader>
                    <CardTitle>Registro de Visitas</CardTitle>
                    <CardDescription>Sistema de registro y verificacion de visitas a los usuarios del hospital</CardDescription>
                </CardHeader>
                <CardContent className="flex h-full flex-col items-center justify-center">
                    <div className="flex grid-cols-2">
                        <Card className="m-2 w-80">
                            <CardHeader>
                                <CardTitle>Ingreso de Visita</CardTitle>
                                <CardDescription>Registre la entrada de una visita al hospital.</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href={route('ingreso')}>Registrar</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="m-2 w-80">
                            <CardHeader>
                                <CardTitle>Ingreso de Restriccion</CardTitle>
                                <CardDescription>Registre a una persona con restricciones con algun paciente.</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href={route('restriccion')}>Registrar</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="m-2 w-80">
                            <CardHeader>
                                <CardTitle>Historico de Visitas</CardTitle>
                                <CardDescription>Visualize el registro de visitas realizadas al hospital.</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href={route('historico')}>Ver</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="flex h-full flex-col items-center justify-center">
                        <CardTitle className="my-4">Visitas en Curso</CardTitle>
                        <div className="flex h-full flex-col items-center justify-center">
                            <Table className="w-200">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px] font-bold" >Nombre</TableHead>
                                        <TableHead className="w-[150px] font-bold" >Fecha Ingreso</TableHead>
                                        <TableHead className="w-[100px] font-bold" >Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reg_visitas.map((visita) => (
                                        <HomeTableRow key={visita.id} name={visita.name} date={visita.date} id={visita.id} />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
