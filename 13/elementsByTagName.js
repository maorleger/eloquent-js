function elementsByTagName(root, name) {
  return root.children.reduce(function(acc, child) {
    if (child.tagName.toLowerCase() == name.toLowerCase()) {
      return acc.unshift(child);
    } else {
      return acc;
    }
  });
}
