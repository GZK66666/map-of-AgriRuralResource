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
public class HainanRubberService {
    @Autowired
    ExcelReader reader;

    public Map<String, Map<String, Integer>> getArea() throws IOException {
        Map<String, Map<String, Integer>> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanRubberDataFile, Constants.rubberAreaSheet2);

        Map<String, Integer> r1 = new HashMap<>();
        Map<String, Integer> r2 = new HashMap<>();
        Map<String, Integer> r3 = new HashMap<>();
        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
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

    public List<Double> getYield() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanRubberDataFile, Constants.rubberYieldSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Double> getProduction() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanRubberDataFile, Constants.rubberProductionSheet2);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Double> getAvgPrice() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanRubberDataFile, Constants.rubberAvgPriceSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Double> getTappersCount() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanRubberDataFile, Constants.rubberTappersCountSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.add(data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public Map<String, Integer> getCoopsCntByRegion() throws IOException {
        Map<String, Integer> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanRubberDataFile, Constants.rubberCoopsByRegionSheet);

        for (int i = 1; i < 1205; i++) {
            Row data = sheet.getRow(i);

            String town = data.getCell(2).getStringCellValue();
            town = town.substring(0, town.length() - 1); // 去掉“市” “县”后缀，方便前端展示
            result.put(town, result.getOrDefault(town, 0) + 1);
        }

        return result;
    }

    public Map<String, Double> getAllRegionAvgPriceByMonth(int month) throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanRubberDataFile, Constants.rubberAvgPriceByRegionSheet);

        for (int rowIndex = 1; rowIndex < 172; rowIndex++) { // todo: break loop when step into other month
            Row data = sheet.getRow(rowIndex);

            String curMonth = data.getCell(2).getStringCellValue().replaceAll("月均价", "");
            if (!curMonth.equals(String.valueOf(month))) {
                continue;
            }

            result.put(data.getCell(0).getStringCellValue().replaceAll("[市县]", ""), data.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public Map<String, Double> get2022EndYearAreaOrProduction(int columnIndex) throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanRubberDataFile, Constants.rubberDistributionSheet);

        for (int rowIndex = 1; rowIndex < 19; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            // columnIndex: 1-年末面积 2-总产量
            result.put(data.getCell(0).getStringCellValue().replaceAll("[市县]", ""), data.getCell(columnIndex).getNumericCellValue());
        }

        return result;
    }
}
