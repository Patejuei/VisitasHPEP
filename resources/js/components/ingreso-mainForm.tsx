//import ui components
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
//import utils and types
import { VisitaData } from '@/types/visits';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
//import hooks
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function IngresoMainForm({
    values,
    setValues,
    verify,
}: {
    values: VisitaData;
    setValues: (value: VisitaData) => void;
    verify: boolean;
}) {
    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        setValues({ ...values, [target.name]: target.value });
    };
    const validationSchema = z.object({
        nombre: z.string().min(1, { message: 'El nombre es obligatorio' }).toUpperCase(),
        apellido_paterno: z.string().min(1, { message: 'El apellido paterno es obligatorio' }).toUpperCase(),
        apellido_materno: z.string().toUpperCase().optional(),
        telefono: z.string().min(1, { message: 'El teléfono es obligatorio' }),
        direccion: z.string().min(1, { message: 'La dirección es obligatoria' }).toUpperCase(),
        rutPaciente: z.string(),
        dvPaciente: z.string(),
        rutVisitante: z.string(),
        dvVisitante: z.string(),
        idTarjeta: z.string().min(1, { message: 'El ID de la tarjeta es obligatorio' }),
        verified: z.custom<boolean>((val) => val === true, { message: 'Debe verificar la visita antes de ingresarla' }),
    });
    const form = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        values: {
            nombre: values.nombre,
            apellido_paterno: values.apellido_paterno,
            apellido_materno: values.apellido_materno,
            telefono: values.telefono,
            direccion: values.direccion,
            rutPaciente: values.rutPaciente,
            dvPaciente: values.dvPaciente,
            rutVisitante: values.rutVisitante,
            dvVisitante: values.dvVisitante,
            idTarjeta: values.idTarjeta,
            verified: verify, // Inicialmente no verificado
        },
    });
    async function onSubmit(values: z.infer<typeof validationSchema>) {
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
        const visitaData = {
            fecha_inicio: new Date(),
            rut_visitante: values.rutVisitante,
            rut_paciente: values.rutPaciente,
            idTarjeta: values.idTarjeta,
        };
        console.log('Datos de la visita:', JSON.stringify(visitaData));

        const visitantData = {
            nombre: values.nombre,
            apellido_paterno: values.apellido_paterno,
            apellido_materno: values.apellido_materno,
            telefono: values.telefono,
            direccion: values.direccion,
            rut: values.rutVisitante,
            dv: values.dvVisitante,
        };
        console.log('Datos del visitante:', JSON.stringify(visitantData));
        await fetch(route('visitantes.create'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(visitantData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al crear el visitante');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Visitante creado:', data);
            })
            .catch((error) => {
                console.error(error.message);
                toast.error('Error al crear el visitante');
            });
        await fetch(route('visitas.store'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify(visitaData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al crear la visita');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Visita creada:', data);
            })
            .catch((error) => {
                console.error('Error al crear la visita:', error);
                toast.error('Error al crear la visita');
        })
        console.log('Formulario enviado:', values);
        toast.success('Formulario enviado correctamente');
    }

    useEffect(() => {
        Object.values(form.formState.errors).forEach((error) => {
            toast.warning(error.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.formState.isSubmitted]);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Nombre</Label>
                            <FormControl>
                                <Input {...field} placeholder="Nombre" onChange={handleChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apellido_paterno"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Apellido Paterno</Label>
                            <FormControl>
                                <Input {...field} placeholder="Apellido Paterno" onChange={handleChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apellido_materno"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Apellido Materno</Label>
                            <FormControl>
                                <Input {...field} placeholder="Apellido Materno" onChange={handleChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Teléfono</Label>
                            <FormControl>
                                <Input type="number" {...field} placeholder="Teléfono" onChange={handleChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Dirección</Label>
                            <FormControl>
                                <Input {...field} placeholder="Dirección" onChange={handleChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="idTarjeta"
                    render={({ field }) => (
                        <FormItem>
                            <Label>ID de la Tarjeta de Visita</Label>
                            <FormControl>
                                <Input {...field} placeholder="ID de la Tarjeta" onChange={handleChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Ingresar</Button>
            </form>
        </Form>
    );
}
