package com.base.coreapi.model.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Confirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String code;
    
    private Boolean used;

}
