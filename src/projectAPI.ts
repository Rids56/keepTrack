import { error } from "console";
import { Project } from "./projects/Project";

const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/projects`

function translateStatusToErrorMessage(status: number) {
    switch (status) {
      case 401:
        return 'Please login again.';
      case 403:
        return 'You do not have permission to view the project(s).';
      default:
        return 'There was an error retrieving the project(s). Please try again.';
    }
  }

function checkStatus(res: any) {
    if (res.ok) { return res; }
    else {
        const httpErrorInfo = {
            status: res.status,
            statuText: res.statuText,
            url: res.url,
        }
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }

}

function parseJSON(response: Response) {    
    return response.json();
}

function converToProjectmodels(item: any): Project{
    // return new Project(item); // gives error
    return (item);
}


const projectAPI = {
    //select
    async get(page = 1, limit = 20) {
        try {
            const res = await fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`);
            const response = await checkStatus(res);
            const item =  response.json(); //await parseJSON(response);
            return item;
            // return converToProjectmodels(item);
        } catch (error) {
            console.log('log client error ' , error);
            throw new Error(
              'There was an error retrieving the projects. Please try again.'
            );
        }
    },

    //update
    async put(project: Project){
        return fetch(`${url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log('log client error ' , error);
            throw new Error(
              'There was an error updating the projects. Please try again.'
            );
        })

    },

    // select where
    async find(id: number){
        return fetch(`${url}/${id}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(converToProjectmodels)
    }

}

export { projectAPI };