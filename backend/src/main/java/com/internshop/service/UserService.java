package com.internshop.service;

import com.internshop.dto.CreateUserDTO;
import com.internshop.model.User;
import com.internshop.repository.UserRepository;
import com.internshop.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    public User createUser(CreateUserDTO dto) {
        String usernameError = ValidationUtils.validateUsername(dto.getUsername());
        if (usernameError != null) {
            throw new IllegalArgumentException(usernameError);
        }

        if (usernameExists(dto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        String passwordError = ValidationUtils.validatePassword(dto.getPassword());
        if (passwordError != null) {
            throw new IllegalArgumentException(passwordError);
        }

        String phoneError = ValidationUtils.validatePhone(dto.getPhoneNumber());
        if (phoneError != null) {
            throw new IllegalArgumentException(phoneError);
        }

        User user = new User();
        user.setUsername(ValidationUtils.sanitizeInput(dto.getUsername()));
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPhoneNumber(ValidationUtils.sanitizeInput(dto.getPhoneNumber()));
        user.setRegistrationDate(LocalDate.now());

        return userRepository.save(user);
    }


    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

}
