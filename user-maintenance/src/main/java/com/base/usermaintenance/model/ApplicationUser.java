package com.base.usermaintenance.model;

import javax.persistence.*;
import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    private Boolean confirmed;

}

