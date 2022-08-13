import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { UserManagementService } from 'src/app/services/user-management.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public userData$: Observable<any> = EMPTY;
  private userId: any;
  public image: any;
  constructor(
    private userSerive: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((prams) => {
      this.userId = prams.get('id');
      this.userData$ = this.userSerive.getUserDetails(this.userId);
    });

    this.loadImage();
  }

  loadImage() {
    this.userSerive.getUserImage(this.userId).subscribe(
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
}
