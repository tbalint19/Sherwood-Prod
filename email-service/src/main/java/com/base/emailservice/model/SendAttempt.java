package com.base.emailservice.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class SendAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String subject;
    private String target;
    private Boolean successful;
    private String comment;

    public SendAttempt() {
    }

    public SendAttempt(Boolean successful) {
        this.successful = successful;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Boolean getSuccessful() {
        return successful;
    }

    public void setSuccessful(Boolean successful) {
        this.successful = successful;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
