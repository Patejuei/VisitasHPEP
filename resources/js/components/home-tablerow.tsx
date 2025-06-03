import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { Eye, LogOut } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { TableCell, TableRow } from './ui/table';
import { TableRowProps } from '@/types/visits';

export function HomeTableRow({ visitante_nombre, visitante_apellido, fecha_ingreso, id }: TableRowProps)  {
    const fecha_ingreso_date = new Date(fecha_ingreso);
    // ...existing code...
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
    };
// ...existing code...
    return (
        <TableRow>
            <TableCell>{visitante_nombre} {visitante_apellido}</TableCell>
            <TableCell>{fecha_ingreso_date.toLocaleDateString('ES-cl', dateOptions)}</TableCell>
            <TableCell>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className='cursor-pointer'>
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
