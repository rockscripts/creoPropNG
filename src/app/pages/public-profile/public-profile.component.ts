import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Perfil } from '../../models/perfil';
import { ProfileService } from '../../providers/profile.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  public profile: Perfil;
  public showProps: boolean = false;
  private _onDestroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this._onDestroy))
      .subscribe(params => {

        this.profileService.getProfile(params.id)
          .pipe(takeUntil(this._onDestroy))
          .subscribe((res: any) => {
            let profileData = { ...res.data };
            let inmoData = { ...res.data.inmobiliaria };

            delete profileData.inmobiliaria;

            this.profile = new Perfil(profileData, inmoData);
          });

      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let profileContainerHeight: number = document.querySelector('.profile-info-container').clientHeight;
      let contactContainerHeight: number = document.querySelector('.contact-info-container').clientHeight;
      let tapsContainer = <HTMLElement>document.querySelector('.tabs-container');

      if (profileContainerHeight > contactContainerHeight) {
        tapsContainer.style.marginTop = '20px';
      } else {
        let diff = contactContainerHeight - profileContainerHeight;
        tapsContainer.style.marginTop = `${diff <= 65 ? 20 : (diff - 70) + 20}px`;
      }
    }, 300);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
