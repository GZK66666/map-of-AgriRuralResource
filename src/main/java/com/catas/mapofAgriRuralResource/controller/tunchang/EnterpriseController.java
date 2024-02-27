package com.catas.mapofAgriRuralResource.controller.tunchang;

import com.catas.mapofAgriRuralResource.service.tunchang.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enterprise")
public class EnterpriseController {
    @Autowired
    EnterpriseService service;

    @GetMapping("/getFarmersProfessionalCooperativeByTown")
    public Map<String, Integer> getFarmersProfessionalCooperativeByTown() throws IOException {
        return service.getFarmersProfessionalCooperativeByTown();
    }

    @GetMapping("/getFamilyFarmByTown")
    public Map<String, Integer> getFamilyFarmByTown() throws IOException {
        return service.getFamilyFarmByTown();
    }

    @GetMapping("/getCollectiveEconomicOrganizationByTown")
    public Map<String, Integer> getCollectiveEconomicOrganizationByTown() throws IOException {
        return service.getCollectiveEconomicOrganizationByTown();
    }

    @GetMapping("/getFarmEnterpriseByTown")
    public Map<String, Integer> getFarmEnterpriseByTown() throws IOException {
        return service.getFarmEnterpriseByTown();
    }

    @GetMapping("/getFarmersProfessionalCooperativeByYear")
    public List<List<Map<String, Integer>>> getFarmersProfessionalCooperativeByYear() throws IOException {
        return service.getFarmersProfessionalCooperativeByYear();
    }

    @GetMapping("/getFarmersProfessionalCooperativeByIndustry")
    public List<Map<String, Integer>> getFarmersProfessionalCooperativeByIndustry() throws IOException {
        return service.getFarmersProfessionalCooperativeByIndustry();
    }

    @GetMapping("/getFamilyFarmByYear")
    public List<List<Map<String, Integer>>> getFamilyFarmByYear() throws IOException {
        return service.getFamilyFarmByYear();
    }

    @GetMapping("/getFamilyFarmByIndustry")
    public List<Map<String, Integer>> getFamilyFarmByIndustry() throws IOException {
        return service.getFamilyFarmByIndustry();
    }

    @GetMapping("/getFarmEnterpriseByYear")
    public List<List<Map<String, Integer>>> getFarmEnterpriseByYear() throws IOException {
        return service.getFarmEnterpriseByYear();
    }

    @GetMapping("/getFarmEnterpriseByIndustry")
    public List<Map<String, Integer>> getFarmEnterpriseByIndustry() throws IOException {
        return service.getFarmEnterpriseByIndustry();
    }
}
