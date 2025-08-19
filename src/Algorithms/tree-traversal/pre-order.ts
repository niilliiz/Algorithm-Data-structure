import { IBinaryTreeNode } from "../../interfaces/IBinary-Tree-Node";

function traverse<T>(arr: T[], node: IBinaryTreeNode<T>) {
  if (node == null) return;

  arr.push(node.value);

  traverse(arr, node.left);
  traverse(arr, node.right);
}

export function PreOrderTraversal<T>(tree: IBinaryTreeNode<T> | null): T[] {
  const traverseArray: T[] = [];

  traverse(traverseArray, tree);

  return traverseArray;
}
