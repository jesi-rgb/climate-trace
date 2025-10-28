import { bounceOut, circInOut, cubicOut, elasticInOut, elasticOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

interface GrowFlyParams {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	x?: number;
	y?: number;
	scale?: number;
	opacity?: number;
}

export function growFly(
	node: Element,
	{
		delay = 0,
		duration = 400,
		easing = elasticOut,
		x = 0,
		y = 0,
		scale = 0.95,
		opacity = 0
	}: GrowFlyParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;
	const targetOpacity = +style.opacity;

	return {
		delay,
		duration,
		easing,
		css: (_t, u) => {
			const currentX = u * x;
			const currentY = u * y;
			const currentScale = 1 - u * (1 - scale);
			const currentOpacity = targetOpacity - u * (targetOpacity - opacity);

			return `
				transform: ${transform} translate(${currentX}px, ${currentY}px) scale(${currentScale});
				opacity: ${currentOpacity};
			`;
		}
	};
}

interface GrowParams {
	delay?: number;
	duration?: number;
	easing?: (t: number) => number;
	scale?: number;
	opacity?: number;
}

export function grow(
	node: Element,
	{ delay = 0, duration = 300, easing = cubicOut, scale = 0.9, opacity = 0 }: GrowParams = {}
): TransitionConfig {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;
	const targetOpacity = +style.opacity;

	return {
		delay,
		duration,
		easing,
		css: (_t, u) => {
			const currentScale = 1 - u * (1 - scale);
			const currentOpacity = targetOpacity - u * (targetOpacity - opacity);

			return `
				transform: ${transform} scale(${currentScale});
				opacity: ${currentOpacity};
			`;
		}
	};
}
