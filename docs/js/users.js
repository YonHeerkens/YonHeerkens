const generateUserList = (users) => {
  const container = document.getElementById('userlist');
  const ul = document.createElement('ul');

  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user;
    ul.appendChild(li);
  });
  container.innerHTML = '';
  container.appendChild(ul);
};

const getUsers = async () => {
  console.log('Going to fetch some stuff');
  const response = await fetch('https://pi_api.yonheerkens.dev/api/user');
  const data = await response.json();
  console.log(data);
  console.log(data.users);
  return data.users;
};

const parseUsersData = (userData) => {
  return userData.map((user) => `${user.first_name} ${user.last_name}`);
};

export async function displayUsers() {
  const users = await getUsers();
  console.log(users);
  const parsedUsers = parseUsersData(users);
  generateUserList(parsedUsers);
}
