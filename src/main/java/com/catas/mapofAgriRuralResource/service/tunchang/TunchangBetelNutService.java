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
public class TunchangBetelNutService {
    @Autowired
    ExcelReader reader;

    public Map<String, Map<String, Integer>> getBetelNutArea() throws IOException {
        Map<String, Map<String, Integer>> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangBetelNutFilePath, Constants.betelNutAreaSheet);

        Map<String, Integer> r1 = new HashMap<>();
        Map<String, Integer> r2 = new HashMap<>();
        Map<String, Integer> r3 = new HashMap<>();
        for (int rowIndex = 1; rowIndex < 10; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String year = String.valueOf(data.getCell(0).getNumericCellValue());
            year = year.substring(0, year.indexOf("."));

            r1.put(year, (int) data.getCell(1).getNumericCellValue());
            r2.put(year, (int) data.getCell(2).getNumericCellValue());
            r3.put(year, (int) data.getCell(3).getNumericCellValue());
        }

        result.put("年末面积", r1);
        result.put("新种面积", r2);
        result.put("收获面积", r3);

        return result;
    }

    public List<Double> getBetelNutProduction() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangBetelNutFilePath, Constants.betelNutProductionSheet);

        for (int rowIndex = 1; rowIndex < 10; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public Map<String, Double> getBetelNutCollectionPoint() throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangBetelNutFilePath, Constants.betelNutCollectionPointSheet);

        for (int rowIndex = 1; rowIndex < 7; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.put(data.getCell(5).getStringCellValue(), data.getCell(6).getNumericCellValue());
        }

        return result;
    }

    public Map<String, Double> getBetelNutPriceByYearAndMonth(String year, String month) throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangBetelNutFilePath, Constants.betelNutPriceSheet);

        for (int rowIndex = 1; rowIndex < 52; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            String[] curDate = data.getCell(2).getStringCellValue().split("\\.");
            // filter unselected year
            if (!year.equals(curDate[0])) {
                continue;
            }
            // filter unselected month
            if (!month.equals("all") && !month.equals(curDate[1])) {
                continue;
            }
            // zero means nan
            if (data.getCell(1).getNumericCellValue() == 0) {
                continue;
            }

            result.put(data.getCell(2).getStringCellValue(), data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Map<String, Double>> getBetelNutProcessingPoint() throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangBetelNutFilePath, Constants.betelNutProcessingPointSheet);

        for (int rowIndex = 1; rowIndex < 9; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            Map<String, Double> townMap = new HashMap<>();
            townMap.put(data.getCell(6).getStringCellValue(), data.getCell(7).getNumericCellValue());
            result.add(townMap);
        }

        return result;
    }

    public List<Map<String, Double>> getBetelNutCooperative() throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangBetelNutFilePath, Constants.betelNutCooperativeSheet);

        for (int rowIndex = 1; rowIndex < 9; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            Map<String, Double> townMap = new HashMap<>();
            townMap.put(data.getCell(6).getStringCellValue(), data.getCell(7).getNumericCellValue());
            result.add(townMap);
        }

        return result;
    }

    public Map<String, Double> getBetelNutAvgPrice() throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangBetelNutFilePath, Constants.betelNutAveragePriceSheet);

        for (int rowIndex = 1; rowIndex < 52; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            // zero means nan
            if (data.getCell(1).getNumericCellValue() == 0) {
                continue;
            }

            result.put(data.getCell(2).getStringCellValue(), data.getCell(1).getNumericCellValue());
        }

        return result;
    }
}
