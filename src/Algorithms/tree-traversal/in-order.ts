import { IBinaryTreeNode } from "../../interfaces/IBinary-Tree-Node";

function traverse<T>(arr: T[], node: IBinaryTreeNode<T>) {
  if (node == null) return;

  traverse(arr, node.left);
  arr.push(node.value);
  traverse(arr, node.right);
}

export function InOrderTraversal<T>(tree: IBinaryTreeNode<T> | null): T[] {
  const traverseArray: T[] = [];

  traverse(traverseArray, tree);

  return traverseArray;
}
