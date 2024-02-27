package com.catas.mapofAgriRuralResource.utils;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class ExcelReader {
    public Sheet ReadSheetFromFile(String filePath, int sheetId) throws IOException {
        // 使用ClassLoader加载资源文件
        ClassLoader classLoader = ExcelReader.class.getClassLoader();
        InputStream excelFile = classLoader.getResourceAsStream(filePath);

        // 创建一个工作簿
        Workbook workbook = WorkbookFactory.create(excelFile);

        return workbook.getSheetAt(sheetId);
    }
}
