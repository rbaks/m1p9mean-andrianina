import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { NotificationService } from "src/app/core/services/notification.service";
import * as moment from "moment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading!: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("e-kaly - Login");
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem("savedUserEmail");

    this.loginForm = new FormGroup({
      email: new FormControl(savedUserEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("", Validators.required),
      rememberMe: new FormControl(savedUserEmail !== null),
    });
  }

  login() {
    const email = this.loginForm.get("email")?.value;
    const password = this.loginForm.get("password")?.value;

    this.loading = true;
    this.authenticationService.login(email.toLowerCase(), password).subscribe(
      (data) => {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            token: data.token,
            isAdmin: true,
            email: data.user.email,
            id: data.user.id,
            alias: data.user.email.split("@")[0],
            expiration: moment().add(1, "days").toDate(),
            fullName: data.user.email,
          })
        );
        this.router.navigate(["/"]);
      },
      (error) => {
        this.notificationService.openSnackBar(error.error.message);
        this.loading = false;
      }
    );
  }

  resetPassword() {
    this.router.navigate(["/auth/password-reset-request"]);
  }
}
