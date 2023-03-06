const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");
const nanoid = require("nanoid");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const searchedContact = await getContactById(id);
      console.log(searchedContact);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.log(addedContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
