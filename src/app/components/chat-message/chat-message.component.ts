import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import MessageInterface from "../../interfaces/message.interface";
import { ChatService } from "../../services/chat.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message!: MessageInterface;

  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();

  isEditMode: boolean = false;

  public messageToEdit: FormControl = new FormControl<any>('');

  get isMine() {
    return this.chatService.currentSender?.uuid === this.message?.sender.uuid;
  }

  constructor(private chatService: ChatService) {}

  ngOnInit() {
  }

  editMessage() {
    this.isEditMode = true;
    this.messageToEdit.setValue(this.message.content);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.messageToEdit.reset();
  }

  handleEdit() {
    this.onEdit.next({
      messageId: this.message.docId,
      content: this.messageToEdit.value
    });
  }

  handleDelete() {
    this.onDelete.next(this.message.docId);
  }

}
