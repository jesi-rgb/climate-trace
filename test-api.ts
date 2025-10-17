/**
 * Test script for the new Climate TRACE API client
 * Run with: npx tsx test-api.ts
 */

import { ct } from './src/lib/api/index.js';

async function main() {
	console.log('🧪 Testing Climate TRACE API Client\n');

	try {
		// Test 1: Get top sources
		console.log('1️⃣  Testing getSources...');
		const sources = await ct('getSources', {
			year: 2024,
			gas: 'co2e_100yr',
			limit: 5
		});
		console.log(`✅ Retrieved ${sources.length} sources`);
		console.log(`   First source: ${sources[0]?.name} (${sources[0]?.emissionsQuantity} tonnes)\n`);

		// Test 2: Get source details
		if (sources[0]) {
			console.log('2️⃣  Testing getSourceById...');
			const sourceDetails = await ct('getSourceById', {
				id: sources[0].id,
				start: '2024',
				end: '2024'
			});
			console.log(`✅ Retrieved details for: ${sourceDetails.name}`);
			console.log(`   Location: ${sourceDetails.country}`);
			console.log(`   Emissions data points: ${sourceDetails.emissions.length}\n`);
		}

		// Test 3: Get aggregated emissions
		console.log('3️⃣  Testing getAggregatedEmissions...');
		const aggregated = await ct('getAggregatedEmissions', {
			year: 2024,
			gas: 'co2e_100yr'
		});
		console.log(`✅ Retrieved aggregated emissions`);
		console.log(`   Location: ${aggregated.location.name}`);
		console.log(`   Sectors: ${aggregated.sectors.summaries.length}\n`);

		// Test 4: Get country rankings
		console.log('4️⃣  Testing getCountryRankings...');
		const rankings = await ct('getCountryRankings', {
			gas: 'co2e_100yr',
			start: '2024',
			end: '2024'
		});
		console.log(`✅ Retrieved ${rankings.rankings.length} country rankings`);
		console.log(`   Top 3 emitters:`);
		rankings.rankings.slice(0, 3).forEach((rank) => {
			console.log(
				`   ${rank.rank}. ${rank.name}: ${rank.emissionsQuantity.toLocaleString()} tonnes`
			);
		});
		console.log();

		// Test 5: Get definitions
		console.log('5️⃣  Testing getSectors...');
		const sectors = await ct('getSectors', undefined);
		console.log(`✅ Retrieved ${sectors.length} sectors`);
		console.log(`   Sectors: ${sectors.slice(0, 5).join(', ')}...\n`);

		console.log('🎉 All tests passed!');
	} catch (error) {
		console.error('❌ Test failed:', error);
		process.exit(1);
	}
}

main();
