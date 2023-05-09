import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { delay, finalize, Observable, shareReplay } from "rxjs";
import { ChatService } from "../../services/chat.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller', {read: ElementRef}) private scrollContainer!: ElementRef;

  public messages$: Observable<any> = new Observable<any>();
  public newMessage: FormControl = new FormControl<string>('', {
    validators: [Validators.required, Validators.minLength(3)]
  });
  public isLoading: boolean = false;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.messages$ = this.chatService.getMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  sendMessage() {
    this.isLoading = true;

    this.chatService
      .addMessage(this.newMessage.value)
      .pipe(
        delay(500),
        finalize(() => {
          this.isLoading = false;
          this.newMessage.reset();
        }),
        shareReplay(),
      ).subscribe();
  }

  deleteMessage(messageId: string) {
    this.chatService.removeMessage(messageId).subscribe();
  }

  editMessage({messageId, content}: { messageId: string, content: string }) {
    this.chatService.updateMessage(messageId, content).subscribe();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer?.nativeElement?.scrollHeight || 0;
    }
  }

}
