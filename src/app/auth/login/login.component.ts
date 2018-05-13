import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() { }

  onLogin(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;

      this.auth.login(username, password)
        .subscribe(data => {
          this.router.navigateByUrl('/');
        }, error => {
          this.errorMessage = error;
        });
    }
  }

}
