import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { EditEmployeeDetailsComponent } from './components/edit-employee-details/edit-employee-details.component';

export const routes: Routes = [{ path: '', redirectTo: '/search-employee', pathMatch: 'full' }, 
    {path: "overview" ,component: EditEmployeeDetailsComponent},
    {path:'add-employee', component: AddEmployeeComponent},
    {path: 'filter-employees', component: FilterComponent},
    {path: 'search-employee', component: SearchEmployeeComponent},
    {path:'**', component: AddEmployeeComponent},
];
