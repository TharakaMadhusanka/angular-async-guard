import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsyncGuardApiService {
  constructor(private httpClient: HttpClient) {}

  getAsyncData(): Observable<any> {
    return this.httpClient.get<any>(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
  }
}
