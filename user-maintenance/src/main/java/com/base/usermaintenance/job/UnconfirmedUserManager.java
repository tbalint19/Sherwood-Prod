package com.base.usermaintenance.job;


import com.base.usermaintenance.model.ApplicationUser;
import com.base.usermaintenance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class UnconfirmedUserManager {

    @Autowired
    private UserRepository userRepository;

    private static final long DELAY = 300000;

    @Scheduled(fixedDelay = 3000)
    public void deleteUnconfirmed(){
        boolean status = false;
        long current = new Date().getTime();
        Date date = new Date();
        date.setTime(current - DELAY);
        userRepository.deleteApplicationUserByConfirmedAndCreatedBefore(status, date);
    }
}
