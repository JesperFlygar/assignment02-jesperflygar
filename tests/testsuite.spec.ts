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

test.afterEach(async ({ request }) => { 
  const logoutResponse = await apiHelper.logout(request);
  expect(logoutResponse.ok()).toBeTruthy(); 
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

    expect(await createPostResponse.json()).toMatchObject(createClient);
    const getPosts = await apiHelper.getAllPosts(request, 'clients');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(createClient)
      ])
    );
  });

  test('Create Bill Backend', async ({ request }) => {
    const createBill = createRandomBill();
    const createPostResponse = await apiHelper.createPost(request, 'bill', createBill);
    expect(createPostResponse.ok()).toBeTruthy();

    expect(await createPostResponse.json()).toMatchObject(createBill);
    const getPosts = await apiHelper.getAllPosts(request, 'bills');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(createBill)
      ])
    );
  });

  test('Create Reservation Backend', async ({ request }) => {
    const createReservation = createRandomReservation();
    const createPostResponse = await apiHelper.createPost(request, 'reservation', createReservation);
    expect(createPostResponse.ok()).toBeTruthy();

    expect(await createPostResponse.json()).toMatchObject(createReservation);
    const getPosts = await apiHelper.getAllPosts(request, 'reservations');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(createReservation)
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
    expect(listRooms2.length).toEqual(listRooms1.length - 1);
  });

  test('Delete Client Backend', async ({ request }) => {
    const deleteClient = 1;
    const listClients1 = await (await apiHelper.getAllPosts(request, 'clients')).json();
    const deletePostResponse = await apiHelper.deletePostById(request, 'client', deleteClient);
    expect(deletePostResponse.ok()).toBeTruthy();
    const listClients2 = await (await apiHelper.getAllPosts(request, 'clients')).json();
    expect(listClients2.length).toEqual(listClients1.length - 1);
  });

  test('Delete Bill Backend', async ({ request }) => {
    const deleteBill = 1;
    const listBills1 = await (await apiHelper.getAllPosts(request, 'bills')).json();
    const deletePostResponse = await apiHelper.deletePostById(request, 'bill', deleteBill);
    expect(deletePostResponse.ok()).toBeTruthy();
    const listBills2 = await (await apiHelper.getAllPosts(request, 'bills')).json();
    expect(listBills2.length).toEqual(listBills1.length - 1);
  });

  test('Delete Reservation Backend', async ({ request }) => {
    const deleteReservation = 1;
    const listReservations1 = await (await apiHelper.getAllPosts(request, 'reservations')).json();
    const deletePostResponse = await apiHelper.deletePostById(request, 'reservation', deleteReservation);
    expect(deletePostResponse.ok()).toBeTruthy();
    const listReservations2 = await (await apiHelper.getAllPosts(request, 'reservations')).json();
    expect(listReservations2.length).toEqual(listReservations1.length - 1);
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

    expect(await editPostResponse.json()).toMatchObject(createRoom);
    const getPosts = await apiHelper.getAllPosts(request, 'rooms');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(createRoom)
      ])
    );
  });

  test('Edit Client Backend', async ({ request }) => {
    const editClient = 1
    await apiHelper.getAllPosts(request, 'rooms');
    const createClient = createRandomClient();
    createClient["id"] = editClient;
    const editPostResponse = await apiHelper.editPostById(request, 'client', createClient, editClient);
    expect(editPostResponse.ok()).toBeTruthy();

    expect(await editPostResponse.json()).toMatchObject(createClient);
    const getPosts = await apiHelper.getAllPosts(request, 'clients');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(createClient)
      ])
    );
  });

  test('Edit Bill Backend', async ({ request }) => {
    const editBill = 1
    await apiHelper.getAllPosts(request, 'bills');
    const createBill = createRandomBill();
    createBill["id"] = editBill;
    const editPostResponse = await apiHelper.editPostById(request, 'bill', createBill, editBill);
    expect(editPostResponse.ok()).toBeTruthy();

    expect(await editPostResponse.json()).toMatchObject(createBill);
    const getPosts = await apiHelper.getAllPosts(request, 'bills');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(createBill)
      ])
    );
  });

  test('Edit Reservation Backend', async ({ request }) => {
    const editReservation = 1
    await apiHelper.getAllPosts(request, 'rooms');
    const createReservation = createRandomClient();
    createReservation["id"] = editReservation;
    const editPostResponse = await apiHelper.editPostById(request, 'reservation', createReservation, editReservation);
    expect(editPostResponse.ok()).toBeTruthy();

    expect(await editPostResponse.json()).toMatchObject(createReservation);
    const getPosts = await apiHelper.getAllPosts(request, 'reservations');
    expect(getPosts.ok()).toBeTruthy();
    expect(await getPosts.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(createReservation)
      ])
    );
  });
}); 