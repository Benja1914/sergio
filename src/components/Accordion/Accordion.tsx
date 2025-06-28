import { AccordionItem } from "../AccordionItem/AccordionItem";
import { AccordionProps } from "./interfaces";


export const Accordion = ({ items }: AccordionProps) => {
  return (
    <div className="py-3">
      {items.map(({ id, title, options, cols }) => (
        <AccordionItem
          key={id}
          id={id}
          title={title}
          options={options}
          cols={cols}
        />
      ))}
    </div>
  );
}
