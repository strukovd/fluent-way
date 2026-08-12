<template>
  <div class="word-input-popup">
    <h1>Add New Word</h1>
	<BaseInput v-model="newWord" placeholder="Enter new word" @keyup.enter="addWord" autofocus/>
	<BaseButton @click="addWord" :disabled="!newWord.trim()" secondary>Add Word</BaseButton>
    <p v-if="message" :class="{ 'success': isSuccess, 'error': !isSuccess }">{{ message }}</p>

	<section class="history">
		<h2>Последние добавленные слова</h2>
		<div class="word-list">
			<div class="word" v-for="(word, index) of history" :key="index">
				<div>{{ word.word }}</div>
				<div class="translate">{{ word.translate }}</div>
				<!-- <div class="mean">{{ word.mean.en }}</div>
				<div v-for="(ex, index) of word.examples" :key="index" class="examples">
					{{ ex.ru }}
				</div> -->
			</div>
		</div>
	</section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import { ref } from 'vue';

const newWord = ref('');
const message = ref('');
const isSuccess = ref(false);

const history = reactive([
	{
		word: 'equipment',
		translate: 'оборудование, снаряжение, аппаратура',
		partOfSpeech: 'noun',
		definition: 'Неисчисляемое — то есть без артикля “a/an” и без формы множественного числа.',
		mean: {
			en: 'The tools, machines, or other things needed for a particular activity or purpose.',
			ru: '(Инструменты, устройства или другие предметы, необходимые для конкретной деятельности.)'
		},
		examples: [
			{ ru: `The equipment in this gym is very modern.`, en: `Оборудование в этом спортзале очень современное.`, },
			{ ru: `We bought new computer equipment for the office`, en: `Мы купили новое компьютерное оборудование для офиса.`, },
			{ ru: `All the medical equipment must be sterilized.`, en: `Всё медицинское оборудование должно быть стерилизовано.`, }
		],
		synonyms: [
			[`device — устройство (одно конкретное)`],
			[`tools — инструменты (ручные, чаще во множественном числе)`],
			[`gear — снаряжение (особенно спортивное или походное)`]
		],
	},
	{
		word: 'carry out',
		translate: 'выполнять, осуществлять, проводить',
		partOfSpeech: 'phrasal verb',
		definition: `Не изменяется по лицам и числам, не имеет формы прошедшего времени, используется с инфинитивом без to (например: might go, might be, might have done).`,
		mean: {
			en: `To perform or complete a task, plan, experiment, or action.`
		},
		examples: [
			{ en: `The scientists carried out an experiment.`, ru: `Учёные провели эксперимент.`, },
			{ en: `We need to carry out a detailed investigation.`, ru: `Нам нужно провести детальное расследование.`, },
			{ en: `The workers are carrying out repairs on the road.`, ru: `Рабочие проводят ремонт дороги.`, },
			{ en: `The plan was carried out successfully.`, ru: `План был успешно выполнен. (страдательный залог)` },
		],
		synonyms: [
			[`perform (формальнее): perform an operation — провести операцию`],
			[`execute (выполнить технически): execute a command — выполнить команду`],
		],
		/*
			Основная структура: carry out something
			(= to do or complete something, especially something important or planned)
		*/
	},
	{
		word: 'might',
		translate: 'может быть, возможно, мог бы',
		partOfSpeech: 'modal verb',
		definition: 'Не изменяется по лицам и числам, не имеет формы прошедшего времени, используется с инфинитивом без to (например: might go, might be, might have done).',
		mean: {
			en: `Used to show possibility, suggestion, or polite permission.`,
			ru: `Используется для выражения возможности, предположения или вежливого предложения.`
		},
		examples: [
			{ en: `It might rain later.`, ru: `Возможно, пойдёт дождь.`, tag: `Возможность (неуверенность)` },
			{ en: `She might come to the party.`, ru: `Она, возможно, придёт на вечеринку.`, tag: `Возможность (неуверенность)`, }, // слабее, чем may: may ≈ 50%, might ≈ 30%.
			{ en: `You might want to check your email.`, ru: `Возможно, тебе стоит проверить почту.`, tag: `Вежливое предложение / совет` },
			{ en: `You might try restarting your computer.`, ru: `Попробуй перезапустить компьютер.`, tag: `Вежливое предложение / совет` },
			{ en: `He might have forgotten about the meeting.`, ru: `Возможно, он забыл о встрече.`, tag: `Прошедшая возможность (might have + V3)` },
			{ en: `I might have made a mistake.`, ru: `Возможно, я ошибся.`, tag: `Прошедшая возможность (might have + V3)` },
			{ en: `If I had more time, I might travel more.`, ru: `Если бы у меня было больше времени, я бы, возможно, путешествовал чаще.`, tag: `Условные предложения (если бы... могло бы)` },
		]
		/*
			Частые сочетания (collocations):

			might be — возможно, есть / будет
			→ He might be right. — Возможно, он прав.

			might take — возможно, займёт (о времени)
			→ It might take a few hours. — Это может занять несколько часов.

			might happen — может произойти

			might not work — может не сработать
		*/
	}
]);

const addWord = async () => {
  const wordToAdd = newWord.value.trim();
  if (!wordToAdd) {
    message.value = 'Please enter a word.';
    isSuccess.value = false;
    return;
  }

  // --- ЗАГЛУШКА ДЛЯ REST API ---
  console.log(`Attempting to add word: "${wordToAdd}"`);
  message.value = 'Adding word...';
  isSuccess.value = false;

  try {
    // Имитация задержки API
    await new Promise(resolve => setTimeout(() => {
		Math.random() * 500 + 200, resolve
  	}));

    // Имитация успешного или неуспешного ответа
    const success = Math.random() > 0.1; // 90% успеха

    if (success) {
      message.value = `"${wordToAdd}" added successfully!`;
      isSuccess.value = true;
      newWord.value = ''; // Очищаем поле после успешного добавления
    } else {
      message.value = `Failed to add "${wordToAdd}". Please try again.`;
      isSuccess.value = false;
    }
  } catch (error) {
    message.value = `An error occurred: ${error instanceof Error ? error.message : String(error)}`;
    isSuccess.value = false;
  }
  // --- КОНЕЦ ЗАГЛУШКИ ---
};
</script>

<style lang="scss">
.word-input-popup {
	width: 300px;
	padding: 20px;
	font-family: Arial, sans-serif;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	color: #213547;

	h1 {
		font-size: 1.5em;
		// color: #555;
		margin-bottom: 15px;
	}

	/*
	.word-input {
		width: calc(100% - 20px);
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1em;
	}
	*/

	/*
	.add-button {
		background-color: #4CAF50;
		color: white;
		padding: 10px 15px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1em;
		transition: background-color 0.3s ease;
	}

	.add-button:hover:not(:disabled) {
		background-color: #45a049;
	}

	.add-button:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}
	*/

	.message {
		margin-top: 15px;
		padding: 8px;
		border-radius: 4px;
		font-size: 0.9em;
	}

	.success {
		background-color: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	.error {
		background-color: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}
}

</style>
