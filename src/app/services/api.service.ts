import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  
  apiUrl: string = "https://dummyjson.com/todos/";

  constructor(private http: HttpClient) {}
  
  getTasks(arg: string = ""): Observable<any> {
    return this.http.get<JSON>(this.apiUrl + arg).pipe(

      catchError((error) => {
        console.warn('no connection to api: ' + this.apiUrl + arg);
        return of({ todos: [{ todo: 'Task' }] });
      })
    );
  }

  getRandomTask(data: any): string {
    try {
      const tot: number = data['limit'];
      const todos: any[] = data['todos'];
      const rand = Math.floor(Math.random() * tot);
      return todos[rand]?.['todo'] ?? 'New Task';
    } catch {
      return 'New Task';
    }
  }
}
