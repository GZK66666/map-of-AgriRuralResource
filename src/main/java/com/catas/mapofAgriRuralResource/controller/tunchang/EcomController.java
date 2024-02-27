package com.catas.mapofAgriRuralResource.controller.tunchang;

import com.catas.mapofAgriRuralResource.service.tunchang.EcomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ecom")
public class EcomController {
    @Autowired
    EcomService service;

    @GetMapping("/getLandAreaByYear")
    public List<Map<String, Double>> getLandAreaByYear(@RequestParam int year) throws IOException {
        return service.getLandAreaByYear(year);
    }

    @GetMapping("/getPopulationByYear")
    public List<Map<String, Double>> getPopulationByYear(@RequestParam int year) throws IOException {
        return service.getPopulationByYear(year);
    }

    @GetMapping("/getIndustryIncomeByYear")
    public List<Map<String, Double>> getIndustryBuYear(@RequestParam int year) throws IOException {
        return service.getIndustryIncomeByYear(year);
    }

    @GetMapping("/getIndustryOutcomeByYear")
    public List<Map<String, Double>> getIndustryOutcomeByYear(@RequestParam int year) throws IOException {
        return service.getIndustryOutcomeByYear(year);
    }

    @GetMapping("/getIncomeAndConsumption")
    public List<List<Double>> getIncomeAndConsumption() throws IOException {
        return service.getIncomeAndConsumption();
    }

    @GetMapping("/getAgriculturalMachineryByYear")
    public List<Map<String, Double>> getAgriculturalMachineryByYear(@RequestParam int year) throws IOException {
        return service.getAgriculturalMachineryByYear(year);
    }

    @GetMapping("/getIrrigateArea")
    public List<Double> getIrrigateArea() throws IOException {
        return service.getIrrigateArea();
    }

    @GetMapping("/getFertilizersByYear")
    public List<Map<String, Double>> getFertilizersByYear(@RequestParam int year) throws IOException {
        return service.getFertilizersByYear(year);
    }

    @GetMapping("/getAgrochemicalByYear")
    public List<Map<String, Double>> getAgrochemicalByYear(@RequestParam int year) throws IOException {
        return service.getAgrochemicalByYear(year);
    }

    @GetMapping("/getAllFertilizersByYear")
    public List<Map<String, Double>> getAllFertilizersByYear(@RequestParam int year) throws IOException {
        return service.getAllFertilizersByYear(year);
    }

    @GetMapping("/getAllIrrigatedAreaByYear")
    public List<Map<String, Double>> getAllIrrigatedAreaByYear(@RequestParam int year) throws IOException {
        return service.getAllIrrigatedAreaByYear(year);
    }
}
