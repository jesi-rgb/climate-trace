import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const fN = (value, decimals = 2, notation) => {
  return value.toLocaleString("en-UK", {
    notation: notation ?? "compact",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-UK", {
    month: "long",
    year: "numeric"
  });
};
const formatSector = (sector) => {
  return sector.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
const unitRegistry = {
  USD: {
    label: "Economic Activity",
    format: (val) => `$${fN(val / 1e6, 1)}M`,
    phosphorIcon: "CurrencyDollar",
    capacityMeaning: "utilization",
    showCapacityCard: false,
    emissionsFactorConfig: {
      multiplier: 1e3,
      baseUnit: "$1K",
      display: (val) => `${fN(val, 1)} g CO₂e`
    }
  },
  ha: {
    label: "Land Area",
    format: (val) => `${fN(val, 0)} ha`,
    phosphorIcon: "Globe",
    capacityMeaning: "area",
    showCapacityCard: true,
    emissionsFactorConfig: {
      multiplier: 1,
      baseUnit: "hectare",
      display: (val) => `${fN(val, 2)} t CO₂e`
    }
  },
  "animal head": {
    label: "Livestock",
    format: (val) => `${fN(Math.round(val), 0)} animals`,
    phosphorIcon: "Horse",
    capacityMeaning: "herd_size",
    showCapacityCard: true,
    emissionsFactorConfig: {
      multiplier: 1,
      baseUnit: "animal/year",
      display: (val) => `${fN(val, 2)} t CO₂e`
    }
  },
  t: {
    label: "Production Volume",
    format: (val) => `${fN(val, 1)} tonnes`,
    phosphorIcon: "Factory",
    capacityMeaning: "throughput",
    showCapacityCard: true,
    emissionsFactorConfig: {
      multiplier: 1e3,
      baseUnit: "tonne",
      display: (val) => `${fN(val, 0)} kg CO₂e`
    }
  },
  "t CO2": {
    label: "CO₂ Production",
    format: (val) => `${fN(val / 1e3, 1)}K t CO₂`,
    phosphorIcon: "Wind",
    capacityMeaning: "spatial",
    showCapacityCard: true,
    emissionsFactorConfig: {
      multiplier: 1,
      baseUnit: "t CO₂",
      display: (val) => `${fN(val, 3)} t CO₂e`
    }
  },
  MWh: {
    label: "Energy Output",
    format: (val) => `${fN(val / 1e6, 2)} TWh`,
    phosphorIcon: "Lightning",
    capacityMeaning: "utilization",
    showCapacityCard: true,
    emissionsFactorConfig: {
      multiplier: 1,
      baseUnit: "MWh",
      display: (val) => `${fN(val, 2)} t CO₂e`
    }
  },
  "t of alumina/aluminum": {
    label: "Alumina/Aluminum Production",
    format: (val) => `${fN(val, 2)} tonnes`,
    phosphorIcon: "Package",
    capacityMeaning: "utilization",
    showCapacityCard: true,
    emissionsFactorConfig: {
      multiplier: 1e3,
      baseUnit: "tonne",
      display: (val) => `${fN(val, 0)} kg CO₂e`
    }
  }
};
const getUnitConfig = (unit) => {
  return unitRegistry[unit] || {
    label: "Activity",
    format: (val) => fN(val),
    phosphorIcon: "ChartBar",
    capacityMeaning: "utilization",
    showCapacityCard: true,
    emissionsFactorConfig: {
      multiplier: 1,
      baseUnit: unit,
      display: (val) => `${fN(val, 2)} t CO₂e`
    }
  };
};
const formatActivity = (value, unit) => {
  return getUnitConfig(unit).format(value);
};
const formatEmissionsFactor = (factor, unit) => {
  const config = getUnitConfig(unit).emissionsFactorConfig;
  const valueInTonnes = factor * config.multiplier;
  if (valueInTonnes < 1e-3) {
    return `${fN(valueInTonnes * 1e6, 0)} g CO₂e`;
  } else if (valueInTonnes < 1) {
    return `${fN(valueInTonnes * 1e3, 0)} kg CO₂e`;
  }
  return config.display(valueInTonnes);
};
const getActivityIcon = (unit) => {
  return getUnitConfig(unit).phosphorIcon;
};
const getActivityLabel = (unit) => {
  return getUnitConfig(unit).label;
};
const shouldShowCapacityCard = (unit) => {
  return getUnitConfig(unit).showCapacityCard;
};
const getCapacityTooltip = (unit) => {
  const meanings = {
    utilization: "Percentage of maximum capacity achieved",
    area: "Total land area contributing to emissions",
    herd_size: "Average number of animals over the period",
    throughput: "Production capacity utilization",
    spatial: "Spatial extent of emissions activity"
  };
  return meanings[getUnitConfig(unit).capacityMeaning];
};
const formatCapacityFactor = (capacityFactor, unit, capacity) => {
  const config = getUnitConfig(unit);
  if (config.capacityMeaning === "utilization") {
    if (capacity !== void 0 && capacity > 0 && capacityFactor > 2) {
      return `${fN(capacityFactor / capacity * 100, 1)}%`;
    }
    return `${fN(capacityFactor * 100, 1)}%`;
  }
  if (config.capacityMeaning === "area" || config.capacityMeaning === "spatial") {
    return `${fN(capacityFactor, 0)} ha`;
  }
  if (config.capacityMeaning === "herd_size") {
    return `${fN(Math.round(capacityFactor), 0)} animals`;
  }
  return fN(capacityFactor, 2);
};
const getCapacityLabel = (unit) => {
  const config = getUnitConfig(unit);
  const labels = {
    utilization: "Utilization Rate",
    area: "Total Area",
    herd_size: "Herd Size",
    throughput: "Capacity Utilization",
    spatial: "Spatial Extent"
  };
  return labels[config.capacityMeaning];
};
const getEmissionsFactorUnit = (factor, unit) => {
  const config = getUnitConfig(unit).emissionsFactorConfig;
  const valueInTonnes = factor * config.multiplier;
  if (valueInTonnes < 1e-3) {
    return `g CO₂e per ${config.baseUnit}`;
  } else if (valueInTonnes < 1) {
    return `kg CO₂e per ${config.baseUnit}`;
  }
  return `t CO₂e per ${config.baseUnit}`;
};
export {
  fN as a,
  getActivityLabel as b,
  cn as c,
  formatActivity as d,
  getCapacityLabel as e,
  formatSector as f,
  getActivityIcon as g,
  formatCapacityFactor as h,
  getCapacityTooltip as i,
  formatEmissionsFactor as j,
  getEmissionsFactorUnit as k,
  formatDate as l,
  shouldShowCapacityCard as s
};
