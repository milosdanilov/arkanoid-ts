export interface Keyboard {
  getLastPressedKey(): KEYBOARD_KEY;
}

type KEY_ARROW_LEFT = 'ArrowLeft';
type KEY_ARROW_RIGHT = 'ArrowRight';

export type KEYBOARD_KEY = KEY_ARROW_LEFT | KEY_ARROW_RIGHT | '';

const createKeyboard = (
  eventTarget: Window,
  supportedKeys: KEYBOARD_KEY[]
): Keyboard => {
  let lastPressedKey: KEYBOARD_KEY = '';

  const updateKey = (key: KEYBOARD_KEY) => {
    if (key === '') {
      lastPressedKey = '';
    }
    
    if (supportedKeys.includes(key) && key !== lastPressedKey) {
      lastPressedKey = key;
    }
  };

  eventTarget.addEventListener('keydown', ({ key }) =>
    updateKey(key as KEYBOARD_KEY)
  );

  eventTarget.addEventListener('keyup', ({ key }) =>
    updateKey('')
  );

  return {
    getLastPressedKey() {
      return lastPressedKey;
    },
  };
};

export default createKeyboard;