const contactsOperations = require("./contacts")

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts()
      return console.table(contacts)

    case "get":
      const contact = await contactsOperations.getContactById(id);
		return console.table(contact)

    case "add":
      const addContact = await contactsOperations.addContact({name, email, phone})
      return console.table(addContact);

    case "remove":
      const removeContact = await contactsOperations.removeContact(id)
      return console.table(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);