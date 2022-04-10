import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, map } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";
import * as moment from "moment";

import { environment } from "../../../environments/environment";
import { of, EMPTY } from "rxjs";
import { response } from "express";

export class User {
  readonly id!: string;
  readonly email!: string;
  readonly isActive!: boolean;
}

export class LoginResponse {
  readonly token!: string;
  readonly user!: User;
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    @Inject("LOCALSTORAGE") private localStorage: Storage
  ) {}

  login(email: string, password: string) {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/login`,
      { email, password },
      options
    );
  }

  logout(): void {
    this.localStorage.removeItem("currentUser");
  }

  getCurrentUser(): any {
    return JSON.parse(this.localStorage.getItem("currentUser")!);
  }

  passwordResetRequest(email: string) {
    return of(true).pipe(delay(1000));
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
    return of(true).pipe(delay(1000));
  }

  passwordReset(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): any {
    return of(true).pipe(delay(1000));
  }
}
