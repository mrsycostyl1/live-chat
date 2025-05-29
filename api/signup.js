import { writeFile, readFile } from 'fs/promises';

export default async (req, res) => {
  const { username, password } = JSON.parse(req.body);
  const dataPath = './api/users.json';
  let users = [];

  try {
    users = JSON.parse(await readFile(dataPath, 'utf8'));
  } catch {}

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ success: false, message: "Username already exists." });
  }

  users.push({ username, password });
  await writeFile(dataPath, JSON.stringify(users));
  res.status(200).json({ success: true, message: "Signup successful!" });
};
