package com.internshop.repository;

import com.internshop.model.Ad;
import com.internshop.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.domain.Pageable;

public interface AdRepository extends JpaRepository<Ad, Long>, JpaSpecificationExecutor<Ad> {
    Page<Ad> findByIsActiveTrue(Pageable pageable);
    Page<Ad> findByCategoryAndIsActiveTrue(Category category, Pageable pageable);
}
