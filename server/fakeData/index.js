export default {
  authors: [
    {
      id: 123,
      name: "Toan Nguyen",
    },
    {
      id: 999,
      name: "Cker2705",
    },
  ],
  folders: [
    {
      id: "1",
      name: "Home",
      createdAt: "2022-11-18T03:42:13Z",
      authorId: 123,
    },
    {
      id: "2",
      name: "New Folder",
      createdAt: "2022-10-18T03:42:13Z",
      authorId: 999,
    },
    {
      id: "3",
      name: "Work",
      createdAt: "2022-09-18T03:42:13Z",
      authorId: 123,
    },
  ],
  notes: [
    {
      id: "123",
      content: "<p>Go to school</p>",
      folderId: "1",
    },
    {
      id: "456",
      content: "<p>Work from home</p>",
      folderId: "2",
    },
    {
      id: "789",
      content: "<p>Data Science</p>",
      folderId: "3",
    },
  ],
};
