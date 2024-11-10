import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Output() avatarSelected = new EventEmitter<string>();

  avatars: string[] = [
     'avatar-2.jpg', 'avatar-3.jpg', 'avatar-4.jpg', 'avatar-5.jpg'
  ];

  selectAvatar(avatar: string): void {
    console.log(avatar);
    this.avatarSelected.emit(avatar);
  }
}
