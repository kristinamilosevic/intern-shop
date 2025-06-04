package com.internshop.controller;

import com.internshop.model.User;
import com.internshop.service.UserService;
import com.internshop.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (user.getUsername() == null || user.getPassword() == null || user.getPhoneNumber() == null) {
            return ResponseEntity.badRequest().body("Username, password and phone number are required.");
        }

        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            if (user.getRegistrationDate() == null) {
                user.setRegistrationDate(LocalDate.now());
            }

            User savedUser = userService.saveUser(user);

            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
