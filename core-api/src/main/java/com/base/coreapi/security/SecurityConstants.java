package com.base.coreapi.security;

public class SecurityConstants {

    public static final String SECRET = "VerySecretKey";
    public static final long EXPIRATION_TIME = 864000000;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String DEFAULT_LOGIN_URL = "/login";
    public static final String CHECK_URLS = "/api/check/**";
    public static final String AUTH_URLS = "/api/auth/**";
    public static final String CONFIRM_URLS = "/api/confirm/**";
    public static final String RESET_URLS = "/api/reset/**";
}
