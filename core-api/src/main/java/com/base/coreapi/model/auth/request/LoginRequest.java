package com.base.coreapi.model.auth.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequest {

    private String credential;
    private String password;
}
