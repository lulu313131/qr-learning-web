/** department_structure.xlsx 部門資料列 */
export type DepartmentRow = {
  dept: string;
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  plan: string;
  photo: string;
};

/** @alias DepartmentRow */
export type DeptRow = DepartmentRow;

/** 技能大類按鈕用：Q / R / A / M */
export type SkillCategoryKey = "Q" | "R" | "A" | "M";

/** skill_categories.xlsx 課程紀錄 */
export type Course = {
  skillCategory: string;
  type: string;
  courseName: string;
  url: string;
};

/**
 * skill_mapping.xlsx 對應紀錄
 * NOTE: fuzzyKeywords 保留供未來全站模糊搜尋，本功能以 relatedPlan 完全比對
 */
export type SkillMapping = {
  skillCategory: string;
  courseName: string;
  fuzzyKeywords: string;
  relatedPlan: string;
};

export type TreeNodeData = {
  id: string;
  name: string;
  emoji: string;
  plans: string[];
  children: TreeNodeData[];
};

export type TabId = "boss" | "dept-a" | "dept-b" | "dept-c";

/** @deprecated 請改用 SkillCategoryKey */
export type SkillCategory = SkillCategoryKey;
