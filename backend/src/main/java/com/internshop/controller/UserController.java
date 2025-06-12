package com.internshop.controller;

import com.internshop.model.User;
import com.internshop.service.UserService;
import com.internshop.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

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
            return ResponseEntity.badRequest().body(Map.of("message", "Username, password and phone number are required."));
        }

        try {
            String passwordError = ValidationUtils.validatePassword(user.getPassword());
            if (passwordError != null) {
                return ResponseEntity.badRequest().body(Map.of("message", passwordError));
            }

            String usernameError = ValidationUtils.validateUsername(user.getUsername());
            if (usernameError != null) {
                return ResponseEntity.badRequest().body(Map.of("message", usernameError));
            }

            if (userService.usernameExists(user.getUsername())) {
                return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));
            }

            String phoneError = ValidationUtils.validatePhone(user.getPhoneNumber());
            if (phoneError != null) {
                return ResponseEntity.badRequest().body(Map.of("message", phoneError));
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));

            if (user.getRegistrationDate() == null) {
                user.setRegistrationDate(LocalDate.now());
            }

            user.setUsername(ValidationUtils.sanitizeInput(user.getUsername()));
            user.setPhoneNumber(ValidationUtils.sanitizeInput(user.getPhoneNumber()));
            User savedUser = userService.saveUser(user);

            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/by-username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
}
