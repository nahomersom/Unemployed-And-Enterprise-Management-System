import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { NodeSelectEventArgs, SidebarComponent, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { sideBarMenus } from './side-bar-menus';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  
  public getScreenWidth: any;
  public getScreenHeight: any;

  constructor(public router: Router){
      this.getScreenWidth = window.innerWidth;
      this.getScreenHeight = window.innerHeight;

  }ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
;
  @ViewChild('sidebarTreeviewInstance')
  public sidebarTreeviewInstance!: SidebarComponent;
  @ViewChild('treeviewInstance')
  public treeviewInstance!: TreeViewComponent;
  public width: string = '290px';
  @ViewChild('tree') tree: TreeViewComponent;
  public enableDock: boolean = true;
  public dockSize:string ="65px";
  public mediaQuery: string = ('(min-width: 600px)');
  public target: string = '.main-content';
  public data: Object[] = sideBarMenus;
  // public dockedData: Object[] = dockedSideMenus;
  public field:Object ={ dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss'};
  public  openedSidebarMaxWidth ;
  public  openedSidebarMinWidth ;
  public showLogo : boolean = true;
  public smallDiv : boolean=false;

  public onCreated(args: any) {
    this.sidebarTreeviewInstance.element.style.visibility = '';
    var sidebar =document.getElementById("sidebar-treeview");
    this.openedSidebarMaxWidth = sidebar.style.maxWidth;
    this.openedSidebarMinWidth = sidebar.style.minWidth;
    if( this.getScreenWidth<=768){
      this.smallDiv=true;
      this.sidebarTreeviewInstance.isOpen=false;
      this.sidebarTreeviewInstance.show();
      this.sidebarTreeviewInstance.hide();
      this.treeviewInstance.expandAll();
      this.sidebarTreeviewInstance!.width = this.openedSidebarMaxWidth;
      this.sidebarTreeviewInstance.width = '70px';
      // this.field = { dataSource: this.dockedData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss'};
      this.showLogo =false;
    }
  }
  public onClose(args: any) {
    this.treeviewInstance.collapseAll();
 
  }
  public onOpen(args:any){
    this.treeviewInstance.expandAll();
  }
  public route(args: NodeSelectEventArgs): void {
   
    const data: any = this.tree.getTreeData(args.node);
  
    const url: string = data[0].url;
    if (url !== null) {
      this.router.navigateByUrl(url);
    } else {
      // this.hideNotifications();
      this.tree.collapseAll();
      this.tree.expandAll([args.node]);
      this.tree.expandOn = 'None';

    }

  }

  openClick() {

      if(this.sidebarTreeviewInstance?.isOpen)
      {
        console.log("opend")
          this.sidebarTreeviewInstance.hide();
          this.treeviewInstance.collapseAll();
          this.sidebarTreeviewInstance.width = '70px';
          // this.field = { dataSource: this.dockedData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss'};
          this.showLogo =false;
         
      }
      else {
        console.log("opend false")
        this.sidebarTreeviewInstance!.width = this.openedSidebarMaxWidth;
        this.sidebarTreeviewInstance.show();
        this.treeviewInstance.expandAll();
        // this.field = { dataSource: this.data, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss'};
        this.showLogo=true;
      }  
      }
logout(){
  // this.accountService.logout();
  this.router.navigateByUrl('auth/login');
}
ChangePassword(){  
 this.router.navigateByUrl('auth/change-password');
}
};