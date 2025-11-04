import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getCssVariableHex(varName: string) {
	const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

	return oklchToHex(value);
}

function oklchToHex(oklch: string) {
	const match = oklch.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)/);
	if (!match) return oklch;

	let [, L, C, H] = match.map((v) => parseFloat(v));

	L = L / 100;

	const hueRad = (H * Math.PI) / 180;
	const a = C * Math.cos(hueRad);
	const b = C * Math.sin(hueRad);

	const l = L + 0.3963377774 * a + 0.2158037573 * b;
	const m = L - 0.1055613458 * a - 0.0638541728 * b;
	const s = L - 0.0894841775 * a - 1.291485548 * b;

	const l3 = l * l * l;
	const m3 = m * m * m;
	const s3 = s * s * s;

	const r = 4.0767416621 * l3 - 3.3077363322 * m3 + 0.2309101289 * s3;
	const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193761 * s3;
	const bn = -0.0041960771 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

	const toGamma = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);

	const [R, G, B] = [r, g, bn]
		.map(toGamma)
		.map((v) => Math.round(Math.max(0, Math.min(1, v)) * 255));

	return `#${[R, G, B].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}

export const fN = (
	value: number,
	decimals = 2,
	notation?: Intl.NumberFormatOptions['notation']
) => {
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

type ActivityUnit = 'USD' | 'ha' | 'animal head' | 't' | 't CO2' | 'MWh' | string;

interface UnitConfig {
	label: string;
	format: (val: number) => string;
	phosphorIcon: string;
	capacityMeaning: 'utilization' | 'area' | 'herd_size' | 'throughput' | 'spatial';
	showCapacityCard: boolean;
	emissionsFactorConfig: {
		multiplier: number;
		baseUnit: string;
		display: (val: number) => string;
	};
}

const unitRegistry: Record<string, UnitConfig> = {
	USD: {
		label: 'Economic Activity',
		format: (val) => `$${fN(val / 1e6, 1)}M`,
		phosphorIcon: 'CurrencyDollar',
		capacityMeaning: 'utilization',
		showCapacityCard: false,
		emissionsFactorConfig: {
			multiplier: 1000,
			baseUnit: '$1K',
			display: (val) => `${fN(val, 1)} g CO₂e`
		}
	},
	ha: {
		label: 'Land Area',
		format: (val) => `${fN(val, 0)} ha`,
		phosphorIcon: 'Globe',
		capacityMeaning: 'area',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1,
			baseUnit: 'hectare',
			display: (val) => `${fN(val, 2)} t CO₂e`
		}
	},
	'animal head': {
		label: 'Livestock',
		format: (val) => `${fN(Math.round(val), 0)} animals`,
		phosphorIcon: 'Horse',
		capacityMeaning: 'herd_size',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1,
			baseUnit: 'animal/year',
			display: (val) => `${fN(val, 2)} t CO₂e`
		}
	},
	t: {
		label: 'Production Volume',
		format: (val) => `${fN(val, 1)} tonnes`,
		phosphorIcon: 'Factory',
		capacityMeaning: 'throughput',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1000,
			baseUnit: 'tonne',
			display: (val) => `${fN(val, 0)} kg CO₂e`
		}
	},
	't CO2': {
		label: 'CO₂ Production',
		format: (val) => `${fN(val / 1000, 1)}K t CO₂`,
		phosphorIcon: 'Wind',
		capacityMeaning: 'spatial',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1,
			baseUnit: 't CO₂',
			display: (val) => `${fN(val, 3)} t CO₂e`
		}
	},
	MWh: {
		label: 'Energy Output',
		format: (val) => `${fN(val / 1e6, 2)} TWh`,
		phosphorIcon: 'Lightning',
		capacityMeaning: 'utilization',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1,
			baseUnit: 'MWh',
			display: (val) => `${fN(val, 2)} t CO₂e`
		}
	},
	't of alumina/aluminum': {
		label: 'Alumina/Aluminum Production',
		format: (val) => `${fN(val, 2)} tonnes`,
		phosphorIcon: 'Package',
		capacityMeaning: 'utilization',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1000,
			baseUnit: 'tonne',
			display: (val) => `${fN(val, 0)} kg CO₂e`
		}
	},
	't of fuel': {
		label: 'Fuel Consumption',
		format: (val) => `${fN(val, 1)} tonnes`,
		phosphorIcon: 'GasPump',
		capacityMeaning: 'throughput',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1,
			baseUnit: 't of fuel',
			display: (val) => `${fN(val, 2)} t CO₂e`
		}
	},
	flights: {
		label: 'Flight Operations',
		format: (val) => `${fN(Math.round(val), 0)} flights`,
		phosphorIcon: 'Airplane',
		capacityMeaning: 'throughput',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1,
			baseUnit: 'flight',
			display: (val) => `${fN(val, 2)} t CO₂e`
		}
	},
	BBL: {
		label: 'Oil Production',
		format: (val) => `${fN(val / 1e6, 1)}M barrels`,
		phosphorIcon: 'Drop',
		capacityMeaning: 'throughput',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1,
			baseUnit: 'barrel',
			display: (val) => `${fN(val, 3)} t CO₂e`
		}
	},
	'BBL per day': {
		label: 'Daily Production Capacity',
		format: (val) => `${fN(val / 1000, 1)}K BBL/day`,
		phosphorIcon: 'Drop',
		capacityMeaning: 'throughput',
		showCapacityCard: true,
		emissionsFactorConfig: {
			multiplier: 1,
			baseUnit: 'BBL/day',
			display: (val) => `${fN(val, 2)} t CO₂e`
		}
	}
};

const getUnitConfig = (unit: string): UnitConfig => {
	return (
		unitRegistry[unit] || {
			label: 'Activity',
			format: (val) => fN(val),
			phosphorIcon: 'ChartBar',
			capacityMeaning: 'utilization' as const,
			showCapacityCard: true,
			emissionsFactorConfig: {
				multiplier: 1,
				baseUnit: unit,
				display: (val) => `${fN(val, 2)} t CO₂e`
			}
		}
	);
};

export const formatActivity = (value: number, unit: string) => {
	return getUnitConfig(unit).format(value);
};

export const formatEmissionsFactor = (factor: number, unit: string) => {
	const config = getUnitConfig(unit).emissionsFactorConfig;
	const valueInTonnes = factor * config.multiplier;

	if (valueInTonnes < 0.001) {
		return `${fN(valueInTonnes * 1000000, 0)} g CO₂e`;
	} else if (valueInTonnes < 1) {
		return `${fN(valueInTonnes * 1000, 0)} kg CO₂e`;
	}

	return config.display(valueInTonnes);
};

export const getActivityIcon = (unit: string) => {
	return getUnitConfig(unit).phosphorIcon;
};

export const getActivityLabel = (unit: string) => {
	return getUnitConfig(unit).label;
};

export const shouldShowCapacityCard = (unit: string) => {
	return getUnitConfig(unit).showCapacityCard;
};

export const getCapacityTooltip = (unit: string) => {
	const meanings: Record<UnitConfig['capacityMeaning'], string> = {
		utilization: 'Percentage of maximum capacity achieved',
		area: 'Total land area contributing to emissions',
		herd_size: 'Average number of animals over the period',
		throughput: 'Production capacity utilization',
		spatial: 'Spatial extent of emissions activity'
	};
	return meanings[getUnitConfig(unit).capacityMeaning];
};

export const formatCapacityFactor = (capacityFactor: number, unit: string, capacity?: number) => {
	const config = getUnitConfig(unit);
	if (config.capacityMeaning === 'utilization') {
		if (capacity !== undefined && capacity > 0 && capacityFactor > 2) {
			return `${fN((capacityFactor / capacity) * 100, 1)}%`;
		}
		return `${fN(capacityFactor * 100, 1)}%`;
	}
	if (config.capacityMeaning === 'area' || config.capacityMeaning === 'spatial') {
		return `${fN(capacityFactor, 0)} ha`;
	}
	if (config.capacityMeaning === 'herd_size') {
		return `${fN(Math.round(capacityFactor), 0)} animals`;
	}
	return fN(capacityFactor, 2);
};

export const getCapacityLabel = (unit: string) => {
	const config = getUnitConfig(unit);
	const labels: Record<UnitConfig['capacityMeaning'], string> = {
		utilization: 'Utilization Rate',
		area: 'Total Area',
		herd_size: 'Herd Size',
		throughput: 'Capacity Utilization',
		spatial: 'Spatial Extent'
	};
	return labels[config.capacityMeaning];
};

export const getEmissionsFactorUnit = (factor: number, unit: string) => {
	const config = getUnitConfig(unit).emissionsFactorConfig;
	const valueInTonnes = factor * config.multiplier;

	if (valueInTonnes < 0.001) {
		return `g CO₂e per ${config.baseUnit}`;
	} else if (valueInTonnes < 1) {
		return `kg CO₂e per ${config.baseUnit}`;
	}

	return `t CO₂e per ${config.baseUnit}`;
};
