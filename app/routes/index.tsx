import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// import fs promises from a .server file to avoid server code making it into browser bundle
// https://remix.run/docs/en/v1/pages/gotchas#server-code-in-client-bundles
import { fs } from "~/utils/fs-promises.server";

export const loader = async (args: LoaderArgs) => {
  // Find the absolute path of the json directory
  // Note: As of July 16, 2022, Vercel doesn't include the json directory when using process.cwd() or path.join(). The workaround is to use __dirname and template literals
  const jsonDirectory = `${__dirname}/../json`;
  // Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + "/data.json", "utf8");
  // Parse the json data file contents into a json object
  const data = JSON.parse(fileContents);

  return json({
    data,
  });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>My Framework from file</h1>
      <ul>
        <li>Name: {data.record.name}</li>
        <li>Language: {data.record.language}</li>
      </ul>
    </div>
  );
}
