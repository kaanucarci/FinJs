// Preferences yonetimi fonksiyonlari - Capacitor Preferences API kullanarak

import { Preferences } from '@capacitor/preferences';

export const getCookie = async (name) => {
  try {
    const { value } = await Preferences.get({ key: name });
    return value;
  } catch (error) {
    console.error('Preference getirme hatasi:', error);
    return null;
  }
};

export const setCookie = async (name, value, days = 365) => {
  try {
    await Preferences.set({ key: name, value: value });
  } catch (error) {
    console.error('Preference kaydetme hatasi:', error);
  }
};

export const deleteCookie = async (name) => {
  try {
    await Preferences.remove({ key: name });
  } catch (error) {
    console.error('Preference silme hatasi:', error);
  }
};
