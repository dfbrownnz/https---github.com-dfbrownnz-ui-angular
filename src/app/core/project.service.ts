import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface ProjectData {
  Owner: string;
  Name: string;
  Values: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private http = inject(HttpClient);
    private apiUrlBase = environment.apiUrl;
    private bucketName = 'cary-tasks';

    // This method fetches the raw data that TanStack Query will cache
    async getTodos(projectId: string) {
        const apiUrl = `${this.apiUrlBase}/gcs/file-contents`;
        const apiUrlComplete = `${apiUrl}?bucketName=${this.bucketName}&ProjectId=todos.${projectId}.json`
        // console.log('|project.servic.ts|apiUrlComplete|', apiUrlComplete)

        const todos = await lastValueFrom(
            this.http.get<any[]>(apiUrlComplete)
        );

        return todos;
    }

    // This method fetches the raw data that TanStack Query will cache
    async saveTodos(todoRecord: any) {
        const apiUrl = `${this.apiUrlBase}/gcs/file-contents`;
        const apiUrlComplete = `${apiUrl}?bucketName=${this.bucketName}&ProjectId=todos.${todoRecord.ProjectId}.json`
         console.log('|project.service.ts|apiUrlComplete|', apiUrlComplete , todoRecord)

        return this.http.put(apiUrlComplete, todoRecord);
    }


    // This method fetches the raw data that TanStack Query will cache
    async getProjectList(projectListName: string) {
        const apiUrlComplete = `${this.apiUrlBase}/projectlist`
        // console.log('|project.servic.ts|apiUrlComplete|', apiUrlComplete)

        const todos = await lastValueFrom(
            this.http.get<any[]>(apiUrlComplete)
        );
        console.log('|project.servic.ts|apiUrlComplete|', apiUrlComplete )

        return todos;
    }
    // This method fetches the raw data that TanStack Query will cache
    async saveProjectList(projectListObject : any) {
        const apiUrlComplete = `${this.apiUrlBase}/projectlist?projectlistName=${projectListObject.Owner}`
        console.log('|project.servic.ts|saveProjectList|', apiUrlComplete , projectListObject )

        return lastValueFrom(this.http.put<ProjectData>(  apiUrlComplete , projectListObject ));
    }
}
