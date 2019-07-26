import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class HomeService {
  show_data: boolean = false;
  url = "http://localhost:5000/";

  constructor(
    private _http: Http, private _router: Router,
  ) { }

  addTask(task, taskDetail) {
    const obj = {
      task: task,
      taskDetail: taskDetail
    };
    const add_url = this.url + 'create';
    this._http.post(add_url, obj)
      .subscribe((res) => {
        this.show_data = true;
        location.reload();
      }, (err) => {
        console.log(err);;
      });
  }
  getOneTaskList(id) {
    const getOne_url = this.url + 'getById?id=' + id;
    return this._http.get(getOne_url)
      .map(res => res.json())
      .catch((e: any) => Observable.throw(e.json()))
  }

  getTaskList(): Observable<any> {
    const get_url = this.url + 'get';
    return this._http.get(get_url)
      .map(res => res.json())
      .catch((e: any) => Observable.throw(e.json()));
  }
  getTaskCount() {
    const task_count = this.url + 'completeTaskCount';
    return this._http.get(task_count)
      .map(res => res.json())
      .catch((e: any) => Observable.throw(e.json()));

  }
  updateOneTaskList(Id, task, taskDetail) {
    const object = {
      task: task,
      taskDetail: taskDetail
    };
    const update_url = this.url + 'update?id=' + Id;
    this._http.patch(update_url, object)
      .subscribe((res) => {
        this.show_data = true;
        location.reload();
      }, (err) => {
        console.log(' on complete list  ::: ', err);
      });

  }
  deleteTaskList(id) {
    const body = {
      status: "deactive",
      statusCode: 0
    };
    const del_url = this.url + 'deleteById?id=' + id;
    return this._http.patch(del_url, body)
      .map(res => res.json())
      .catch((e: any) => Observable.throw(e.json()));
  }
  getCompleteTaskList() {
    const completeTaskList = this.url + 'getCompletedTask';
    return this._http.get(completeTaskList)
      .map(res => res.json())
      .catch((e: any) => Observable.throw(e.json()));

  }
  finalDeleteTask(tid) {
    const finaldelete = this.url + 'finalDelete?id=' + tid;
    return this._http.delete(finaldelete)
      .map(res => location.reload())
      .catch((e: any) => Observable.throw(e.json()))
  }
  reActiveTask(taskid) {
    const reActiveTask = this.url + 'reactive?id=' + taskid;
    const body1 = {
      status: "active",
      statusCode: 1
    };
    return this._http.patch(reActiveTask, body1)
      .map(res =>  { 
         location.reload();
        }
      )
      .catch((e: any) => Observable.throw(e.json()))
  }

}
