import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { LoadEmployeesService } from './services/load-employees.service';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './components/reusabel/input/input.component';
import { SelectComponent } from './components/reusabel/select/select.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DisplayEmployeesComponent } from './components/display-employees/display-employees.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { EditEmployeeDetailsComponent } from './components/edit-employee-details/edit-employee-details.component';
import { ModalComponent } from './components/reusabel/modal/modal.component';
import { AvatarComponent } from './components/avatar/avatar.component';

export function preloadData(dataService: LoadEmployeesService): () => Promise<any> {
  return () => dataService.loadData();
}

@NgModule({
  declarations: [AppComponent, AddEmployeeComponent, AvatarComponent, InfoCardComponent, FilterComponent, SidebarComponent, InputComponent, SelectComponent, DisplayEmployeesComponent, SearchEmployeeComponent, EditEmployeeDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalComponent
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: preloadData,
    deps: [LoadEmployeesService],
    multi: true
  },EmployeeService,LoadEmployeesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
