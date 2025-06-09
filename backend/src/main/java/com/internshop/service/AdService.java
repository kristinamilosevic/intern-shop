package com.internshop.service;

import com.internshop.model.Ad;
import com.internshop.repository.AdRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

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
}
