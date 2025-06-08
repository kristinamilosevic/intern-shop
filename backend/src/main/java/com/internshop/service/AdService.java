package com.internshop.service;

import com.internshop.model.Ad;
import com.internshop.repository.AdRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

}
