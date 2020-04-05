import { Injectable } from '@angular/core';

export const MWS30_PLAYER_ID = 'MWS30_PLAYER_ID';

@Injectable({providedIn: 'root', useFactory: () => localStorage})
export abstract class LocalStorage implements Storage {
  [name: string]: any;
  readonly abstract length: number;
  abstract clear(): void;
  abstract getItem(key: string): string | null;
  abstract key(index: number): string | null;
  abstract removeItem(key: string): void;
  abstract setItem(key: string, value: string): void;
}
