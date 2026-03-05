import { apiFetch } from "./apiFetch"
const token = localStorage.getItem("accessToken");

export const getTasks = async(getAccessToken, refreshAccessToken) => {
    try{
        const response = await apiFetch('/tasks', getAccessToken, refreshAccessToken, {
            method: "GET",
        })
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const createTask = async(task, getAccessToken, refreshAccessToken) => {
    try{

        const response = await apiFetch('/tasks', getAccessToken, refreshAccessToken, {
            method: "POST",
            body: JSON.stringify({task: task})
        });

        return response.data;

    } catch (error) {
        throw error;
    }
}

export const updateTask = async (taskId, data, getAccessToken, refreshAccessToken) => {
    try{

        const response = await apiFetch(`/tasks/${taskId}`, getAccessToken, refreshAccessToken, {
            method: "PATCH",
            body: JSON.stringify(data)
        })

        return response;

    } catch (error) {
        throw error;
    }
}

export const deleteTask = async (taskId, getAccessToken, refreshAccessToken)=> {
    try{

        const response = await apiFetch(`/tasks/${taskId}`, getAccessToken, refreshAccessToken, {
            method: "DELETE",
        })

        return response;

    } catch (error) {
        throw error;
    }
}
