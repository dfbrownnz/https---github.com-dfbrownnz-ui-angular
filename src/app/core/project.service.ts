import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private http = inject(HttpClient);
    private apiUrl = 'https://todoapi-947367955954.europe-west1.run.app/gcs/file-contents';
    // https://todoapi-947367955954.europe-west1.run.app/gcs/file-contents?bucketName=cary-tasks&ProjectId=todos.2.json
    private bucketName = 'cary-tasks';

    // This method fetches the raw data that TanStack Query will cache
    async getTodos(projectId: string) {
        const apiUrlComplete = `${this.apiUrl}?bucketName=${this.bucketName}&ProjectId=todos.${projectId}.json`
        // console.log('|project.servic.ts|apiUrlComplete|', apiUrlComplete)

        const todos = await lastValueFrom(
            this.http.get<any[]>(apiUrlComplete)
        );

        return todos;
    }

    // This method fetches the raw data that TanStack Query will cache
    async saveTodos(todoRecord: any) {
        const apiUrlComplete = `${this.apiUrl}?bucketName=${this.bucketName}&ProjectId=todos.${todoRecord.ProjectId}.json`
        // http://localhost:5173/gcs/file-contents?bucketName=cary-tasks&ProjectId=todos.2.json
        const projectData = {
            "ProjectId": "1",
            "Id": 3,
            "Description": "cleanup",
            "Name": "cleanup",
            "Group": "Approval",
            "StatusFlag": "Not Started",
            "StatusDate": "20250102"
        }
        // console.log('|project.service.ts|apiUrlComplete|', apiUrlComplete , todoRecord)

//         curl -X 'PUT' \
//   'http://localhost:5173/gcs/file-contents?bucketName=cary-tasks&ProjectId=todos.2.json' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "ProjectId": "1",
//   "Id": 3,
//   "Description": "cleanup",
//   "Name": "cleanup",
//   "Group": "Approval",
//   "StatusFlag": "Not Started",
//   "StatusDate": "20250102"
// }'

      return this.http.put(apiUrlComplete, todoRecord);
    }

}