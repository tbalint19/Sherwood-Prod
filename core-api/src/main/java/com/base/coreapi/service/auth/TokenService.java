package com.base.coreapi.service.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.base.coreapi.security.SecurityConstants.EXPIRATION_TIME;
import static com.base.coreapi.security.SecurityConstants.SECRET;
import static com.base.coreapi.security.SecurityConstants.TOKEN_PREFIX;

@Service
public class TokenService {

    public String createToken(String username){
        String token = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();
        return TOKEN_PREFIX + token;
    }

    public String parseToken(String token){
        return Jwts.parser()
            .setSigningKey(SECRET.getBytes())
            .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
            .getBody()
            .getSubject();
    }

}
