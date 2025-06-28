type Option = {
  id: string | number;
  label: string;
  onChange: (id: string | number, checked: boolean) => void;
};

type AccordionItemProps = {
  id: string | number;
  title: string;
  options: Option[];
  cols?: 1 | 2 | 3 | 4;
};

export type { AccordionItemProps, Option };