package com.example.employee.controller;

import com.example.employee.data.models.Employee;
import com.example.employee.data.payloads.request.EmployeeRequest;
import com.example.employee.data.payloads.response.MessageResponse;
import com.example.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping("/employees")
    public ResponseEntity<Page<Employee>> getAllEmployees(@RequestParam(name = "page", required = false) Integer page,
                                                          @RequestParam(name = "size", required = false) Integer size) {
        int pageInt = 0;
        int sizeInt = 10;
        if(page != null) {
            pageInt = page.intValue();
        }
        if(size != null) {
            sizeInt = size.intValue();
        }
        Page<Employee> employees = employeeService.getAllEmployee(pageInt, sizeInt);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById (@PathVariable("id") Integer id) {
        Employee employee = employeeService.getASingleEmployee(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    @PostMapping("/employees")
    public ResponseEntity<MessageResponse> addEmployee(@Valid @RequestBody EmployeeRequest employee) {
        MessageResponse newEmployee = employeeService.createEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

}
