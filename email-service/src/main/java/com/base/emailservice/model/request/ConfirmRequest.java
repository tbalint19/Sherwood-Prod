package com.base.emailservice.model.request;

public class ConfirmRequest {

    private String to;
    private String name;
    private String confirmationCode;
    private String link;

    public ConfirmRequest() {
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getConfirmationCode() {
        return confirmationCode;
    }

    public void setConfirmationCode(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
