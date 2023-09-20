import React, { useEffect, useMemo, useState } from "react";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import { debounce } from "@mui/material";

export default function Note() {
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();
  const [editortState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rawHTML, location.pathname])

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if ( rawHTML === note.content) return;

      submit({ ...note, content:rawHTML},{
        method: "post",
        action: pathname,
      })

    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (event) => {
    setEditorState(event);
    setRawHTML(draftToHtml(convertToRaw(event.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editortState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something..."
    />
  );
}
