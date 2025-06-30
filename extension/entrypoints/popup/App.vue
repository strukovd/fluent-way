<template>
  <div class="word-input-popup">
    <h1>Add New Word</h1>
	<BaseInput v-model="newWord" placeholder="Enter new word" @keyup.enter="addWord" autofocus/>
	<BaseButton @click="addWord" :disabled="!newWord.trim()" secondary>Add Word</BaseButton>
    <p v-if="message" :class="{ 'success': isSuccess, 'error': !isSuccess }">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import { ref } from 'vue';

const newWord = ref('');
const message = ref('');
const isSuccess = ref(false);

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

<style scoped>
.word-input-popup {
  width: 300px;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 15px;
}

/* .word-input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
} */

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
</style>
