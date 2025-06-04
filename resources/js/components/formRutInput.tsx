//import ui components
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { Textarea } from './ui/textarea';
//import utils and types
import { isValidRut } from '@/lib/utils';
import { RestriccionData } from '@/types/visits';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
//import hooks
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BuscarPacienteDialog from './buscarPaciente_dialog';

export default function FormRutInput() {
    const [data, setData] = useState<RestriccionData>({
        rutPaciente: '',
        dvPaciente: '',
        rutVisita: '',
        dvVisita: '',
        motivo: '',
    });

    const [openDialog, setOpenDialog] = useState(false);
    const handleChange = ({ target }: { target: HTMLInputElement | HTMLTextAreaElement }) => {
        setData({ ...data, [target.name]: target.value });
    };
    const validationSchema = z.object({
        rutPaciente: z.string().min(1, { message: 'El RUT del paciente es obligatorio' }),
        dvPaciente: z.custom<string>((val) => isValidRut(data.rutPaciente, val), {
            message: 'El dígito verificador del paciente es inválido',
        }),
        rutVisita: z.string().min(1, 'El RUT del visitante es obligatorio'),
        dvVisita: z.custom<string>((val) => isValidRut(data.rutVisita, val), {
            message: 'El dígito verificador del visitante es inválido',
        }),
        motivo: z.string().min(1, { message: 'El motivo de la restricción es obligatorio' }),
    });

    const form = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            rutPaciente: '',
            dvPaciente: '',
            rutVisita: '',
            dvVisita: '',
            motivo: '',
        },
        values: {
            rutPaciente: data.rutPaciente,
            dvPaciente: data.dvPaciente,
            rutVisita: data.rutVisita,
            dvVisita: data.dvVisita,
            motivo: data.motivo,
        },
    });

    async function onSubmit(values: z.infer<typeof validationSchema>) {
        console.log(JSON.stringify(values));
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servidor
        await fetch(route('restricciones.store'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(values),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('Restricción ingresada correctamente');
                    form.reset();
                } else {
                    response.json().then((data) => {
                        console.error(data.message);
                    });
                }
            })
            .catch((error) => {
                console.log('Error al ingresar la restricción:', error);
                toast.error('Error al ingresar la restricción');
            });
    }

    useEffect(() => {
        Object.values(form.formState.errors).forEach((error) => {
            toast.error(error.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.formState.isSubmitted]);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
                <Label>Rut del Paciente</Label>
                <div className="flex flex-row align-middle">
                    <FormField
                        control={form.control}
                        name="rutPaciente"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Ingrese el rut del paciente"
                                        className="mb-4 w-[200px]"
                                        onChange={handleChange}
                                        maxLength={8}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="px-4"> - </p>
                    <FormField
                        control={form.control}
                        name="dvPaciente"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="dv"
                                        className="w-11"
                                        onChange={handleChange}
                                        maxLength={1}
                                        name="dvPaciente"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <p className="px-6"> o </p>
                    <BuscarPacienteDialog formData={data} setFormData={setData} onOpenChange={() => setOpenDialog(!openDialog)} open={openDialog}>
                        <Button className="cursor-pointer">
                            <Search />
                            Buscar por Nombre
                        </Button>
                    </BuscarPacienteDialog>
                </div>

                <Label>Rut del Visitante</Label>
                <div className="flex flex-row align-middle">
                    <FormField
                        control={form.control}
                        name="rutVisita"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Ingrese el rut del visitante"
                                        className="mb-4 w-[200px]"
                                        onChange={handleChange}
                                        maxLength={8}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <p className="px-4"> - </p>
                    <FormField
                        control={form.control}
                        name="dvVisita"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="dv" className="w-11" onChange={handleChange} maxLength={1} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Label>Motivo de la restriccion</Label>
                <FormField
                    control={form.control}
                    name="motivo"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea {...field} placeholder="Motivo de la restriccion" onChange={handleChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="my-8 w-36 cursor-pointer" type="submit">
                    Ingresar
                </Button>
            </form>
        </Form>
    );
}
