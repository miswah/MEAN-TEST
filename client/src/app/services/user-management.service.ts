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

  createNewUser(fd: FormData) {
    return this.http.post(environment.APIURL + `/user/create`, fd);
  }

  deleteUser(id: number) {
    return this.http.delete(environment.APIURL + `/user/${id}`, this.headers);
  }

  getUserDetails(id: number) {
    return this.http.get(environment.APIURL + `/user/${id}`);
  }

  getUserImage(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'blob',
      Accept: '*/*',
      observe: 'response',
    });
    return this.http.get(environment.APIURL + `/user/image/${id}`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
