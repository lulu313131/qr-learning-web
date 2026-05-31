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
import MobileDrawer from "./MobileDrawer";
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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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

  const mobilePageTitle = useMemo(() => {
    if (searchMode === "keyword" && keywordResult) {
      return "搜尋結果";
    }
    if (activeSkill) {
      return `${activeSkill} 技能課程`;
    }
    switch (activeTab) {
      case "boss":
        return "老闆期待";
      case "dept-a":
        return "A部門架構圖";
      case "dept-b":
        return "B部門架構圖";
      case "dept-c":
        return "C部門架構圖";
      default:
        return "";
    }
  }, [searchMode, keywordResult, activeSkill, activeTab]);

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
          <div key="boss" className="animate-fade-in h-full min-h-[280px] md:min-h-[360px]">
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
    <div className="app-container max-w-[100vw] gap-0 md:max-w-[1200px] md:gap-8">
      <header className="glass-card glass-card-header relative flex h-14 items-center gap-2 px-4 md:h-[70px] md:gap-6 md:px-8">
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="transition-interactive flex h-10 w-10 shrink-0 items-center justify-center text-xl text-[var(--color-text-main)] md:hidden"
          aria-label="開啟選單"
        >
          ☰
        </button>

        <h1 className="min-w-0 flex-1 truncate text-lg font-semibold text-[var(--color-text-main)] md:flex-none md:text-[22px]">
          部門學習網
        </h1>

        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(true)}
          className="transition-interactive flex h-10 w-10 shrink-0 items-center justify-center text-[var(--color-text-secondary)] md:hidden"
          aria-label="開啟搜尋"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="hidden min-w-0 flex-1 md:flex">
          <SearchBar onSearch={handleSearch} onClear={handleSearchClear} />
        </div>

        <VisitCounter />

        {isMobileSearchOpen && (
          <div className="absolute inset-0 z-30 flex items-center gap-2 rounded-2xl bg-[rgba(255,255,255,0.95)] px-3 backdrop-blur-md md:hidden">
            <SearchBar
              autoFocus
              onSearch={handleSearch}
              onClear={handleSearchClear}
              onClose={() => setIsMobileSearchOpen(false)}
            />
          </div>
        )}
      </header>

      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        activeSkill={activeSkill}
        onSkillChange={handleCategoryClick}
        highlightTab={activeSkill === null && searchMode === null}
      />

      <div className="main-row flex flex-col md:flex-row">
        <Sidebar
          activeCategory={activeSkill}
          onCategoryClick={handleCategoryClick}
        />

        <div className="right-panel w-full px-4 md:px-0">
          <TabBar
            activeTab={activeTab}
            highlightTab={activeSkill === null && searchMode === null}
            onTabChange={handleTabChange}
          />

          <div className="main-content-panel glass-card mb-4 rounded-2xl p-5 md:mb-0 md:rounded-3xl md:p-10">
            {mobilePageTitle && (
              <h2 className="mb-4 block border-b border-[rgba(0,118,203,0.15)] pb-3 text-lg font-bold text-[#0076CB] md:hidden">
                {mobilePageTitle}
              </h2>
            )}
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
