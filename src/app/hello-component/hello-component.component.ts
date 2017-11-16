import {Component} from '@angular/core';
import {HelloServiceService} from '../hello-service.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-hello-component',
  templateUrl: './hello-component.component.html',
  styleUrls: ['./hello-component.component.css']
})
export class HelloComponentComponent  {

  public personToGreet: string;

  public greetings$: Observable<String>;

  constructor(private helloService: HelloServiceService) {
    this.greetings$ = this.helloService.greetings$;
  }

  doSubmit() {
    this.helloService.requestGreeting(this.personToGreet);
  }
}
