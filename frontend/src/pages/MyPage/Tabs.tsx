interface TabsProps {
  tabs: { value: string; label: string; count: number }[];
  selectedTab: string;
  onSelectTab: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onSelectTab, selectedTab }) => {
  return (
    <div role="tablist" className="tabs tabs-bordered mb-10 ">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          value={tab.value}
          className={`tab ${selectedTab === tab.value && "tab-active"}`}
          onClick={() => onSelectTab(tab.value)}
        >
          {tab.label} {tab.count && `(${tab.count})`}
        </button>
      ))}
    </div>
  );
};
export default Tabs;
