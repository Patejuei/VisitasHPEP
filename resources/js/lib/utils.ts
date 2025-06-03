import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const formatDateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit'
    };

export function isValidRut(rut: string, dv: string): boolean {
    if (!rut) return false;

    // console.log(`Validating RUT: ${rut}, DV: ${dv}`);
    const body = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    const cleanDv = dv.replace(/[^0-9kK]/g, '').toUpperCase();
    // console.log (`Body: ${body}, Clean DV: ${cleanDv}`);

    if (body.length < 7 || body.length > 8) return false;

    let sum = 0;
    let factor = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i], 10) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const calculatedDv = (11 - (sum % 11)) % 11;
    const expectedDv = calculatedDv === 10 ? 'K' : calculatedDv.toString();
    // console.log(`Calculated DV: ${calculatedDv}, Expected DV: ${expectedDv}`);

    return cleanDv === expectedDv;
}