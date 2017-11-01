package com.base.coreapi.service.common;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class RandomService {

    public String getRandomString(int len) {
        String chars = "abcdefghijklmnopqrstuvwxyz1234567890";
        StringBuilder randomString = new StringBuilder();
        Random rnd = new Random();
        while (randomString.length() < len) {
            int index = (int) (rnd.nextFloat() * chars.length());
            randomString.append(chars.charAt(index));
        }
        return randomString.toString();
    }
}
