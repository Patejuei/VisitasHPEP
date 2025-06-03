import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { Eye, LogOut } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { TableCell, TableRow } from './ui/table';
import { TableRowProps } from '@/types/visits';
import { formatDateOptions } from '@/lib/utils';
import { toast } from 'sonner';

export function HomeTableRow({ visitante_nombre, visitante_apellido, fecha_ingreso, id, setSelection }: TableRowProps)  {
    const fecha_ingreso_date = new Date(fecha_ingreso);

    async function handleExit(id : string) {
        await fetch(route('visitas.update'), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({ id, fecha_salida: new Date() }),
        }).then((res) => {
            if (res.ok) {
                toast.success('Salida de visita registrada correctamente');
                setSelection(id)
            } else {
                console.error('Error al actualizar la visita');
            }
        })
    }
    return (
        <TableRow>
            <TableCell>{visitante_nombre} {visitante_apellido}</TableCell>
            <TableCell>{fecha_ingreso_date.toLocaleDateString('ES-cl', formatDateOptions)}</TableCell>
            <TableCell>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className='cursor-pointer' onClick={handleExit.bind(null, id)}>
                                <LogOut />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Salida</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/visita/${id}`} className={buttonVariants({ variant: 'outline' })}>
                                <Eye />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>Ver</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </TableCell>
        </TableRow>
    );
}
