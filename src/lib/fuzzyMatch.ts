/** 模糊比對關鍵字欄位：以 / 分割後，任一 token 與輸入完全相等（不分大小寫） */
export function fuzzyMatch(fuzzyKeywords: string, inputText: string): boolean {
  const input = inputText.trim().toLowerCase();
  if (!input) return false;

  const tokens = fuzzyKeywords.split("/").map((t) => t.trim().toLowerCase());
  return tokens.some((t) => t === input);
}
