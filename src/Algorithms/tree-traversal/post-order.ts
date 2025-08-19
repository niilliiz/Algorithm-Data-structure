import { IBinaryTreeNode } from "../../interfaces/IBinary-Tree-Node";

function traverse<T>(arr: T[], node: IBinaryTreeNode<T>) {
  if (node == null) return;

  traverse(arr, node.left);
  traverse(arr, node.right);
  arr.push(node.value);
}

export function PostOrderTraversal<T>(tree: IBinaryTreeNode<T> | null): T[] {
  const traverseArray: T[] = [];

  traverse(traverseArray, tree);

  return traverseArray;
}
