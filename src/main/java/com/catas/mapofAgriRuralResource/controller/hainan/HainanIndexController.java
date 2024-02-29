package com.catas.mapofAgriRuralResource.controller.hainan;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/hainan-agriculture-bigdata")
public class HainanIndexController {
    @GetMapping("/index")
    public String hainanRubber() {
        return "hainan/industrialChain";
    }
}
