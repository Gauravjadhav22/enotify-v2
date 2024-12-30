import { faker } from '@faker-js/faker';

export const messages = Array.from({ length: 20 }, () => {
  return {
    messageId: faker.string.uuid(),
    instanceName: faker.company.name(), // Add instanceName
    receiver: faker.phone.number(),    // Add receiver
    status: faker.helpers.arrayElement([
      'IN_QUEUE',
      'SENT',
      'DELIVERED',
      'READ',
      'FAILED',
    ]),
    content: faker.lorem.sentence(),   // Add content
    submittedAt: faker.date.past(),   // Add submittedAt
    sentFailedAt: faker.date.recent(), // Add sent/failed timestamp
    deliveredReadAt: faker.date.future(), // Add delivered/read timestamp
  };
});
