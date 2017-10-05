import { UsersPageService } from '../users-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-invitations-page',
  templateUrl: './invitations-page.component.html',
  styleUrls: ['./invitations-page.component.scss']
})
export class InvitationsPageComponent implements OnInit {

  constructor(
    public usersPageService: UsersPageService
  ) { }

  ngOnInit() {
    this.usersPageService.getInvitations();
  }

}
