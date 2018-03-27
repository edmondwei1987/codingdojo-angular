import { Component,OnInit } from '@angular/core';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MEAN';
  persons=[];
  person=[];
  showEditView:boolean;
  editPerson:{};
  personForm:{};
  constructor(private _httpService:HttpService){}
  ngOnInit(){
    this.personForm={
      name:''
    }
    this.editPerson={
      name:''
    }
    this.getPersons();
    // this.getPerson();
    this.showEditView=false;
  }
  getPersons(){
    let observable=this._httpService.getPersonsObservable();
    observable.subscribe(data=>{
      this.persons=data.data;
      // console.log(data);
    });
  }
  getPerson(){
    // console.log(this.person_name);
    let observable=this._httpService.getPersonObservable();
    observable.subscribe(data=>{
      this.person=data.person;
      // console.log(data);
    });
  }
  getPersonOnkeyUp(event:any){
    // console.log(event.target.value);
    let observable=this._httpService.getPersonObservableName(event.target.value);
    observable.subscribe(data=>{
      this.person=data.person;
    });
  }
  createPerson(){
    let createObs=this._httpService.createObs(this.personForm);
    createObs.subscribe(data=>{
      // console.log(data);
      this.getPersons();
    })
    this.personForm={
      name:''
    }
  }
  deletePerson(id){
    let deleteObs=this._httpService.deleteObs(id);
    deleteObs.subscribe(data=>{
      // console.log(data);
      this.getPersons();
    })
  }
  showEdit(id){
    this.showEditView=true;
    let observable=this._httpService.editPersonObs(id);
    observable.subscribe(data=>{
      this.editPerson=data.person[0];
    });
  }
  updatePerson(){
    let observable=this._httpService.updatePersonObs(this.editPerson);
    observable.subscribe(data=>{
      // console.log('hihihi');
      this.showEditView=false;
      this.editPerson={
        name:''
      };
      this.getPersons();
    });
  }
}
