package com.internshop.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UserPublicDTO {
    private Long id;
    private String username;
    private LocalDate registrationDate;
    private String phoneNumber;
}
