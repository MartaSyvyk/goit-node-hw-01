const fs = require("fs").promises;
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  if (!data) {
    return "No contacts to show";
  }
  const result = JSON.parse(data);
  return result;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.filter((item) => {
    return item.id == contactId;
  });
  if (!result) {
    return "No such contact found";
  }
  return result;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const result = data.filter((item) => {
    return item.id != contactId;
  });
  const deletedContact = data.filter((item) => {
    return item.id == contactId;
  });
  if (!deletedContact) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return `We removed following contact from your list ${JSON.stringify(
    deletedContact
  )} `;
  return deletedContact;
}

async function addContact(name, email, phone) {
  const data = {
    id: nanoid(2),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  contacts.push(data);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return data;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
