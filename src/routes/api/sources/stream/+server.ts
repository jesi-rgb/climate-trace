import { ct } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const HIGH_PASS = 10;
const LIMIT = 100000;

export const GET: RequestHandler = async ({ url }) => {
	const countryCode = url.searchParams.get('country');

	if (!countryCode) {
		error(400, 'Country code is required');
	}

	let aborted = false;

	const stream = new ReadableStream({
		async start(controller) {
			try {
				const cities = await ct('searchCities', { country: countryCode, limit: LIMIT });

				for (const city of cities) {
					if (aborted) break;

					const sourcesRaw = await ct('getSources', { cityId: city.id, limit: LIMIT });
					const sources = sourcesRaw?.filter((s) => s.emissionsQuantity > HIGH_PASS);

					if (!sources) continue;

					for (let i = 0; i < sources.length; i += 50) {
						if (aborted) break;

						const batch = sources.slice(i, i + 50);
						const results = await Promise.allSettled(
							batch.map((source) => ct('getSourceById', { id: source.id }))
						);

						for (let j = 0; j < results.length; j++) {
							if (aborted) break;

							const result = results[j];
							if (result.status === 'fulfilled') {
								const json = JSON.stringify(result.value) + '\n';
								controller.enqueue(new TextEncoder().encode(json));
							} else {
								console.error(`Failed to fetch source ${batch[j].id}:`, result.reason);
							}
						}
					}
				}

				if (!aborted) controller.close();
			} catch (err) {
				if (!aborted) {
					console.error('Stream error:', err);
					try {
						controller.error(err);
					} catch { }
				}
			}
		},
		cancel() {
			aborted = true;
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'application/x-ndjson',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
};
