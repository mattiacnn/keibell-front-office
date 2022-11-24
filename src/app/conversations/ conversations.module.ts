import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common';

import {ConversationsComponent} from './pages/conversations.component'
import {SingleConversation } from './pages/single-conversation/single-conversation.component'

import { ConversationsRoutingModule } from './conversations-routing.module';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzListModule} from 'ng-zorro-antd/list';

@NgModule({
  declarations: [
    ConversationsComponent,
    SingleConversation,
  ],
  imports: [
    CommonModule,
    ConversationsRoutingModule,
    // NZ ZORRO
    NzSelectModule,
    NzTableModule,
    NzDividerModule,
    NzPopoverModule,
    NzPageHeaderModule,
    NzAvatarModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzStepsModule,
    NzListModule
  ]
})
export class ConversationsModule {
}
