 
const getView = function(page:any){
    return () => import(`@/views/app/${page}.vue`)
}


const AppRouter:any  = [
    {
        path: '',
        name: 'home',
        title:'',
        icon:'',
        enabled:false,
        component: getView('Home')
    },
    {
        path: '/app/home/',
        name: 'homes',
        title:'หน้าแรก',
        icon:'mdi mdi-home',
        enabled:true,
        component: getView('Home')
    },
    {
        path: '/app/school/',
        name: 'school',
        title:'คณะ',
        icon:'mdi mdi-school',
        enabled:true,
        component: getView('School')
    },
    {
        path: '/app/agency/',
        name: 'agency',
        title:'หน่วยงาน',
        icon:'mdi mdi-home-city',
        enabled:true,
        component: getView('Agency')
    },
    {
        path: '/app/university/',
        name: 'university',
        title:'มหาวิทยาลัย',
        icon:'mdi mdi-city',
        enabled:true,
        component: getView('University')
    },
    {
        path: 'risk',
        name: 'risk', 
        enabled:false,
        component: getView('RiskMain')
    },
    {
        path: 'risk/edit',
        name: 'riskedit', 
        enabled:false,
        component: getView('RiskEdit')
    },
    {
        path: 'r6/edit',
        name: 'r6edit',
        enabled:false,
        component: getView('RMR6Edit')
    },{
        path: 'r12/edit',
        name: 'r12edit',
        enabled:false,
        component: getView('RMR12Edit')
    },{
        path: 'report',
        name: 'report',
        enabled:false,
        component: getView('Report')
    },
    
]

export  {
    AppRouter
}