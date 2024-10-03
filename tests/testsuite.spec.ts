import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { createRandomRoom, createRandomClient, createRandomBill, createRandomReservation, loginInformation } from './testData';
import { BASE_URL } from '../testTarget';
import { get } from 'http';

let apiHelper: APIHelper;

test.beforeAll(() => {
  apiHelper = new APIHelper(BASE_URL);
})

test.beforeEach(async ({ request }) => {
  const preformLogin = loginInformation();
  const loginResponse = await apiHelper.login(request, preformLogin);
  expect(loginResponse.ok()).toBeTruthy();
})

test('GET', async ({ request }) => {
  const createGET = await apiHelper.getAllPosts(request, 'rooms');
  expect(createGET.ok()).toBeTruthy();
})


test.describe('Create Backend', () => {
  test('Create Room Backend', async ({ request }) => {
    const createRoom = createRandomRoom();
    const createPostResponse = await apiHelper.createPost(request, 'room', createRoom);
    expect(createPostResponse.ok()).toBeTruthy();

    expect(await createPostResponse.json()).toMatchObject({
      category: createRoom.category,
      floor: createRoom.floor,
      number: createRoom.number,
      available: createRoom.available,
      price: createRoom.price,
      features: createRoom.features
    });

    const getPosts = await apiHelper.getAllPosts(request, 'rooms');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: createRoom.category,
          floor: createRoom.floor,
          number: createRoom.number,
          available: createRoom.available,
          price: createRoom.price,
          features: createRoom.features
        })
      ])
    );
  });

  test('Create Client Backend', async ({ request }) => {
    const createClient = createRandomClient();
    const createPostResponse = await apiHelper.createPost(request, 'client', createClient);
    expect(createPostResponse.ok()).toBeTruthy();

    expect(await createPostResponse.json()).toMatchObject({
      name: createClient.name,
      email: createClient.email,
      telephone: createClient.telephone
    });

    const getPosts = await apiHelper.getAllPosts(request, 'clients');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: createClient.name,
          email: createClient.email,
          telephone: createClient.telephone
        })
      ])
    );
  });

  test('Create Bill Backend', async ({ request }) => {
    const createBill = createRandomBill();
    const createPostResponse = await apiHelper.createPost(request, 'bill', createBill);
    expect(createPostResponse.ok()).toBeTruthy();

    expect(await createPostResponse.json()).toMatchObject({
      value: createBill.value,
      paid: createBill.paid
    });

    const getPosts = await apiHelper.getAllPosts(request, 'bills');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: createBill.value,
          paid: createBill.paid
        })
      ])
    );
  });

  test('Create Reservation Backend', async ({ request }) => {
    const createReservation = createRandomReservation();
    const createPostResponse = await apiHelper.createPost(request, 'reservation', createReservation);
    expect(createPostResponse.ok()).toBeTruthy();

    expect(await createPostResponse.json()).toMatchObject({
      client: createReservation.client,
      room: createReservation.room,
      bill: createReservation.bill,
      start: createReservation.start,
      end: createReservation.end
    });

    const getPosts = await apiHelper.getAllPosts(request, 'reservations');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          client: createReservation.client,
          room: createReservation.room,
          bill: createReservation.bill,
          start: createReservation.start,
          end: createReservation.end
        })
      ])
    );
  });
});

