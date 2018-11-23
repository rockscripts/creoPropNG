import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../providers/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../components/alert/alert.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.config.getAPIUrl() + 'verify/' + id)
      .subscribe( r => {
        this.alert.showAlert.next({ t: 's', m: 'Su cuenta ha sido verificada'});
        this.router.navigate(['/home/1']);
      },
      error => {
        this.alert.showAlert.next({ t: 'a', m: '¿Qué intentas hacer?'});
        this.router.navigate(['/not-found']);
      });
  }

}
