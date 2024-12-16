import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeComponent } from "./tree/tree.component";
import { DecorationComponent } from "./decoration/decoration.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'christmas-tree';
}
