import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    if (form.valid) {
      const { email, password, username } = form.value;
      this.auth.register(email, username, password).subscribe(
        data => {
          this.router.navigateByUrl('/login');
        },
        error => {
          this.error = error;
        });
    }
  }

}
