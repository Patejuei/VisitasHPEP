import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { Eye, LogOut } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { TableCell, TableRow } from './ui/table';
import { TableRowProps } from '@/types/visits';
import { formatDateOptions } from '@/lib/utils';

export function HomeTableRow({ visitante_nombre, visitante_apellido, fecha_ingreso, id }: TableRowProps)  {
    const fecha_ingreso_date = new Date(fecha_ingreso);
    return (
        <TableRow>
            <TableCell>{visitante_nombre} {visitante_apellido}</TableCell>
            <TableCell>{fecha_ingreso_date.toLocaleDateString('ES-cl', formatDateOptions)}</TableCell>
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
