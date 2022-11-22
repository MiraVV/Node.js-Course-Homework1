const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const arr = hideBin(process.argv);
const { argv } = yargs(arr);

const contactsOperations = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// id = "2";
invokeAction(argv);
// invokeAction({ action: "get", id: id });
