import { Component, OnInit } from '@angular/core';
import { FirebaseRemoteConfig } from 'src/app/core/services/firebase-remote-config';
import { IonLabel, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-categories-message',
  templateUrl: './categories-message.component.html',
  styleUrls: ['./categories-message.component.scss'],
  standalone: true,
  imports: [IonLabel, IonContent]
})
export class CategoriesMessageComponent  implements OnInit {
  message = '';
  constructor(private remoteConfig: FirebaseRemoteConfig) { }

  ngOnInit() {
    this.initData();
  }

  async initData() {
    await this.remoteConfig.init();
    this.message = this.remoteConfig.getString('category_list_message');
  }

}
