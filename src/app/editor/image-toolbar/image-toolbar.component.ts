import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-image-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './image-toolbar.component.html',
  styleUrls: ['./image-toolbar.component.scss']
})
export class ImageToolbarComponent {
  @Output() action = new EventEmitter<string>();
  @Output() backClicked = new EventEmitter<void>();

  onBackClicked() {
    this.backClicked.emit();
  }
}
