// import { API } from '../backend';

//submitting question
export const askQuestion = (userId, token, question) => {
    return fetch(`/api/questions/askquestion/${userId}`, { 
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(question)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

// get all questions
export const getAllQuestions = () => {
    return fetch(`/api/questions/showallquestion`, {
        method:"GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

// get single question
export const getAQuestion = (questionId) => {
    return fetch(`/api/questions/singlequestion/${questionId}`, {
        method:"GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

//submiting answers to questions 
export const answerAQuestion = (userId, questionId, token, answer) =>{
    return fetch(`/api/questions/${userId}/answers/${questionId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        // mode: 'no-cors',
        body: JSON.stringify(answer)
      })
    .then(response => {
        return response.json();
      })
    .catch(err => console.log(err));
}

// upvoting
export const upvoting = (userId, token, questionId) =>{ 
    return fetch(`/api/questions/${userId}/upvote/${questionId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
    .then(response => {
        return response.json();
      })
    .catch(err => console.log(err));
}

//getting user profile
export const getProfile = (userId , token) => {
    return fetch(`/api/profile/getprofile/${userId}`, {
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

//saving user profile 
export const saveProfile = (userId, token, profile) => {
    return fetch(`/api/profile/saveprofile/${userId}`, { 
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

//every user profile
export const getAllProfiles = () => {
    return fetch(`/api/profile/allprofiles`, {
        method:"GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};