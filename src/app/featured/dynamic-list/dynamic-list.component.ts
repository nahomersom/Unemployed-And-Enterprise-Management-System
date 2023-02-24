import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStateChangeEventArgs, GridModel, PageSettingsModel, SearchSettingsModel, GroupSettingsModel, EditSettingsModel, CommandModel, FilterSettingsModel, GridComponent, SelectionSettingsModel, DataResult, IRow, Column } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType, closest } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrls: ['./dynamic-list.component.css']
})
export class DynamicListComponent implements OnInit {
  listType:any;
  currentPath = '';
  public state: DataStateChangeEventArgs;
  @Input() gridData: any;
  @Input() allowToolbar: any;
  // @Input() incomingCommand: roles;
  @Input() columns: any[] = [];
  @Input()
  childGrid!: GridModel;
  @Input()
  grouped!: boolean;
  @Input() groupBy: any;
  @Input() showColumnChooser = false;
  @Input()
  addPrivilege!: boolean;
  @Input()
  editPrivilege!: boolean;
  @Input()
  viewPrivilege!: boolean;
  @Input()
  deletePrivilege: boolean;
  @Input() showAdd = false;
  @Input() showExcelExport = false;
  @Input() showSearch = false;
  @Input() showFilter = false;
  @Input() showCollapseAndExpand = false;
  @Input() showPdfExport = false;
  @Input() allowCheckbox = true;
  @Input() height: any;
  @Output() addRecord: EventEmitter<any> = new EventEmitter();
  @Output() editRecord: EventEmitter<any> = new EventEmitter();
  @Output() printRecord: EventEmitter<any> = new EventEmitter();
  @Output() viewRecord: EventEmitter<any> = new EventEmitter();
  @Output() deleteRecord: EventEmitter<any> = new EventEmitter();

  currentDeletingItem: any;
  pageSettings: PageSettingsModel;
  remotePaging:Object = {};
  toolbar!: Array<any>;
 
