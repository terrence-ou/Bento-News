import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/utils";

const AddFolder = () => {
  const [adding, setAdding] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleToggleAdding = () => setAdding((prev) => !prev);
  const handleSetFilename = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
    if (specialChars.test(e.target.value)) {
      setError("filename contains special characters.");
    } else {
      setError("");
    }
    setFilename(e.target.value.replace(/\s+/g, " "));
  };

  return adding ? (
    <div className="w-full h-full px-6 pb-8 flex flex-col justify-end">
      {error.length > 0 && (
        <p className="text-xs mb-2 px-1 text-destructive/90">
          {error}
        </p>
      )}
      <input
        className={cn(
          "bg-transparent border-b w-full text-center font-serif focus:outline-none",
          error.length > 0
            ? "border-destructive/80"
            : "border-primary"
        )}
        placeholder="filename"
        value={filename}
        onChange={handleSetFilename}
        autoFocus
      />
      <div className="flex gap-4 justify-center mt-2 text-primary/60">
        <button
          className="disabled:text-primary/30 disabled:font-normal hover:font-medium hover:text-primary/80"
          disabled={error.length > 0}
        >
          add
        </button>
        <button
          className="hover:font-medium hover:text-primary/80"
          onClick={handleToggleAdding}
        >
          cancel
        </button>
      </div>
    </div>
  ) : (
    <div
      className="w-full h-full content-center"
      onClick={handleToggleAdding}
    >
      <Plus
        className="mx-auto stroke-[0.7px] stroke-primary/50 fill-background"
        height={80}
        width={80}
      />
    </div>
  );
};

export default AddFolder;
