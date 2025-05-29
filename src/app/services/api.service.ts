import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  apiUrl:string = "https://dummyjson.com/todos";
  
  getTasks(arg:string = ""): Promise<JSON> {
    return fetch(this.apiUrl + "/" + arg)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data);
  }

  getRandomeTask(data: any):string {
    try {
      let tot: number = data['limit'];
      let todos: any = data['todos'];
      let rand = Math.floor(Math.random() * tot)

      return todos[rand]['todo']
    }
    catch {
      return 'New Task'
    }
  }
}
