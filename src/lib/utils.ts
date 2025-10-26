import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const fN = (value: number, decimals = 2, notation?: Intl.NumberFormatOptions['notation']) => {
	return value.toLocaleString('en-UK', {
		notation: notation ?? 'compact',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
};

export const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('en-UK', {
		month: 'long',
		year: 'numeric'
	});
};

// format 'fossil-fuel-operations' to 'Fossil Fuel Operations'
export const formatSector = (sector: string) => {
	return sector.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};
