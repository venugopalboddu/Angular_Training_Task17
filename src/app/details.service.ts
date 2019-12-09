import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private ht: HttpClient) { }
   po(d) {
     return this.ht.post('http://localhost:3000/posts', d);
   }
}
