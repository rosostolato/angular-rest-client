
import { assert } from 'chai';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { RestClient } from '../rest-client';
import { Get } from './request-methods';
import { Client } from './client';

class HttpMock extends HttpClient {

  public callCount: number = 0;
  public lastRequest: HttpRequest<any>;

  constructor( private requestFunction: ( req: HttpRequest<any> ) => Observable<HttpResponse<any>> ) {
    super(null);
  }

  request<R>(req: HttpRequest<any>|any, p2?:any, p3?:any, p4?:any): Observable<any> {
    this.callCount++;
    this.lastRequest = req;
    return this.requestFunction(req);
  }

}

@Client({
  serviceId: 'customer-service',
  baseUrl: '/api/v1/customers',
  headers: {
    'content-type': 'application/json'
  }
})
//@ts-ignore
class TestClient extends RestClient {

  constructor( httpHandler: HttpClient ) {
    super( httpHandler );
  }

  @Get('/test')
  // @ts-ignore
  public getItems(): Observable<HttpResponse<any>> {
    return null;
  }

}

describe('@Client', () => {

  it('verify decorator attributes are added to the request', () => {
    // Arrange
    let requestMock = new HttpMock((req: HttpRequest<any>) => {
      return of(new HttpResponse<any>({status: 200}));
    });
    let testClient = new TestClient(requestMock);

    // Assert
    assert.equal(testClient.getServiceId(), 'customer-service');
    assert.equal(testClient.getBaseUrl(), '/api/v1/customers');
    assert.deepEqual(<any> testClient.getDefaultHeaders(), {
      'content-type': 'application/json'
    });

  });
});
