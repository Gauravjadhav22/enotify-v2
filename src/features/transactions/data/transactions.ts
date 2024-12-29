import { faker } from '@faker-js/faker';

export const TransactionsData = Array.from({ length: 20 }, () => {
  return {
    id: faker.string.uuid(), // Transaction ID
    fromUserId: faker.string.uuid(), // ID of the user sending the transaction
    toUserId: faker.string.uuid(), // ID of the user receiving the transaction
    amount: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }), // Transaction amount
    type: faker.helpers.arrayElement(['CREDIT', 'DEBIT']), // Transaction type
    unlimitedMonths: faker.number.int({ min: 0, max: 12 }), // Number of unlimited months
    unlimitedVoucherId: faker.helpers.arrayElement([null, faker.string.uuid()]), // Optional voucher ID
    timestamp: faker.date.past().toISOString(), // Transaction timestamp
    toUser: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }, // Recipient user information
    fromUser: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }, // Sender user information
    instanceId: faker.helpers.arrayElement([null, faker.string.uuid()]), // Optional instance ID
    instance: faker.helpers.maybe(() => ({
      id: faker.string.uuid(),
      name: faker.company.name(),
    })), // Optional instance information
  };
});
