package com.catas.mapofAgriRuralResource.service.hainan;

import com.catas.mapofAgriRuralResource.utils.Constants;
import com.catas.mapofAgriRuralResource.utils.ExcelReader;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
}
