import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RestriccionData, VisitaData } from '@/types/visits';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Paciente, PacientesDataTable } from './buscar_pacientes/data-table';
export default function BuscarPacienteDialog({
    open,
    onOpenChange,
    children,
    formData,
    setFormData,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    setFormData: React.Dispatch<React.SetStateAction<RestriccionData | VisitaData>>;
    formData: VisitaData | RestriccionData;
}) {
    const [pacientesData, setPacientesData] = useState<Paciente[]>([]);
    useEffect(() => {
        fetch(route('getPacientes')).then((res) => {
            res.json().then((data) => {
                setPacientesData(data);
            });
        });
    }, []);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Buscar Paciente</DialogTitle>
                    <DialogDescription>
                        <PacientesDataTable formData={formData} dataSetter={setFormData} data={pacientesData} setOpenDialog={onOpenChange} />
                    </DialogDescription>
                </DialogHeader>
                <Toaster richColors />
            </DialogContent>
        </Dialog>
    );
}
