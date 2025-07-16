<template>
	<section class="welcome-layout">
		<main>
			<router-view/>
		</main>
	</section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

function addScriptToHead(url: string, params: string[]) {
	const scriptElement = document.createElement('script');
	scriptElement.src = `${url}?${params.join('&')}`;
	document.head.appendChild(scriptElement);
}

onMounted(() => {
	// inject CDN scripts
	const cdnScripts = [];
	if(!(window as any).THREE) cdnScripts.push('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
	if(!(window as any).VANTA) cdnScripts.push('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js');
	cdnScripts.forEach( (script) => {
		addScriptToHead(script, []);
	});
	window.addEventListener('load', function() {
		const initFog = () => {
			(window as any).VANTA.FOG({
				el: "body",
				mouseControls: true,
				touchControls: true,
				gyroControls: false,
				minHeight: 200.00,
				minWidth: 200.00,
				highlightColor: 0x96a4eb,
				midtoneColor: 0x7cbdee,
				lowlightColor: 0x83e3f0
			});
		};

		if( (window as any).THREE && (window as any).VANTA ) {
			initFog();
		} else {
			// TODO: не смотря на проверку window.THREE есть вероятность что он не успеет инициализироватся, и получим оишбку THREE.Color is undefined
			const interval = setInterval(() => {
				if( (window as any).THREE && (window as any).VANTA ) {
					initFog();
					clearInterval(interval);
				}
			}, 500);
		}
	});
});
</script>

<style lang="scss">
.welcome-layout {
	margin:0 2em;
}
</style>
