import {fetchUser} from "../services/api";

export async function registration(data) {
}

export async function login(data) {
}

export async function getCurrentUser() {
    return await fetchUser();
}
