export enum CategoryMessages {
  AlreadyExistsCategory = 'Category with this slug already exists.',
  NotFoundCategory = 'Category not found',
  RemovedCategorySuccess = 'Category removed successfully',
  CreatedCategorySuccess = 'Category created successfully',
  UpdatedCategorySuccess = 'Category Updated successfully.',
  CannotSetItselfAsParent = 'A category cannot be its own parent.',
  ParentIsChild = "Invalid parentId: it refers to one of the category's children.",
}
