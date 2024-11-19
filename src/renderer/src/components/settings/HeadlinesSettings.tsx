import { CountryNameToCodes, Categories } from "@shared/consts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";

const HeadlinesSettings = () => {
  // country, category, pagesize
  return (
    <div className="flex flex-col h-full gap-6">
      <HeadlineOption
        title="Country"
        placeholder="United States"
        description="Select the country for which you want to see headlines."
        options={CountryNameToCodes}
      />
      <HeadlineOption
        title="Category"
        placeholder="all"
        description="Select the category of news you are interested in."
        options={Array.from(Categories)}
      />
      <HeadlineOption
        title="Headline Size"
        placeholder={30}
        description="Specify the number of headlines to fetch."
        options={[30, 40, 50, 60, 70]}
      />
      <HeadlineOption
        title="Previous Headlines"
        placeholder={7}
        description="Display previous headlines with selected days."
        options={[7, 14, 28]}
      />
    </div>
  );
};

const HeadlineOption = ({
  title,
  description,
  placeholder,
  options,
}: {
  title: string;
  placeholder?: string | number;
  description: string;
  options: { [key: string]: string } | string[] | number[];
}) => {
  const renderOptions = useMemo(() => {
    if (!Array.isArray(options)) {
      return Object.entries(options).map(([name, code]) => (
        <SelectItem
          className="text-xs font-mono"
          key={`headline-${title}-${name}`}
          value={code}
        >
          {name}
        </SelectItem>
      ));
    }
    return options.map((value) => (
      <SelectItem
        className="text-xs font-mono"
        key={`headline-${title}-${value}`}
        value={value}
      >
        {value}
      </SelectItem>
    ));
  }, [options]);

  return (
    <div className="grid grid-cols-2 gap-5 items-end">
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xs text-primary/60 tracking-tight">
          {description}
        </p>
      </div>
      <div>
        <Select onValueChange={console.log}>
          <SelectTrigger className="h-6 rounded-[0.3rem] px-2 py-0 font-mono text-xs focus:ring-offset-0">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {renderOptions}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HeadlinesSettings;
