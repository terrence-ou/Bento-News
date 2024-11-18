import { useState, useRef } from "react";
import { EyeClosed, Eye } from "lucide-react";

const apis = [
  {
    title: "NewsAPI key",
    description:
      "The key is used to fetch news content from NewsAPI. Get a key at: ",
    href: "https://newsapi.org",
  },
  {
    title: "OpenAI key",
    description:
      "This key is used to get content generation results from OpenAI. Get a key at: ",
    href: "https://platform.openai.com/",
  },
];

const AccountSettings = () => {
  return (
    <div className="flex flex-col gap-5">
      {apis.map((api) => (
        <APIInput
          key={`api-input-${api.title}`}
          title={api.title}
          description={api.description}
          href={api.href}
        />
      ))}
    </div>
  );
};

// The APIInput sub component
const APIInput = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const handleToggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  return (
    <div>
      <p className="text-sm">{title}</p>
      <p className="text-xs my-2 text-primary/60 tracking-tight">
        {description + " "}
        <a
          href={href}
          target="_blank"
          className="underline hover:cursor-pointer"
        >
          {href}
        </a>
      </p>
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          className="border w-full border-primary/30 rounded-[0.3rem] px-1 py-[3px] font-mono font-light tracking-tight text-xs focus-visible:outline-primary/60"
          type={visible ? "text" : "password"}
          onBlur={() => {}}
          placeholder="Paste your key here"
        />
        <button className="h-fit" onClick={handleToggleVisibility}>
          {!visible ? (
            <EyeClosed
              className="h-5 stroke-primary/50"
              strokeWidth={1.5}
            />
          ) : (
            <Eye
              className="h-5 stroke-primary/50"
              strokeWidth={1.5}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
