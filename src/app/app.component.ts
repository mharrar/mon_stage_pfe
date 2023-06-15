import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-chat';
  constructor(private keycloakService: KeycloakService) {}
  ngOnInit() {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();
    const token = keycloakInstance.token;
    console.log(token);
  }

}
