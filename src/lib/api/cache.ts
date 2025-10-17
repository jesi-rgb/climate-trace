import type { EndpointKey } from './endpoints';

type CacheEntry = {
	data: unknown;
	timestamp: number;
	ttl: number;
};

type CacheCategory = 'definitions' | 'reference' | 'dynamic' | 'none';

type CacheStats = {
	size: number;
	hits: number;
	misses: number;
	hitRate: number;
	entries: Array<{
		key: string;
		age: number;
		ttl: number;
	}>;
};

const CACHE_CONFIG: Record<CacheCategory, number> = {
	definitions: 60 * 60 * 1000,
	reference: 30 * 60 * 1000,
	dynamic: 5 * 60 * 1000,
	none: 0
};

const ENDPOINT_CACHE_STRATEGY: Record<EndpointKey, CacheCategory> = {
	getContinents: 'definitions',
	getContinentDetails: 'definitions',
	getCountries: 'definitions',
	getCountryDetails: 'definitions',
	getCountryGroups: 'definitions',
	getCountryGroupDetails: 'definitions',
	getGases: 'definitions',
	getSectors: 'definitions',
	getSectorDetails: 'definitions',
	getSubsectors: 'definitions',
	getSubsectorDetails: 'definitions',

	searchCities: 'reference',
	searchAdmins: 'reference',
	getAdminById: 'reference',
	getAdminSubdivisions: 'reference',
	searchOwners: 'reference',

	getCountryRankings: 'dynamic',
	getAggregatedEmissions: 'dynamic',

	getSources: 'none',
	getSourceById: 'none'
};

export class ApiCache {
	private cache = new Map<string, CacheEntry>();
	private hits = 0;
	private misses = 0;

	private getCacheKey(endpoint: EndpointKey, params?: unknown): string {
		if (!params) {
			return endpoint;
		}
		return `${endpoint}:${JSON.stringify(params, Object.keys(params).sort())}`;
	}

	private shouldCache(endpoint: EndpointKey): boolean {
		return ENDPOINT_CACHE_STRATEGY[endpoint] !== 'none';
	}

	private getTTL(endpoint: EndpointKey): number {
		const category = ENDPOINT_CACHE_STRATEGY[endpoint];
		return CACHE_CONFIG[category];
	}

	private isValid(entry: CacheEntry): boolean {
		return Date.now() - entry.timestamp < entry.ttl;
	}

	get<T>(endpoint: EndpointKey, params?: unknown): T | null {
		if (!this.shouldCache(endpoint)) {
			return null;
		}

		const key = this.getCacheKey(endpoint, params);
		const entry = this.cache.get(key);

		if (!entry) {
			this.misses++;
			return null;
		}

		if (!this.isValid(entry)) {
			this.cache.delete(key);
			this.misses++;
			return null;
		}

		this.hits++;
		return entry.data as T;
	}

	set<T>(endpoint: EndpointKey, params: unknown, data: T): void {
		if (!this.shouldCache(endpoint)) {
			return;
		}

		const key = this.getCacheKey(endpoint, params);
		const ttl = this.getTTL(endpoint);

		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl
		});
	}

	invalidate(endpoint: EndpointKey, params?: unknown): void {
		const key = this.getCacheKey(endpoint, params);
		this.cache.delete(key);
	}

	clear(category?: CacheCategory): void {
		if (!category) {
			this.cache.clear();
			this.hits = 0;
			this.misses = 0;
			return;
		}

		const endpointsToClean = Object.entries(ENDPOINT_CACHE_STRATEGY)
			.filter(([_, cat]) => cat === category)
			.map(([endpoint]) => endpoint);

		for (const [key] of this.cache) {
			const endpoint = key.split(':')[0];
			if (endpointsToClean.includes(endpoint)) {
				this.cache.delete(key);
			}
		}
	}

	getStats(): CacheStats {
		const total = this.hits + this.misses;
		const hitRate = total > 0 ? this.hits / total : 0;

		const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
			key,
			age: Date.now() - entry.timestamp,
			ttl: entry.ttl
		}));

		return {
			size: this.cache.size,
			hits: this.hits,
			misses: this.misses,
			hitRate: Math.round(hitRate * 100) / 100,
			entries
		};
	}
}

export const apiCache = new ApiCache();
