import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  documentName: any;

  public firstName = new FormControl('', [
    Validators.required,
    Validators.pattern('^[ A-Za-z0-9-./#&,]*$'),
  ]);

  public lastName = new FormControl('', [
    Validators.required,
    Validators.pattern('^[ A-Za-z0-9-./#&,]*$'),
  ]);

  public email = new FormControl('', [Validators.required, Validators.email]);

  public phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  public document: any = [];

  constructor(
    public userSerivce: UserManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    this.document = fileList;
    this.documentName = this.document[0].name;
  }

  submit() {
    const fd = new FormData();
    fd.append('image', this.document[0]);
    fd.append('First_Name', this.firstName.value);
    fd.append('Last_Name', this.lastName.value);
    fd.append('Email', this.email.value);
    fd.append('Phone', this.phoneNumber.value);

    this.userSerivce.createNewUser(fd).subscribe((data: any) => {
      this.router.navigate(['..']);
    });
  }
}
