package com.catas.mapofAgriRuralResource.service.hainan;

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
public class HainanAquaFarmingService {
    @Autowired
    ExcelReader reader;

    public List<Double> getMaricultureArea() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingMaricultureAreaSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Double> getAquacultureArea() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingAquacultureAreaSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public Map<String, Double> getMaricultureAreaDistribution() throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingMaricultureAreaDistributionSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.put(data.getCell(0).getStringCellValue(), data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Double> getProduction() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingProductionSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Double> getMaricultureProduction() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingMaricultureProductionSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Double> getAquacultureProduction() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingAquacultureProductionSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public Map<String, Double> getProductionDistribution() throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingProductionDistributionSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.put(data.getCell(0).getStringCellValue(), data.getCell(1).getNumericCellValue());
        }

        return result;
    }
}
