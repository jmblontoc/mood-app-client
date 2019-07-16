import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BridgeService {

  public URL = 'https://jmblontoc-mood-app-server-1.glitch.me/';

  constructor(private http: HttpClient) { }

  // test
  public addEntry = (data: any) => {
    return this.http.post(this.URL , data)
  }

  // test
  public getAllEntries = () => {
    return this.http.get(`${this.URL}/entries`)
  }
}
