package com.catas.mapofAgriRuralResource.controller.hainan;

import com.catas.mapofAgriRuralResource.service.hainan.HainanAquaFarmingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hainan-crops/aquaFarming")
public class HainanAquaFarmingController {
    @Autowired
    HainanAquaFarmingService service;

    @GetMapping("/getMaricultureArea")
    public List<Double> getMaricultureArea() throws IOException {
        return service.getMaricultureArea();
    }

    @GetMapping("/getAquacultureArea")
    public List<Double> getAquacultureArea() throws IOException {
        return service.getAquacultureArea();
    }

    @GetMapping("/getMaricultureAreaDistribution")
    public Map<String, Double> getMaricultureAreaDistribution() throws IOException {
        return service.getMaricultureAreaDistribution();
    }

    @GetMapping("/getProduction")
    public List<Double> getProduction() throws IOException {
        return service.getProduction();
    }

    @GetMapping("/getMaricultureProduction")
    public List<Double> getMaricultureProduction() throws IOException {
        return service.getMaricultureProduction();
    }

    @GetMapping("/getAquacultureProduction")
    public List<Double> getAquacultureProduction() throws IOException {
        return service.getAquacultureProduction();
    }
}
