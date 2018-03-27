import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  // getPersons(){
  //   let myObservable=this._http.get('/persons');
  //   myObservable.subscribe(data=>{
  //     console.log('Ask for persons',data);
  //   });
  // }
  // getPerson(name){
  //   let myObservable=this._http.get('/person/'+name);
  //   myObservable.subscribe(data=>{
  //     console.log('Ask for single person',data);
  //   });
  // }
  // getPokemon(){
  //   let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
  //   bulbasaur.subscribe(data=>{
  //     let output=data.name+' is weight '+data.weight+' and it"s ablilities like ';
  //     for(let i in data.abilities){
  //       output+=data.abilities[i].ability.name+',';
  //       let pokemons=this._http.get('https://pokeapi.co/api/v2/ability/'+data.abilities[i].ability.name+'/');
  //       pokemons.subscribe(abilitydata=>{
  //         let names='';
  //         for(let j in abilitydata.pokemon){
  //           names+=abilitydata.pokemon[j].pokemon.name+', ';
  //         }
  //         console.log('The pokemons which has abliity '+data.abilities[i].ability.name+' are '+names);
  //       });
  //     }
  //     console.log(output);
  //   });
  // }
  getPersonsObservable(){
    return this._http.get('/persons');
  }
  getPersonObservable(){
    return this._http.get('/person/Edmond');
  }
  getPersonObservableName(name:string){
    return this._http.get('/person/'+name);
  }
  createObs(person){
    console.log(person);
    return this._http.post('/person/create',person);
  }
  deleteObs(id){
    return this._http.get('/person/delete/'+id);
  }
  editPersonObs(id){
    return this._http.get('/person/find/'+id);
  }
  updatePersonObs(person){
    return this._http.post('/person/update',person);
  }
  constructor(private _http:HttpClient) {
    // this.getPerson('Edmond');
    // this.getPersons();
    // this.getPokemon();
  }

}
