package com.catas.mapofAgriRuralResource.controller.tunchang;

import com.catas.mapofAgriRuralResource.service.tunchang.BetelNutService;
import com.catas.mapofAgriRuralResource.service.tunchang.RubberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/crop")
public class CropIndustryController {
    @Autowired
    RubberService rubber;

    @Autowired
    BetelNutService betelNut;

    @GetMapping("/rubber/getRubberArea")
    public Map<String, Map<String, Integer>> getRubberArea() throws IOException {
        return rubber.getRubberArea();
    }

    @GetMapping("/rubber/getRubberProduction")
    public List<Double> getRubberProduction() throws IOException {
        return rubber.getRubberProduction();
    }

    @GetMapping("/rubber/getRubberCollectionPoint")
    public Map<String, Double> getRubberCollectionPoint() throws IOException {
        return rubber.getRubberCollectionPoint();
    }

    @GetMapping("/rubber/getRubberPriceByYearAndMonth")
    public Map<String, Double> getRubberPriceByYearAndMonth(@RequestParam String year, @RequestParam String month) throws IOException {
        return rubber.getRubberPriceByYearAndMonth(year, month);
    }

    @GetMapping("/rubber/getRubberCooperative")
    public List<Map<String, Double>> getRubberCooperative() throws IOException {
        return rubber.getRubberCooperative();
    }

    @GetMapping("/rubber/getRubberEnterprise")
    public List<Map<String, Double>> getRubberEnterprise() throws IOException {
        return rubber.getRubberEnterprise();
    }

    @GetMapping("/rubber/getRubberAveragePriceByMonth")
    public List<Map<String, Double>> getRubberAveragePriceByMonth(@RequestParam int month) throws IOException {
        return rubber.getRubberAveragePriceByMonth(month);
    }

    @GetMapping("/betelNut/getBetelNutArea")
    public Map<String, Map<String, Integer>> getBetelNutArea() throws IOException {
        return betelNut.getBetelNutArea();
    }

    @GetMapping("/betelNut/getBetelNutProduction")
    public List<Double> getBetelNutProduction() throws IOException {
        return betelNut.getBetelNutProduction();
    }

    @GetMapping("/betelNut/getBetelNutCollectionPoint")
    public Map<String, Double> getBetelNutCollectionPoint() throws IOException {
        return betelNut.getBetelNutCollectionPoint();
    }

    @GetMapping("/betelNut/getBetelNutPriceByYearAndMonth")
    public Map<String, Double> getBetelNutPriceByYearAndMonth(@RequestParam String year, @RequestParam String month) throws IOException {
        return betelNut.getBetelNutPriceByYearAndMonth(year, month);
    }

    @GetMapping("/betelNut/getBetelNutProcessingPoint")
    public List<Map<String, Double>> getBetelNutProcessingPoint() throws IOException {
        return betelNut.getBetelNutProcessingPoint();
    }

    @GetMapping("/betelNut/getBetelNutCooperative")
    public List<Map<String, Double>> getBetelNutCooperative() throws IOException {
        return betelNut.getBetelNutCooperative();
    }

    @GetMapping("/betelNut/getBetelNutAvgPrice")
    public Map<String, Double> getBetelNutPriceByYearAndMonth() throws IOException {
        return betelNut.getBetelNutAvgPrice();
    }
}
