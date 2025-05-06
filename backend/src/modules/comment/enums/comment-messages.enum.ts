export enum CommentMessages {
    NotFoundComment = 'Comment not found',
    RemovedCommentSuccess = 'Comment removed successfully',
    CreatedCommentSuccess = 'Comment created successfully',
    UpdatedCommentSuccess = 'Comment Updated successfully.',
    CannotSetItselfAsParent = "A comment cannot be its own parent.",
    ParentIsChild = "Invalid parentId: it refers to one of the comment's replies.",
}