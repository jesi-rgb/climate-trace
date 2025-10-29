import { ct } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const HIGH_PASS = 10;
const LIMIT = 1000;
const CITIES_LIMIT = 10000;

export const GET: RequestHandler = async ({ url }) => {
	const countryCode = url.searchParams.get('country');

	if (!countryCode) {
		error(400, 'Country code is required');
	}

	let aborted = false;

	const stream = new ReadableStream({
		async start(controller) {
			try {
				const cities = await ct('searchCities', { country: countryCode, limit: CITIES_LIMIT });

				for (const city of cities) {
					if (aborted) break;

					let offset = 0;
					while (!aborted) {
						const sourcesRaw = await ct('getSources', { cityId: city.id, limit: LIMIT, offset: offset });
						const sourceBatch = sourcesRaw?.filter((s) => s.emissionsQuantity > HIGH_PASS);

						if (!sourceBatch || sourceBatch.length === 0) break;

						const results = await Promise.allSettled(
							sourceBatch.map((source) => ct('getSourceById', { id: source.id }))
						);

						for (const result of results) {
							if (aborted) break;

							if (result.status === 'fulfilled') {
								const json = JSON.stringify(result.value) + '\n';
								controller.enqueue(new TextEncoder().encode(json));
							}
						}

						if (sourceBatch.length < LIMIT) break;

						offset += sourceBatch.length;
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
