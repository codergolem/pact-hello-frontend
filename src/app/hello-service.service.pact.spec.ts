import {HttpClient, HttpHandler, HttpXhrBackend, XhrFactory} from '@angular/common/http';
import {HelloServiceService} from './hello-service.service';
import {Pact} from '@pact-foundation/pact-node/src/pact';
import pact = require('pact');

describe('helloWorld Pact' , () => {
  const provider = pact({
    consumer: 'helloWorld-frontend',
    provider: 'helloWorld-backend',
    port: 8080,
    log: 'logs/pact.log',
    dir: 'pacts',
    spec: 2
  });
  const expectedHelloWorldResponse = [
    {'hello': 'world'}
  ];

  let helloService;
  let httpHandler: HttpHandler;
  let httpClient: HttpClient;

  beforeEach(done => {
    provider.setup()
      .then(() => {
        provider.addInteraction({
          state: 'Initial State',
          uponReceiving: 'a empty request from hello-frontend',
          withRequest: {
            method: 'POST',
            path: '/hello',
            headers: {'Accept': 'application/json'}
          },
          willRespondWith : {
            status : 200,
            headers :  { 'Content-Type': 'application/json' },
            body : expectedHelloWorldResponse
          }
        });
      }).then(() => done());
  });

  const xhrFactory = {
    build(): any { return <any>(new XMLHttpRequest()); }
  } as XhrFactory;
  httpHandler = new HttpXhrBackend(xhrFactory);
  httpClient = new HttpClient(httpHandler);

  helloService = new HelloServiceService(httpClient);

  it('should return a greeting to the given name', (done) => {
    helloService.requestGreeting('');
  });

  afterAll(() => {
    provider.finalize();
  });
});
