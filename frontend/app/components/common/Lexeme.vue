<template>
	<div class="word" style="display:flex;">
		<div class="word-left-side">
			<div class="word-level">
				<BaseIcon :name="defineIcon(lexeme)" style="margin-right:.2em;" size="1.2em"/>
				<span>75%</span>
			</div>
			<section>
				<!-- <div class="word-types"><span v-for="i of 2" :key="i">Глагол</span></div> -->
				<div class="word-name">{{ lexeme.name }}</div>
				<div class="word-forms">
					<div class="word-form v1" title="V1 is the base form of the verb">Arise</div>
					<div class="word-form v2" title="V2 is the simple past form; it is formed by adding -ed to the base form">Arose</div>
					<div class="word-form v3" title="V3 is the past participle form; it is formed by adding -ed to the base form">Arisen</div>
					<div class="word-form v4" title="V4 is the third-person singular present form; it is formed by adding -s to the base form">Arises</div>
					<div class="word-form v5" title="V5 is the present participle form; it is formed by adding -ing to the base form">Arising</div>
				</div>
			</section>
		</div>
		<div class="word-right-side">
			<section>
				<div class="word-types">
					<template v-for="wordType of [`Глагол`, `Существительное`, `Местоимение`]" :key="wordType">
						<div class="word-type" :data-text="wordType" v-if="Math.random() < 0.5"></div>
					</template>
				</div>
				<div class="word-translations">
					<div class="word-translation" v-for="(translation, index) of String(lexeme.translation).split(',')" :key="index">{{ translation }}</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from './Base/BaseIcon.vue';

export default defineComponent({
	components: { BaseIcon },
	props: {
		value: String,
		lexeme: String,
	},
	data() {
		return {};
	},
	methods: {
		defineIcon(word: any) {
			if (word.progress > 100) {
				return 'check-blue';
			}
			else if (word.progress > 87) {
				return 'check-green';
			}
		},
	},
});
</script>

<style lang="scss">
.word {
	display:flex;
	justify-content:space-between;
	// line-height:3em;
	font-size:20px;
	font-weight:400;
	background:#f6f6f6;
	border-radius:10px;
	margin:.4em 0;
	padding:1em 1.2em;
	transition:all 300ms ease 0s;
	box-shadow: 0 0 8px 0 rgb(43 68 204 / 5%);
	cursor: pointer;
	&:hover {
		// background-color:#e8e8e8;
		background-color: #f3f5ff;
		.word-types {
			.word-type {
				filter: none !important;
			}
		}
	}

	.word-left-side {
		position:relative;
		display:flex;

		.word-level {
			position:absolute;
			top:-1em;
			left:1em;
			background-color:#e7f2fe;
			padding:.2em .4em;
			border-radius:0px 0px 10px 10px;
			display:flex;
			align-items:center;
			filter: drop-shadow(0px 0px 3px #004da139);
		}

		.word-name {
			font-size:32px;
			padding:.2em 0;
			// line-height:1.6em;
		}

		.word-forms {
			display: flex;
			gap: .4em;
			font-size: .9em;

			.word-form {
				background: #eaeaea;
				border-radius: 4px;
				padding: .2em .6em;

				&.v4 {
					background: #2186eb1f;
					color: #2265a9;
				}
				&.v5 {
					background: #b921eb1f;
					color: #a122a9
				}
			}
		}
	}
	.word-right-side {
		display:flex;
		font-size: 14px;
		font-weight:400;
		opacity:.8;

		.word-types {
			display: flex;
			justify-content: end;
			align-items: end;
			font-size:.8em;
			font-weight:400;
			// opacity:.8;

			.word-type {
				&::before {
					content: attr(data-text);
				}

				&:not(:first-child) {
					margin-left:.3em;
				}
				display: inline-block;
				line-height: 1.4em;
				padding:0 .6em;
				border-width:0 0 0 3px;
				border-radius: 3px;
				border-style: solid;
				border-color: #09b35a;
				color: #339c64;
				background:#00000008;

				&[data-text="Существительное"] {
					border-color: #2186eb;
					color: #2186eb;
				}
				&[data-text="Глагол"] {
					border-color: #09b35a;
					color: #339c64;
				}
				&[data-text="Прилагательное"] {
					border-color: #e34747;
					color: #db2626;
				}
				&[data-text="Наречие"] {
					border-color: #e34747;
					color: #db2626;
				}
				&[data-text="Предлог"] {
					border-color: #e34747;
					color: #db2626;
				}
				&[data-text="Местоимение"] {
					border-color: #e34747;
					color: #db2626;
				}
				&[data-text="Союз"] {
					border-color: #e34747;
					color: #db2626;
				}
				&[data-text="Числительное"] {
					border-color: #e34747;
					color: #db2626;
				}
				&[data-text="Определительное"] {
					border-color: #e34747;
					color: #db2626;
				}
				&[data-text="Междометие"] {
					border-color: #e34747;
					color: #db2626;
				}
			}
		}
		.word-translations {
			padding:.8em 0;
			text-align: right;

			.word-translation {
				line-height:1.4em;
			}
		}
	}
}
</style>
