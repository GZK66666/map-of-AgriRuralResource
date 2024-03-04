package com.catas.mapofAgriRuralResource.controller.hainan;

import com.catas.mapofAgriRuralResource.service.hainan.HainanAquaFarmingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hainan-crops/aquaFarming")
public class HainanAquaFarmingController {
    @Autowired
    HainanAquaFarmingService service;

    @GetMapping("/getAreaAndComposition")
    public Map<String, List<Double>> getAreaAndComposition() throws IOException {
        return service.getAreaAndComposition();
    }

    @GetMapping("/getProductionAndComposition")
    public Map<String, List<Double>> getProductionAndComposition() throws IOException {
        return service.getProductionAndComposition();
    }

    @GetMapping("/getMaricultureAreaDistribution")
    public Map<String, Double> getMaricultureAreaDistribution() throws IOException {
        return service.getMaricultureAreaDistribution();
    }

    @GetMapping("/getAquacultureProductsProduction")
    public Map<String, List<Double>> getAquacultureProductsProduction() throws IOException {
        return service.getAquacultureProductsProduction();
    }

    @GetMapping("/getHarvestProductsProduction")
    public Map<String, List<Double>> getHarvestProductsProduction() throws IOException {
        return service.getHarvestProductsProduction();
    }

    @GetMapping("/getFisheryClassificationOutput")
    public Map<String, Double> getFisheryClassificationOutput() throws IOException {
        return service.getFisheryClassificationOutput();
    }

    @GetMapping("/getProductionDistribution")
    public Map<String, Double> getProductionDistribution() throws IOException {
        return service.getProductionDistribution();
    }

    @GetMapping("/getDistribution")
    public Map<String, Double> getDistribution(@RequestParam int index) throws IOException {
        return service.getDistribution(index);
    }
}
