package com.base.coreapi.service.auth;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.Reset;
import com.base.coreapi.repository.ResetRepository;
import com.base.coreapi.service.common.RandomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ResetService {

    @Autowired
    private RandomService randomService;

    @Autowired
    private ResetRepository resetRepository;

    @Autowired
    private ConfirmationService confirmationService;

    private static final int DELAY = 300000;

    public Reset createReset(ApplicationUser user){
        if (!confirmationService.inTime(user)){
            return null;
        }
        Reset reset = new Reset();
        reset.setCode(randomService.getRandomString(25));
        reset.setUserId(user.getId());
        reset.setUsed(false);
        reset.setCreated(new Date());
        resetRepository.save(reset);
        return reset;
    }

    public Boolean applyReset(ApplicationUser user, String code){
        Boolean successful = false;
        Reset reset = resetRepository.findByCode(code);
        if (reset != null && reset.getUserId().equals(user.getId())){
            if (confirmationService.inTime(user) && !reset.getUsed()){
                reset.setUsed(true);
                resetRepository.save(reset);
                successful = true;
            }
        }
        return successful;
    }
}
