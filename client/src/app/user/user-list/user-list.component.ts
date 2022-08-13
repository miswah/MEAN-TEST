import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public userList$: Observable<any> = this.userService.getUserList().pipe(
    catchError((err) => {
      console.log(err);
      return EMPTY;
    })
  );

  constructor(private userService: UserManagementService) {}

  ngOnInit(): void {}
}
