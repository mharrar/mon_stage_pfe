import { Injectable } from '@angular/core';
import { SessionStorageService } from "./session-storage.service";
import MessageInterface from "../interfaces/message.interface";
import generateName from "../helpers/nickname-generator";
import { uuid } from "../helpers/uuid";
import {KeycloakService} from "keycloak-angular";
import { Firestore, collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  protected storageKey: string = 'user';
  private user: MessageInterface["sender"] | null = null;



  get currentUser() {
    return this.user;
  }

  constructor(private sessionStorage: SessionStorageService,private keycloakService: KeycloakService) {
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

    const token = this.keycloakService.getKeycloakInstance().token;
    const decodedToken = this.keycloakService.getKeycloakInstance().tokenParsed;
    let username = ''; // Défaut à une valeur vide en cas de token ou de propriété manquante
    let jwtid = ''; // Champ pour l'ID JWT

    if (decodedToken && decodedToken['preferred_username']) {
      username = decodedToken['preferred_username'];
    }
    if (decodedToken && decodedToken['jti']) {
      jwtid = decodedToken['jti'];
    }



    return {
      uuid:uuid(),
      username: username,
      jwtid:jwtid,


    };

  }


}
