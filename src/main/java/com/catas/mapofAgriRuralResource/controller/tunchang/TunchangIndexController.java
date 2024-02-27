package com.catas.mapofAgriRuralResource.controller.tunchang;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tunchang-agriculture-bigdata")
public class TunchangIndexController {
    @GetMapping("/index")
    public String index(Model model) {
        model.addAttribute("viewName", "ecom");
        return "tunchang/ecom";
    }

    @GetMapping("/ecom")
    public String ecom(Model model) {
        model.addAttribute("viewName", "ecom");
        return "tunchang/ecom";
    }

    @GetMapping("/enterprise")
    public String enterprise(Model model) {
        model.addAttribute("viewName", "enterprise");
        return "tunchang/enterprise";
    }

    @GetMapping("/cropIndustry")
    public String cropIndustry(Model model) {
        model.addAttribute("viewName", "cropIndustry");
        return "tunchang/cropIndustry";
    }
}
