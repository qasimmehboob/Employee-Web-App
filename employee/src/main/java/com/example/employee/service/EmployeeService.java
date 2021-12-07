package com.example.employee.service;

import com.example.employee.data.models.Employee;
import com.example.employee.data.payloads.request.EmployeeRequest;
import com.example.employee.data.payloads.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface EmployeeService {
    MessageResponse createEmployee(EmployeeRequest employeeRequest);
    Employee getASingleEmployee(Integer employeeId);
    Page<Employee> getAllEmployee(int page, int size);
}
