import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; //

import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel

// import { injectQuery } from '@tanstack/angular-query-experimental'; // simpe get 
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental'; // mutate state 
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-project-to-pm',
  imports: [CommonModule, FormsModule   ],
  templateUrl: './my-project-to-pm.html',
  styleUrl: './my-project-to-pm.css',
})
export class MyProjectToPm {

  private snackBar = inject(MatSnackBar);
  // Add this property to store the clicked row data
  currentSelectedData: any = null;
  

  /// route handler 
  currentProjectId: string | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Watch for changes in the URL (e.g., ?projectId=a)
    this.route.queryParams.subscribe(params => {
      this.currentProjectId = params['projectId'];

    });


  }


  //////////// tan stack 
  private http = inject(HttpClient);
  private queryClient = inject(QueryClient);

  query = injectQuery(() => ({
    queryKey: ['pm-assigned-projects'],
    queryFn: () => lastValueFrom(this.http.get<any[]>('http://localhost:4000/pm-assgined')),
  }));

  /// form hanlder 

  // Form Model
  formData = { listName: '', listElements: '' };

  // D:\dev\js\backend\ServerApi> ls ServerApi.js
  // 2. Mutation for POST request
  mutation = injectMutation(() => ({
    mutationFn: (newData: any) =>
      lastValueFrom(this.http.post('http://localhost:4000/pm-assgined', newData)),
    onSuccess: () => {
      // Invalidate and refetch to update the UI on your screen
      this.queryClient.invalidateQueries({ queryKey: ['pm-assigned-projects'] });
      // this.formData = { listName: '', listElements: '' }; // Reset form
      // Wrap the reset in setTimeout to fix NG0100
      setTimeout(() => {
        this.formData = { listName: '', listElements: '' };
      });

      // Trigger Success Toast
      this.snackBar.open('Project list saved successfully!', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }));

  onSubmit() {
    this.mutation.mutate(this.formData);
  }

}
