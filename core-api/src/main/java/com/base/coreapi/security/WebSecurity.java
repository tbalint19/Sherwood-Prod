package com.base.coreapi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import static com.base.coreapi.security.SecurityConstants.*;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.GET, CHECK_URLS).permitAll()
                .antMatchers(HttpMethod.POST, AUTH_URLS).permitAll()
                .antMatchers(RESET_URLS).permitAll()
                .antMatchers(CONFIRM_URLS).permitAll()
                .antMatchers(DEFAULT_LOGIN_URL).denyAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthorizationFilter(authenticationManager));
    }
}
