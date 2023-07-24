import fakeData from "../fakeData/index.js";
import FolderModel from "../models/FolderModel.js";
import NoteModel from "../models/NoteModel.js";
import AuthorModel from "../models/AuthorModel.js";

export const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      });
      console.log({ folders, context });
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne({ _id: folderId });
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },
  Folder: {
    author: (parent, args) => {
      const authoreId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authoreId);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({ ...args, authorId: "1" });
      console.log(newFolder);
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await FolderModel.findOne({ _id: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel({ ...args });
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};
