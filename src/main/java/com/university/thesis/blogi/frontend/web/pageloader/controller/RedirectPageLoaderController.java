package com.university.thesis.blogi.frontend.web.pageloader.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RedirectPageLoaderController {

    private static final String HTML_PAGE_VIEW_NAME = "redirect";


    @GetMapping("/redirect")
    public ModelAndView loadPage() {
        return new ModelAndView(HTML_PAGE_VIEW_NAME);
    }

}


