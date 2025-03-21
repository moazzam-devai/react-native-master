import {User} from '../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DateEndpoints {
  'current-user': User;
  'access-token': string;
}

export class SecureStorage {
  static async getItemAsync<K extends keyof DateEndpoints>(
    key: K,
  ): Promise<DateEndpoints[K]> {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return item as DateEndpoints[K];
      }
    }
  }

  static async setItemAsync<K extends keyof DateEndpoints>(
    key: K,
    value: DateEndpoints[K],
  ): Promise<void> {
    try {
      const data = JSON.stringify(value);
      await AsyncStorage.setItem(key, data);
    } catch {
      await AsyncStorage.setItem(key, value as string);
    }
  }

  static async deleteItemAsync<K extends keyof DateEndpoints>(
    key: K,
  ): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  static async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}
