import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../auth/user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;

  roles = {
    ROLE_USER: { className: 'badge-primary', label: 'User' },
    ROLE_ADMIN: { className: 'badge-info', label: 'Admin' },
    ROLE_SUPER_ADMIN: { className: 'badge-success', label: 'Root' }
  };

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }

  getClassForRole(role: string) {
    return this.roles[role].className;
  }

  onRemove(user: User) {
    console.log(user);
  }

}
