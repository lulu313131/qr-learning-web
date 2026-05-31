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
          <div key="boss" className="animate-fade-in h-full min-h-[360px]">
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
    <div className="app-container">
      <header className="glass-card glass-card-header flex h-[70px] items-center gap-6 px-8">
        <h1 className="shrink-0 text-[22px] font-semibold text-[var(--color-text-main)]">
          部門學習網
        </h1>
        <SearchBar onSearch={handleSearch} onClear={handleSearchClear} />
        <VisitCounter />
      </header>

      <div className="main-row">
        <Sidebar
          activeCategory={activeSkill}
          onCategoryClick={handleCategoryClick}
        />

        <div className="right-panel">
          <TabBar
            activeTab={activeTab}
            highlightTab={activeSkill === null && searchMode === null}
            onTabChange={handleTabChange}
          />

          <div className="main-content-panel glass-card">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
