import axios from 'axios';

export default axios.create({
  method: 'GET',
  baseURL: 'https://api.wisey.app/api/v1/core/preview-courses',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYmIzZDBlOS1kYjhjLTRhZGUtOWFlZi1mYWYxZWUwOGMwOTkiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg4MTQyMTAsImV4cCI6MTY3OTcxNDIxMH0.VXQMnnQpWOE62JASAjW3gqXr9rQ8So9YG4x-wKsgP1I',
  },
});
