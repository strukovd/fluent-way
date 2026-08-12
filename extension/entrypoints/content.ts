export default defineContentScript({
  matches: [
    '*://*.google.com/*',
    '*://*.google.kg/*',
    '*://*.google.ru/*',
  ],
  main() {
    injectFluentWayButton();

    const observer = new MutationObserver(() => {
      injectFluentWayButton();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});

const SOURCE_TEXTAREA_SELECTOR = '#tw-source-text-ta';
const SOURCE_CONTAINER_SELECTOR = '#tw-source-text-container';
const BUTTON_CONTAINER_ID = 'fluent-way-add-word';
const STYLE_ID = 'fluent-way-add-word-style';

function injectFluentWayButton() {
  const sourceContainer = document.querySelector(SOURCE_CONTAINER_SELECTOR);
  const sourceTextarea = document.querySelector<HTMLTextAreaElement>(SOURCE_TEXTAREA_SELECTOR);

  if (!sourceContainer || !sourceTextarea || document.getElementById(BUTTON_CONTAINER_ID)) {
    return;
  }

  ensureStyles();

  const wrapper = document.createElement('div');
  wrapper.id = BUTTON_CONTAINER_ID;
  wrapper.className = 'fluent-way-add-word';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'fluent-way-add-word__button';
  button.textContent = 'В словарь';

  const status = document.createElement('span');
  status.className = 'fluent-way-add-word__status';
  status.setAttribute('aria-live', 'polite');

  button.addEventListener('click', async () => {
    const word = getSourceWord();

    if (!word) {
      setStatus(status, 'Введите слово', 'error');
      return;
    }

    button.disabled = true;
    setStatus(status, 'Сохраняю...', 'muted');

    try {
      await saveWord(word);
      setStatus(status, 'Добавлено', 'success');
    } catch (error) {
      console.error('[Fluent Way] Failed to save word', error);
      setStatus(status, 'Не удалось', 'error');
    } finally {
      button.disabled = false;
    }
  });

  wrapper.append(button, status);
  sourceContainer.insertAdjacentElement('afterend', wrapper);
}

function getSourceWord() {
  const sourceTextarea = document.querySelector<HTMLTextAreaElement>(SOURCE_TEXTAREA_SELECTOR);
  return sourceTextarea?.value.trim() ?? '';
}

async function saveWord(word: string) {
  const response = await chrome.runtime.sendMessage({
    type: 'FLUENT_WAY_SAVE_WORD',
    payload: { word },
  });

  if (!response?.ok) {
    throw new Error(response?.error ?? 'Unknown save error');
  }
}

function setStatus(
  status: HTMLElement,
  text: string,
  tone: 'muted' | 'success' | 'error',
) {
  status.textContent = text;
  status.dataset.tone = tone;

  if (tone !== 'muted') {
    window.setTimeout(() => {
      if (status.textContent === text) {
        status.textContent = '';
        delete status.dataset.tone;
      }
    }, 2500);
  }
}

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .fluent-way-add-word {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 10px 0 0;
      padding: 0 4px;
      font-family: arial, sans-serif;
    }

    .fluent-way-add-word__button {
      border: 1px solid #1a73e8;
      border-radius: 18px;
      background: #1a73e8;
      color: #fff;
      cursor: pointer;
      font: 500 14px/20px arial, sans-serif;
      min-height: 36px;
      padding: 7px 16px;
      transition: background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
    }

    .fluent-way-add-word__button:hover:not(:disabled) {
      background: #1765cc;
      border-color: #1765cc;
      box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3);
    }

    .fluent-way-add-word__button:active:not(:disabled) {
      background: #185abc;
      border-color: #185abc;
    }

    .fluent-way-add-word__button:disabled {
      cursor: default;
      opacity: 0.68;
    }

    .fluent-way-add-word__status {
      color: #5f6368;
      font: 400 13px/18px arial, sans-serif;
      min-width: 74px;
    }

    .fluent-way-add-word__status[data-tone="success"] {
      color: #137333;
    }

    .fluent-way-add-word__status[data-tone="error"] {
      color: #b3261e;
    }
  `;

  document.head.append(style);
}
