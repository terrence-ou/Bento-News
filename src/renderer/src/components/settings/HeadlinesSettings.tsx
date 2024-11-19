import { useEffect, useState } from "react";
import {
  CountryNameToCodes,
  Categories,
  CountryCodeToNames,
} from "@shared/consts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useMemo } from "react";
import { Category, Country } from "@shared/types";
import { useNavigate } from "react-router-dom";

const HeadlinesSettings = () => {
  const [settings, setSettings] = useState<{
    country: Country;
    category: Category;
    headline_size: number;
    previous_days: number;
  }>({
    country: "us",
    category: "all",
    headline_size: 30,
    previous_days: 7,
  });
  const [edited, setEdited] = useState<boolean>(false);
  const [writing, setWriting] = useState<boolean>(false);
  const navigate = useNavigate();
  const onChange = (
    key: "country" | "category" | "headline_size" | "previous_days"
  ) => {
    return (value: string | number) => {
      setEdited(true);
      setSettings((prev) => ({ ...prev, [key]: value }));
    };
  };

  const writeHeadlineSettings = async () => {
    setWriting(true);
    await window.context.writeHeadlineSettings(settings);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEdited(false);
    setWriting(false);
  };

  useEffect(() => {
    (async () => {
      const savedSettings =
        await window.context.loadHeadlineSettings();
      setSettings(savedSettings);
    })();
  }, []);

  // country, category, pagesize
  return (
    <div className="flex flex-col h-full gap-6">
      <HeadlineOption
        title="Country"
        placeholder={CountryCodeToNames[settings.country]}
        onChange={onChange("country")}
        description="Select the country for which you want to see headlines."
        options={CountryNameToCodes}
      />
      <HeadlineOption
        title="Category"
        placeholder={settings.category}
        onChange={onChange("category")}
        description="Select the category of news you are interested in."
        options={Array.from(Categories)}
      />
      <HeadlineOption
        title="Headline Size"
        placeholder={settings.headline_size}
        onChange={onChange("headline_size")}
        description="Specify the number of headlines to fetch."
        options={[30, 40, 50, 60, 70]}
      />
      <HeadlineOption
        title="Previous Headlines"
        placeholder={settings.previous_days}
        onChange={onChange("previous_days")}
        description="Display previous headlines with selected days."
        options={[7, 14, 28]}
      />
      <div className="flex-1 flex items-end justify-end">
        {edited && (
          <Button
            className="h-6 w-32 text-xs rounded-[0.25rem]"
            onClick={() => {
              writeHeadlineSettings();
              navigate("/");
            }}
          >
            {writing ? "Saving..." : "Save Settings"}
          </Button>
        )}
      </div>
    </div>
  );
};

const HeadlineOption = ({
  title,
  description,
  onChange,
  placeholder,
  options,
}: {
  title: string;
  placeholder?: string | number;
  onChange: (value: string | number) => void;
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
        <Select onValueChange={onChange}>
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
