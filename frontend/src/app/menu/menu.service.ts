import { Menu } from './menu';
import { MenuFilter } from './menu-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class MenuService {
  menuList: Menu[] = [];
  api = 'http://localhost:3001/api/dishes';

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Menu> {
    const url = `${this.api}/${id}`;
    const params = { _id: id };
    return this.http.get<Menu>(url, {params, headers});
  }

  load(filter: MenuFilter): void {
    this.find(filter).subscribe({
      next: result => {
        this.menuList = result;
      },
      error: err => {
        console.error('error loading', err);
      }
    });
  }

  find(filter: MenuFilter): Observable<Menu[]> {
    const params = {
      'name': filter.name,
    };

    return this.http.get<Menu[]>(this.api, {params, headers});
  }

  save(entity: Menu): Observable<Menu> {
    let params = new HttpParams();
    let url = '';
    if (entity._id) {
      url = `${this.api}/${entity._id.toString()}`;
      params = new HttpParams().set('ID', entity._id.toString());
      return this.http.put<Menu>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<Menu>(url, entity, {headers, params});
    }
  }

  delete(entity: Menu): Observable<Menu> {
    let params = new HttpParams();
    let url = '';
    if (entity._id) {
      url = `${this.api}/${entity._id.toString()}`;
      params = new HttpParams().set('ID', entity._id.toString());
      return this.http.delete<Menu>(url, {headers, params});
    }
    return EMPTY;
  }
}

