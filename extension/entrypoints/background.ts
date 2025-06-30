export default defineBackground(() => {
  // Создание пункта контекстного меню
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "addSelectedWord",
      title: "Add '%s' to dictionary", // '%s' будет заменено выделенным текстом
      contexts: ["selection"] // Появляется, когда текст выделен
    });
  });

  // Обработка клика по пункту контекстного меню
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "addSelectedWord" && info.selectionText) {
      const selectedWord = info.selectionText.trim();
      if (selectedWord) {
        console.log(`Context menu: Attempting to add selected word: "${selectedWord}"`);

		// TODO: Реализовать добавление слова в словарь

        alert(`(STUB) Adding "${selectedWord}" to dictionary via context menu.`);
      }
    }
  });

  // Обработка горячей клавиши
  chrome.commands.onCommand.addListener((command) => {
    if (command === "add_word_hotkey") {
      console.log("Hot key 'add_word_hotkey' pressed. Opening popup.");
      chrome.action.openPopup();
    }
  });
});
