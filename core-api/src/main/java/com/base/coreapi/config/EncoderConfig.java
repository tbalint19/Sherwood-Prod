package com.base.coreapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Configuration
public class EncoderConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){

        return new BCryptPasswordEncoder();
    }
}
