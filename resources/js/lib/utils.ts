import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isValidRut(rut: string, dv: string): boolean {
    if (!rut) return false;

    const body = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    const cleanDv = dv.replace(/[^0-9kK]/g, '').toUpperCase();

    if (body.length < 7 || body.length > 8) return false;

    let sum = 0;
    let factor = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i], 10) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const calculatedDv = (11 - (sum % 11)) % 11;
    const expectedDv = calculatedDv === 10 ? 'K' : calculatedDv.toString();

    return cleanDv === expectedDv;
}