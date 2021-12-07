import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private observer = new BehaviorSubject<GetEmployeeResponse>({content: [], number: 0, size: 0, totalElements: 0, totalPages: 0});
  readonly subscriber$ = this.observer.asObservable();
  private employees: Employee[] = [];

  constructor(private httpClient: HttpClient) { }

  getEmployees(){
    const requestUrl = `${environment.baseUrl}/employees`;    
    this.httpClient.get<GetEmployeeResponse>(requestUrl)
    .subscribe((response) => {
        this.employees = response.content;        
        this.observer.next({
                            content: [...this.employees],
                            number: response.number,
                            size: response.size,
                            totalElements: response.totalElements,
                            totalPages: response.totalPages
                          });
    });
  }
  getPaginatedEmployees(page: number, size:number){
    const searchUrl = `${environment.baseUrl}/employees?page=${page}&size=${size}`;
    this.httpClient.get<GetEmployeeResponse>(searchUrl)
    .subscribe((response) => {
      this.employees = response.content;        
      this.observer.next({
                          content: [...this.employees],
                          number: response.number,
                          size: response.size,
                          totalElements: response.totalElements,
                          totalPages: response.totalPages
                        });
      });
  }
  createNewEmployee(employee: Employee) {
    // Making Request to server to create new employee
    const requestUrl = `${environment.baseUrl}/employees`;
    this.httpClient.post<String>(requestUrl, employee).subscribe({
      next: response => {  
          console.log(`Post Response: ${JSON.stringify(response)}`);
          this.getEmployees();
      },
      error: error => {
        console.log(`Post ERROR Response: ${JSON.stringify(error.error)}`);
      }
    });
  }

}
interface GetEmployeeResponse {
  content: Employee[],
  totalElements: number,
  totalPages: number,
  size: number,
  number: number
}
