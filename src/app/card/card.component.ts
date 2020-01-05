import { Component, OnInit, Input } from '@angular/core';
import { HealthkitCard } from '../interfaces/healthkit';
import { HealthkitService } from '../services/healthkit.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: HealthkitCard;

  constructor(private healthkitService: HealthkitService) {}

  ngOnInit() {
  }

  toggledPermission(permission) {
    if (this.checkPermission(permission)) {
      if (permission === 'read') {
        this.healthkitService.requestReadAuthorization(this.card.type)
          .then(resp => console.log('all good'))
          .catch(err => this.setPermissions(permission, false));
      } else if (permission === 'write') {
        this.healthkitService.requestWriteAuthorization(this.card.type)
          .then(resp => console.log('all good'))
          .catch(err => this.setPermissions(permission, false));
      }
    }

  }

  checkPermission(permission) {
    return this.card.permissions[permission];
  }

  setPermissions(permission: string | Array<string>, setting: boolean) {
    if (Array.isArray(permission)) {
      permission.forEach(p => {
        this.card.permissions[p] = setting;
      })
    } else {
      return this.card.permissions[permission] = setting;
    }
  }

  checkPermissionsGranted() {
    this.healthkitService.isAuthorized(this.card.type).then(resp => {
      if (resp === 'undetermined' || resp === 'denied') {
        this.setPermissions(['read', 'write'], false);
      } else if (resp === 'authorized') {
        this.setPermissions(['read', 'write'], true);
      }
    })
  }

  allowReadPermissions() {
    this.healthkitService.requestReadAuthorization(this.card.type).then(resp => {
      this.setPermissions('read', true);
    })
  }

  allowWritePermissions() {
    this.healthkitService.requestWriteAuthorization(this.card.type).then(resp => {
      this.setPermissions('write', true);
    })
  }


}
