package com.base.emailservice.model.response;

public class AttemptResponse {

    private Boolean attempted;

    public AttemptResponse() {
    }

    public AttemptResponse(Boolean attempted) {
        this.attempted = attempted;
    }

    public Boolean getAttempted() {
        return attempted;
    }

    public void setAttempted(Boolean attempted) {
        this.attempted = attempted;
    }
}
