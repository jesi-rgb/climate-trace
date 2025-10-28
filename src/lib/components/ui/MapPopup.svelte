<script lang="ts">
	import { fN } from '$lib/utils';
	import Body from '../type/Body.svelte';
	import Heading from '../type/Heading.svelte';
	import Card from './Card.svelte';
	import { MapPin } from 'phosphor-svelte';

	interface Props {
		name: string;
		emissionsQuantity: number;
	}

	let { name, emissionsQuantity }: Props = $props();
</script>

<Card variant="gradient" class="min-w-full">
	{#snippet title()}
		<div class="flex items-baseline gap-2">
			<Heading class="truncate" size="eyebrow">{name}</Heading>
		</div>
	{/snippet}
	{#snippet content()}
		<div class="px-section-x py-section-y">
			<Body size="24" class="tabular-nums">
				{fN(emissionsQuantity)}
			</Body>
		</div>
	{/snippet}
	{#snippet footnote()}
		<Body size="12" class="text-muted">tonnes CO₂e</Body>
	{/snippet}
</Card>
