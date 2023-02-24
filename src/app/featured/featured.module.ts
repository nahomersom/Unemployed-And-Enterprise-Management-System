import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { gridData } from '../core/models/grid-data';
import { SharedModule } from '../shared/shared.module';

let data = [
  {
    formTitle:'Driver' ,
    path:'driver', 
    page:'driver', 
    title:'driver' 
  },
  {
    formTitle:'Driver License' ,
    path:'driver-license', 
    page:'driverLicense', 
    title:'driver-license' 
  },
  {
    formTitle:'Vehicle' ,
    path:'vehicle', 
    page:'vehicle', 
    title:'vehicle' 
  },
  {
    formTitle:'Traffic Officer' ,
    path:'traffic/traffic-officer', 
    page:'trafficOfficer', 
    title:'traffic-officer' 
  },
  {
    formTitle:'Dispatchment' ,
    path:'traffic/dispatchment', 
    page:'dispatchment', 
    title:'dispatchment' 
  },
  {
    formTitle:'Accident' ,
    path:'accident', 
    page:'accident', 
    title:'accident' 
  },
  {
    formTitle:'Violation' ,
    path:'violation', 
    page:'violation', 
    title:'violation' 
  },
  {
    formTitle:'Penalty' ,
    path:'penalty', 
    page:'penalty', 
    title:'penalty' 
  },
  {
    formTitle:'Penalty Settlement' ,
    path:'penalty-settlement', 
    page:'penaltySettlement', 
    title:'penalty-Settlement' 
  },
  {
    formTitle:'Training' ,
    path:'training', 
    page:'training', 
    title:'training' 
  },
  {
    formTitle:'Lookup' ,
    path:'lookup', 
    page:'lookup', 
    title:'lookup' 
  },
  {
    formTitle:'User' ,
    path:'users-and-group/users', 
    page:'user', 
    title:'user' 
  },
  {
    formTitle:'Group' ,
    path:'users-and-group/group', 
    page:'group', 
    title:'group' 
  },
  
];
const routes:Routes = [ 
  {
path:'',
loadChildren: () => import('../featured/dashboard/dashboard.module').then((m)=>m.DashboardModule),
},
  ...data.map(ele => ({
    path: ele.path + '/list',
    component: DynamicListComponent,
    data: { 
      formTitle:ele.formTitle,
      page:ele.page, 
      action: 'canView', 
      title: ele.title.toUpperCase(), 
      breadCrumb: 'list', 
      gridInfo: gridData[ele.page] ,
    
    },
    // canActivate:[AuthGuard]
  
  })),
];

@NgModule({
  declarations: [DynamicListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class FeaturedModule { }
