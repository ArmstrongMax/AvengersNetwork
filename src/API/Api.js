import * as axios from "axios";

const instance = axios.create({
    //единый базовый URL
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    //для кросс-доменных запросов
    withCredentials: true,
    //Уникальный API ключ
    headers: {'API-KEY': 'c0b4b369-fd7c-4f6b-abb0-17b416791232'}

});
//каждый API отвечает за свой раздел redux-а
//Используются запросы get,put,post,delete согласно документации API
export const usersApi = {
    getUsers(currentPage, usersOnPage) {
        return instance.get(`users?page=${currentPage}&count=${usersOnPage}`)
            .then(response => response.data)
    },
    getListOfFollowingUsers(currentPage, usersOnPage) {
        return instance.get(`users?page=${currentPage}&count=${usersOnPage}&friend=${true}`)
            .then(response => response.data)
    },
    findUserByName(currentPage, usersOnPage, name) {
        return instance.get(`users?page=${currentPage}&count=${usersOnPage}&term=${name}`)
            .then(response => response.data)
    }
}

export const followApi = {
    followUser(id) {
        return instance.post(`follow/${id}`).then(response => response.data)
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },
    getIsFollowed(id) {
        return instance.get(`follow/${id}`).then(response => response.data)
    }
}

export const authApi = {
    authMe() {
        return instance.get('auth/me').then(response => response.data)
    },
    loginRequest(email, password, rememberMe = false, captcha) {
        return instance.post('auth/login', {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logoutRequest() {
        return instance.delete('auth/login').then(response => response.data)
    }
}

export const profileApi = {
    //сервер возвращает неопознанную ошибку если пользвоаетля не существует. Поэтому возвращаем заготовленный текст
    getProfile(id) {
        return instance.get('profile/' + id).catch(() => {
            return "User with this ID does not exists"
        })
    },
    getStatus(id) {
        return instance.get('profile/status/' + id)
    },
    updateStatus(status) {
        return instance.put('profile/status', {status: status})
    },
    setNewAvatar(photoFile) {
        //здесь получаем фотографию из inputa
        let formData = new FormData()
        formData.append("image", photoFile)
        //отправляем фото с заголовком для сервера
        return instance.put('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile) {
        return instance.put('profile', profile)
    }
}
export const securityApi = {
    getCaptchaImage() {
        return instance.get('security/get-captcha-url')
    }
}



