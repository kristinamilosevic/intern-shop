package com.internshop.service;

import com.internshop.dto.UserDTO;
import com.internshop.model.User;
import com.internshop.utils.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public Map<String, Object> login(String username, String password) {
        if (username == null || password == null) {
            throw new IllegalArgumentException("Username and password must be provided");
        }

        User user = userService.findByUsername(username);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new SecurityException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        UserDTO userDto = new UserDTO();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());

        return Map.of(
                "token", token,
                "user", userDto
        );
    }
}