import {getTestBed, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {HelloServiceService} from "./hello-service.service";
import * as Pact from 'pact-web';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

fdescribe('HelloService', () => {
  let provider;
  let helloService: HelloServiceService;

  beforeAll((done) => {
    console.log("beforeAll, top level");
    provider = Pact({
      consumer: 'ng-hello',
      provider: 'hello-server',
      web: true
    });

    // required for slower CI environments
    setTimeout(done, 200);

    provider.removeInteractions();

  });

  afterAll((done) => {
    console.log("afterAll, top level");
    provider.finalize().then(done, e => done.fail(e));
  });

  beforeEach((done) => {
    console.log("beforeEach, top level");
    TestBed.configureTestingModule({
      providers: [ HelloServiceService ],
      imports: [ HttpClientTestingModule]
    });

     helloService = getTestBed().get(HelloServiceService);
  });

  afterEach((done) => {
    console.log("afterEach, top level");
    provider.verify().then(done, e => {
      console.error(e);
      return done.fail(e);
    });
  });

  describe('/hello', () => {
    beforeAll((done) => {
      console.log("beforeAll, /hello level");
      provider.addInteraction({
        uponReceiving : 'a request to say hello',
        withRequest: {
          method : 'POST',
          path: '/hello',
        },
        willRespondWith : {
          status :200,
          headers : {'Content-Type': 'application/json'},
          body: [{
            hello : Pact.Matchers.somethingLike('world')
          }]
        }
      }).then(done, e => done.fail(e))
    });

    it('should return a greeting to the given name', (done) => {
      console.log("test, /hello level");
      helloService.requestGreeting('');
      done();
    })
  });


});
