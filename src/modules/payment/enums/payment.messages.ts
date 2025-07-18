export enum PaymentMessages {
  NotFoundTransaction = 'Transaction not found.',
  FailedOrVerified = 'Failed or already verified payment.',
  VerifiedSuccess = 'Payment verified successfully.',
  SessionIdNotFound = 'Session id for this transaction not found.',
  RefundedSuccess = 'Payment refunded successfully.',
  OrderNotCancelled = 'Order cannot be processed; it is not cancelled.',
  VerifiedFailed = 'Payment verification failed.',
  UnknownStatus = 'Unknown status.',
  FailPayment = 'Fail payment.',
  OrderNotPayable = 'This order is not payable.',
}
