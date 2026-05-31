import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

import type { Course, DepartmentRow, SkillMapping } from "./types";

const DATA_DIR = path.join(process.cwd(), "public", "data");

function readExcelRows(filename: string): Record<string, unknown>[] {
  const filePath = path.join(DATA_DIR, filename);
  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
}

export async function loadBossExpectations(): Promise<string[]> {
  const filePath = path.join(DATA_DIR, "boss_expectations.txt");
  const text = fs.readFileSync(filePath, "utf-8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function loadDepartmentStructure(): Promise<DepartmentRow[]> {
  const rows = readExcelRows("department_structure.xlsx");
  return rows.map((row) => ({
    dept: String(row["部門名稱"] ?? "").trim(),
    l1: String(row["第一層人名"] ?? "").trim(),
    l2: String(row["第二層人名"] ?? "").trim(),
    l3: String(row["第三層人名"] ?? "").trim(),
    l4: String(row["第四層人名"] ?? "").trim(),
    plan: String(row["相關計畫"] ?? "").trim(),
    photo: String(row["照片"] ?? "").trim(),
  }));
}

export async function loadSkillCategories(): Promise<Course[]> {
  const rows = readExcelRows("skill_categories.xlsx");
  return rows.map((row) => ({
    skillCategory: String(row["技能大類"] ?? "").trim(),
    type: String(row["選必修"] ?? "").trim(),
    courseName: String(row["課程名稱"] ?? "").trim(),
    url: String(row["網站超連結"] ?? "").trim(),
  }));
}

export async function loadSkillMapping(): Promise<SkillMapping[]> {
  const rows = readExcelRows("skill_mapping.xlsx");
  return rows.map((row) => ({
    skillCategory: String(row["技能大類"] ?? "").trim(),
    courseName: String(row["課程名稱"] ?? "").trim(),
    fuzzyKeywords: String(row["模糊比對關鍵字"] ?? "").trim(),
    relatedPlan: String(row["相關計畫"] ?? "").trim(),
  }));
}

export async function loadAllData() {
  const [departmentRows, courses, mappings] = await Promise.all([
    loadDepartmentStructure(),
    loadSkillCategories(),
    loadSkillMapping(),
  ]);

  return {
    departmentRows,
    courses,
    mappings,
  };
}
