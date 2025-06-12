package com.internshop.dto;

import com.internshop.model.Category;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AdWithUserPublicDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private Double price;
    private String city;
    private LocalDate postedDate;
    private boolean active;
    private Category category;
    private UserPublicDTO user;
}
