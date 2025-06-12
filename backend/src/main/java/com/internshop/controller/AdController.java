package com.internshop.controller;

import com.internshop.dto.*;
import com.internshop.mapper.AdMapper;
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
    private final AdMapper adMapper;

    public AdController(AdService adService, AdMapper adMapper) {
        this.adService = adService;
        this.adMapper = adMapper;
    }
    @PostMapping
    public ResponseEntity<AdDTO> createAd(@RequestBody CreateAdDTO dto) {
        Ad ad = adMapper.toEntity(dto);
        Ad saved = adService.saveAd(ad);
        return ResponseEntity.ok(adMapper.toAdDTO(saved));
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
        Pageable paging = PageRequest.of(page, size, org.springframework.data.domain.Sort.by("postedDate").descending());
        Page<Ad> pageAds = adService.getFilteredAds(title, category, minPrice, maxPrice, userId, paging);

        List<AdWithUserPublicDTO> adsDto = pageAds.getContent().stream()
                .map(adMapper::toAdWithUserPublicDTO)
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("ads", adsDto);
        response.put("currentPage", pageAds.getNumber());
        response.put("totalItems", pageAds.getTotalElements());
        response.put("totalPages", pageAds.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdWithUserDTO> getAdById(@PathVariable Long id) {
        return adService.getAdById(id)
                .map(ad -> ResponseEntity.ok(adMapper.toAdWithUserDTO(ad)))
                .orElse(ResponseEntity.notFound().build());
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


