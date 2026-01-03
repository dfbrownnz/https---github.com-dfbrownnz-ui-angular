import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router'; // Add this
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule,

    MatButtonModule,

  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('my-app');
  protected readonly title = signal('tods');

  currentProjectId: string | null = null;
  projectOwner: string | null = null;
  projectList: string | null = null;

  constructor(private route: ActivatedRoute) { }


  //isSidebarCollapsed = false; // Initial state: expanded
  isSidebarCollapsed: boolean = true; // Initial state: collapsed


  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  ngOnInit() {
    // This listens to any changes in the URL query parameters globally
    this.route.queryParams.subscribe(params => {
      this.currentProjectId = params['projectId'];
      this.projectOwner = params['projectOwner']; // http://localhost:4200/ProjectList?projectId=1&project-owner=ted&project-list=26q1
      this.projectList = params['projectList']; // http://localhost:4200/ProjectList?projectId=1&project-owner=ted&project-list=26q1
    });
  }
}
