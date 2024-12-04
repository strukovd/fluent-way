<template>
	<div class="learn-page">
		<!-- TODO: Сделать возможность добавления\удаления\изучения новых слов (в хедере) -->
		<!-- TODO: Сделать возможность перетаскивание (смену приоритета) изучаемых слов, или отдельный список активно изучаемых слов, которые будут попадатся на практике -->
		<!-- TODO: Отображать прогресс изученности для каждого слова -->

		<h1 style="color:#0a2145;">Пользовательский словарь</h1>
		<div class="words-list">
			<div class="word" v-for="word of words" :key="word.name" style="display:flex;">
				<div>
					<img style="display:inline-block; vertical-align:baseline; height:2em; margin-right:.4em;" ssrc="@/assets/check-blue.svg" :src="`/src/assets/${defineIcon(word)}`" fill="red" width="22"/>
					<span style="display:inline-block; vertical-align:baseline; line-height:2em;">{{ word.name }}</span>
				</div>
				<div></div>
				<div>{{ String(word.translation).replace(',', '\n') }}</div>
			</div>
		</div>
		<!-- <table class="table-of-new-words">
			<colgroup>
				<col span="1" style="width:33%;">
				<col span="1" style="width:33%;">
				<col span="1" style="width:33%;">
			</colgroup>
			<tr v-for="word of words" :key="word.name">
				<td>
					<img style="display:inline-block; height:2em;" src="@/assets/check.svg" width="20"/>
					<span style="display:inline-block; line-height:2em;">{{ word.name }}</span>
				</td>
				<td></td>
				<td><pre>{{ String(word.translation).replace(',', '\n') }}</pre></td>
			</tr>
		</table> -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'LearnPage',
	data() {
		return {
			words: [
				{ name: `arouse`, 				trans: `[əˈraʊz]`, 					translation: `вызывать, пробуждать`, 						progress: 97, },
				{ name: `pretty`, 				trans: `[ˈprɪti]`, 					translation: `довольно-таки`, 								progress: 100, },
				{ name: `grand`, 				trans: `[grænd]`, 					translation: `большой, великий`, 							progress: 101, },
				{ name: `volume`, 				trans: `[ˈvɒljʊm]`, 				translation: `громкость`, 									progress: 101, },
				{ name: `draw, (drew, drawn)`,	trans: `[drɔː]`, 					translation: `тянуть`, 										progress: 101, },
				{ name: `coach`, 				trans: `[kəʊʧ]`, 					translation: `автобус, вагон, телега`, 						progress: 101, },
				{ name: `provide`, 				trans: `[prəˈvaɪd]`, 				translation: `обеспечивать, снабжать`, 						progress: 101, },
				// provider [prəˈvaɪdə] поставщик
				// provision [prəˈvɪʒən] обеспечение
				{ name: `cope with`, 			trans: `[kəʊpwɪð]`,					translation: `совладать, справиться`, 						progress: 101, },
				{ name: `condition`, 			trans: `[kənˈdɪʃən]`, 				translation: `состояние`, 									progress: 101, },
				{ name: `land`, 				trans: `[lænd]`, 					translation: `приземляться, высаживаться`, 					progress: 101, },
				{ name: `scope`, 				trans: `[skəʊp]`, 					translation: `пределы, район`, 								progress: 101, },
				{ name: `pack`, 				trans: `[pæk]`, 					translation: `пачка, связка, колода, и т. д.`, 				progress: 101, },
				// package [ˈpækɪʤ] пакет
				{ name: `craft`, 				trans: `[krɑːft]`, 					translation: `ремесло, мастерство`, 						progress: 101, },
				// craftsman [ˈkrɑːftsmən] ремесленник
				// crafty [ˈkrɑːfti] ловкий, хитрый
				{ name: `worth`, 				trans: `[wɜːθ]`, 					translation: `стоимость, стоящий`, 							progress: 101, },
				// worthy [ˈwɜːði] достойный
				{ name: `urban`, 				trans: `[ˈɜːbən]`, 					translation: `городской`, 									progress: 101, },
				// urbanization [ˌɜːb(ə)naɪˈzeɪʃ(ə)n] урбанизация
				{ name: `pond`, 				trans: `[pɒnd]`, 					translation: `пруд`, 										progress: 101, },
				{ name: `familiar`, 			trans: `[fəˈmɪliə]`, 				translation: `знакомый`, 									progress: 101, },
				// familiarity [fəˌmɪlɪˈærɪti] знакомство
				// unfamiliar [ˌʌnfəˈmɪliə] незнакомый
				// familiarize [fəˈmɪliəraɪz] ознакомиться
				{ name: `tap`, 					trans: `[tæp]`, 					translation: `стучать`, 									progress: 101, },
				{ name: `column`, 				trans: `[ˈkɒləm]`, 					translation: `столб, колонна`, 								progress: 101, },
				{ name: `guilt`, 				trans: `[gɪlt]`, 					translation: `вина`, 										progress: 101, },
			],
		};
	},
	methods: {
		defineIcon(word: any) {
			if (word.progress > 100) {
				return 'check-blue.svg';
			}
			else if (word.progress > 87) {
				return 'check-green.svg';
			}
		}
	},
});
</script>

<style lang="scss">
.learn-page {
	.table-of-new-words {
		border-collapse: collapse;
		// width: 100%;

		tr {
			td {
				line-height:3em;
				&:nth-child(1) {
					text-align:left;
					color:rgb(10 33 69 / 60%);
					border:1px solid #269930;
					font-weight:600;
					background-color:#dbffdc;
					border-radius:10px;
				}
				&:nth-child(2) {
					text-align: center;
					color:#1a3155;
					background:linear-gradient(90deg, #dbffdc 0%, #f6f6f6 100%);
				}
				&:nth-child(3) {
					text-align: center;
					color:rgb(10 33 69 / 60%);;
					background-color:#f6f6f6;
					line-height:1.2em;
				}

			}
		}
	}
}
</style>