test.describe('Delete Backend', () => { //they all edit the id so they dont work twice
  test('Delete Room Backend', async ({ request }) => {
    const deleteRoom = 1;
    const getRoomById = await apiHelper.getByID(request, 'rooms', deleteRoom);
    expect(getRoomById.ok()).toBeTruthy();
    const deletePostResponse = await apiHelper.deletePostById(request, 'room', deleteRoom);
    expect(deletePostResponse.ok()).toBeTruthy();
    expect(getRoomById.status()).toBe(404); //get 200 despite but the room should be gone

    //const getRoomById = await apiHelper.getByID(request, 'rooms', deleteRoom);
    //expect(getRoomById.status()).toBe(404);

    /*const getPosts = await apiHelper.getAllPosts(request, 'rooms');
    expect(getPosts.ok()).toBeTruthy();
    const allRooms = await getPosts.json();
    const lastButOneID = allRooms[allRooms.length - 2].id; 

    console.log(lastButOneID); */
  });

  /*test('Test case 03 - delete post - V2', async ({ request }) => {
  const getPosts = await apiHelper.getAllPosts(request);
  expect(getPosts.ok()).toBeTruthy();
  const allPosts = await getPosts.json();
  const lastButOneID = allPosts[allPosts.length - 2].id;

  // DELETE REQ
  const deleteReqeust = await apiHelper.deletePost(request, lastButOneID);
  expect(deleteReqeust.ok()).toBeTruthy();

  // GET by ID and verify status as 404
  const getPostById = await apiHelper.getByID(request, lastButOneID);
  expect(getPostById.status()).toBe(404);

});*/

  test('Delete Client Backend', async ({ request }) => {
    const deleteClient = 1;
    const deletePostResponse = await apiHelper.deletePostById(request, 'client', deleteClient);
    expect(deletePostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request, 'clients');
    expect(getPosts.ok()).toBeTruthy();
  });

  test('Delete Bill Backend', async ({ request }) => {//how it should work
    const deleteBill = 1;
    const deletePostResponse = await apiHelper.deletePostById(request, 'bill', deleteBill);
    expect(deletePostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getByID(request, 'bills', deleteBill);
    expect(getPosts.status()).toBe(404); 
  });

  test('Delete Reservation Backend', async ({ request }) => {
    const deleteReservation = 1;
    const deletePostResponse = await apiHelper.deletePostById(request, 'reservation', deleteReservation);
    expect(deletePostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request, 'reservations');
    expect(getPosts.ok()).toBeTruthy();
  });
});

test.describe('Edit Backend', () => {
  test('Edit Room Backend', async ({ request }) => {
    await apiHelper.getAllPosts(request, 'rooms');
    const createRoom = createRandomRoom(); //could assign id 1 with creation (but no need)
    const editPostResponse = await apiHelper.editPostById(request, 'room', createRoom, 1);
    expect(editPostResponse.ok()).toBeTruthy();

    expect(await editPostResponse.json()).toMatchObject({
      category: createRoom.category,
      floor: createRoom.floor,
      number: createRoom.number,
      available: createRoom.available,
      price: createRoom.price,
      features: createRoom.features
    });

    const getPosts = await apiHelper.getAllPosts(request, 'rooms');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: createRoom.category,
          floor: createRoom.floor,
          number: createRoom.number,
          available: createRoom.available,
          price: createRoom.price,
          features: createRoom.features
        })
      ])
    );
  });

  test('Edit Client Backend', async ({ request }) => {
    const createClient = createRandomClient();
    const editPostResponse = await apiHelper.editPostById(request, 'client', createClient, 1);
    expect(editPostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request, 'clients');
    expect(getPosts.ok()).toBeTruthy();
  });

  test('Edit Bill Backend', async ({ request }) => {
    const createBill = createRandomBill();
    const editPostResponse = await apiHelper.editPostById(request, 'bill', createBill, 1);
    expect(editPostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request, 'bills');
    expect(getPosts.ok()).toBeTruthy();
  });

  test('Edit Reservation Backend', async ({ request }) => {
    const createReservation = createRandomReservation();
    const editPostResponse = await apiHelper.editPostById(request, 'reservation', createReservation, 1);
    expect(editPostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request, 'reservations');
    expect(getPosts.ok()).toBeTruthy();
  });
});




//test case examples? 
//get all
//create
//edit, 1
//delete, 1


/*test('Test case 01 - Get all posts', async ({ request }) => {
  const getPostsResponse = await request.get('http://localhost:3000/posts');
  expect (getPostsResponse.ok()).toBeTruthy();
  expect (getPostsResponse.status()).toBe(200);
});

test('Test case 02 - Create Post', async ({ request }) => {
  const payload = {
    title: faker.lorem.sentence(),
    views: faker.number.int({min:10, max:100})
  }

  const createPostResponse = await request.post('http://localhost:3000/posts', {
    data: JSON.stringify(payload),
  });
  expect (createPostResponse.ok()).toBeTruthy(); 
  // verify that the response of the post method contains the new record.
  expect (await createPostResponse.json()).toMatchObject(
    expect.objectContaining({
      title:payload.title, 
      views:payload.views,
    })
  )
  //verify that when you get all the posts, the new record is in there.
  const getPostsResponse = await request.get('http://localhost:3000/posts');
  expect (getPostsResponse.ok()).toBeTruthy();
  
  const allPosts = await getPostsResponse.json();
  expect(allPosts).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        title: payload.title, 
        views: payload.views,
      })
    ])
  )
});
*/