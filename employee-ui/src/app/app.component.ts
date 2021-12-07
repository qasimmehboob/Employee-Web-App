import { CustomValidators } from './validators/customer-validators';
import { Employee } from './model/employee';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EmployeeService } from './services/employee.service';
import { Subscription } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'employee-ui';
  employeeFormGroup!: FormGroup;
  private employeesSub!: Subscription;
  employees: Employee[] = [];
  pageNumber: number = 1;
  pageSize:number = 5;
  totalElements: number = 0;
  totalPages: number = 0;
  loading!: boolean;
  rowsPerPageOptions: number[] = [5,10,25,50,100];
  tableAutoLayout: boolean = true;

  constructor(private formBuilder: FormBuilder,
             private employeeService: EmployeeService,
             private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.employeesSub = this.employeeService.subscriber$
                        .subscribe((response) => {
                          this.employees = response.content,
                          this.pageNumber = response.number + 1;
                          this.pageSize = response.size;
                          this.totalElements =  response.totalElements;
                          this.totalPages = response.totalPages;
                          this.loading = false;

                        });
    // building checkout form
    this.employeeFormGroup = this.formBuilder.group ({
      employee: this.formBuilder.group({
        firstName: new FormControl('',
                                  [Validators.required, 
                                   Validators.minLength(2), 
                                   CustomValidators.notOnlyWhitespace]),
        lastName: new FormControl('',
                                  [Validators.required, 
                                  Validators.minLength(2), 
                                  CustomValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._]+\\.[a-z]{2,4}$')]),
        phoneNumber: new FormControl('',
                                     [Validators.pattern('^[0-9-]*$')]),
        hireDate: new FormControl(''),
        salary: new FormControl('',
                                [Validators.min(1),
                                  Validators.pattern(/^[.\d]+$/)])
      })
    });
  }
  get firstName(){ return this.employeeFormGroup.get('employee.firstName'); }
  get lastName(){ return this.employeeFormGroup.get('employee.lastName'); }
  get email(){ return this.employeeFormGroup.get('employee.email'); }
  get phoneNumber(){ return this.employeeFormGroup.get('employee.phoneNumber'); }
  get hireDate(){ return this.employeeFormGroup.get('employee.hireDate'); }
  get salary(){ return this.employeeFormGroup.get('employee.salary'); }

  ngAfterViewInit(): void {
    this.loading = true;
    this.employeeService.getEmployees();
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    this.employeesSub.unsubscribe();
  }
  paginate(event: LazyLoadEvent){    
    //console.log(JSON.stringify(event))
    if(event.first != 0 || event.rows != 0) {
      this.loading = true;
      const first_ = (event.first != null || event.first != undefined)  ? event.first : 1;    
      const pageS = (event.rows != null  || event.rows  != undefined)  ? event.rows : this.pageSize;
      const pageN = first_ / pageS;
      //console.log(`First_: ${first_} pageS: ${pageS} pageN: ${pageN}`);
      this.employeeService.getPaginatedEmployees(pageN, pageS);
    }
  }
  onSubmit() {
    if(this.employeeFormGroup.invalid) {
      this.employeeFormGroup.markAllAsTouched();
      return;
    }

    let employee = new Employee();

    employee.firstName = this.employeeFormGroup.get('employee.firstName')?.value;
    employee.lastName = this.employeeFormGroup.get('employee.lastName')?.value;
    employee.email = this.employeeFormGroup.get('employee.email')?.value;
    employee.phoneNumber = this.employeeFormGroup.get('employee.phoneNumber')?.value;
    employee.hireDate = this.employeeFormGroup.get('employee.hireDate')?.value;
    employee.salary = this.employeeFormGroup.get('employee.salary')?.value;

    if(!environment.production) {
      console.log(`Employee: ${JSON.stringify(employee)}`);
    }
    this.employeeService.createNewEmployee(employee);
  }
}
