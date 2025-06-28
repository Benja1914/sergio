export type AccordionItemProps = {
  id: string | number;
  title: string;
  options: any; // Replace 'any' with the correct type if known
  cols: any;    // Replace 'any' with the correct type if known
};

export type AccordionProps = {
  items: AccordionItemProps[];
};