  searchOptions!: SearchSettingsModel;
  groupOptions!: GroupSettingsModel;
  editSettings!: EditSettingsModel;
  commands: CommandModel[] = [];
  onFilter = false;
  // pageSizes = ['10', '50', '100', '200', 'All'];
  filterOptions: FilterSettingsModel;
  resizeSettings = { mode: "Normal" };
  public searchField:any;
  public loadingIndicator;
  @ViewChild('grid')
  public grid: GridComponent;
  @ViewChild('ejDialog')
  ejDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef })
  container!: ElementRef;
  public animationSettings: any = { effect: 'Zoom', duration: 400, delay: 0 };

  public targetElement!: HTMLElement;

  public data: any;
  public singleDelete:boolean = true;
  public selectionOptions: SelectionSettingsModel = {checkboxOnly: true, type: 'Multiple' };
  supplierArray: string[] = [];
  public selection: any[] = [];
  filter_columens: any[] = [];
  sorting_columens: any[] = [];
  searchString: any = null;
  dataApiUrl:any
  id: any;
  public fields: Object = { text: 'text',value:'value'}
  public operationFields: Object = { text: 'text',value:'value'}
  showToolbar: boolean = true;
  truckAssignmentId: number = null;
  
  constructor( 
    private activeRoute: ActivatedRoute,
    // private accountService: AccountService,
    private router: Router,
    // public crudService: CrudService
    ) {

     
      this.loadingIndicator = {indicatorType: 'Spinner'};
    this.filterOptions = { type: 'Menu' };
    this.listType = this.activeRoute.snapshot.data['gridInfo'];
    console.log('type',this.activeRoute.snapshot.data)
    this.listType.type == 'notification' ? this.showToolbar : !this.showToolbar;
    this.pageSettings = { pageSize: 15, pageCount:1};

      if (this.listType) {
   this.dataApiUrl = this.listType.dataApi;
        // this.accountService.$currentUser.subscribe(
        //   {
        //     next:(user)=>{
        //       this.incomingCommand = user?.roles.find(ele => ele.page == this.listType.pageName);             
        //     }
        //   }
        //   );
          this.columns = this.gridData = [];
          this.prepareColumns();
          
          this.feedGrid(this.dataApiUrl);
          
          this.grouped = this.listType.grouped;
       
          
    
      }
 
  } 
  ngOnDestroy(): void {
    // this.httpCancelService.cancelPendingRequests();
  

  }


  public hideDialog: EmitType<object> = () => {
		this.ejDialog.hide();
	}

	public deleteItem: EmitType<object> = () => {
		this.ejDialog.hide();
	}

	public buttons: any = [
		{
			click: this.delete.bind(this),
			buttonModel: { content: 'Yes', isPrimary: true }
		},
		{
			click: this.hideDialog.bind(this),
			buttonModel: { content: 'No' }
		}
	];

	public initilaizeTarget: EmitType<object> = () => {
		this.targetElement = this.container.nativeElement.parentElement;
		this.ejDialog.content = `are you sure want to delete (${ this.selection?.length }) records ?`;
	}

  async ngOnInit() {
    
    this.loadingIndicator =  {indicatorType: 'Shimmer'};
    this.searchField = null;
    this.selection = [];
    this.editSettings = { allowAdding: true };
    this.searchOptions = { operator: 'contains', key: this.listType.searchField, ignoreCase: true, };

    /* If its dynamic list will use this otherwise its sharable like before by exporting in featuredModule */
    if (this.listType) {
      this.showSearch = this.listType.showSearch;
      this.showColumnChooser = this.listType.showColumnChooser;
      this.showExcelExport = this.listType.showExcelExport;
      this.showFilter = this.listType.showFilter;
      this.showCollapseAndExpand = this.listType.showCollapseAndExpand;
      this.showPdfExport = this.listType.showPdfExport;
      this.allowCheckbox = this.listType.allowCheckbox;  
      if('showAdd' in this.listType){
        this.addPrivilege = this.listType.showAdd;

      }
      else {
        // this.addPrivilege = this.incomingCommand.canAdd;
      }
    if('showDelete' in this.listType){
      
      this.deletePrivilege = this.listType.showDelete;
    }else{
      
      // this.deletePrivilege = this.incomingCommand.canDelete;
    }
      if(!this.listType.hasOwnProperty('type')){
     
        // this.editPrivilege = this.incomingCommand.canUpdate;
     
      }
     
      
      // this.viewPrivilege = this.incomingCommand.canView;
   
      this.addPrivilege ? this.showAdd = true : null;
    
    }
    
    this.initializeCommands();
    this.initializeToolBar();
  
  }

	ngAfterViewInit(): void {
		document.onclick = (args: any): void => {
			if (args.target.tagName === 'body') {
				this.ejDialog.hide();
			}
		};
 
  }

  async prepareColumns() {
    this.columns = [];
    this.gridData = [];
    this.listType.columns.forEach((col: any[]) => {
      this.columns.push(col);
    })
  }


dataStateChange($event){
   console.log('erv',$event)
    if($event.action.requestType == 'paging'){
      
      this.pageSettings = { pageSize: $event.take, pageCount:$event.action.currentPage};
      this.feedGrid(this.dataApiUrl)
    }else if($event.action.requestType == 'searching'){
      if($event.search){

        let url = `Setting/gridSearch/${this.listType.dataApi}/${$event.search[0].key}`
        this.feedGrid(url,false)
      }else{
        this.feedGrid(this.dataApiUrl)
      }

    }else{
      // this.grid.ungroupColumn($event.action.columnName)
      this.feedGrid(this.dataApiUrl);
    }
  }

onDataBound($event){
  
//   if(this.refresh){
//     // this.grid.groupColumn(this.listType.groupBy);
//        this.groupOptions = { showGroupedColumn: true, columns: this.listType.groupBy };
//     this.refresh =false;
// }
}


