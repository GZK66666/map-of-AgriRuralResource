package com.catas.mapofAgriRuralResource.service.hainan;

import com.catas.mapofAgriRuralResource.utils.Constants;
import com.catas.mapofAgriRuralResource.utils.ExcelReader;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HainanAquaFarmingService {
    @Autowired
    ExcelReader reader;

    private static final DecimalFormat DF = new DecimalFormat("#.00");

    public Map<String, List<Double>> getAreaAndComposition() throws IOException {
        Map<String, List<Double>> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingAreaAndCompositionSheet);

        List<Double> seawater = new ArrayList<>();
        List<Double> freshwater = new ArrayList<>();
        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            seawater.add(Double.valueOf(DF.format(data.getCell(2).getNumericCellValue())));
            freshwater.add(Double.valueOf(DF.format(data.getCell(3).getNumericCellValue())));
        }

        result.put("海水养殖", seawater);
        result.put("淡水养殖", freshwater);

        return result;
    }

    public Map<String, List<Double>> getProductionAndComposition() throws IOException {
        Map<String, List<Double>> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingProductionAndCompositionSheet);

        List<Double> total = new ArrayList<>();
        List<Double> seawater = new ArrayList<>();
        List<Double> freshwater = new ArrayList<>();
        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            total.add(Double.valueOf(DF.format(data.getCell(1).getNumericCellValue())));
            seawater.add(Double.valueOf(DF.format(data.getCell(2).getNumericCellValue())));
            freshwater.add(Double.valueOf(DF.format(data.getCell(3).getNumericCellValue())));
        }

        result.put("总产量", total);
        result.put("海水产品", seawater);
        result.put("淡水产品", freshwater);

        return result;
    }

    public Map<String, Double> getMaricultureAreaDistribution() throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingMaricultureAreaDistributionSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.put(data.getCell(0).getStringCellValue(), Double.valueOf(DF.format(data.getCell(1).getNumericCellValue())));
        }

        return result;
    }

    public Map<String, List<Double>> getAquacultureProductsProduction() throws IOException {
        Map<String, List<Double>> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingAquacultureProductsProductionSheet);

        List<Double> seawater = new ArrayList<>();
        List<Double> freshwater = new ArrayList<>();
        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            seawater.add(Double.valueOf(DF.format(data.getCell(1).getNumericCellValue())));
            freshwater.add(Double.valueOf(DF.format(data.getCell(2).getNumericCellValue())));
        }

        result.put("海水养殖", seawater);
        result.put("淡水养殖", freshwater);

        return result;
    }

    public Map<String, List<Double>> getHarvestProductsProduction() throws IOException {
        Map<String, List<Double>> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingHarvestProductsProductionSheet);

        List<Double> seawater = new ArrayList<>();
        List<Double> freshwater = new ArrayList<>();
        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            seawater.add(Double.valueOf(DF.format(data.getCell(1).getNumericCellValue())));
            freshwater.add(Double.valueOf(DF.format(data.getCell(2).getNumericCellValue())));
        }

        result.put("海水捕捞", seawater);
        result.put("淡水捕捞", freshwater);

        return result;
    }

    public Map<String, Double> getFisheryClassificationOutput() throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingFisheryClassificationOutputSheet);

        for (int rowIndex = 1; rowIndex < 9; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.put(data.getCell(0).getStringCellValue(), Double.valueOf(DF.format(data.getCell(1).getNumericCellValue())));
        }

        return result;
    }

    public Map<String, Double> getProductionDistribution() throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingProductionDistributionSheet);

        for (int rowIndex = 1; rowIndex < 6; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            result.put(data.getCell(0).getStringCellValue(), Double.valueOf(DF.format(data.getCell(1).getNumericCellValue())));
        }

        return result;
    }

    public Map<String, Double> getDistribution(int columnIndex) throws IOException {
        Map<String, Double> result = new HashMap<>();

        Sheet sheet = reader.ReadSheetFromFile(Constants.hainanAquaFarmingDataFile, Constants.aquaFarmingDistributionSheet);

        for (int rowIndex = 1; rowIndex < 19; rowIndex++) {
            Row data = sheet.getRow(rowIndex);

            // columnIndex: 1-海水养殖面积 2-淡水养殖面积 3-海水养殖产量 4-淡水养殖产量
            String town = data.getCell(0).getStringCellValue().replaceAll("[市县]", "");
            double value = Double.parseDouble(DF.format(data.getCell(columnIndex).getNumericCellValue()));
            if (value != 0) {
                result.put(town, value);
            }
        }

        return result;
    }
}
