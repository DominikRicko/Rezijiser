import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSuccessful = false;

  reg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  surname = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
  formControl: FormGroup = new FormGroup({
    name: this.name,
    surname: this.surname,
    email: this.email,
    password: this.password
  });

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.formControl);
    this.authService.register(this.formControl.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
      },
      (err) => {
        console.log(err);
        this.snackBar.open('Greška prilikom registracije.', null, {duration: 2500});
      },
      () => {
        if (this.isSuccessful) {
          this.login();
          this.snackBar.open('Uspješna registracija.', null, {duration: 2500});
        } else {
          this.snackBar.open('Registracija nije uspjela.', null, {duration: 2500});
        }
      }
    );
  }

  login() {
    this.router.navigate(['login']);
  }
}
