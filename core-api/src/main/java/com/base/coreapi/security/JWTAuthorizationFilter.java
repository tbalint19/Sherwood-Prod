package com.base.coreapi.security;

import com.base.coreapi.service.auth.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;

import static com.base.coreapi.security.SecurityConstants.HEADER_STRING;
import static com.base.coreapi.security.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    @Autowired
    private TokenService tokenService;

    JWTAuthorizationFilter(AuthenticationManager authenticationManager){

        super(authenticationManager);
    }

    @Override
    public void doFilterInternal(
            HttpServletRequest req, HttpServletResponse res, FilterChain chain
    ) throws IOException, ServletException{
        String token = getTokenFromHeader(req);
        if (token != null){
            UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        chain.doFilter(req, res);
    }

    private String getTokenFromHeader(HttpServletRequest req){
        String token = req.getHeader(HEADER_STRING);
        if (token == null || !token.startsWith(TOKEN_PREFIX)){
            return null;
        }
        return token;
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token){
        String username = tokenService.parseToken(token);
        if (username == null){
            return null;
        }
        CredentialsContainer credentials = null;
        ArrayList<GrantedAuthority> authorities = new ArrayList<>();
        return new UsernamePasswordAuthenticationToken(username, credentials, authorities);
    }
}
