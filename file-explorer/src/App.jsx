import "./styles.css";

import initialState from "./data/folderData.js";
import { useState } from "react";
import Folder from "./components/Folder.jsx";
import { useTreeTraversal } from "./hooks/useTreeTraversal";

export default function App() {
  const [fileExplorer, setFileExplorer] = useState(initialState);
  const { insertNode, deleteNode } = useTreeTraversal();

  function handleInsertNode({ folderId, name, isFolder }) {
    const newTree = insertNode(fileExplorer, folderId, name, isFolder);
    setFileExplorer(newTree);
  }
  function handleDeleteNode(id) {
    const newTree = deleteNode(fileExplorer, id);
    setFileExplorer(newTree);
  }

  return (
    <Folder
      explorer={fileExplorer}
      handleInsertNode={handleInsertNode}
      handleDeleteNode={handleDeleteNode}
    />
  );
}
