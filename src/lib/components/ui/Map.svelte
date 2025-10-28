<script lang="ts">
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { mount, onMount } from 'svelte';
	import MapPopup from './MapPopup.svelte';
	import { getCssVariableHex } from '$lib/utils';

	let map: maplibregl.Map | null = $state(null);
	let popup: maplibregl.Popup | null = $state(null);
	let container: HTMLElement | null = $state(null);

	let { data, initialLat = 0, initialLon = 0 } = $props();

	function renderPopup(
		e:
			| (maplibregl.MapMouseEvent & {
					features?: maplibregl.MapGeoJSONFeature[];
			  } & Object)
			| (maplibregl.MapTouchEvent & {
					features?: maplibregl.MapGeoJSONFeature[];
			  } & Object)
	) {
		if (!map || !e.features || e.features.length === 0) return;

		const feature = e.features[0];
		if (feature.geometry.type !== 'Point') return;

		const coordinates = feature.geometry.coordinates.slice() as [number, number];
		const name = feature.properties?.name || 'Unknown';
		const emissionsQuantity = feature.properties?.emissionsQuantity || 0;

		container = document.createElement('div');
		mount(MapPopup as any, { target: container, props: { name, emissionsQuantity } });

		popup = new maplibregl.Popup().setLngLat(coordinates).setDOMContent(container).addTo(map);
	}

	onMount(async () => {
		map = new maplibregl.Map({
			container: 'map',
			style: '/freemap.json',
			center: [initialLon, initialLat],
			zoom: 3
		});

		map.on('load', () => {
			if (!map) return;

			map.addSource('sources', {
				type: 'geojson',
				data: data
			});

			map.addLayer({
				id: 'sources',
				type: 'circle',
				source: 'sources',
				paint: {
					'circle-radius': [
						'interpolate',
						['linear'],
						['get', 'emissionsQuantity'],
						0,
						4,
						1000000,
						8,
						10000000,
						16,
						100000000,
						20
					],
					'circle-color': [
						'interpolate',
						['linear'],
						['get', 'emissionsQuantity'],
						0,
						getCssVariableHex('--color-primary'),
						1000000,
						getCssVariableHex('--color-secondary'),
						10000000,
						getCssVariableHex('--color-error')
					],
					'circle-opacity': 0.8,
					'circle-stroke-width': 1,
					'circle-stroke-color': '#fff'
				}
			});

			map.on('mouseenter', 'sources', (e) => {
				renderPopup(e);
			});

			map.on('touchstart', 'sources', (e) => {
				renderPopup(e);
			});

			map.on('mouseleave', 'sources', () => {
				if (map) map.getCanvas().style.cursor = '';
				popup?.remove();
			});
		});
	});
</script>

<div
	id="map"
	class="h-full w-full min-h-[400px] border border-subtle
	rounded-field"
></div>
