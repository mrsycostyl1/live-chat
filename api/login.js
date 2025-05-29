import { readFile } from 'fs/promises';

export default async (req, res) => {
  const { username, password } = JSON.parse(req.body);
  let users = [];

  try {
    users = JSON.parse(await readFile('./api/users.json', 'utf8'));
  } catch {}

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials." });
  }
};
