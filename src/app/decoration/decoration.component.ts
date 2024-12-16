import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-decoration',
  standalone: true,
  imports: [],
  templateUrl: './decoration.component.html',
  styleUrl: './decoration.component.css'
})
export class DecorationComponent {
  @Output() decorationSelected = new EventEmitter<string>();

  selectOrnament(decoration: string) {
    this.decorationSelected.emit(decoration);
  }

}
