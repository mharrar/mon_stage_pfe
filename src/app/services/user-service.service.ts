import { Injectable } from '@angular/core';
import { SessionStorageService } from "./session-storage.service";
import MessageInterface from "../interfaces/message.interface";
import generateName from "../helpers/nickname-generator";
import { uuid } from "../helpers/uuid";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  protected storageKey: string = 'user';
  private user: MessageInterface["sender"] | null = null;

  get currentUser() {
    return this.user;
  }

  constructor(private sessionStorage: SessionStorageService) {
    this.checkForUser();
  }

  private checkForUser(): void {
    const storageUser = this.sessionStorage.get(this.storageKey);

    if (storageUser) {
      this.user = JSON.parse(storageUser);
    } else {
      this.user = this.initUser();
      this.sessionStorage.set(this.storageKey, JSON.stringify(this.user));
    }
  }

  protected initUser(): MessageInterface["sender"] {
    return {
      uuid: uuid(),
      username: generateName(),
    };
  }
}
