import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteDebuggerComponent } from './route-debugger-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouteDebuggerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'project';
}
