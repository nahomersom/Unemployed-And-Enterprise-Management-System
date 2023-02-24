import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace/workspace.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component: WorkspaceComponent,
    loadChildren:()=>import('../featured/featured.module').then((m)=>m.FeaturedModule)
  }
]

@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CoreModule { }
