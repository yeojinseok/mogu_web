# next auth

1. login 되면 header에 셋팅함 O
2. axios response 401 떨어지면 refresh 해줘야함
3. refresh는 getSession을 다시 해오면 됨
4. jwt callback 에서는 향샹 access token 만료 시간을 보고 refreshToken으로 다시 받아오도록 구성함 (https://next-auth.js.org/v3/tutorials/refresh-token-rotation)
5. accessToken 받아온 것이 비어있으면 로그아웃으로 생각함.
6. middlewear에서는 session의 accessToken 값이 있는지 항상 확인함
