import { Component } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router'; //

@Component({
  selector: 'app-my-settings',
  imports: [],
  templateUrl: './my-settings.html',
  styleUrl: './my-settings.css',
})
export class MySettings {

  // constructor(private router: Router) {} //
  // Add 'private route: ActivatedRoute' to the constructor
  constructor(
    private router: Router, 
    private route: ActivatedRoute 
  ) {}

  onProjectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value; //

    

    // Navigates to /users and adds ?projectId=a (or b, or c) to the URL
  //   this.router.navigate(['/users'], { 
  //     queryParams: { projectId: selectedId } 
  //   });
  // }

  // Update the URL of the CURRENT page with the new projectId
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { projectId: selectedId },
      queryParamsHandling: 'merge', // Keeps other existing parameters if any
    });
  }
}
