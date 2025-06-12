package com.internshop.mapper;

import com.internshop.dto.*;
import com.internshop.model.Ad;
import com.internshop.model.User;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class AdMapper {

    public Ad toEntity(CreateAdDTO dto) {
        Ad ad = new Ad();
        ad.setTitle(dto.getTitle());
        ad.setDescription(dto.getDescription());
        ad.setPrice(dto.getPrice());
        ad.setPostedDate(LocalDate.now());
        ad.setCategory(dto.getCategory());
        ad.setCity(dto.getCity());
        ad.setImageUrl(dto.getImageUrl());

        if (dto.getUser() != null) {
            User user = new User();
            user.setId(dto.getUser().getId());
            user.setUsername(dto.getUser().getUsername());
            ad.setUser(user);
        }

        return ad;
    }

    public AdDTO toAdDTO(Ad ad) {
        AdDTO dto = new AdDTO();
        dto.setId(ad.getId());
        dto.setTitle(ad.getTitle());
        dto.setDescription(ad.getDescription());
        dto.setPrice(ad.getPrice());
        dto.setPostedDate(ad.getPostedDate());
        dto.setCategory(ad.getCategory());
        dto.setUserId(ad.getUser() != null ? ad.getUser().getId() : null);
        dto.setActive(ad.isActive());
        return dto;
    }

    public AdWithUserDTO toAdWithUserDTO(Ad ad) {
        AdWithUserDTO dto = new AdWithUserDTO();
        dto.setId(ad.getId());
        dto.setTitle(ad.getTitle());
        dto.setDescription(ad.getDescription());
        dto.setPrice(ad.getPrice());
        dto.setCity(ad.getCity());
        dto.setPostedDate(ad.getPostedDate());
        dto.setCategory(ad.getCategory());
        dto.setImageUrl(ad.getImageUrl());
        dto.setActive(ad.isActive());

        UserPublicDTO userDto = new UserPublicDTO();
        userDto.setId(ad.getUser().getId());
        userDto.setUsername(ad.getUser().getUsername());
        userDto.setPhoneNumber(ad.getUser().getPhoneNumber());
        userDto.setRegistrationDate(ad.getUser().getRegistrationDate());

        dto.setUser(userDto);
        return dto;
    }

    public AdWithUserPublicDTO toAdWithUserPublicDTO(Ad ad) {
        AdWithUserPublicDTO dto = new AdWithUserPublicDTO();
        dto.setId(ad.getId());
        dto.setTitle(ad.getTitle());
        dto.setDescription(ad.getDescription());
        dto.setPrice(ad.getPrice());
        dto.setCity(ad.getCity());
        dto.setPostedDate(ad.getPostedDate());
        dto.setCategory(ad.getCategory());
        dto.setImageUrl(ad.getImageUrl());
        dto.setActive(ad.isActive());

        UserPublicDTO userDto = new UserPublicDTO();
        userDto.setId(ad.getUser().getId());
        userDto.setUsername(ad.getUser().getUsername());
        userDto.setPhoneNumber(ad.getUser().getPhoneNumber());
        userDto.setRegistrationDate(ad.getUser().getRegistrationDate());

        dto.setUser(userDto);
        return dto;
    }
}

