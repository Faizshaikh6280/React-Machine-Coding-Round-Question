import { useState } from "react";

export default function Folder({
  explorer,
  handleInsertNode,
  handleDeleteNode,
}) {
  const [showItems, setShowItems] = useState(false);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);

  function onAddFolder(e, isFolder) {
    // add if press Enter
    if (e.keyCode === 13 && e.target.value) {
      console.log("working");
      handleInsertNode({
        folderId: explorer.id,
        name: e.target.value,
        isFolder,
      });
      if (!showItems) setShowItems(true);

      if (isFolder) {
        setShowFolderInput(false);
      } else {
        setShowFileInput(false);
      }
    }
  }
  if (!explorer) return null;

  return (
    <div className="root" style={{ marginTop: "5px" }}>
      {explorer?.isFolder ? (
        <>
          <div
            style={{
              backgroundColor: "lightgray",
              padding: "4px",
              cursor: "pointer",
              display: "flex",
              gap: "45px",
              marginBottom: "8px",
              width: "fit-content",
            }}
          >
            <p onClick={() => setShowItems((x) => !x)}> 📁 {explorer.name}</p>

            <div className="addButtons" style={{ display: "flex", gap: "5px" }}>
              <button
                className="folder"
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={() => !showFolderInput && setShowFolderInput(true)}
              >
                Folder +
              </button>
              <button
                className="file"
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={() => !showFileInput && setShowFileInput(true)}
              >
                File +
              </button>
            </div>
          </div>

          {showFolderInput && (
            <div style={{ marginLeft: "20px" }}>
              <span>📁</span>
              <input
                type="text"
                className="folder-input"
                placeholder="Enter folder name"
                style={{ padding: "4px" }}
                autoFocus
                onBlur={() => setShowFolderInput(false)}
                onKeyDown={(e) => onAddFolder(e, true)}
              />
            </div>
          )}
          {showFileInput && (
            <div style={{ marginLeft: "20px" }}>
              <span> 📄 </span>
              <input
                type="text"
                className="folder-input"
                placeholder="Enter file name"
                style={{ padding: "4px" }}
                autoFocus
                onBlur={() => setShowFileInput(false)}
                onKeyDown={(e) => onAddFolder(e, false)}
              />
            </div>
          )}
        </>
      ) : (
        <p style={{ padding: "4px" }}> 📄{explorer?.name}</p>
      )}

      {showItems ? (
        <div className="childTree" style={{ marginLeft: "20px" }}>
          {explorer.items.map((item) => {
            return (
              <Folder
                explorer={item}
                key={item.id}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
