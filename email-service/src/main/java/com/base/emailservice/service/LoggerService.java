package com.base.emailservice.service;

import com.base.emailservice.model.SendAttempt;
import com.base.emailservice.repository.SendAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoggerService {

    @Autowired
    private SendAttemptRepository sendAttemptRepository;

    public void reportSuccess(String to, String subject){
        SendAttempt attempt = new SendAttempt(true);
        attempt.setTarget(to);
        attempt.setSubject(subject);
        sendAttemptRepository.save(attempt);
    }

    public void reportFailure(String to, String subject, String comment){
        SendAttempt attempt = new SendAttempt(false);
        attempt.setTarget(to);
        attempt.setSubject(subject);
        attempt.setComment(comment);
        sendAttemptRepository.save(attempt);
    }
}
