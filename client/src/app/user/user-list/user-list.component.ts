import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  closeResult = '';
  public userList$: Observable<any> = EMPTY;

  constructor(
    private userService: UserManagementService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.userList$ = this.userService.getUserList().pipe(
      catchError((err) => {
        console.log(err);
        return EMPTY;
      })
    );
  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      console.log('yo');

      this.getList();
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {}
      );
  }
}
