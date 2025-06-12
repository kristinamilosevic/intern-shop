package com.internshop.controller;

import com.internshop.dto.*;
import com.internshop.model.Ad;
import com.internshop.model.Category;
import com.internshop.model.User;
import com.internshop.service.AdService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

@RestController
@RequestMapping("/api/ads")
@CrossOrigin(origins = "http://localhost:3000")
public class AdController {

    private final AdService adService;

    public AdController(AdService adService) {
        this.adService = adService;
    }

    @PostMapping
    public ResponseEntity<AdDTO> createAd(@RequestBody CreateAdDTO dto) {
        System.out.println("Received CreateAdDTO: " + dto);
        Ad ad = new Ad();
        ad.setTitle(dto.getTitle());
        ad.setDescription(dto.getDescription());
        ad.setPrice(dto.getPrice());
        ad.setPostedDate(LocalDate.now());
        ad.setCategory(dto.getCategory());
        ad.setCity(dto.getCity());
        ad.setImageUrl(dto.getImageUrl());

        User user = new User();
        if (dto.getUser() != null) {
            user.setId(dto.getUser().getId());
            user.setUsername(dto.getUser().getUsername());
        }
        ad.setUser(user);

        Ad saved = adService.saveAd(ad);
        System.out.println("Saved ad with ID: " + saved.getId());
        AdDTO response = new AdDTO();
        response.setId(saved.getId());
        response.setTitle(saved.getTitle());
        response.setDescription(saved.getDescription());
        response.setPrice(saved.getPrice());
        response.setPostedDate(saved.getPostedDate());
        response.setCategory(saved.getCategory());
        response.setUserId(saved.getUser().getId());
        response.setActive(saved.isActive());

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAds(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Long userId
    ) {
        try {
            Pageable paging = PageRequest.of(page, size, org.springframework.data.domain.Sort.by("postedDate").descending());
            Page<Ad> pageAds = adService.getFilteredAds(title, category, minPrice, maxPrice, userId, paging);

            List<AdWithUserPublicDTO> adsDto = pageAds.getContent().stream().map(ad -> {
                UserPublicDTO userDto = new UserPublicDTO();
                userDto.setId(ad.getUser().getId());
                userDto.setUsername(ad.getUser().getUsername());
                userDto.setRegistrationDate(ad.getUser().getRegistrationDate());
                userDto.setPhoneNumber(ad.getUser().getPhoneNumber());

                AdWithUserPublicDTO adDto = new AdWithUserPublicDTO();
                adDto.setId(ad.getId());
                adDto.setTitle(ad.getTitle());
                adDto.setDescription(ad.getDescription());
                adDto.setImageUrl(ad.getImageUrl());
                adDto.setCity(ad.getCity());
                adDto.setPrice(ad.getPrice());
                adDto.setPostedDate(ad.getPostedDate());
                adDto.setCategory(ad.getCategory());
                adDto.setUser(userDto);
                adDto.setActive(ad.isActive());

                return adDto;
            }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("ads", adsDto);
            response.put("currentPage", pageAds.getNumber());
            response.put("totalItems", pageAds.getTotalElements());
            response.put("totalPages", pageAds.getTotalPages());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }



    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateAd(@PathVariable Long id) {
        boolean success = adService.deactivateAd(id);
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdWithUserDTO> getAdById(@PathVariable Long id) {
        return adService.getAdById(id)
                .map(ad -> {
                    UserPublicDTO userDto = new UserPublicDTO();
                    userDto.setUsername(ad.getUser().getUsername());
                    userDto.setPhoneNumber(ad.getUser().getPhoneNumber());

                    AdWithUserDTO dto = new AdWithUserDTO();
                    dto.setId(ad.getId());
                    dto.setTitle(ad.getTitle());
                    dto.setDescription(ad.getDescription());
                    dto.setImageUrl(ad.getImageUrl());
                    dto.setPrice(ad.getPrice());
                    dto.setCity(ad.getCity());
                    dto.setPostedDate(ad.getPostedDate());
                    dto.setCategory(ad.getCategory());
                    dto.setUser(userDto);
                    dto.setActive(ad.isActive());

                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ad> updateAd(@PathVariable Long id, @RequestBody UpdateAdDTO dto) {
        return adService.getAdById(id)
                .map(existingAd -> {
                    existingAd.setTitle(dto.getTitle());
                    existingAd.setDescription(dto.getDescription());
                    existingAd.setPrice(dto.getPrice());
                    existingAd.setCategory(dto.getCategory());
                    existingAd.setCity(dto.getCity());
                    existingAd.setImageUrl(dto.getImageUrl());

                    Ad updatedAd = adService.saveAd(existingAd);
                    return ResponseEntity.ok(updatedAd);
                })
                .orElse(ResponseEntity.notFound().build());
    }


}


