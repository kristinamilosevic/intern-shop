package com.internshop.service;

import com.internshop.model.User;
import com.internshop.repository.UserRepository;
import com.internshop.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        String usernameError = ValidationUtils.validateUsername(user.getUsername());
        if (usernameError != null) {
            throw new IllegalArgumentException(usernameError);
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        String passwordError = ValidationUtils.validatePassword(user.getPassword());
        if (passwordError != null) {
            throw new IllegalArgumentException(passwordError);
        }

        String phoneError = ValidationUtils.validatePhone(user.getPhoneNumber());
        if (phoneError != null) {
            throw new IllegalArgumentException(phoneError);
        }

        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

}
