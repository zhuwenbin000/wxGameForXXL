//接口列表

//登录/注册
export async function login(params) {
  return request('/login', {
    method: 'POST',
    body: {
      
    },
  });
}