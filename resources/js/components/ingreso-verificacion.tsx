import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isValidRut } from '@/lib/utils';
import { RestriccionData, VisitaData } from '@/types/visits';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function IngresoVerificacion({
    data,
    setData,
    state,
    setState,
}: {
    data: VisitaData;
    setData: (value: VisitaData) => void;
    state: boolean;
    setState: (state: boolean) => void;
}) {
    const [restricciones, setRestricciones] = useState<RestriccionData[]>([]);

    const validationSchema = z.object({
        rutPaciente: z.string().min(1, { message: 'El RUT del paciente es obligatorio' }),
        dvPaciente: z.custom<string>((val) => isValidRut(data.rutPaciente, val), {
            message: 'El dígito verificador del paciente es inválido',
        }),
        rutVisitante: z.string().min(1, 'El RUT del visitante es obligatorio'),
        dvVisitante: z.custom<string>((val) => isValidRut(data.rutVisitante, val), {
            message: 'El dígito verificador del visitante es inválido',
        }),
    });

    const form = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        values: {
            rutPaciente: data.rutPaciente,
            dvPaciente: data.dvPaciente,
            rutVisitante: data.rutVisitante,
            dvVisitante: data.dvVisitante,
        },
    });

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        setData({ ...data, [target.name]: target.value });
    };

    const [verifyVariant, setVerifyVariant] = useState(false);

    useEffect(() => {
        // Check if the state is 'Verificado' to set the verifyVariant
        if (state) {
            setVerifyVariant(true);
        } else {
            setVerifyVariant(false);
        }
    }, [state]);

    const handleVerify = () => {
        // console.log(restricciones, restricciones.length);
        if (restricciones.length === 0) {
            setState(true);
            toast.info('INGRESO VERIFICADO', {
                description: 'Visita sin problemas en el registro.',
                duration: 3000,
            });
        } else {
            restricciones.forEach((item) => {
                // console.log(item, data);
                if (
                    item.rutPaciente === data.rutPaciente &&
                    item.dvPaciente === data.dvPaciente &&
                    item.rutVisita === data.rutVisitante &&
                    item.dvVisita === data.dvVisitante
                ) {
                    setState(false);
                    toast.error('INGRESO DENEGADO', { description: 'El paciente tiene restricciones de visita.', duration: 3000 });
                } else {
                    setState(true);
                    toast.info('INGRESO VERIFICADO', {
                        description: 'Visita sin problemas en el registro.',
                        duration: 3000,
                    });
                }
            });
        }
    };
    async function onSubmit(values: z.infer<typeof validationSchema>) {
        await fetch(`/restricciones/${values.rutPaciente}`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((object) => {
                        setRestricciones([]);
                        object.data.forEach((value: RestriccionData) => {
                            // console.log(value);
                            restricciones.push(value);
                            // setRestricciones([...restricciones, value]);
                        });
                        // console.log(restricciones);
                        handleVerify();
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching restrictions:', error);
                toast.error('Error al verificar restricciones', { duration: 3000 });
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                        disabled={verifyVariant}
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
                                        disabled={verifyVariant}
                                        onChange={handleChange}
                                        maxLength={1}
                                        name="dvPaciente"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <p className="px-6"> o </p>
                    <Button className="cursor-pointer" type="button" disabled={verifyVariant}>
                        <Search />
                        Buscar por Nombre
                    </Button>
                </div>

                <Label>Rut del Visitante</Label>
                <div className="flex flex-row align-middle">
                    <FormField
                        control={form.control}
                        name="rutVisitante"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Ingrese el rut del visitante"
                                        className="mb-4 w-[200px]"
                                        onChange={handleChange}
                                        disabled={verifyVariant}
                                        maxLength={8}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <p className="px-4"> - </p>
                    <FormField
                        control={form.control}
                        name="dvVisitante"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="dv"
                                        className="w-11"
                                        disabled={verifyVariant}
                                        onChange={handleChange}
                                        maxLength={1}
                                        name="dvVisitante"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-36 cursor-pointer" disabled={verifyVariant} type="submit">
                    {verifyVariant ? 'Verificado' : 'Verificar'}
                </Button>
            </form>
        </Form>
    );
}
