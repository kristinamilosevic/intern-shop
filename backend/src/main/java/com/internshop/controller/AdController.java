package com.internshop.controller;

import com.internshop.model.Ad;
import com.internshop.service.AdService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        Ad savedAd = adService.saveAd(ad);
        return ResponseEntity.ok(savedAd);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAds(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ) {
        try {
            Pageable paging = PageRequest.of(page, size);
            Page<Ad> pageAds = adService.getAllAdsPaginated(paging);

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


}
