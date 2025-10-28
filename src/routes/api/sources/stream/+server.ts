import { ct } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const countryCode = url.searchParams.get('country');

	if (!countryCode) {
		error(400, 'Country code is required');
	}

	const stream = new ReadableStream({
		async start(controller) {
			try {
				const cities = await ct('searchCities', { country: countryCode, limit: 100000 });

				for (const city of cities) {
					const sources = await ct('getSources', { cityId: city.id });
					if (!sources) continue;

					for (const source of sources) {
						try {
							const details = await ct('getSourceById', { id: source.id });
							const json = JSON.stringify(details) + '\n';
							controller.enqueue(new TextEncoder().encode(json));
						} catch (err) {
							console.error(`Failed to fetch source ${source.id}:`, err);
						}
					}
				}

				controller.close();
			} catch (err) {
				console.error('Stream error:', err);
				controller.error(err);
			}
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
