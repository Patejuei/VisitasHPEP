import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RestriccionData, VisitaData } from '@/types/visits';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export type Paciente = {
    rut: string;
    dv: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string; // Add id if needed for actions column
};

interface DataTableProps {
    data: Paciente[];
    dataSetter: (value: VisitaData | RestriccionData) => void;
    formData: VisitaData | RestriccionData;
    setOpenDialog: (open: boolean) => void;
}

export function PacientesDataTable({ data, dataSetter, formData, setOpenDialog }: DataTableProps) {
    const columns: ColumnDef<Paciente>[] = [
        {
            accessorKey: 'apellido_paterno',
            header: '',
            cell: () => null,
            size: 0,
        },
        {
            accessorKey: 'apellido_materno',
            header: '',
            cell: () => null,
            size: 0,
        },
        {
            accessorKey: 'nombre',
            header: 'Paciente',
            cell: ({ row }) => {
                const nombre = row.getValue('nombre');
                const apellido = row.getValue('apellido_paterno');
                const apellido_materno = row.getValue('apellido_materno');
                return `${nombre} ${apellido} ${apellido_materno}`;
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
            header: 'Seleccionar',
            cell: ({ row }) => {
                const rut = row.getValue('rut') as string;
                const dv = row.getValue('dv') as string;
                const ButtonClicker = () => {
                    dataSetter({ ...formData, rutPaciente: rut, dvPaciente: dv });
                    setOpenDialog(false);
                };
                return (
                    <Button onClick={ButtonClicker} className="cursor-pointer">
                        <Check className="h-4 w-4" /> <h6>Seleccionar</h6>
                    </Button>
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
            <div className="ali flex flex-row">
                <Input
                    placeholder="Por Nombre"
                    value={(table.getColumn('nombre')?.getFilterValue() as string) ?? ''}
                    onChange={({ target }: { target: HTMLInputElement }) => table.getColumn('nombre')?.setFilterValue(target.value)}
                    className="mx-2 mb-4 max-w-sm"
                />
                <Input
                    placeholder="Por Apellido Paterno"
                    value={(table.getColumn('apellido_paterno')?.getFilterValue() as string) ?? ''}
                    onChange={({ target }: { target: HTMLInputElement }) => table.getColumn('apellido_paterno')?.setFilterValue(target.value)}
                    className="mx-2 mb-4 max-w-sm"
                />
                <Input
                    placeholder="Por Apellido Materno"
                    value={(table.getColumn('apellido_materno')?.getFilterValue() as string) ?? ''}
                    onChange={({ target }: { target: HTMLInputElement }) => table.getColumn('apellido_materno')?.setFilterValue(target.value)}
                    className="mx-2 mb-4 max-w-sm"
                />
            </div>
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
