import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isValidRut } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface IngresoVerificacionProps {
    rutPaciente: string;
    dvPaciente: string;
    rutVisitante: string;
    dvVisitante: string;
}
export default function IngresoVerificacion({
    data,
    setData,
    state,
    setState,
}: {
    data: IngresoVerificacionProps;
    setData: (value: IngresoVerificacionProps) => void;
    state: string;
    setState: (state: string) => void;
}) {
    const validationSchema = z.object({
        rutPaciente: z.string().min(1, {message: 'El RUT del paciente es obligatorio'}),
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
        defaultValues: {
            rutPaciente: data.rutPaciente,
            dvPaciente: data.dvPaciente,
            rutVisitante: data.rutVisitante,
            dvVisitante: data.dvVisitante,
        },
    });

    function onSubmit(values: z.infer<typeof validationSchema>) {
        console.log('Form submitted:', values);
    }

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        setData({ ...data, [target.name]: target.value });
    };
    const [verifyVariant, setVerifyVariant] = useState(false);
    const handleVerify = () => {
        setVerifyVariant(true);
        console.log(data);
        toast.info('INGRESO VERIFICADO', {
            description: 'Visita registrada con restricciones del usuario.',
            duration: 3000,
        });
    };
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
                                        value={data.rutPaciente}
                                        name="rutPaciente"
                                        // disabled={verifyVariant}
                                        maxLength={8}
                                    />
                                </FormControl>
                                <toast>

                <FormMessage />
                                </toast>
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
                                        // disabled={verifyVariant}
                                        onChange={handleChange}
                                        value={data.dvPaciente}
                                        maxLength={1}
                                        name="dvPaciente"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="px-6"> o </p>
                    <Button className="cursor-pointer" disabled={verifyVariant}>
                        <Search />
                        Buscar por Nombre
                    </Button>
                </div>

                <Label>Rut del Visitante</Label>
                <div className="flex flex-row align-middle">
                    <Input
                        type="text"
                        placeholder="Ingrese el rut del visitante"
                        className="mb-4 w-[200px]"
                        onChange={handleChange}
                        value={data.rutVisitante}
                        name="rutVisitante"
                        disabled={verifyVariant}
                        maxLength={8}
                    />
                    <p className="px-4"> - </p>
                    <Input
                        type="text"
                        placeholder="dv"
                        className="w-11"
                        disabled={verifyVariant}
                        maxLength={1}
                        name="dvVisitante"
                        onChange={handleChange}
                        value={data.dvVisitante}
                    />
                </div>
                <Button className="w-36 cursor-pointer" disabled={verifyVariant} type="submit">
                    {verifyVariant ? 'Verificado' : 'Verificar'}
                </Button>
            </form>
        </Form>
    );
}
