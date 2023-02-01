import { Formik } from 'formik';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

import {
  LabelName,
  FormContact,
  Input,
  Button,
} from 'components/ContactForm/ContactForm.styled';

const initialValues = {
  name: '',
  phone: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const { contactsList } = useSelector(selectContacts);

  const handleInput = (values, { resetForm }) => {
    const dublicateContact = findDublicate(values, contactsList);
    dublicateContact
      ? alert(`${values.name} or ${values.phone} is already in contacts`)
      : dispatch(addContact(values));

    resetForm();
  };

  const findDublicate = (contact, contactsList) => {
    return contactsList.find(
      item =>
        item.name.toLowerCase() === contact.name.toLowerCase() ||
        item.phone === contact.phone
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleInput}>
      <FormContact autoComplete="on">
        <LabelName htmlFor="name">
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Enter name"
          />
        </LabelName>
        <LabelName htmlFor="phone">
          Number
          <Input
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="Enter number"
          />
        </LabelName>
        <Button type="submit">Add contact</Button>
      </FormContact>
    </Formik>
  );
};
