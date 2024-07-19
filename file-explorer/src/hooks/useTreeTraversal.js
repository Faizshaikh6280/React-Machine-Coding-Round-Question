export function useTreeTraversal() {
  function insertNode(tree, folderId, name, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: Date.now(),
        name,
        isFolder,
        items: [],
      });

      return tree;
    }

    let latestChildren = [];
    // if current level not found , find in child folders.
    latestChildren = tree.items.map((item) => {
      return insertNode(item, folderId, name, isFolder);
    });

    return { ...tree, items: latestChildren };
  }

  function deleteNode(tree, id) {
    if (tree.id === id) {
      return null;
    }
    let latestChildren = [];
    // if current level not found , find in child folders.
    latestChildren = tree?.items.map((item) => {
      return deleteNode(item, id);
    });

    return { ...tree, items: latestChildren };
  }

  return { insertNode, deleteNode };
}
