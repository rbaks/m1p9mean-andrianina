import { Dish } from './dish';
import { DishFilter } from './dish-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment.prod';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class DishService {
  dishList: Dish[] = [];
  api = `${environment.apiUrl}/dishes`;

  constructor(private http: HttpClient) {}

  findById(id: string): Observable<Dish> {
    const url = `${this.api}/${id}`;
    const params = { _id: id };
    return this.http.get<Dish>(url, { params, headers });
  }

  load(filter: DishFilter): void {
    this.find(filter).subscribe({
      next: (result) => {
        this.dishList = result;
      },
      error: (err) => {
        console.error('error loading', err);
      },
    });
  }

  find(filter: DishFilter): Observable<Dish[]> {
    const params = {
      name: filter.name,
    };

    return this.http.get<Dish[]>(this.api, { params, headers });
  }

  save(entity: Dish): Observable<Dish> {
    let params = new HttpParams();
    let url = '';
    if (entity._id) {
      url = `${this.api}/${entity._id.toString()}`;
      params = new HttpParams().set('ID', entity._id.toString());
      return this.http.put<Dish>(url, entity, { headers, params });
    } else {
      url = `${this.api}`;
      return this.http.post<Dish>(url, entity, { headers, params });
    }
  }

  delete(entity: Dish): Observable<Dish> {
    let params = new HttpParams();
    let url = '';
    if (entity._id) {
      url = `${this.api}/${entity._id.toString()}`;
      return this.http.delete<Dish>(url, { headers });
    }
    return EMPTY;
  }
}
