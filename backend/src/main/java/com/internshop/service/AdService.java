package com.internshop.service;

import com.internshop.model.Ad;
import com.internshop.model.Category;
import com.internshop.repository.AdRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;

@Service
public class AdService {

    private final AdRepository adRepository;

    public AdService(AdRepository adRepository) {
        this.adRepository = adRepository;
    }

    public Ad saveAd(Ad ad) {
        return adRepository.save(ad);
    }

    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }

    public Page<Ad> getAllAdsPaginated(Pageable pageable) {
        return adRepository.findAll(pageable);
    }
    public Page<Ad> getAllActiveAdsPaginated(Pageable pageable) {
        return adRepository.findByIsActiveTrue(pageable);
    }
    public boolean deactivateAd(Long id) {
        return adRepository.findById(id)
                .map(ad -> {
                    ad.setActive(false);
                    adRepository.save(ad);
                    return true;
                }).orElse(false);
    }

    public Optional<Ad> getAdById(Long id) {
        return adRepository.findById(id);
    }

    public Optional<Ad> updateAd(Long id, Ad updatedAd) {
        return adRepository.findById(id).map(existingAd -> {
            existingAd.setTitle(updatedAd.getTitle());
            existingAd.setDescription(updatedAd.getDescription());
            existingAd.setImageUrl(updatedAd.getImageUrl());
            existingAd.setPrice(updatedAd.getPrice());
            existingAd.setCity(updatedAd.getCity());
            existingAd.setCategory(updatedAd.getCategory());
            existingAd.setImageUrl(updatedAd.getImageUrl());
            return adRepository.save(existingAd);
        });
    }

//    public Page<Ad> getAdsByCategoryAndActivePaginated(Category category, Pageable pageable) {
//        return adRepository.findByCategoryAndIsActiveTrue(category, pageable);
//    }
//
//
//    public Page<Ad> getAdsByCategoryAndActivePaginated(Category category, Pageable pageable) {
//        return adRepository.findByCategoryAndIsActiveTrue(category, pageable);
//    }

    // --- New Filter Method using Specifications ---
    public Page<Ad> getFilteredAds(String title, Category category, Pageable pageable) {
        Specification<Ad> spec = (root, query, criteriaBuilder) -> {
            Predicate activePredicate = criteriaBuilder.isTrue(root.get("isActive")); // Always filter by active

            // Initialize with the active predicate
            Predicate combinedPredicate = activePredicate;

            // Add title filter if provided
            if (title != null && !title.trim().isEmpty()) {
                Predicate titlePredicate = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")), // Convert title to lowercase
                        "%" + title.toLowerCase() + "%"           // Convert search term to lowercase and add wildcards
                );
                combinedPredicate = criteriaBuilder.and(combinedPredicate, titlePredicate);
            }

            // Add category filter if provided
            if (category != null) {
                Predicate categoryPredicate = criteriaBuilder.equal(root.get("category"), category);
                combinedPredicate = criteriaBuilder.and(combinedPredicate, categoryPredicate);
            }

            return combinedPredicate;
        };
        return adRepository.findAll(spec, pageable);
    }
}
