package com.catas.mapofAgriRuralResource.controller.hainan.crops;

import com.catas.mapofAgriRuralResource.service.hainan.crops.HainanRubberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hainan-crops/rubber")
public class HainanRubberController {
    @Autowired
    HainanRubberService service;

    @GetMapping("/getArea")
    public Map<String, Map<String, Integer>> getArea() throws IOException {
        return service.getArea();
    }

    @GetMapping("/getYield")
    public List<Double> getYield() throws IOException {
        return service.getYield();
    }

    @GetMapping("/getProduction")
    public List<Double> getProduction() throws IOException {
        return service.getProduction();
    }

    @GetMapping("/getAvgPrice")
    public List<Double> getAvgPrice() throws IOException {
        return service.getAvgPrice();
    }

    @GetMapping("/getTappersCount")
    public List<Double> getTappersCount() throws IOException {
        return service.getTappersCount();
    }

    @GetMapping("/getCoopsCntByRegion")
    public Map<String, Integer> getCoopsCntByRegion() throws IOException {
        return service.getCoopsCntByRegion();
    }

    @GetMapping("/getAllRegionAvgPriceByMonth")
    public Map<String, Double> getAllRegionAvgPriceByMonth(@RequestParam int month) throws IOException {
        return service.getAllRegionAvgPriceByMonth(month);
    }

    @GetMapping("/get2022EndYearAreaOrProduction")
    public Map<String, Double> get2022EndYearAreaOrProduction(@RequestParam int index) throws IOException {
        return service.get2022EndYearAreaOrProduction(index);
    }
}
