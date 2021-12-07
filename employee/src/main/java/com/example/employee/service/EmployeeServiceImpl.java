package com.example.employee.service;

import com.example.employee.data.models.Employee;
import com.example.employee.data.payloads.request.EmployeeRequest;
import com.example.employee.data.payloads.response.MessageResponse;
import com.example.employee.data.repository.EmployeeRepository;
import com.example.employee.exception.ResourceNotFoundException;
import com.example.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public MessageResponse createEmployee(EmployeeRequest employeeRequest) {
        Employee employee = new Employee();
        employee.setFirstName(employeeRequest.getFirstName());
        employee.setLastName(employeeRequest.getLastName());
        employee.setEmail(employeeRequest.getEmail());
        employee.setPhoneNumber(employeeRequest.getPhoneNumber());
        employee.setHireDate(employeeRequest.getHireDate());
        employee.setSalary(employeeRequest.getSalary());
        employeeRepository.save(employee);
        return new MessageResponse("New Employee created successfully");
    }

    @Override
    public Employee getASingleEmployee(Integer employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException(String.format("Employee not found with id : '%s'",employeeId)));
    }

    @Override
    public Page<Employee> getAllEmployee(int page, int size) {
        Pageable pageable = PageRequest.of(page=page, size=size, Sort.by(Sort.Direction.DESC, "employeeId"));
        return employeeRepository.findAll(pageable);
    }
}
