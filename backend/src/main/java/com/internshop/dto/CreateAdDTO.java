package com.internshop.dto;

import com.internshop.model.Category;
import lombok.Data;

@Data
public class CreateAdDTO {
    private String title;
    private String description;
    private Double price;
    private Category category;
    private UserDTO user;
    private String city;
    private String imageUrl;
}
