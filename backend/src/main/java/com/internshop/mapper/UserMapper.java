package com.internshop.mapper;

import com.internshop.dto.CreateUserDTO;
import com.internshop.dto.UserDTO;
import com.internshop.model.User;
import com.internshop.utils.ValidationUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class UserMapper {
    public User toEntity(CreateUserDTO dto) {
        User user = new User();
        user.setUsername(ValidationUtils.sanitizeInput(dto.getUsername()));
        user.setPassword(dto.getPassword()); // Raw password; encode later
        user.setPhoneNumber(ValidationUtils.sanitizeInput(dto.getPhoneNumber()));
        user.setRegistrationDate(LocalDate.now());
        return user;
    }

    public UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        return dto;
    }
}