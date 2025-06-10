package com.internshop.controller;

import com.internshop.model.Ad;
import com.internshop.model.Category;
import com.internshop.service.AdService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

@RestController
@RequestMapping("/api/ads")
public class AdController {

    private final AdService adService;

    public AdController(AdService adService) {
        this.adService = adService;
    }

    @PostMapping
    public ResponseEntity<Ad> createAd(@RequestBody Ad ad) {
        ad.setPostedDate(LocalDate.now());
        Ad savedAd = adService.saveAd(ad);
        return ResponseEntity.ok(savedAd);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAds(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) String title
    ) {
        try {
            Pageable paging = PageRequest.of(page, size);
            Page<Ad> pageAds;

            pageAds = adService.getFilteredAds(title, category, paging);

            Map<String, Object> response = new HashMap<>();
            response.put("ads", pageAds.getContent());
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
    public ResponseEntity<Ad> getAdById(@PathVariable Long id) {
        return adService.getAdById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Ad> updateAd(@PathVariable Long id, @RequestBody Ad updatedAd) {
        return adService.updateAd(id, updatedAd)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}


