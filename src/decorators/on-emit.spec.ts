
import { assert } from 'chai';
import { map} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { RestClient } from '../rest-client';
import { OnEmit } from './on-emit';
import { Get } from './request-methods';

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

class Item {

  public name: string;
  public desc: string;

  constructor(props: { name: string, desc: string }) {
    this.name = props.name;
    this.desc = props.desc;
  }
}

class TestClient extends RestClient {

  constructor( httpHandler: HttpClient ) {
    super( httpHandler );
  }

  @Get('/test')
  @OnEmit(obs => obs.pipe(map(resp => new Item(JSON.parse(resp)))))
  // @ts-ignore
  public getItems(): Observable<Item> {
    return null;
  }

}

describe('@OnEmit', () => {

  it('verify OnEmit function is called', (done: (e?: any) => void) => {
    // Arrange
    let requestMock = new HttpMock((req: HttpRequest<any>) => {
      let json: any = { name: 'itemName', desc: 'Some awesome item' };
      return of(new HttpResponse<any>({body: JSON.stringify(json)}));
    });
    let testClient = new TestClient(requestMock);

    // Act
    let result = testClient.getItems();

    // Assert
    result.subscribe(item => {
      try {
        assert.equal( item.name, 'itemName' );
        assert.equal( item.desc, 'Some awesome item' );
        done();
      } catch(e) {
        done(e);
      }
    });

  });
});
