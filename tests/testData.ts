import { faker } from "@faker-js/faker"; 

export const generateRandomPostPayload = () => {
    return {
        title: faker.lorem.sentence(),
        views: faker.number.int({min:10, max:100})
    }
}

export const loginInformation = () => {
    require('dotenv').config();
    return {
        "username": `${process.env.TEST_USERNAME}`,
        "password": `${process.env.TEST_PASSWORD}` 
        }   
}

export const createRandomRoom = () => {
    enum Category {
        Double,
        Single,
        Twin
    }

    enum Features {
        Balcony = 'Balcony',
        Ensuite = 'Ensuite', 
        SeaView = 'Sea View',
        Penthouse = 'Penthouse'
    }

    let featureList: Features[] = []
    if (faker.number.int({min:0, max:1}) == 1)
        featureList.push(Features.Balcony);
    if (faker.number.int({min:0, max:1}) == 1)
        featureList.push(Features.Ensuite);
    if (faker.number.int({min:0, max:1}) == 1)
        featureList.push(Features.SeaView);
    if (faker.number.int({min:0, max:1}) == 1)
        featureList.push(Features.Penthouse);

    return {
            category: Category[faker.number.int({min:0, max:2})],
            floor: faker.number.int({min:1, max:100}),
            number: faker.number.int({min:1, max:10000}),
            available: true,
            price: faker.number.int({min:1000, max:500000}),
            features: featureList
    }
}

export const createRandomClient = () => {
    return {
        name:  faker.person.fullName(),
        email: faker.internet.email(),
        telephone: faker.phone.number()
      }
}

let billPaid = false; 
if (faker.number.int({min:0, max:1}) == 1){
    billPaid = true;
}

export const createRandomBill = () => {
    return {
        value: faker.helpers.rangeToNumber({ min: 1, max: 999999999 }),
        paid: billPaid
      }
}

export const createRandomReservation = () => {
    return {
        client: 1, //length of lists so we can use faker to randomize (dont know how to get length)
        room: 2,
        bill: 1,
        start: faker.date.recent(),
        end: faker.date.soon()
      }
}