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
public class TunchangEcomService {
    @Autowired
    ExcelReader reader;

    public List<Map<String, Double>> getLandAreaByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.landAreaSheet);

        // 获取标题行
        Row headerRow = sheet.getRow(0);

        // 获取年份在标题行的列索引
        int yearColumnIndex = -1;
        for (int i = 1; i < headerRow.getLastCellNum(); i++) {
            if (headerRow.getCell(i).getNumericCellValue() == year) {
                yearColumnIndex = i;
                break;
            }
        }

        // 如果找不到对应年份的列，返回空列表
        if (yearColumnIndex == -1) {
            return result;
        }

        // 从第三行开始遍历数据
        for (int rowIndex = 2; rowIndex < sheet.getLastRowNum(); rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            String townName = dataRow.getCell(0).getStringCellValue(); // 第一列是镇名
            Double landArea = dataRow.getCell(yearColumnIndex).getNumericCellValue(); // 对应年份的耕地面积

            Map<String, Double> townLandAreaMap = new HashMap<>();
            townLandAreaMap.put(townName, landArea);

            result.add(townLandAreaMap);
        }

        return result;
    }

    public List<Map<String, Double>> getPopulationByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.populationSheet);

        // 获取城镇名
        Row townRow = sheet.getRow(0);

        for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            int curYear = (int) dataRow.getCell(0).getNumericCellValue(); // 第一列是年份
            if (curYear != year) {
                continue;
            }

            for (int columnIndex = 2; columnIndex < 10; columnIndex++) {
                Map<String, Double> townPopulationMap = new HashMap<>();
                townPopulationMap.put(townRow.getCell(columnIndex).getStringCellValue(), dataRow.getCell(columnIndex).getNumericCellValue());

                result.add(townPopulationMap);
            }
        }

        return result;
    }

    public List<Map<String, Double>> getIndustryIncomeByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.industryIncomeSheet);

        // 获取产业名
        Row industryRow = sheet.getRow(0);

        for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            int curYear = (int) dataRow.getCell(0).getNumericCellValue();
            if (curYear != year) {
                continue;
            }

            for (int columnIndex = 2; columnIndex < 5; columnIndex++) {
                Map<String, Double> industryIncomeMap = new HashMap<>();
                industryIncomeMap.put(industryRow.getCell(columnIndex).getStringCellValue(), dataRow.getCell(columnIndex).getNumericCellValue());

                result.add(industryIncomeMap);
            }
        }

        return result;
    }

    public List<Map<String, Double>> getIndustryOutcomeByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.industryOutcomeSheet);

        // 获取产业名
        Row industryRow = sheet.getRow(0);

        for (int rowIndex = 1; rowIndex < sheet.getLastRowNum(); rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            int curYear = (int) dataRow.getCell(0).getNumericCellValue();
            if (curYear != year) {
                continue;
            }

            for (int columnIndex = 2; columnIndex < 7; columnIndex++) {
                Map<String, Double> industryOutcomeMap = new HashMap<>();

                String industryName = industryRow.getCell(columnIndex).getStringCellValue();
                if (industryName.equals("农林牧渔专业及辅助性活动")) {
                    industryName = "副业";
                }
                Double outcome = dataRow.getCell(columnIndex).getNumericCellValue();
                industryOutcomeMap.put(industryName, outcome);

                result.add(industryOutcomeMap);
            }
        }

        return result;
    }

    public List<List<Double>> getIncomeAndConsumption() throws IOException {
        List<Double> income = new ArrayList<>();
        List<Double> consumption = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.incomeAndConsumptionSheet);

        for (int rowIndex = 1; rowIndex < 11; rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            income.add(dataRow.getCell(1).getNumericCellValue());
            consumption.add(dataRow.getCell(2).getNumericCellValue());
        }

        List<List<Double>> result = new ArrayList<>();
        result.add(income);
        result.add(consumption);

        return result;
    }

    public List<Map<String, Double>> getAgriculturalMachineryByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.agriculturalMachinerySheet);

        Row machines = sheet.getRow(0);

        for (int rowIndex = 1; rowIndex < 10; rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            int curYear = (int) dataRow.getCell(0).getNumericCellValue();
            if (curYear != year) {
                continue;
            }

            for (int columnIndex = 1; columnIndex < 5; columnIndex++) {
                Map<String, Double> machieMap = new HashMap<>();
                machieMap.put(machines.getCell(columnIndex).getStringCellValue(), dataRow.getCell(columnIndex).getNumericCellValue());

                result.add(machieMap);
            }
        }

        return result;
    }

    public List<Double> getIrrigateArea() throws IOException {
        List<Double> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.irrigatedAreaSheet);

        for (int rowIndex = 1; rowIndex < 10; rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            result.add(dataRow.getCell(1).getNumericCellValue());
        }

        return result;
    }

    public List<Map<String, Double>> getFertilizersByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.fertilizersSheet);

        Row fertilizers = sheet.getRow(0);

        for (int rowIndex = 1; rowIndex < 10; rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            int curYear = (int) dataRow.getCell(0).getNumericCellValue();
            if (curYear != year) {
                continue;
            }

            for (int columnIndex = 2; columnIndex < 6; columnIndex++) {
                Map<String, Double> fertilizerMap = new HashMap<>();
                fertilizerMap.put(fertilizers.getCell(columnIndex).getStringCellValue(), dataRow.getCell(columnIndex).getNumericCellValue());

                result.add(fertilizerMap);
            }
        }

        return result;
    }

    public List<Map<String, Double>> getAgrochemicalByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.agrochemicalSheet);

        // 获取年份在标题行的列索引
        Row headerRow = sheet.getRow(0);
        int yearColumnIndex = -1;
        for (int i = 1; i < headerRow.getLastCellNum(); i++) {
            if (headerRow.getCell(i).getNumericCellValue() == year) {
                yearColumnIndex = i;
                break;
            }
        }

        if (yearColumnIndex == -1) {
            return result;
        }

        for (int rowIndex = 2; rowIndex < 20; rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            Map<String, Double> cityFertilizerMap = new HashMap<>();
            cityFertilizerMap.put(dataRow.getCell(0).getStringCellValue(), dataRow.getCell(yearColumnIndex).getNumericCellValue());

            result.add(cityFertilizerMap);
        }

        return result;
    }

    public List<Map<String, Double>> getAllFertilizersByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.allFertilizersSheet);

        // 获取年份在标题行的列索引
        Row headerRow = sheet.getRow(0);
        int yearColumnIndex = -1;
        for (int i = 1; i < headerRow.getLastCellNum(); i++) {
            if (headerRow.getCell(i).getNumericCellValue() == year) {
                yearColumnIndex = i;
                break;
            }
        }

        if (yearColumnIndex == -1) {
            return result;
        }

        for (int rowIndex = 2; rowIndex < 20; rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            Map<String, Double> cityFertilizerMap = new HashMap<>();
            cityFertilizerMap.put(dataRow.getCell(0).getStringCellValue(), dataRow.getCell(yearColumnIndex).getNumericCellValue());

            result.add(cityFertilizerMap);
        }

        return result;
    }

    public List<Map<String, Double>> getAllIrrigatedAreaByYear(int year) throws IOException {
        List<Map<String, Double>> result = new ArrayList<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.tunChangEcomFilePath, Constants.allIrrigatedAreaSheet);

        // 获取年份在标题行的列索引
        Row headerRow = sheet.getRow(0);
        int yearColumnIndex = -1;
        for (int i = 1; i < headerRow.getLastCellNum(); i++) {
            if (headerRow.getCell(i).getNumericCellValue() == year) {
                yearColumnIndex = i;
                break;
            }
        }

        if (yearColumnIndex == -1) {
            return result;
        }

        for (int rowIndex = 2; rowIndex < 20; rowIndex++) {
            Row dataRow = sheet.getRow(rowIndex);

            Map<String, Double> cityFertilizerMap = new HashMap<>();
            cityFertilizerMap.put(dataRow.getCell(0).getStringCellValue(), dataRow.getCell(yearColumnIndex).getNumericCellValue());

            result.add(cityFertilizerMap);
        }

        return result;
    }
}
