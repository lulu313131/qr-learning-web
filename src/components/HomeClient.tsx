"use client";

import { useMemo, useState } from "react";

import { findPersonName, searchByKeyword } from "@/lib/searchUtils";
import type {
  Course,
  DepartmentRow,
  SkillCategoryKey,
  SkillMapping,
  TabId,
} from "@/lib/types";

import BannerDemo from "./BannerDemo";
import BossExpectations from "./BossExpectations";
import DeptTree from "./DeptTree";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Sidebar from "./Sidebar";
import SkillPage from "./SkillPage";
import TabBar from "./TabBar";
import VisitCounter from "./VisitCounter";

type SearchMode = "name" | "keyword" | null;

type HomeClientProps = {
  courses: Course[];
  mappings: SkillMapping[];
  departmentRows: DepartmentRow[];
};

export default function HomeClient({
  courses,
  mappings,
  departmentRows,
}: HomeClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("boss");
  const [activeSkill, setActiveSkill] = useState<SkillCategoryKey | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightName, setHighlightName] = useState<string | null>(null);

  const keywordResult = useMemo(() => {
    if (searchMode !== "keyword" || !searchQuery) return null;
    return searchByKeyword(searchQuery, mappings, departmentRows);
  }, [searchMode, searchQuery, mappings, departmentRows]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setActiveSkill(null);
    setSearchMode(null);
    setSearchQuery("");
    setHighlightName(null);
  };

  const handleCategoryClick = (category: SkillCategoryKey) => {
    setActiveSkill((prev) => (prev === category ? null : category));
    setSearchMode(null);
    setSearchQuery("");
    setHighlightName(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveSkill(null);

    const personName = findPersonName(query, departmentRows);
    if (personName) {
      setSearchMode("name");
      setHighlightName(personName);
      setActiveTab("dept-a");
    } else {
      setSearchMode("keyword");
      setHighlightName(null);
    }
  };

  const handleSearchClear = () => {
    setSearchMode(null);
    setSearchQuery("");
    setHighlightName(null);
  };

  const renderMainContent = () => {
    if (searchMode === "keyword" && keywordResult) {
      return (
        <div key={`search-${searchQuery}`} className="animate-fade-in">
          <SearchResults
            query={searchQuery}
            result={keywordResult}
            courses={courses}
          />
        </div>
      );
    }

    if (activeSkill) {
      return (
        <div key={`skill-${activeSkill}`} className="animate-fade-in">
          <SkillPage
            category={activeSkill}
            courses={courses}
            mappings={mappings}
            deptData={departmentRows}
          />
        </div>
      );
    }

    switch (activeTab) {
      case "boss":
        return (
          <div key="boss" className="animate-fade-in">
            <BossExpectations />
          </div>
        );
      case "dept-a":
        return (
          <div key="dept-a" className="animate-fade-in">
            <DeptTree
              mappings={mappings}
              courses={courses}
              highlightName={searchMode === "name" ? highlightName : null}
            />
          </div>
        );
      case "dept-b":
        return (
          <div key="dept-b" className="animate-fade-in">
            <BannerDemo deptLabel="B部門" />
            <DeptTree
              mappings={mappings}
              courses={courses}
              highlightName={searchMode === "name" ? highlightName : null}
            />
          </div>
        );
      case "dept-c":
        return (
          <div key="dept-c" className="animate-fade-in">
            <BannerDemo deptLabel="C部門" />
            <DeptTree
              mappings={mappings}
              courses={courses}
              highlightName={searchMode === "name" ? highlightName : null}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      <Sidebar
        activeCategory={activeSkill}
        onCategoryClick={handleCategoryClick}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <header
          className="flex h-14 items-center border-b border-[var(--border)] bg-[var(--bg-surface)] px-6"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex w-full items-center">
            <div className="flex shrink-0 items-center gap-3">
              <span
                className="h-7 w-1 rounded-[2px] bg-[var(--accent)]"
                aria-hidden
              />
              <h1 className="text-2xl font-bold text-[var(--accent)]">
                部門學習網
              </h1>
            </div>
            <SearchBar onSearch={handleSearch} onClear={handleSearchClear} />
            <VisitCounter />
          </div>
        </header>

        <main className="flex flex-1 flex-col overflow-hidden bg-[var(--bg-base)]">
          <TabBar
            activeTab={activeTab}
            highlightTab={activeSkill === null && searchMode === null}
            onTabChange={handleTabChange}
          />

          <div className="min-h-[calc(100vh-56px-48px)] flex-1 overflow-y-auto px-10 py-8 bg-[var(--bg-base)]">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
