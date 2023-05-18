import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuSubject: BehaviorSubject<any>;
  allMenuSubject : BehaviorSubject<any>;
  platSubject : BehaviorSubject<any>;
  categSubject : BehaviorSubject<any>;
  constructor(private http: HttpClient) { 
    this.menuSubject = new BehaviorSubject([]);
    this.allMenuSubject = new BehaviorSubject([]);
    this.platSubject = new BehaviorSubject([]);
    this.categSubject = new BehaviorSubject([]);
  }

  public get menu$(): Observable<any> {
    return this.menuSubject.asObservable();
  }

  public get allMenu$(): Observable<any> {
    return this.allMenuSubject.asObservable();
  }

  public get plat$(): Observable<any> {
    return this.platSubject.asObservable();
  }

  public get categ$(): Observable<any> {
    return this.categSubject.asObservable();
  }

  //menu Crud
    getAllMenu() {
    return this.http.get(`${environment.apiUrl}/menu/list`)
  }

  getMenuById(menuId : string) {
    return this.http.get(`${environment.apiUrl}/menu/view/${menuId}`)
  //   .pipe(map((res:any) => {
  //     this.menuSubject.next(res);
  //  }));
  }

  createMenu(menu: any) {
    return this.http.post(`${environment.apiUrl}/menu/create`, menu).pipe(map(menu => {
       this.menuSubject.next(JSON.parse(JSON.stringify(menu)).data);
    }));
  }

  updateMenu(menuId: string,payload:any) {
    return this.http.put(`${environment.apiUrl}/menu/update/${menuId}`,payload).pipe(map(menu => {
       this.menuSubject.next(JSON.parse(JSON.stringify(menu)).data);
    }));
  }

  getPlatById(menuDetailsId){
    return this.http.get(`${environment.apiUrl}/menuDetails/view/${menuDetailsId}`)
  }

  getAllPlat(menuId,pageIndex: number, pageSize: number){
    return this.http.get(`${environment.apiUrl}/menuDetails/list/${menuId}/${pageIndex}/${pageSize}`).subscribe((res:any) => {
      this.platSubject.next(JSON.parse(JSON.stringify(res)));
   });
  }

  updatePlat(menuDetailsId: string,payload:any) {
    return this.http.put(`${environment.apiUrl}/menuDetails/update/${menuDetailsId}`,payload).pipe(map(plat => {
       this.platSubject.next(JSON.parse(JSON.stringify(plat)).data);
    }));
  }

  createPlat(data){
    return this.http.post(`${environment.apiUrl}/menuDetails/create`, data).pipe(map(plat => {
       this.platSubject.next(JSON.parse(JSON.stringify(plat)).data);
    }));
  }

  deletePlat(menuId){
    return this.http.delete(`${environment.apiUrl}/menuDetails/remove/${menuId}` ).pipe(map(plat => {
      this.platSubject.next(JSON.parse(JSON.stringify(plat)).data);
   }));
  }

  getAllCategories(menuId){
    return this.http.get(`${environment.apiUrl}/menuCategory/list/${menuId}`).subscribe((res:any) => {
      this.categSubject.next(res);
    });
  }

  getCategById(menuCategoryId){
    return this.http.get(`${environment.apiUrl}/menuCategory/view/${menuCategoryId}`)
  }

  createCateg(categ){
    return this.http.post(`${environment.apiUrl}/menuCategory/create`, categ).pipe(map(categ => {
       this.categSubject.next(JSON.parse(JSON.stringify(categ)).data);
    }));
  }
  updateCateg(menuCategoryId: string,payload:any) {
    return this.http.put(`${environment.apiUrl}/menuCategory/update/${menuCategoryId}`,payload).pipe(map(categ => {
       this.categSubject.next(JSON.parse(JSON.stringify(categ)).data);
    }));
  }

  deleteCateg(menuCategoryId){
    return this.http.delete(`${environment.apiUrl}/menuCategory/remove/${menuCategoryId}` ).pipe(map(menu => {
      this.categSubject.next(JSON.parse(JSON.stringify(menu)).data);
   }));
  }
  
}
