import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Add this
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');

  currentProjectId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // This listens to any changes in the URL query parameters globally
    this.route.queryParams.subscribe(params => {
      this.currentProjectId = params['projectId'];
    });
  }
}
