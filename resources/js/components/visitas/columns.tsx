import { ColumnDef } from '@tanstack/react-table';
import { formatDateOptions } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { buttonVariants } from '../ui/button';

export type Visita = {
  id: number;
  fecha_ingreso: string;
  fecha_salida: string | null;
  paciente_nombre: string;
  paciente_apellido: string;
  visitante_nombre: string;
  visitante_apellido: string;
}

export const columns: ColumnDef<Visita>[] = [
  {
    accessorKey: 'fecha_ingreso',
    header: 'Fecha Ingreso',
    cell: ({row}) => {
      const date = new Date(row.getValue('fecha_ingreso'));
      return date.toLocaleDateString('es-ES', formatDateOptions);
    },
    size: 150,
  },
  {
    accessorKey: 'id',
    header: '',
    cell: () => null,
    size: 0,
  },
  {
    accessorKey: 'paciente_apellido',
    header: '',
    cell: () => null,
    size: 0,
  },
  {
    accessorKey: 'paciente_nombre',
    header: 'Paciente',
    cell: ({row}) => {
      const nombre = row.getValue('paciente_nombre');
      const apellido = row.getValue('paciente_apellido');
      return `${nombre} ${apellido}`;
    },
    size: 150,
  },
  {
    accessorKey: 'visitante_apellido',
    header: '',
    cell: () => null,
    size: 0,
  },
  {
    accessorKey: 'visitante_nombre',
    header: 'Visitante Nombre',
    cell: ({row}) => {
      const nombre = row.getValue('visitante_nombre');
      const apellido = row.getValue('visitante_apellido');
      return `${nombre} ${apellido}`;
    },
    size: 150,
  },
  {
    accessorKey: 'fecha_salida',
    header: 'Fecha Salida',
    cell: ({row}) => {
      const fechaSalida = row.getValue('fecha_salida');
      if (!fechaSalida) return 'En curso';
      const date = new Date(fechaSalida as string);
      return date.toLocaleDateString('es-ES', formatDateOptions);
    },
    size: 150,
  },
  {
    id: 'actions',
    header: 'Ver',
    cell: ({row}) => {
      const id = row.getValue('id');
      return (
        <Link
          href={'/visita/' + id}
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <Eye className="h-4 w-4" />
        </Link>
      );
    },
  }
]