

export var sideBarMenus =  [
    {
        nodeId: '01', nodeText: 'Dashboard', iconCss: 'fa fa-tachometer',url:'',
    },
    {
        nodeId: '02', nodeText: 'Driver', iconCss:'fa fa-id-card-o',
        nodeChild:[
            {nodeId:'02-01',nodeText:'Driver' ,  url:'driver/list'},
            {nodeId:'02-02',nodeText:'Driver License', url:'driver-license/list'}
        ]
    },
    {
        nodeId: '03', nodeText: 'Vehicle', iconCss:'fa fa-car',
        nodeChild:[
            {nodeId:'03-01',nodeText:'Vehicle',  url:'vehicle/list'},
            {nodeId:'03-02',nodeText:'Vehicle Owner',url:'vehicle-license/list'}
        ]

    },
    {
        nodeId: '04', nodeText: 'Traffic', iconCss: 'fa fa-user-secret',
        nodeChild:[
            {nodeId:'04-01',nodeText:'Traffic Officer' ,  url:'traffic/traffic-officer/list'},
            {nodeId:'04-02',nodeText:'Dispatchment', url:'traffic/dispatchment/list'}
        ]

    },
    {
        nodeId: '05', nodeText: 'Accident', iconCss: 'fa fa-free-code-camp',url:'accident/list'
    },
    {
        nodeId: '06', nodeText: 'Penalty', iconCss: 'fa fa-hand-lizard-o' , url:'penalty/list',
        nodeChild:[
            {nodeId:'06-01',nodeText:'Violation' ,  url:'violation/list'},
            {nodeId:'06-02',nodeText:'Penalty', url:'penalty/list'},
            {nodeId:'06-03',nodeText:'Settlement', url:'penalty-settlement/list'},
        ]
    },
    {
        nodeId: '07', nodeText: 'Training', iconCss: 'fa fa-steam' , url:'training/list'
    },
    {
        nodeId: '08', nodeText: 'Reports', iconCss: 'fa fa-sticky-note-o' ,
        nodeChild:[
            {nodeId:'08-01',nodeText:'Traffic Accident', url:'reports/traffic-accident/list'},
            {nodeId:'08-02',nodeText:'Financial', url:'reports/financial/list'},
            {nodeId:'08-03',nodeText:'Training', url:'reports/training/list'},
        ]
    },    
    {
        nodeId: '09', nodeText: 'Users and Group', iconCss: 'fa fa-user-circle-o',
        nodeChild:[
            {nodeId:'09-01',nodeText:'Users' ,  url:'users-and-group/users/list'},
            {nodeId:'09-02',nodeText:'Group', url:'users-and-group/group/list'}
        ]
    },
    {
        nodeId: '10', nodeText: 'Lookup', iconCss: 'fa fa-outdent', url : 'lookup/list'
    },
    {
        nodeId: '11', nodeText: 'System Settings', iconCss: 'fa fa-gear',url:'settings'
    }
];