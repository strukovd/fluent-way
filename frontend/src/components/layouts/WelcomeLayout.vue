<template>
	<div id="vanta-bg"></div>
	<section class="welcome-layout">
		<main>
			<router-view/>
		</main>
	</section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

function loadScript(url: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = url;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error(`Failed to load ${url}`));
		document.head.appendChild(script);
	});
}

onMounted(async () => {
	try {
		if (!(window as any).THREE) {
			await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
		}
		if (!(window as any).VANTA) {
			await loadScript('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js');
		}

		(window as any).VANTA.FOG({
			el: "#vanta-bg",
			mouseControls: true,
			touchControls: true,
			gyroControls: false,
			minHeight: 200.00,
			minWidth: 200.00,
			highlightColor: 0x96a4eb,
			midtoneColor: 0x7cbdee,
			lowlightColor: 0x83e3f0
		});
	} catch (e) {
		console.error('Ошибка при загрузке Vanta/Three:', e);
	}
});
</script>

<style lang="scss">
body:has(.welcome-layout) {
	height:100vh;
	overflow:hidden;
	margin: 0;

	#vanta-bg {
		position: fixed;
		top: 0; left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.welcome-layout {
		position: relative;
		width: 100%;
		height: 100vh; // фиксированная высота для скролла
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}
}
</style>
