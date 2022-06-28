
const URL = 'http://10.0.2.2:8090/api/';

export const getListTask = async () => {
    const res = await  fetch(`${URL}tasks`);
    const data = await res.json();
    return await data;
}

export const getTask = async (id) => {
    const res = await fetch(`${URL}task/${id}`);
    const data = await res.json();
    return await data;
}

export const saveTask = async (newTask) => {
    const res = await fetch(`${URL}task`, {
        method: "POST",
        headers: {Accept: "application/json", "Content-Type" : "Application/json"},
        body: JSON.stringify(newTask)
    });
    return await res.json();
}

export const deleteTask = async (id) => {
    await fetch(`${URL}task/${id}`,{
        method: "DELETE",
    });
}

export const updateTask = async (id, editTask) => {
    const res = await fetch(`${URL}task/${id}`, {
        method: "PUT",
        headers: {Accept: "application/json", "Content-Type" : "Application/json"},
        body: JSON.stringify(editTask)
    });
    return await res.json();
}