module.exports = {
  localhost: 'http://localhost:3333/',
  defaultResponseTime: 15000,
  acceptHeader: {
    key: 'Accept',
    value: 'application/json',
  },
  contentTypeHeader: {
    key: 'content-type',
    value: 'application/json; charset=utf-8',
  },
  bulkPaymentEndpoint: 'bulk-payment',
  prepaymentValidationEndpoint: 'prepayment-validation',
  prepaymentValidationResponseEndpoint: 'prepayment-validation-response',
  registerBeneficiaryEndpoint: 'register-beneficiary',
  updateBeneficiaryDetailsEndpoint: 'update-beneficiary-details',
  g2pResponseSchema: {
    type: 'object',
    properties: {
      ResponseCode: {
        type: 'string',
        minLength: 2,
        maxLength: 2,
        pattern: '^00$|^01$',
      },
      ResponseDescription: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
      },
      RequestID: {
        type: 'string',
        minLength: 12,
        maxLength: 12,
      },
    },
    required: ['ResponseCode', 'ResponseDescription', 'RequestID'],
  },
  prepaymentValidationResponseSchema: {
    type: 'object',
    properties: {
      RequestID: { type: 'string' },
      Source_BatchID: { type: 'string' },
      NumberFailedCases: { type: 'number' },
      FailedAccounts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            InstructionID: { type: 'string' },
            FailureReason: { type: 'string' },
          },
        },
      },
    },
    required: ['RequestID', 'Source_BatchID'],
  },
  voucherCancelationEndpoint:
    'vouchers/voucherstatuscheck/{voucherserialnumber}',
  voucherCancelationResponseSchema: {
    type: 'object',
    properties: { message: { type: 'string' } },
    required: ['message'],
  },
  voucherPreactivationEndpoint: 'vouchers/voucher_preactivation',
  voucherPreactivationResponseSchema: {
    required: ['expiry_date_time', 'voucher_number', 'voucher_serial_number'],
    properties: {
      voucher_number: {
        maxLength: 25,
        minLength: 16,
        type: 'string',
      },
      voucher_serial_number: {
        maxLength: 25,
        minLength: 16,
        type: 'string',
      },
      expiry_date_time: { type: 'string', format: 'date-time' },
    },
  },
  voucherPreactivationResponseErrorSchema: {
    type: 'object',
    properties: { message: { type: 'string' } },
    required: ['message'],
  },
  voucherActivationEndpoint: 'vouchers/voucher_activation',
  voucherActivationResponseSchema: {
    properties: { result_status: { type: 'string' } },
    required: ['result_status'],
  },
  voucherResponseErrorSchema: {
    type: 'object',
    properties: { message: { type: 'string' } },
    required: ['message'],
  },
};
