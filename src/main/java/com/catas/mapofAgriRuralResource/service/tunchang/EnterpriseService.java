package com.catas.mapofAgriRuralResource.service.tunchang;

import com.catas.mapofAgriRuralResource.utils.Constants;
import com.catas.mapofAgriRuralResource.utils.ExcelReader;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EnterpriseService {
    @Autowired
    ExcelReader reader;

    public Map<String, Integer> getFarmersProfessionalCooperativeByTown() throws IOException {
        Map<String, Integer> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.farmersProfessionalCooperativeSheet);

        for (int rowIndex = 1; rowIndex < 1101; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String townName = data.getCell(4).getStringCellValue();
            if (townName.isEmpty()) {
                continue;
            }
            result.put(townName, result.getOrDefault(townName, 0) + 1);
        }

        return result;
    }

    public Map<String, Integer> getFamilyFarmByTown() throws IOException {
        Map<String, Integer> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.familyFarmSheet);

        for (int rowIndex = 1; rowIndex < 41; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String townName = data.getCell(4).getStringCellValue();
            result.put(townName, result.getOrDefault(townName, 0) + 1);
        }

        return result;
    }

    public Map<String, Integer> getCollectiveEconomicOrganizationByTown() throws IOException {
        Map<String, Integer> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.collectiveEconomicOrganizationSheet);

        for (int rowIndex = 1; rowIndex < 79; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String townName = data.getCell(2).getStringCellValue();
            result.put(townName, result.getOrDefault(townName, 0) + 1);
        }

        return result;
    }

    public Map<String, Integer> getFarmEnterpriseByTown() throws IOException {
        Map<String, Integer> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.farmEnterpriseSheet);

        for (int rowIndex = 1; rowIndex < 349; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String townName = data.getCell(4).getStringCellValue();
            result.put(townName, result.getOrDefault(townName, 0) + 1);
        }

        return result;
    }

    public List<List<Map<String, Integer>>> getFarmersProfessionalCooperativeByYear() throws IOException {
        List<List<Map<String, Integer>>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.farmersProfessionalCooperativeSheet);

        List<Map<String, Integer>> totalResult = new ArrayList<>();
        for (int rowIndex = 5; rowIndex < 16; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String year = String.valueOf(data.getCell(11).getNumericCellValue());
            year = year.substring(0, year.indexOf("."));
            Integer count = (int) data.getCell(12).getNumericCellValue();

            Map<String, Integer> yearMap = new HashMap<>();
            yearMap.put(year, count);

            totalResult.add(yearMap);
        }

        List<Map<String, Integer>> incrResult = new ArrayList<>();
        for (int rowIndex = 23; rowIndex < 34; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String year = String.valueOf(data.getCell(11).getNumericCellValue());
            year = year.substring(0, year.indexOf("."));
            Integer count = (int) data.getCell(12).getNumericCellValue();

            Map<String, Integer> yearMap = new HashMap<>();
            yearMap.put(year, count);

            incrResult.add(yearMap);
        }

        result.add(totalResult);
        result.add(incrResult);

        return result;
    }

    public List<Map<String, Integer>> getFarmersProfessionalCooperativeByIndustry() throws IOException {
        List<Map<String, Integer>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.farmersProfessionalCooperativeSheet);

        for (int rowIndex = 17; rowIndex < 22; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String industry = data.getCell(11).getStringCellValue();
            Integer count = (int) data.getCell(12).getNumericCellValue();

            Map<String, Integer> industryMap = new HashMap<>();
            industryMap.put(industry, count);

            result.add(industryMap);
        }

        return result;
    }

    public List<List<Map<String, Integer>>> getFamilyFarmByYear() throws IOException {
        List<List<Map<String, Integer>>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.familyFarmSheet);

        List<Map<String, Integer>> totalResult = new ArrayList<>();
        for (int rowIndex = 6; rowIndex < 11; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String year = String.valueOf(data.getCell(9).getNumericCellValue());
            year = year.substring(0, year.indexOf("."));
            Integer count = (int) data.getCell(10).getNumericCellValue();

            Map<String, Integer> yearMap = new HashMap<>();
            yearMap.put(year, count);

            totalResult.add(yearMap);
        }

        List<Map<String, Integer>> incrResult = new ArrayList<>();
        for (int rowIndex = 17; rowIndex < 22; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String year = String.valueOf(data.getCell(9).getNumericCellValue());
            year = year.substring(0, year.indexOf("."));
            Integer count = (int) data.getCell(10).getNumericCellValue();

            Map<String, Integer> yearMap = new HashMap<>();
            yearMap.put(year, count);

            incrResult.add(yearMap);
        }

        result.add(totalResult);
        result.add(incrResult);

        return result;
    }

    public List<Map<String, Integer>> getFamilyFarmByIndustry() throws IOException {
        List<Map<String, Integer>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.familyFarmSheet);

        for (int rowIndex = 12; rowIndex < 15; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String industry = data.getCell(9).getStringCellValue();
            Integer count = (int) data.getCell(10).getNumericCellValue();

            Map<String, Integer> industryMap = new HashMap<>();
            industryMap.put(industry, count);

            result.add(industryMap);
        }

        return result;
    }

    public List<List<Map<String, Integer>>> getFarmEnterpriseByYear() throws IOException {
        List<List<Map<String, Integer>>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.farmEnterpriseSheet);

        List<Map<String, Integer>> totalResult = new ArrayList<>();
        for (int rowIndex = 8; rowIndex < 19; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String year = String.valueOf(data.getCell(7).getNumericCellValue());
            year = year.substring(0, year.indexOf("."));
            Integer count = (int) data.getCell(8).getNumericCellValue();

            Map<String, Integer> yearMap = new HashMap<>();
            yearMap.put(year, count);

            totalResult.add(yearMap);
        }

        List<Map<String, Integer>> incrResult = new ArrayList<>();
        for (int rowIndex = 26; rowIndex < 37; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String year = String.valueOf(data.getCell(7).getNumericCellValue());
            year = year.substring(0, year.indexOf("."));
            Integer count = (int) data.getCell(8).getNumericCellValue();

            Map<String, Integer> yearMap = new HashMap<>();
            yearMap.put(year, count);

            incrResult.add(yearMap);
        }

        result.add(totalResult);
        result.add(incrResult);

        return result;
    }

    public List<Map<String, Integer>> getFarmEnterpriseByIndustry() throws IOException {
        List<Map<String, Integer>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEnterpriseFilePath, Constants.farmEnterpriseSheet);

        for (int rowIndex = 20; rowIndex < 24; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String industry = data.getCell(7).getStringCellValue();
            Integer count = (int) data.getCell(8).getNumericCellValue();

            Map<String, Integer> industryMap = new HashMap<>();
            industryMap.put(industry, count);

            result.add(industryMap);
        }

        return result;
    }
}
