package com.base.usermaintenance.repository;

import com.base.usermaintenance.model.ApplicationUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface UserRepository extends CrudRepository<ApplicationUser, Long> {

    List<ApplicationUser> findAll();

    @Transactional
    void deleteApplicationUserByConfirmedAndCreatedBefore(Boolean confirmed, Date date);
}
