import type { SourceDetails } from './schemas/generated';

export async function* streamCountrySources(countryCode: string): AsyncGenerator<SourceDetails> {
	const response = await fetch(`/api/sources/stream?country=${encodeURIComponent(countryCode)}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch sources: ${response.statusText}`);
	}

	if (!response.body) {
		throw new Error('Response body is null');
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';

	try {
		while (true) {
			const { done, value } = await reader.read();

			if (done) break;

			buffer += decoder.decode(value, { stream: true });

			const lines = buffer.split('\n');
			buffer = lines.pop() || '';

			for (const line of lines) {
				if (line.trim()) {
					try {
						yield JSON.parse(line) as SourceDetails;
					} catch (error) {
						console.error('Failed to parse line:', line, error);
					}
				}
			}
		}

		if (buffer.trim()) {
			try {
				yield JSON.parse(buffer) as SourceDetails;
			} catch (error) {
				console.error('Failed to parse final buffer:', buffer, error);
			}
		}
	} finally {
		reader.releaseLock();
	}
}
