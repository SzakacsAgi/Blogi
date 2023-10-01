package com.university.thesis.blogi.frontend.web.pageloader.controller;


import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ErrorPageLoaderController implements ErrorController {

    private static final String HTML_PAGE_VIEW_NAME = "error-page";

    @RequestMapping("/error")
    public ModelAndView loadPage() {
        return new ModelAndView(HTML_PAGE_VIEW_NAME);
    }
}
