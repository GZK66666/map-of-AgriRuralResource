package com.catas.mapofAgriRuralResource.controller.hainan;

import com.catas.mapofAgriRuralResource.service.hainan.HainanAquaFarmingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/hainan-crops/aquaFarming")
public class HainanAquaFarmingController {
    @Autowired
    HainanAquaFarmingService service;

    @GetMapping("/getMaricultureArea")
    public List<Double> getMaricultureArea() throws IOException {
        return service.getMaricultureArea();
    }
}
