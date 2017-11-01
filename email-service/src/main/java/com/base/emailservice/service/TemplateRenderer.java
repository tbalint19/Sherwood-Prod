package com.base.emailservice.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

@Service
public class TemplateRenderer {

    @Autowired
    private Configuration freemarkerConfig;

    private String attemptRender(String templateUrl, Object model) throws Exception{
        Template template = freemarkerConfig.getTemplate(templateUrl);
        String message = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
        return message;
    }

    public String render(String templateUrl, Object model){
        try {
            return attemptRender(templateUrl, model);
        } catch (Exception e){
            return null;
        }
    }
}
