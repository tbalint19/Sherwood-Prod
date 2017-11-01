package com.base.emailservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.concurrent.CompletableFuture;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private LoggerService logger;

    private void sendMail(String to, String subject, String text) throws Exception {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);

        sender.send(message);
    }

    @Async
    public CompletableFuture<Boolean> attemptSend(String to, String subject, String text){
        try {
            sendMail(to, subject, text);
            logger.reportSuccess(to, subject);
            return CompletableFuture.completedFuture(true);
        } catch (Exception exception){
            logger.reportFailure(to, subject, exception.toString());
            return CompletableFuture.completedFuture(false);
        }
    }

}
