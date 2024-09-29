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

    async createPost(request: APIRequestContext, payload: object){
        const response = await request.post(`${this.baseURL}/posts`, {
            data: JSON.stringify(payload), 
        })
        return response; 
    }
}