import { assert } from 'chai';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { RestClient } from '../rest-client';
import { Get, Post } from './request-methods';

import { Path, Query, PlainQuery, Format, Header, Body } from './parameters';

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

class TestClientPath extends RestClient {

  constructor( httpHandler: HttpClient, private responseCallback?: (resp: any) => void ) {
    super( httpHandler );
  }

  responseInterceptor(resp: Observable<HttpResponse<any>>) {
    if (this.responseCallback) {
      return resp.pipe(tap(this.responseCallback));
    }
    return resp;
  }

  @Get( '/items/{id}' )
  // @ts-ignore
  public getItem( @Path( 'id' ) id?: number ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/items2/{id}' )
  // @ts-ignore
  public getItem2( @Path( 'id', { value: 7 } ) id?: number ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/items3/{id}/status/status-{statusName}.{ext}' )
  // @ts-ignore
  public getItem3( @Path( 'id' ) id: number, @Path( 'statusName' ) statusName: string, @Path( 'ext', 'json' ) ext?: string ): Observable<HttpResponse<any>> {
    return null;
  }

}

class TestClientQuery extends RestClient {

  constructor( httpHandler: HttpClient, private responseCallback?: (resp: any) => void ) {
    super( httpHandler );
  }

  responseInterceptor(resp: Observable<HttpResponse<any>>) {
    if (this.responseCallback) {
      return resp.pipe(tap(this.responseCallback));
    }
    return resp;
  }

  @Get( '/items' )
  // @ts-ignore
  public getItems( @Query( 'page' ) page?: number ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/items2' )
  // @ts-ignore
  public getItems2( @Query( 'page', '20' ) page?: number ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/items3' )
  // @ts-ignore
  public getItems3( @Query( 'page' ) page: number, @Query( 'size', 20 ) size?: string, @Query( 'sort', 'asc' ) sort?: string ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsCSV' )
  // @ts-ignore
  public getItemsCSV( @Query( 'field', { format: Format.CSV } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsSSV' )
  // @ts-ignore
  public getItemsSSV( @Query( 'field', { format: Format.SSV } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsTSV' )
  // @ts-ignore
  public getItemsTSV( @Query( 'field', { format: Format.TSV } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsPIPES' )
  // @ts-ignore
  public getItemsPIPES( @Query( 'field', { format: Format.PIPES } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsMULTI' )
  // @ts-ignore
  public getItemsMULTI( @Query( 'field', { format: Format.MULTI } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

}

interface AnyQuery {
  [k: string]: any;
}

class TestClientPlainQuery extends RestClient {

  constructor( httpHandler: HttpClient, private responseCallback?: (resp: any) => void ) {
    super( httpHandler );
  }

  responseInterceptor(resp: Observable<HttpResponse<any>>) {
    if (this.responseCallback) {
      return resp.pipe(tap(this.responseCallback));
    }
    return resp;
  }

  @Get( '/items' )
  // @ts-ignore
  public getItems( @PlainQuery query?: string ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/items2' )
  // @ts-ignore
  public getItems2( @PlainQuery query?: AnyQuery ): Observable<HttpResponse<any>> {
    return null;
  }

}

class TestClientHeader extends RestClient {

  constructor( httpHandler: HttpClient, private responseCallback?: (resp: any) => void ) {
    super( httpHandler );
  }

  responseInterceptor(resp: Observable<HttpResponse<any>>) {
    if (this.responseCallback) {
      return resp.pipe(tap(this.responseCallback));
    }
    return resp;
  }

  @Get( '/items' )
  // @ts-ignore
  public getItems( @Header( 'page' ) page?: number ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/items2' )
  // @ts-ignore
  public getItems2( @Header( 'page', '20' ) page?: number ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/items3' )
  // @ts-ignore
  public getItems3( @Header( 'page' ) page: number, @Header( 'size', 20 ) size?: string, @Header( 'sort', 'asc' ) sort?: string ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsDefault' )
  // @ts-ignore
  public getItemsDefault( @Header( 'field' ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsCSV' )
  // @ts-ignore
  public getItemsCSV( @Header( 'field', { format: Format.CSV } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsSSV' )
  // @ts-ignore
  public getItemsSSV( @Header( 'field', { format: Format.SSV } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsTSV' )
  // @ts-ignore
  public getItemsTSV( @Header( 'field', { format: Format.TSV } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsPIPES' )
  // @ts-ignore
  public getItemsPIPES( @Header( 'field', { format: Format.PIPES } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/itemsMULTI' )
  // @ts-ignore
  public getItemsMULTI( @Header( 'field', { format: Format.MULTI } ) fields: string | string[] ): Observable<HttpResponse<any>> {
    return null;
  }

}

class TestClientBody extends RestClient {

  constructor( httpHandler: HttpClient, private responseCallback?: (resp: any) => void ) {
    super( httpHandler );
  }

  responseInterceptor(resp: Observable<HttpResponse<any>>) {
    if (this.responseCallback) {
      return resp.pipe(tap(this.responseCallback));
    }
    return resp;
  }

  @Post( '/items' )
  // @ts-ignore
  public createItem( @Body body?: any ): Observable<HttpResponse<any>> {
    return null;
  }

  @Get( '/items2' )
  // @ts-ignore
  public createItem2( @Body body1?: any, @Body body2?: any ): Observable<HttpResponse<any>> {
    return null;
  }

}

describe( '@Path', () => {

  it( 'resolve Path variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.url } ) );
    } );

    // assert
    let testClient  = new TestClientPath( requestMock, resp => {
      try {
        assert.equal( resp.url, '/items/5' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItem( 5 ).subscribe();
  } );

  it( 'resolve missing Path variable', () => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.url } ) );
    } );
    let testClient  = new TestClientPath( requestMock );

    try {
      // Act
      let result = testClient.getItem();

      // Assert
      assert.fail();
    } catch ( e ) {
      assert.equal( e.message, 'Missing path variable \'id\' in url /items/{id}' );
    }

  } );

  it( 'resolve default Path variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.url } ) );
    } );
    let testClient  = new TestClientPath( requestMock, resp => {
      // Assert
      try {
        assert.equal( resp.url, '/items2/7' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItem2().subscribe();

  } );

  it( 'resolve multiple Path variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.url } ) );
    } );
    let testClient  = new TestClientPath( requestMock, resp => {
      try {
        assert.equal( resp.url, '/items3/20/status/status-done.json' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItem3( 20, 'done' ).subscribe();

  } );
} );

describe( '@Query', () => {

  it( 'resolve Query variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/items?page=5' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems( 5 ).subscribe();

  } );

  it( 'resolve missing Query variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      // Assert
      try {
        assert.equal( resp.url, '/items' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems().subscribe();
  } );

  it( 'resolve default Query variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/items2?page=20' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems2().subscribe();
  } );

  it( 'resolve multiple Query variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/items3?sort=asc&size=20&page=3' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems3( 3, '20' ).subscribe();

  } );

  it( 'resolve Collection Format CSV', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/itemsCSV?field=name,desc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsCSV( [ 'name', 'desc' ] ).subscribe();

  } );

  it( 'resolve Collection Format SSV', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/itemsSSV?field=name%20desc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsSSV( [ 'name', 'desc' ] ).subscribe();
  } );

  it( 'resolve Collection Format TSV', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/itemsTSV?field=name%09desc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsTSV( [ 'name', 'desc' ] ).subscribe();

  } );

  it( 'resolve Collection Format PIPES', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/itemsPIPES?field=name%7Cdesc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsPIPES( [ 'name', 'desc' ] ).subscribe();

  } );

  it( 'resolve Collection Format MULTI', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/itemsMULTI?field=name&field=desc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsMULTI( [ 'name', 'desc' ] ).subscribe();
  } );
} );

describe( '@PlainQuery', () => {

  it( 'resolve PlainQuery as a string', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientPlainQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/items?page=5&filter=name' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems('page=5&filter=name').subscribe();

  } );

  it( 'resolve PlainQuery as a string', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientPlainQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/items?page=5&filter=name' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems('?page=5&filter=name').subscribe();

  } );

  it( 'resolve PlainQuery as object', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { url: req.urlWithParams } ) );
    } );
    let testClient  = new TestClientPlainQuery( requestMock, resp => {
      try {
        assert.equal( resp.url, '/items2?page=5&filter=name' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems2({ page: 5, filter: 'name' }).subscribe();

  } );
} );

describe( '@Header', () => {

  it( 'resolve Header variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.deepEqual( <any> resp.headers.getAll( 'page' ), [ '5' ] );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems( 5 ).subscribe();

  } );

  it( 'resolve missing Header variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.isFalse( resp.headers.has( 'path' ) );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems().subscribe();
  } );

  it( 'resolve default Header variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.deepEqual( resp.headers.getAll( 'page' ), [ '20' ] );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems2().subscribe();

  } );

  it( 'resolve multiple Header variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.deepEqual( <any> resp.headers.getAll( 'page' ), [ '3' ] );
        assert.deepEqual( resp.headers.getAll( 'sort' ), [ 'asc' ] );
        assert.deepEqual( resp.headers.getAll( 'size' ), [ '20' ] );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItems3( 3, '20' ).subscribe();

  } );

  it( 'resolve Collection', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.equal( resp.headers.get( 'field' ), 'name,desc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsDefault( [ 'name', 'desc' ] ).subscribe();
  } );

  it( 'resolve Collection Format CSV', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.equal( resp.headers.get( 'field' ), 'name,desc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsCSV( [ 'name', 'desc' ] ).subscribe();

  } );

  it( 'resolve Collection Format SSV', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.equal( resp.headers.get( 'field' ), 'name desc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsSSV( [ 'name', 'desc' ] ).subscribe();

  } );

  it( 'resolve Collection Format TSV', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.equal( resp.headers.get( 'field' ), 'name\tdesc' );
        done();
      } catch ( e ) {
        done( e );
      }
     } );

    // Act
    let result = testClient.getItemsTSV( [ 'name', 'desc' ] ).subscribe();
  } );

  it( 'resolve Collection Format PIPES', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.equal( resp.headers.get( 'field' ), 'name|desc' );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsPIPES( [ 'name', 'desc' ] ).subscribe();
  } );

  it( 'resolve Collection Format MULTI', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { headers: req.headers } ) );
    } );
    let testClient  = new TestClientHeader( requestMock, resp => {
      try {
        assert.deepEqual( resp.headers.getAll( 'field' ), [ 'name', 'desc' ] );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.getItemsMULTI( [ 'name', 'desc' ] ).subscribe();

  } );
} );

describe( '@Body', () => {

  it( 'resolve Body variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { body: req.body } ) );
    } );
    let testClient  = new TestClientBody( requestMock, resp => {
      try {
        assert.deepEqual( JSON.parse(resp.body), { name: 'Awesome Item' } );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.createItem( { name: 'Awesome Item' } ).subscribe();
  } );

  it( 'resolve missing Body variable', ( done: ( e?: any ) => void ) => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { body: req.body } ) );
    } );
    let testClient  = new TestClientBody( requestMock, resp => {
      try {
        assert.deepEqual( resp.body, null );
        done();
      } catch ( e ) {
        done( e );
      }
    } );

    // Act
    let result = testClient.createItem().subscribe();
  } );

  it( 'resolve 2 Body variable', () => {
    // Arrange
    let requestMock = new HttpMock( ( req: HttpRequest<any> ) => {
      return of( new HttpResponse<any>( { body: req.body } ) );
    } );
    let testClient  = new TestClientBody( requestMock );

    // Act
    try {
      testClient.createItem2( { name: 'first' }, { name: 'second' } );
      assert.fail();
    } catch ( e ) {
      assert.equal( e.message, 'Only one @Body is allowed' );
    }
  } );
} );
