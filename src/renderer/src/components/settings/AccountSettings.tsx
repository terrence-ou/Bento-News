import { useState, useEffect } from "react";
import { EyeClosed, Eye } from "lucide-react";
import { Button } from "../ui/button";

const apis = [
  {
    title: "NewsAPI key",
    key: "newsapi",
    description:
      "The key is used to fetch news content from NewsAPI. Get a key at: ",
    href: "https://newsapi.org",
  },
  {
    title: "OpenAI key",
    key: "openai",
    description:
      "This key is used to get content generation results from OpenAI. Get a key at: ",
    href: "https://platform.openai.com/",
  },
];

const AccountSettings = () => {
  const [apiKeys, setApiKeys] = useState<{
    newsapi: string;
    openai: string;
  }>({ newsapi: "", openai: "" });
  const [writing, setWriting] = useState<boolean>(false);
  const [showSaveButton, setShowSaveButton] =
    useState<boolean>(false);

  const handleSetApiKeys = (source: "newsapi" | "openai") => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setShowSaveButton(true);
      setApiKeys((prev) => ({
        ...prev,
        [source]: event.target.value,
      }));
    };
  };

  const writeApiKeys = async () => {
    setWriting(true);
    await window.context.writeApiKeys(apiKeys);
    // add a delay to show the saving state
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setWriting(false);
    setShowSaveButton(false);
  };

  useEffect(() => {
    (async () => {
      const apiKeys = await window.context.loadApiKeys();
      setApiKeys(apiKeys);
    })();
  }, []);

  return (
    <div className="flex flex-col h-full gap-5">
      {apis.map((api) => (
        <APIInput
          key={`api-input-${api.title}`}
          title={api.title}
          description={api.description}
          value={apiKeys[api.key]}
          onChange={handleSetApiKeys(api.key as "openai" | "newsapi")}
          href={api.href}
        />
      ))}
      <div className="flex-1 flex items-end justify-end">
        {showSaveButton && (
          <Button
            className="h-6 w-32 text-xs rounded-[0.25rem]"
            onClick={writeApiKeys}
          >
            {writing ? "Saving..." : "Save API Keys"}
          </Button>
        )}
      </div>
    </div>
  );
};

// The APIInput sub component
const APIInput = ({
  title,
  description,
  value,
  onChange,
  href,
}: {
  title: string;
  description: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  href: string;
}) => {
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
          className="border w-full border-primary/30 rounded-[0.3rem] px-1 py-[4px] my-1 font-mono font-light tracking-tight text-xs focus-visible:outline-primary"
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
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
