import { Component, Input } from '@angular/core';
import { Task } from '../interface/task';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'list',
  imports: [TaskComponent, CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  searchTask: string = "";

  // Check tasks for match with searchWord
  search(searchWord: String) {
    let match: boolean = false;
    let res: Task[] = []; 

    this.tasks.forEach(task => {
      let name:string = task.name.toLowerCase();
      match = true;

      for (let charIndex = 0; charIndex < searchWord.length; charIndex++) {
        if (!name.includes(searchWord.toLowerCase().charAt(charIndex))) match = false;
      }
      if (match) res.push(task);
    });

    return res;
  }

  @Input() tasks: Task[] = [];
}
