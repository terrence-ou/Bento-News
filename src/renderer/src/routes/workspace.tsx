import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const folderName = params.folderName;
  console.log(folderName);
  return folderName;
};

const Workspace = () => {
  const data = useLoaderData() as string;
  return <h1>{data}</h1>;
};

export default Workspace;
