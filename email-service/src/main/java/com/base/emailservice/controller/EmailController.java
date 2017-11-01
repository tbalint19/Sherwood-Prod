package com.base.emailservice.controller;

import com.base.emailservice.model.response.AttemptResponse;
import com.base.emailservice.model.request.ConfirmRequest;
import com.base.emailservice.model.request.ResetRequest;
import com.base.emailservice.model.request.TestRequest;
import com.base.emailservice.service.EmailService;
import com.base.emailservice.service.TemplateRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/send")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private TemplateRenderer renderer;

    @PostMapping("/confirmation")
    public AttemptResponse sendConfirmation(@RequestBody ConfirmRequest request) {
        String subject = "Account confirmation";
        String to = request.getTo();
        String text = renderer.render("confirmation.ftl", request);
        emailService.attemptSend(to, subject, text);
        return new AttemptResponse(true);
    }

    @PostMapping("/reset")
    public AttemptResponse sendReset(@RequestBody ResetRequest request) {
        String subject = "Password reset";
        String to = request.getTo();
        String text = renderer.render("reset.ftl", request);
        emailService.attemptSend(to, subject, text);
        return new AttemptResponse(true);
    }

    @PostMapping("/test")
    public AttemptResponse sendTestMail(@RequestBody TestRequest request) {
        String subject = "Test";
        String to = request.getTo();
        String text = renderer.render("test.ftl", request);
        emailService.attemptSend(to, subject, text);
        return new AttemptResponse(true);
    }

    @PostMapping("/mock")
    public AttemptResponse mock(){
        return new AttemptResponse(true);
    }

}
