import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  user: any = {};

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
    }
  }

  onSubmit() {
      this.authService.login(this.form).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.userService.getUser().subscribe(user => {
            this.tokenStorage.saveUser(user);
            this.user = user;
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.router.navigate(['/home']);
          });
        },
        (err) => {
          console.log(err);
          this.snackBar.open('Greška prilikom prijave.', null, {duration: 2500});
          this.isLoginFailed = true;
        },
        () => { this.snackBar.open('Uspješna prijava.', null, {duration: 2500}); }
      );
  }

  signOut() {
    this.tokenStorage.signOut();
    this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }

  register() {
    this.router.navigate(['register']);
  }
}

