package com.example.employee.data.payloads.request;

import lombok.Data;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class EmployeeRequest {
    @NotNull(message = "First name cannot be null")
    @Size(min = 2, message = "First name should have atleast 2 characters")
    private String firstName;
    @NotNull(message = "Last name cannot be null")
    @Size(min = 2, message = "Last name should have atleast 2 characters")
    private String lastName;
    @Email
    private String email;
    @Pattern(regexp = "^[0-9-]*$", message = "Phone number should contain only digits and dashes")
    private String phoneNumber;
    private Date hireDate;
    @DecimalMin(value = "1.00", message = "Salary should be greater than zero")
    private BigDecimal salary;
}
