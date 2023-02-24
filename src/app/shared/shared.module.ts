import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { SidebarModule, TabModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    SidebarModule,
    TreeViewModule,
    TabModule,
    ButtonModule,
    GridModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,

  ]
})
export class SharedModule { }
