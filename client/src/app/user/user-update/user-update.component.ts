import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
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

  public userId: any;
  public image: any;
  constructor(
    public userSerivce: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((prams) => {
      this.userId = prams.get('id');
      this.populateOldData();
    });
  }

  populateOldData() {
    this.userSerivce.getUserDetails(this.userId).subscribe((data: any) => {
      this.firstName.setValue(data.message.First_Name);
      this.lastName.setValue(data.message.Last_Name);
      this.email.setValue(data.message.Email);
      this.phoneNumber.setValue(data.message.Phone);

      this.getImage();
    });
  }

  getImage() {
    this.userSerivce.getUserImage(this.userId).subscribe(
      (data: any) => {
        console.log(data);
        let objectURL = URL.createObjectURL(data);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    this.document = fileList;
    this.documentName = this.document[0].name;
  }

  submit() {
    const fd = new FormData();

    if (this.documentName) {
      fd.append('image', this.document[0]);
    }

    fd.append('First_Name', this.firstName.value);
    fd.append('Last_Name', this.lastName.value);
    fd.append('Email', this.email.value);
    fd.append('Phone', this.phoneNumber.value);

    this.userSerivce.updateUser(this.userId, fd).subscribe((data: any) => {
      this.router.navigate(['..']);
    });
  }
}
