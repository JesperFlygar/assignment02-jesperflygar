import { APIRequestContext } from "playwright-core";

export class APIHelper{
    private baseURL: string;

    constructor(baseURL: string){
        this.baseURL = baseURL; 
    }

    // localhost:3000/posts/{ID}
    //POST, GET, PUT, DELETE
    async getAllPosts(request: APIRequestContext){
        const response = await request.get(`${this.baseURL}/posts`);
        return response; 
    }

    async getByID(request: APIRequestContext, postId: number){
        const response = await request.get(`${this.baseURL}/posts/${postId}`);
        return response; 
    }

    async login(request: APIRequestContext, payload: object){
        const response = await request.post(`${this.baseURL}/api/login`, {
            data: payload,
        })
        return response; 
    }

    async createPost(request: APIRequestContext, target: string, payload: object){
        const response = await request.post(`${this.baseURL}/api/${target}/new`, {
            data: payload, 
        })
        return response; 
    }

    async editPost(request: APIRequestContext, payload: object, postId: number){
        const respose = await request.put(`${this.baseURL}/posts/${postId}`, {
            data: JSON.stringify(payload),
        })
    }

    async deletePost(request: APIRequestContext, postId: number){
        const response = await request.delete(`${this.baseURL}/posts/${postId}`);
        return response; 
    }
}