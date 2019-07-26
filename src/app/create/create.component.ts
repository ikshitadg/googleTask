import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HomeService } from "../home/home.service";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [HomeService]

})
export class CreateComponent implements OnInit {
  addTaskForm: FormGroup;

  constructor(private fb: FormBuilder,private _taskService: HomeService) { }

  ngOnInit() {
    this.createForm();

  }
  createForm() {
    this.addTaskForm = this.fb.group({
      task: ['', Validators.required],
      taskDetail: ['',Validators.required],
    });
  }
  //submit the form
  addTask() {
    console.log(this.addTaskForm.value);
    this._taskService.addTask(this.addTaskForm.value.task,this.addTaskForm.value.taskDetail);

  }

}
