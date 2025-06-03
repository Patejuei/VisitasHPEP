import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { buttonVariants } from '../ui/button';

export type Paciente = {
    rut: string;
    dv: string;
    nombre: string;
    apellido_paterno: string;
    id?: string | number; // Add id if needed for actions column
};

interface DataTableProps {
    data: Paciente[];
}

export function PacientesDataTable({ data }: DataTableProps) {
    const columns: ColumnDef<Paciente>[] = [
        {
            accessorKey: 'apellido_paterno',
            header: '',
            cell: () => null,
            size: 0,
        },
        {
            accessorKey: 'paciente_nombre',
            header: 'Paciente',
            cell: ({ row }) => {
                const nombre = row.getValue('nombre');
                const apellido = row.getValue('apellido_paterno');
                return `${nombre} ${apellido}`;
            },
            size: 150,
        },
        {
            accessorKey: 'dv',
            header: '',
            cell: () => null,
            size: 0,
        },
        {
            accessorKey: 'rut',
            header: 'RUT',
            cell: ({ row }) => {
                const rut = row.getValue('rut');
                const dv = row.getValue('dv');
                return `${rut}-${dv}`;
            },
            size: 150,
        },
        {
            id: 'actions',
            header: 'Ver',
            cell: ({ row }) => {
                const id = row.getValue('id');
                return (
                    <Link href={'/visita/' + id} className={buttonVariants({ variant: 'outline', size: 'icon' })}>
                        <Eye className="h-4 w-4" />
                    </Link>
                );
            },
        },
    ];
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        rowCount: 10,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    return (
        <>
            <Input
                placeholder="Buscar paciente..."
                value={(table.getColumn('paciente_nombre')?.getFilterValue() as string) ?? ''}
                onChange={({ target }: { target: HTMLInputElement }) => table.getColumn('paciente_nombre')?.setFilterValue(target.value)}
                className="mb-4 max-w-sm"
            />
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
