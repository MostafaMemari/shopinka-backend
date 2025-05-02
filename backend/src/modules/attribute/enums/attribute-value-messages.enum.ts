export enum AttributeValueMessages {
    AlreadyExistsAttributeValue = 'AttributeValue with this slug already exists.',
    NotFoundAttributeValue = 'AttributeValue not found',
    RemovedAttributeValueSuccess = 'AttributeValue removed successfully',
    CreatedAttributeValueSuccess = 'AttributeValue created successfully',
    UpdatedAttributeValueSuccess = 'AttributeValue Updated successfully.',
    OnlyOneOptionAllowed = 'Only one option is allowed: either colorCode or buttonLabel.',
    ColorCodeRequired = 'Color code is required for attributes of type COLOR.',
    ButtonLabelRequired = 'Button label is required for attributes of type BUTTON.',
    ColorCodeNotAllowed = 'Color code is only allowed for attributes of type COLOR.',
    ButtonLabelNotAllowed = 'Button label is only allowed for attributes of type BUTTON.'
}