load(){
  // this.refresh = (<any>this.grid).refreshing;
}
   feedGrid(dataApi: string,requirePageCount = true) {
    
    // this.crudService.get(dataApi,requirePageCount ? this.pageSettings : null)
    
    // .pipe(map((response: any) => {
     
    //   return  (<DataResult>{
        
    //     result: response['items'],
    //     count:response['totalCount'],
    //   }) 
    // }))
    // .subscribe((res: any) => { 
     
    //   this.gridData = res;

     
    //  }
    // ) 
    }
    

  

  navigate($endpoint: any) {
    this.router.navigateByUrl($endpoint);
  }

  delete() {
    if(this.selection.length){
    
      let url;
      if(this.listType.pageName == 'lookup'){
         url =  this.listType.deleteRowApi;
      } 
      else{
       url = (`${this.listType.deleteRowApi}/${this.selection[0].toString()}`)
    }
      // this.crudService.deleteRow(url,this,this.listType.pageName == 'lookup' ? {ids:this.selection} : null);
    }

  }

  initializeCommands() {
    // if (this.incomingCommand) {
    //   if (this.editPrivilege) {
    //     if (this.incomingCommand.canUpdate === true &&  this.listType.dataApi !== 'util/feedback') {
         
    //       this.commands.push({
    //         type: 'Edit',
    //         buttonOption: {
    //           cssClass: 'e-flat',
    //           iconCss: 'e-edit e-icons',
    //           click: this.onEdit.bind(this),
    //         },
    //       });
    //     }
    //   }

    //   if (this.viewPrivilege) {
    //     if (this.incomingCommand.canView === true) {
    //       if (this.listType.pageName == 'Order' || this.listType.pageName == 'Supplier' || this.listType.pageName == 'Client' || this.listType.dataApi == 'util/feedback'){

    //         this.commands.push({
    //           type: 'Edit',
    //           buttonOption: {
    //             cssClass: 'e-flat',
    //             iconCss: 'e-view e-icons',
    //             click: this.onView.bind(this),
    //           },
    //         });
    //       }
    //     }
    //   }
    //   if (this.deletePrivilege) {
        
    //     if (this.incomingCommand.canDelete === true) {
    //       this.commands.push({
    //         type: 'Delete',
    //         buttonOption: {
    //           cssClass: 'e-flat',
    //           iconCss: 'e-delete e-icons',
    //           click: this.onDelete.bind(this),
    //         },
    //       });
    //     }
    //   }
    // }
  }

  onEdit(args: any): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(args.target as Element, '.e-row').getAttribute('data-uid')
    );
    const data1: any = rowObj.data;
    this.editRecord.emit(data1);
  
    
    
    let formId = this.listType.pageName == 'assign_goods' ? data1.operation.id : data1.id;

    this.listType ? this.navigate(this.listType.formPath + '/' + formId + '/update') : null;
  }

  onView(args: any): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(args.target as Element, '.e-row').getAttribute('data-uid')
    );
    const data1: any = rowObj.data;
    this.viewRecord.emit(data1);

    if(this.listType.type != 'notification') {
      this.listType ? this.navigate(this.listType.formPath + '/' + data1.id + '/detail') : null;
    }else{
      if(data1.being == 'client'){

        this.listType ? this.navigate('ws/user-and-group/client/'+data1.id+'/detail') : null;
      }
      else if(data1.being == 'supplier'){

        this.listType ? this.navigate('ws/supplier/'+data1.id+'/detail') : null;
      }else if(this.listType.formPath == 'ws/orders'){
        this.listType ? this.navigate(this.listType.formPath + '/' + data1.id + '/detail') : null;
      }else{
        this.listType ? this.navigate(this.listType.formPath + '/' + data1.id + '/update') : null;
      }
     
    }
 
  }

  onDelete(args: Event): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(args.target as Element, '.e-row').getAttribute('data-uid')
    );
    const data1: any = rowObj.data;
 
    this.currentDeletingItem = data1;
    this.initilaizeTarget();
    this.ejDialog.show();
  }



  initializeToolBar(): void {
    this.toolbar = [];
    if (this.addPrivilege) {
      if (this.showAdd) {
        this.toolbar.push('Add');
      }
    }

    if (this.deletePrivilege) {
      this.toolbar.push({
        text: 'Deletes',
        id: 'Deletes',
        tooltipText: 'Delete',
        prefixIcon: 'e-delete',
        disabled: true
      });
    }

    if (this.showSearch) {
      this.toolbar.push({
        text: 'Search',
        tooltipText: 'Search Items',
      });
    }

    if (this.showExcelExport) {
      this.toolbar.push('ExcelExport');
    }

    if (this.showPdfExport) {
      this.toolbar.push({
        text: 'PdfExport',
        tooltipText: 'PdfExport',
        prefixIcon: 'e-pdfexport',
      });
    }

    if (this.showColumnChooser) {
      this.toolbar.push({
        text: 'ColumnChooser',
        tooltipText: 'ColumnChooser',
      });
    }

  }

  toolbarClicked(args: ClickEventArgs): void {

   switch (args.item.text) {
      case 'Add':
        this.addRecord.emit(args.item.id);
        this.listType ? this.navigate(this.listType.formPath + '/create') : null;
        break;
      case 'Deletes':
        this.initilaizeTarget();
        this.ejDialog.show();
        break;
      case 'Filter':
        if (this.onFilter) {
          this.grid.allowFiltering = false;
          this.onFilter = !this.onFilter;
        } else {
          this.grid.allowFiltering = true;
          this.onFilter = !this.onFilter;
        }
        break;
      case 'Collapse':
        this.grid.groupModule.collapseAll();
        break;
      case 'Expand':
        this.grid.groupModule.expandAll();
        break;
      case 'Excel Export':
        this.grid.excelExport();
        break;
      case 'PdfExport':
        this.grid.pdfExport();
        break;
    }
  }

  public onRowSelected(data: any,status: any){
   
   if(this.listType.pageName == 'gate_pass' && status) this.truckAssignmentId = data.id;
   if(this.listType.pageName == 'gate_pass' && !status) this.truckAssignmentId = null;
   
    data instanceof Array ? null : data = [data];

    data.forEach(ele => { 
      if(status){
        this.selection.push(ele.id);

      } else {
        let index = this.selection.indexOf(ele.id);
        this.selection.splice(index, 1); 

      }
    });

    this.grid.toolbarModule.enableItems(['Deletes'], this.selection?.length ? true : false);

  }


  actionComplete(args: { requestType: any; searchString: string; }) {
    console.log('args',args)
    
    
    switch(args.requestType) {
    //   case 'searching':
    //   this.searchString = args.searchString !== '' ? args.searchString : null;
    //   this.submit_filter();
    //   break;

    //   case 'filtering':
    //   this.filter(args);
    //   this.submit_filter();
    //   break;

      // case 'sorting':
      // this.sorting(args);
      // this.submit_filter();
      // break;

     
         

    //   case 'paging':
    //   this.paging();
    //   break;

    }

  }



  submit_filter(){
    let value = this.grid.pagerModule.pagerObj.pageSize.toString();

    // !this.pageSizes.includes(value) ? value = '99999999999999' : null;

    let payload = {  searchString: this.searchString,  filter:this.filter_columens, 
      sort:this.sorting_columens , limit:value, project_type:'ecommerce'
    };
    let isLookup;
    this.listType.pageName == "Lookup" ? isLookup = true : isLookup = false;
    // this.crudOperation.post(payload, `${this.listType.dataApi}/search`,isLookup).subscribe((data: any) => {
    //   this.gridData = data.data;

    // },(error:any)=>{
    //  this.toastr.error(error.message,'Error');
 
    // }); 
  }

  paging(){
    let value = this.grid.pagerModule.pagerObj.pageSize;
    this.gridData.length >  value ? null : this.submit_filter();

  }
 

  filter(args: { requestType?: any; searchString?: string; currentFilterObject?: any; action?: any; }){
    let cfo = args.currentFilterObject;

   if(args.action === 'clearFilter'){
    let index = this.filter_columens.findIndex((ele)=>{ ele.field === cfo.field });
    this.filter_columens.splice(index,1);

    } else {
      this.filter_columens.push({ 
        field : cfo.field,
        value : cfo.value,
        operator : cfo.operator,
       });
    }
  }
 

  sorting(args: { requestType?: any; searchString?: string; columnName?: any; }){
    let module:any = this.grid.sortModule;
    let direction = module.direction === "Ascending" ? "Asc" : "Desc";

    let index = this.sorting_columens.findIndex(ele => ele.field === module.columnName );
    
    if(index === -1){
      this.sorting_columens.push({ field : args.columnName, direction : direction });

    } else {
      if(this.sorting_columens[index].direction === "Asc"){
        this.sorting_columens[index].direction = "Desc";

      } else {
        this.sorting_columens.splice(index,1);

      }

    }

  }






}
