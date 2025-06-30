import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ['@wxt-dev/module-vue'],
	manifest: {
		permissions: [
			"activeTab",       // Для получения выделенного текста на текущей вкладке
			"contextMenus",    // Для создания пунктов контекстного меню
		],
		commands: {
			"add_word_hotkey": { // Пользовательская команда для вашего конкретного случая
				"suggested_key": {
					"default": "Ctrl+Shift+X"
				},
				"description": "Open popup to add a new word"
			}
		}
	},
});
