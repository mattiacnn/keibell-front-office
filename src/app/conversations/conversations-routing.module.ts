import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationsComponent } from './pages/conversations.component';
import { SingleConversation } from './pages/single-conversation/single-conversation.component';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'browser',
              component: ConversationsComponent
          },
          {
            path: 'single',
            component: SingleConversation
        },
          {
              path: '**',
              redirectTo: 'browser'
          }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationsRoutingModule { }
