package com.university.thesis.blogi.frontend.web.pageloader.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PermissionDeniedPageLoaderController {

    private static final String HTML_PAGE_VIEW_NAME = "permission-denied";

    @RequestMapping("/permission-denied")
    public ModelAndView loadPage() {
        return new ModelAndView(HTML_PAGE_VIEW_NAME);
    }
}
