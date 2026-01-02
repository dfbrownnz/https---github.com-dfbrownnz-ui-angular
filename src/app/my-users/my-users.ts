
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Import CommonModule
import { Router , ActivatedRoute} from '@angular/router'; //

@Component({
  selector: 'app-my-users',
  standalone: true, // This confirms you are using a Standalone component
  imports: [CommonModule], // 2. Add CommonModule to your imports array
  templateUrl: './my-users.html',
  styleUrl: './my-users.css',
})
export class MyUsers {

  // Your full list of users
  allUsers = [
    { name: 'Ted', project: 'b', projectName: 'Tasks by PM' },
    { name: 'Ted', project: 'b' , projectName: 'Tasks by User' },
    { name: 'Bob', project: 'a' , projectName: 'Projects to PM listype listname listelements listdate ' },
    { name: 'Sue', project: 'c' , projectName: 'Summary -- all isues past due etc' }, 
    { name: 'Style', project: 'd' , projectName: 'table https://material.angular.dev/components/autocomplete/overview' },
    { name: 'Style', project: 'd' , projectName: 'stepper 1 step 2 step https://material.angular.dev/components/autocomplete/overview' },
    { name: 'Style', project: 'd' , projectName: 'check box https://material.angular.dev/components/checkbox/overview' },
    { name: '1', project: '1', projectName: '1 Tasks by PM' },
    { name: '2', project: '2', projectName: '2 Tasks by PM' },
  ];

  // 
  filteredUsers: any[] = [];


  currentProjectId: string | null = null;

    constructor(
    private router: Router, 
    private route: ActivatedRoute 
  ) {}

  // ngOnInit(): void {
  //   // Subscribes to changes in the URL query parameters
  //   this.route.queryParams.subscribe(params => {
  //     this.currentProjectId = params['projectId'];
  //     console.log('Now showing users for project:', this.currentProjectId);
  //   });
  // }
  updateUserView() {
    this.router.navigate([], {
      relativeTo: this.route,
      // 'merge' keeps existing params (projectId) and adds/updates new ones
      queryParams: { lastUpdated: new Date().getTime() }, 
      queryParamsHandling: 'merge' 
    });
  }

ngOnInit(): void {
    // Watch for changes in the URL (e.g., ?projectId=a)
    this.route.queryParams.subscribe(params => {
      this.currentProjectId = params['projectId'];
      this.filterData();
    });

    //     this.router.navigate([], {
    //   relativeTo: this.route,
    //   // queryParams: { projectId: selectedId },
    //   queryParamsHandling: 'merge', // Keeps other existing parameters if any
    // });

  }


  filterData(): void {

    
    if (this.currentProjectId) {
      this.filteredUsers = this.allUsers.filter(user => user.project === this.currentProjectId);
    } else {
      this.filteredUsers = this.allUsers; // Show all if no project is selected
    }
  }

}
