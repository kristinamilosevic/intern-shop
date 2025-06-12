package com.internshop.dto;

import com.internshop.model.Category;
import lombok.Data;

@Data
public class UpdateAdDTO {
    private String title;
    private String description;
    private Double price;
    private Category category;
    private String city;
    private String imageUrl;
}
