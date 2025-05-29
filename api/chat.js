import { readFile, writeFile } from 'fs/promises';

export default async (req, res) => {
  const filePath = './api/messages.json';
  let messages = [];

  try {
    messages = JSON.parse(await readFile(filePath, 'utf8'));
  } catch {}

  if (req.method === 'POST') {
    const { user, msg } = JSON.parse(req.body);
    messages.push({ user, msg });
    await writeFile(filePath, JSON.stringify(messages.slice(-100))); // keep last 100 messages
    return res.status(200).json({ success: true });
  }

  res.status(200).json(messages);
};
