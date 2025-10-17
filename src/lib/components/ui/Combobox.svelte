<script lang="ts">
	import { Combobox, type WithoutChildrenOrChild, mergeProps } from 'bits-ui';
	import { CaretUpDown, Check, CaretDoubleUp, CaretDoubleDown } from 'phosphor-svelte';
	import type { SvelteComponent } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Item = { value: string; label: string; disabled?: boolean };

	type Props = Combobox.RootProps & {
		inputProps?: WithoutChildrenOrChild<Combobox.InputProps>;
		contentProps?: WithoutChildrenOrChild<Combobox.ContentProps>;
		placeholder?: string;
		emptyMessage?: string;
		Icon?: SvelteComponent;
		showScrollButtons?: boolean;
		transitionConfig?: { y?: number; duration?: number; ease?: any };
	};

	let {
		items = [],
		value = $bindable(),
		open = $bindable(false),
		inputProps,
		contentProps,
		type = 'single',
		placeholder = 'Search...',
		emptyMessage = 'No results found.',
		Icon,
		showScrollButtons = true,
		transitionConfig = { y: -8, duration: 350, ease: cubicInOut },
		...restProps
	}: Props = $props();

	let searchValue = $state('');

	const filteredItems = $derived.by(() => {
		if (!searchValue || searchValue === '') return items;
		return items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()));
	});

	function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
		searchValue = e.currentTarget.value;
	}

	function handleOpenChange(newOpen: boolean) {
		if (!newOpen) {
			searchValue = '';
		}
	}

	const mergedRootProps = $derived(mergeProps(restProps, { onOpenChange: handleOpenChange }));
	const mergedInputProps = $derived(mergeProps(inputProps, { oninput: handleInput }));
</script>

<Combobox.Root {type} {items} bind:value={value as never} bind:open {...mergedRootProps}>
	<div class="relative">
		{#if Icon}
			<Icon class="absolute left-3 top-1/2 -translate-y-1/2 z-10" />
		{/if}

		<Combobox.Input
			{...mergedInputProps}
			class="input input-bordered w-full {Icon ? 'pl-10' : ''} pr-10 focus:input-primary"
			{placeholder}
			aria-label={placeholder}
		/>
		<Combobox.Trigger class="absolute end-3 top-1/2 size-5 -translate-y-1/2">
			<CaretUpDown class="text-muted size-5" />
		</Combobox.Trigger>
	</div>
	<Combobox.Portal>
		<Combobox.Content forceMount sideOffset={8} align="start" {...contentProps}>
			{#snippet child({ wrapperProps, props, open: isOpen })}
				{#if isOpen}
					<div {...wrapperProps}>
						<div
							{...props}
							transition:fly={transitionConfig}
							class="border-subtle bg-base-100 shadow-xl z-50
							max-h-96 w-[300px] rounded-box border p-2"
						>
							{#if showScrollButtons}
								<Combobox.ScrollUpButton class="flex w-full items-center justify-center py-1">
									<CaretDoubleUp class="size-3" />
								</Combobox.ScrollUpButton>
								<Combobox.Viewport class="max-h-80">
									{#each filteredItems as item, i (i + item.value)}
										<Combobox.Item
											class="data-highlighted:bg-base-200 flex h-10 w-full cursor-pointer select-none items-center rounded-btn px-3 py-2 text-sm outline-none transition-colors"
											value={item.value}
											label={item.label}
											disabled={item.disabled}
										>
											{#snippet children({ selected })}
												<span class="flex-1">{item.label}</span>
												{#if selected}
													<Check class="size-4" />
												{/if}
											{/snippet}
										</Combobox.Item>
									{:else}
										<span class="text-muted block px-3 py-2 text-sm">
											{emptyMessage}
										</span>
									{/each}
								</Combobox.Viewport>
								<Combobox.ScrollDownButton class="flex w-full items-center justify-center py-1">
									<CaretDoubleDown class="size-3" />
								</Combobox.ScrollDownButton>
							{:else}
								<div class="max-h-80 overflow-auto">
									{#each filteredItems as item, i (i + item.value)}
										<Combobox.Item
											class="data-highlighted:bg-base-200 flex h-10 w-full cursor-pointer select-none items-center rounded-btn px-3 py-2 text-sm outline-none transition-colors"
											value={item.value}
											label={item.label}
											disabled={item.disabled}
										>
											{#snippet children({ selected })}
												<span class="flex-1">{item.label}</span>
												{#if selected}
													<Check class="size-4" />
												{/if}
											{/snippet}
										</Combobox.Item>
									{:else}
										<span class="text-muted block px-3 py-2 text-sm">
											{emptyMessage}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/if}
			{/snippet}
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
