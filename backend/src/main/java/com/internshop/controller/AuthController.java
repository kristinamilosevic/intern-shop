package com.internshop.controller;

import com.internshop.dto.UserDTO;
import com.internshop.model.User;
import com.internshop.service.UserService;
import com.internshop.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username and password must be provided");
        }

        User user = userService.findByUsername(username);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        UserDTO userDto = new UserDTO();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", userDto
        ));
    }

}
