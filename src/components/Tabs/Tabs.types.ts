export type TTabsProps = {
  items: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  barColor: string;
  indicatorColor: string;
  activeTextColor: string;
  inactiveTextColor: string;
};
