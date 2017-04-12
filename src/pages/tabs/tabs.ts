import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { UsersPage } from '../users/users';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  users = UsersPage;
  abount = AboutPage;
  contact = ContactPage;

  constructor() {

  }
}
