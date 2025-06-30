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
  return data.users;
};

const parseUsersData = (userData) => {
  return userData.map(
    (user) => `${user?.first_name ?? 'user not found'} ${user?.last_name ?? ''}`
  );
};

export async function displayUsers() {
  const users = await getUsers();
  const parsedUsers = parseUsersData(users);
  generateUserList(parsedUsers);
}

// add validation before calling this function
export async function createNewUser(first_name, last_name, email) {
  const response = await fetch('https://pi_api.yonheerkens/dev/api/user', {
    method: 'POST',
    body: JSON.stringify({
      first_name,
      last_name,
      email,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const status = await response.json();
  console.log(status);
  return status;
}
