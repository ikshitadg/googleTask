import { Component, OnInit } from '@angular/core';
import { HomeService } from "./home.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  editTaskForm: FormGroup;
  completeTask: boolean = false;
  isComplete: boolean = false;
  show_data: boolean = false;
  showEdit: boolean = false;
  isFinalDelete:boolean=false;
  isReactiveTask:boolean=false;
  id;
  updatedTaskId;
  taskList;
  entry;
  selectedTaskId;
  selectedTask;
  completeTaskList;
  completeTaskCount;
  



  constructor(private fb: FormBuilder, private _taskService: HomeService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getAllTaskList();
    this.getCompleteTaskCount();
    this.createForm();

  }
  createForm() {
    this.editTaskForm = this.fb.group({
      task: ['', Validators.required],
      taskDetail: [''],
    });
  }

  //submit the form
  editTask(id) {
    this.updatedTaskId = id;
    this._taskService.updateOneTaskList(this.updatedTaskId, this.editTaskForm.value.task, this.editTaskForm.value.taskDetail)
  }
  showEditForm(taskId: any) {
    this.showEdit = true;
    this.selectedTaskId = taskId;
    this._taskService.getOneTaskList(this.selectedTaskId).subscribe((res) => {
      this.selectedTask = res.data[0];
    }, (err) => {
      console.log(' on edit task list  ::: ', err);

    });

  }
  show() {
    this.show_data = true;
  }
  onSelectChange(event: any) {
    this.id = event.target.value;
    this._taskService.deleteTaskList(this.id).subscribe((res) => {
      this.entry = res.data;
      if (res.message == "success") {
        this.isComplete = true;
        location.reload();
      }
    }, (err) => {
      console.log(' on select list  ::: ', err);
    });
  }

  getAllTaskList() {
    this._taskService.getTaskList().subscribe((res) => {
      this.taskList = res.data;
    }, (err) => {
      console.log(' on failure list  ::: ', err);
    });
  }

  showCompleteTask() {
    this.completeTask = true;
    this._taskService.getCompleteTaskList().subscribe((res) => {
      this.completeTaskList = res.data;
    }, (err) => {
      console.log(' on failure complete task  ::: ', err);
    });
  }
  getCompleteTaskCount() {
    this._taskService.getTaskCount().subscribe((res) => {
      this.completeTaskCount = res.data
    }, (err) => {
      console.log(' on failure complete task count  ::: ', err);
    });
  }

  delete(tid) {
    console.log("id", tid);
    this._taskService.finalDeleteTask(tid).subscribe((res)=>{
      this.isFinalDelete=true;
    },(err)=>{
      console.log(' on failure final delete of complete task  ::: ', err);

    });
  }
  reActiveTask(taskid) {
    console.log("idd", taskid);
    this._taskService.reActiveTask(taskid).subscribe((res)=>{
    this.isReactiveTask=true;
    },
    (err)=>{
      console.log(' on failure reactivetask   ::: ', err);

    });
  }
}
