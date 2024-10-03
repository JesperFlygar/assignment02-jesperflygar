import { APIRequestContext } from "playwright-core";

export class APIHelper {
    private baseURL: string;
    private token: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getAllPosts(request: APIRequestContext, target: string) {
        const response = await request.get(`${this.baseURL}/api/${target}`, {
            headers: {
                'X-User-Auth': `{"username":"tester01", "token": "${this.token}"}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getByID(request: APIRequestContext, target: string, postId: number) {
        const response = await request.get(`${this.baseURL}/api/${target}/${postId}`, {
            headers: {
                'X-User-Auth': `{"username":"tester01", "token": "${this.token}"}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
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

    async editPostById(request: APIRequestContext, target: string, payload: object, postId: number) {
        const response = await request.put(`${this.baseURL}/api/${target}/${postId}`, {
            data: JSON.stringify(payload),
            headers: {
                'X-User-Auth': `{"username":"tester01", "token": "${this.token}"}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    }
}