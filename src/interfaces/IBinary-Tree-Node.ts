export interface IBinaryTreeNode<T> {
  readonly value: T;
  left: IBinaryTreeNode<T> | null;
  right: IBinaryTreeNode<T> | null;
}
