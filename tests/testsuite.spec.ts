import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { createRandomRoom, createRandomClient, createRandomBill, createRandomReservation, loginInformation } from './testData';
import { BASE_URL } from '../testTarget';

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

    expect(await createPostResponse.json()).toMatchObject(createRoom); 
    const getPosts = await apiHelper.getAllPosts(request, 'rooms');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(createRoom)
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

test.describe('Delete Backend', () => { 
  test('Delete Room Backend', async ({ request }) => {
    const deleteRoom = 1;
    const listRooms1 = await (await apiHelper.getAllPosts(request, 'rooms')).json();
    const deletePostResponse = await apiHelper.deletePostById(request, 'room', deleteRoom);
    expect(deletePostResponse.ok()).toBeTruthy();
    const listRooms2 = await (await apiHelper.getAllPosts(request, 'rooms')).json();
    expect(listRooms2.length).toEqual(listRooms1.length-1); 
  });

  test('Delete Client Backend', async ({ request }) => {
    const deleteClient = 1;
    const deletePostResponse = await apiHelper.deletePostById(request, 'client', deleteClient);
    expect(deletePostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request, 'clients');
    expect(getPosts.ok()).toBeTruthy();
  });

  test('Delete Bill Backend', async ({ request }) => {
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
    const editRoom = 1
    await apiHelper.getAllPosts(request, 'rooms');
    const createRoom = createRandomRoom(); 
    createRoom["id"] = editRoom;
    const editPostResponse = await apiHelper.editPostById(request, 'room', createRoom, editRoom);
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