package com.internshop.dto;

import com.internshop.model.Category;
import lombok.Data;
import java.time.LocalDate;

@Data
public class AdDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private LocalDate postedDate;
    private boolean active;
    private Category category;
    private Long userId;
}