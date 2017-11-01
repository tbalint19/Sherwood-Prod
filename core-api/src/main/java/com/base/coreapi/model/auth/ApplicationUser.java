package com.base.coreapi.model.auth;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    private Boolean confirmed;

    @JsonIgnore
    @OneToOne
    private Confirmation confirmation;

    @JsonIgnore
    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<Reset> resets;

}
