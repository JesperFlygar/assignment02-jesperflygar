import { APIRequestContext } from "playwright-core";

export class APIHelper {
    private baseURL: string;
    private token: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    // localhost:3000/posts/{ID}
    //POST, GET, PUT, DELETE
    async getAllPosts(request: APIRequestContext) {
        const response = await request.get(`${this.baseURL}/posts`);
        return response;
    }

    async getByID(request: APIRequestContext, postId: number) {
        const response = await request.get(`${this.baseURL}/posts/${postId}`);
        return response;
    }

    async getLength(request: APIRequestContext, target: string) {
        const response = await request.get(`${this.baseURL}/api/${target}`);
        let len = response.body.length
        return len;
    }


    async login(request: APIRequestContext, payload: object) {
        const response = await request.post(`${this.baseURL}/api/login`, {
            data: payload,
        })
        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }

        let responseToken = await response.json();
        this.token = responseToken.token;
        console.log(this.token);
        return response;
    }

    async createPost(request: APIRequestContext, target: string, payload: object) {
        const response = await request.post(`${this.baseURL}/api/${target}/new`, {
            data: JSON.stringify(payload),
            headers: {
                'X-User-Auth': `{"username":"tester01", "token": "${this.token}"}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    }

    async deletePostById(request: APIRequestContext, target: string, postId: number) {
        const response = await request.delete(`${this.baseURL}/api/${target}/${postId}`, {
            headers: {
                'X-User-Auth': `{"username":"tester01", "token": "${this.token}"}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async editPostById(request: APIRequestContext, payload: object, postId: number) {
        const respose = await request.put(`${this.baseURL}/posts/${postId}`, {
            data: JSON.stringify(payload),
        })
    }
}