package com.base.coreapi.model.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Reset {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long Id;

    private Long userId;

    private String code;

    private Boolean used;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

}
