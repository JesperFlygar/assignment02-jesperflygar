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


test('GET length', async ({ request }) => {
  const getPosts = await apiHelper.getLength(request, 'room');
  console.log(getPosts);
});


test.describe('Create Backend', () => {
  test('Create Room Backend', async ({ request }) => {
    const createRoom = createRandomRoom();
    const createPostResponse = await apiHelper.createPost(request, 'room', createRoom);
    expect(createPostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();

    console.log(createPostResponse);

    //const rooms = await getPosts.json();
    //const existingRoomsCount = rooms.length;

    //console.log(`Number of existing rooms: ${existingRoomsCount}`);

  });



  test('Create Client Backend', async ({ request }) => {
    const createClient = createRandomClient();
    const createPostResponse = await apiHelper.createPost(request, 'client', createClient);
    expect(createPostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();

  });

  test('Create Bill Backend', async ({ request }) => {
    const createBill = createRandomBill();
    const createPostResponse = await apiHelper.createPost(request, 'client', createBill);
    expect(createPostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();
  });

  test('Create Reservation Backend', async ({ request }) => {
    const createReservation = createRandomReservation();
    const createPostResponse = await apiHelper.createPost(request, 'client', createReservation);
    expect(createPostResponse.ok()).toBeTruthy();

    const getPosts = await apiHelper.getAllPosts(request);
    expect(getPosts.ok()).toBeTruthy();

  });
});

test.describe('Delete Backend', () => {
  test('Delete Room Backend', async ({ request }) => {
  const deleteRoom = 1; 
  const deletePostResponse = await apiHelper.deletePostById(request, 'room', deleteRoom);
  expect(deletePostResponse.ok()).toBeTruthy();

  const getPosts = await apiHelper.getAllPosts(request);
  expect(getPosts.ok()).toBeTruthy();

  console.log(deletePostResponse);

  });

  test('Delete Client Backend', async ({ request }) => { 

  }); 


});

test.describe('Edit Backend', () => {


})






/*test('Test case 02 - create post - V2', async ({ request }) => {
  const payload = generateRandomPostPayload();
  const createPostResponse = await apiHelper.createPost(request, payload);
  expect(createPostResponse.ok()).toBeTruthy();
  
  // verify from the POST req
  expect(await createPostResponse.json()).toMatchObject({
    title: payload.title,
    views: payload.views
  }); 

  // GET ALL
  // verify from the GET req
  const getPosts = await apiHelper.getAllPosts(request);
  expect(getPosts.ok()).toBeTruthy(); 
  expect(await getPosts.json()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        title: payload.title, 
        views: payload.views,
      })
    ])
  )
});*/


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
 
test('Test case 03 - Delete Post by ID', async ({ request }) => {
  //get all posts in order to access its elements.
  const getPostsResponse = await request.get('http://localhost:3000/posts');
  expect (getPostsResponse.ok()).toBeTruthy();
  const allPosts = await getPostsResponse.json();
  expect(allPosts.length).toBeGreaterThan(3); 
  // retrive the id of yhe last but one element in the array
  const lastButOnePostID = allPosts[allPosts.length - 2].id;
  
  //DELETE request
  const deletePostResponse = await request.delete(`http://localhost:3000/posts/${lastButOnePostID}`); 
  expect(deletePostResponse.ok()).toBeTruthy(); 
 
  // Verify that the elemnt is gone
  const deletedElementResponse = await request.get(`http://localhost:3000/posts/${lastButOnePostID}`);
  expect(deletedElementResponse.status()).toBe(404); 
});*/