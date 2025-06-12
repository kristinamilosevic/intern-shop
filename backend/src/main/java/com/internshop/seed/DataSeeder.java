package com.internshop.seed;

import com.internshop.model.*;
import com.internshop.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AdRepository adRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Random random = new Random();

    public DataSeeder(UserRepository userRepository, AdRepository adRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.adRepository = adRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedAds();
    }

    private void seedUsers() {
        if (userRepository.count() > 0) return;

        List<User> users = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            User user = new User();
            user.setUsername("user" + i);
            user.setPassword(passwordEncoder.encode("password" + i));
            user.setPhoneNumber("+1234567890" + i);
            user.setRegistrationDate(LocalDate.now().minusDays(random.nextInt(365)));
            users.add(user);
        }
        userRepository.saveAll(users);
        System.out.println("Seeded 10 users.");
    }

    private void seedAds() {
        if (adRepository.count() > 0) return;

        List<User> users = userRepository.findAll();
        if (users.isEmpty()) return;

        List<String> cities = Arrays.asList("New York", "Los Angeles", "Chicago", "Houston", "Phoenix");
        List<String> sampleTitles = Arrays.asList(
                "Great quality product", "Brand new item", "Used but in good condition",
                "Limited offer", "Must sell", "Best price guaranteed"
        );
        List<String> sampleDescriptions = Arrays.asList(
                "This is an amazing product, you will love it!",
                "Barely used and well maintained.",
                "Perfect for your needs, don't miss out.",
                "Top rated seller, buy with confidence.",
                "High quality and affordable price."
        );

        List<String> imagePaths = Arrays.asList(
                "img1.jpg",
                "img2.jpg",
                "img3.jpg",
                "img4.jpg",
                "img5.jpg"
        );

        List<Ad> ads = new ArrayList<>();
        for (int i = 1; i <= 100; i++) {
            Ad ad = new Ad();
            ad.setTitle(sampleTitles.get(random.nextInt(sampleTitles.size())) + " #" + i);
            ad.setDescription(sampleDescriptions.get(random.nextInt(sampleDescriptions.size())));
            ad.setImageUrl(imagePaths.get(random.nextInt(imagePaths.size())));

            double rawPrice = 10 + (5000 - 10) * random.nextDouble();
            double roundedPrice = Math.round(rawPrice * 100.0) / 100.0;
            ad.setPrice(roundedPrice);

            ad.setCity(cities.get(random.nextInt(cities.size())));
            ad.setPostedDate(LocalDate.now().minusDays(random.nextInt(180)));
            ad.setCategory(Category.values()[random.nextInt(Category.values().length)]);
            ad.setUser(users.get(random.nextInt(users.size())));
            ad.setActive(random.nextBoolean());
            ads.add(ad);
        }
        adRepository.saveAll(ads);
        System.out.println("Seeded 100 ads.");
    }
}
