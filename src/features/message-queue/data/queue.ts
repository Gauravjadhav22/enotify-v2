import { faker } from '@faker-js/faker';

export const userQueueItems = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    connectedNumeber: faker.phone.number({ style: 'international' }),
    isLoggedIn: faker.datatype.boolean(),
    profileName: faker.internet.userName({ firstName, lastName }),
    profilePicture: faker.image.avatar(),
    date: faker.date.recent().toISOString(),
    queueCount: faker.number.int({ min: 1, max: 100 }),
    dateNormal: faker.date.recent().toLocaleString(),
    user: {
      id: faker.string.uuid(),
      name: `${firstName} ${lastName}`,
      phoneNumber: faker.phone.number({ style: 'international' }),
      reseller: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        phoneNumber: faker.phone.number({ style: 'international' }),
      },
    },
  };
});
