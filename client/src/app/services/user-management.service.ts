import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private headers;
  constructor(private http: HttpClient) {
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getUserList() {
    return this.http.get(environment.APIURL + `/user/all`, this.headers);
  }
}
