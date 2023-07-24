import { graphQLRequest } from "./request";
export const foldersLoader = async () => {
  const query = `query Folders {
      folders {
        id
        name
        createdAt
      }
    }`;

  const data = await graphQLRequest({ query });
  return data;
};
