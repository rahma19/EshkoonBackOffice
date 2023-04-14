import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) { 
    this.menuSubject = new BehaviorSubject([]);
  }

  public get menu$(): Observable<any> {
    return this.menuSubject.asObservable();
  }

  //menu Crud
    getAllMenu() {
    return this.http.get(`${environment.apiUrl}/menu/list`).subscribe((res:any) => {
      console.log(res);
      
      this.menuSubject.next(res);
    });
  }
}
