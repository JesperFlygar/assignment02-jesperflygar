import { faker } from "@faker-js/faker"; 

export const generateRandomPostPayload = () => {
    return {
        title: faker.lorem.sentence(),
        views: faker.number.int({min:10, max:100})
    }
}

export const loginInformation = () => {
    return {
        "username": "tester01",
        "password": "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
        }
        
        //"username": `${process.env.TEST_USERNAME}`,
        //"password": `${process.env.TEST_PASSWORD}` 
      
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