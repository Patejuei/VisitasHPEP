import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { Eye, LogOut } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { TableCell, TableRow } from './ui/table';

export function HomeTableRow({ name, date, id }: { name: string; date: string; id: string }) {
    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" className='cursor-pointer'>
                                <LogOut />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Salida {id} </TooltipContent>
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
