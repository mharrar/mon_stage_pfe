import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  CollectionReference,
  query,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc, limitToLast
} from "@angular/fire/firestore";
import { defer, from, map, Observable } from "rxjs";
import MessageInterface from "../interfaces/message.interface";
import { UserServiceService } from "./user-service.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService extends UserServiceService {
  protected dbPath = 'messages';
  protected firestore: Firestore = inject(Firestore);
  private messagesCollectionRef: CollectionReference = collection(this.firestore, this.dbPath);

  get currentSender() {
    return super.currentUser;
  }


  getMessages(): Observable<MessageInterface[]> {
    return collectionData(
      query(
        this.messagesCollectionRef,
        orderBy('createdAt'),
        limitToLast(10)
      ),
      {idField: 'docId'}
    )
      .pipe(map((messages) => {
        return messages.map(message => {
          return {
            ...message,
            createdAt: message['createdAt']?.toDate()
          };
        });
      })) as Observable<MessageInterface[]>;
  }

  addMessage(content: string) {


    return defer(() => from(
      addDoc(this.messagesCollectionRef, {
        content,
        createdAt: serverTimestamp(),

        sender: this.currentSender,

      })
    ));
  }

  removeMessage(docId: string) {
    return defer(() => from(
      deleteDoc(doc(this.messagesCollectionRef, `${docId}`))
    ));
  }

  updateMessage(docId: string, content: string) {
    return defer(() => from(
      updateDoc(doc(this.messagesCollectionRef, `${docId}`), {content})
    ));
  }
}
