package com.internshop.controller;

import com.internshop.dto.CreateUserDTO;
import com.internshop.mapper.AdMapper;
import com.internshop.mapper.UserMapper;
import com.internshop.model.User;
import com.internshop.service.AdService;
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
    private final UserMapper userMapper;

    public UserController( UserMapper userMapper) {
        this.userMapper = userMapper;
    }


    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody CreateUserDTO dto) {
        try {
            User user = userService.createUser(dto);
            return ResponseEntity.ok(userMapper.toDTO(user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Something went wrong"));
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
