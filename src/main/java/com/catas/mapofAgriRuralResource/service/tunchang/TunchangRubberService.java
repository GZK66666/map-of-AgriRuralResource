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
public class TunchangRubberService {
    @Autowired
    ExcelReader reader;

    public Map<String, Map<String, Integer>> getRubberArea() throws IOException {
        Map<String, Map<String, Integer>> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangeRubberFilePath, Constants.rubberAreaSheet);

        Map<String, Integer> r1 = new HashMap<>();
        Map<String, Integer> r2 = new HashMap<>();
        Map<String, Integer> r3 = new HashMap<>();
        for (int rowIndex = 1; rowIndex < 9; rowIndex++) {
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

    public List<Double> getRubberProduction() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangeRubberFilePath, Constants.rubberProductionSheet);

        for (int rowIndex = 1; rowIndex < 10; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public Map<String, Double> getRubberCollectionPoint() throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangeRubberFilePath, Constants.rubberCollectionPointSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.put(data.getCell(6).getStringCellValue(), data.getCell(7).getNumericCellValue());
        }

        return result;
    }

    public Map<String, Double> getRubberPriceByYearAndMonth(String year, String month) throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangeRubberFilePath, Constants.rubberPriceSheet);

        for (int rowIndex = 1; rowIndex < 40; rowIndex++) {
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

    public List<Map<String, Double>> getRubberCooperative() throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangeRubberFilePath, Constants.rubberCooperativeSheet);

        for (int rowIndex = 1; rowIndex < 9; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            Map<String, Double> townMap = new HashMap<>();
            townMap.put(data.getCell(7).getStringCellValue(), data.getCell(8).getNumericCellValue());
            result.add(townMap);
        }

        return result;
    }

    public List<Map<String, Double>> getRubberEnterprise() throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangeRubberFilePath, Constants.rubberEnterpriseSheet);

        for (int rowIndex = 1; rowIndex < 8; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            Map<String, Double> townMap = new HashMap<>();
            townMap.put(data.getCell(5).getStringCellValue(), data.getCell(6).getNumericCellValue());
            result.add(townMap);
        }

        return result;
    }

    public List<Map<String, Double>> getRubberAveragePriceByMonth(int month) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangeRubberFilePath, Constants.rubberAveragePriceSheet);

        for (int rowIndex = 1; rowIndex < 153; rowIndex++) { // todo: break loop when step into other month
            Row data = sheet.getRow(rowIndex);

            String curMonth = data.getCell(2).getStringCellValue().replaceAll("月均价", "");
            if (!curMonth.equals(String.valueOf(month))) {
                continue;
            }

            Map<String, Double> cityMap = new HashMap<>();
            cityMap.put(data.getCell(0).getStringCellValue(), data.getCell(1).getNumericCellValue());
            result.add(cityMap);
        }

        return result;
    }
}