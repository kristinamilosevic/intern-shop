package com.internshop.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

public class ValidationUtils {

    private static final Set<String> commonPasswords = new HashSet<>();

    static {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(
                ValidationUtils.class.getResourceAsStream("/common_passwords.txt")))) {
            String line;
            while ((line = reader.readLine()) != null) {
                commonPasswords.add(line.trim());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static boolean isCommonPassword(String password) {
        return commonPasswords.contains(password);
    }

    private static final Pattern USERNAME_WHITE_LIST = Pattern.compile("^[a-zA-Z0-9_.]+$");
    private static final Pattern BLACK_LIST = Pattern.compile("[<>\"';]");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\+?[0-9]{6,15}$");

    public static String validateUsername(String username) {
        if (username == null || username.isEmpty()) {
            return "Username cannot be empty.";
        }
        if (!USERNAME_WHITE_LIST.matcher(username).matches()) {
            return "Username can only contain letters, numbers, underscore and dot.";
        }
        if (BLACK_LIST.matcher(username).find()) {
            return "Username contains forbidden characters: < > \" ' ;";
        }
        return null;
    }

    public static String validatePassword(String password) {
        if (password == null || password.isEmpty()) {
            return "Password cannot be empty.";
        }
        if (password.length() < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (BLACK_LIST.matcher(password).find()) {
            return "Password contains forbidden characters: < > \" ' ;";
        }
        if (isCommonPassword(password.toLowerCase())) {
            return "Password is too common, choose a stronger one.";
        }
        return null;
    }

    public static String validatePhone(String phone) {
        if (phone == null || phone.isEmpty()) {
            return "Phone number cannot be empty.";
        }
        if (!PHONE_PATTERN.matcher(phone).matches()) {
            return "Phone number is invalid. It should contain only digits and optional leading +, length 6-15.";
        }
        return null;
    }

    public static String sanitizeInput(String input) {
        if (input == null) return null;

        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");
    }
}
