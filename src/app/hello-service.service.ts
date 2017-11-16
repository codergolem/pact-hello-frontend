import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Greeting} from './greeting';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RequestOptions} from '@angular/http';

@Injectable()
export class HelloServiceService {

  public greetings$: Subject<String>;

  constructor(private http: HttpClient) {
    this.greetings$ = new Subject();
  }

  public requestGreeting(personToGreet: string): void {

    const body = `name=${personToGreet}`;
    console.log('INSIDE requestGreeting');

    this.http.post<Greeting>('http://localhost:8080/hello', body, {
      headers: new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded')
    })
      .subscribe(greeting => {
        console.log('got a greeting from real service ' + JSON.stringify(greeting));
        this.greetings$.next(greeting.hello);
      }, e => 'Here is the error ' + e.toString());
  }

}
