import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  get(key: string) {
    return sessionStorage.getItem(key);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
