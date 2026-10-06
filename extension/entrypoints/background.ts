export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: "addSelectedWord",
        title: "Добавить '%s' в словарь",
        contexts: ["selection"]
      });
    });
  });

  chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "addSelectedWord" && info.selectionText) {
      const selectedWord = info.selectionText.trim();
      if (selectedWord) {
        try {
          await saveWord(selectedWord);
        } catch (error) {
          console.error("[Fluent Way] Failed to save selected word", error);
        }
      }
    }
  });

  chrome.commands.onCommand.addListener((command) => {
    if (command === "add_word_hotkey") {
      console.log("Hot key 'add_word_hotkey' pressed. Opening popup.");
      chrome.action.openPopup();
    }
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type !== "FLUENT_WAY_SAVE_WORD") {
      return;
    }

    saveWord(message.payload.word)
      .then(() => sendResponse({ ok: true }))
      .catch((error) => {
        sendResponse({
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        });
      });

    return true;
  });
});

async function saveWord(word: string) {
  const response = await fetch("http://localhost:8080/api/v1/word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });

  if (!response.ok) {
    throw new Error(`Backend responded with ${response.status}`);
  }
}
