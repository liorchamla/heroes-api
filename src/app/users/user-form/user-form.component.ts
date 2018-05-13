import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  roles$: Observable<{ id: number, role: string }[]>;
  rolesTranslations = {
    'ROLE_ADMIN': 'Administrator',
    'ROLE_SUPER_ADMIN': 'Root'
  };
  error: string;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.roles$ = this.userService.getRoles().map((roles: any) => {
      return roles.map(role => {
        return { id: role.id, role: this.rolesTranslations[role.role] };
      });
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.createUser(form.value).subscribe((result: any) => {
        this.router.navigateByUrl('/users');
      }, error => {
        this.error = error.error.message;
        console.log(error);
      });
    }
  }

}
