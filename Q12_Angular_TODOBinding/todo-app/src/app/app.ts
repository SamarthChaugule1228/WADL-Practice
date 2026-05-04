import { FormsModule } from "@angular/forms";
import { Component } from '@angular/core'
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl:'./app.html'
})

  
export class App {

  task: string = '';
  tasks: string[] = [];
  editIndex: number = -1;

  addTask()
  {
    if (this.editIndex == -1)
    {
      this.tasks.push(this.task);
      this.editIndex = -1;
    }
    else
    {
      this.tasks[this.editIndex] = this.task;
      this.editIndex = -1;
    }
    this.task = '';
  }

  edit( i : number)
  {
    this.task = this.tasks[i];
    this.editIndex = i;
  }
  delete(i: number)
  {
    this.tasks.splice(i, 1);
  }

}