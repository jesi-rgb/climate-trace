import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const fN = (value: number, decimals = 2) => {
	return value.toLocaleString('en-UK', {
		notation: 'compact',
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
};

// format 'fossil-fuel-operations' to 'Fossil Fuel Operations'
export const formatSector = (sector: string) => {
	return sector.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};
