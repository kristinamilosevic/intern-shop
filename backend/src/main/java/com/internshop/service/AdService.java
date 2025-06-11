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

    public Page<Ad> getFilteredAds(String title, Category category, Double minPrice, Double maxPrice, Long userId, Pageable pageable) {
        Specification<Ad> spec = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.isTrue(root.get("isActive"));

            if (title != null && !title.trim().isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        "%" + title.toLowerCase() + "%"
                ));
            }

            if (category != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("category"), category));
            }

            if (minPrice != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (userId != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("user").get("id"), userId));
            }

            return predicate;
        };

        return adRepository.findAll(spec, pageable);
    }

}
