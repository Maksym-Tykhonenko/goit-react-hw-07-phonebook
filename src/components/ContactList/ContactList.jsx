import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectContacts, selectFilter } from 'redux/selectors';

import {
  Ul,
  Li,
  PContact,
  Button,
} from 'components/ContactList/ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const { contactsList } = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contactsList.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteItem = contactId => {
    dispatch(deleteContact(contactId));
  };
  const contacts = getFilterContacts();

  return (
    <Ul>
      {contacts.length === 0 && <p>There is not any contacts</p>}
      {contacts.map(({ name, phone, id }) => {
        return (
          <Li key={id}>
            <PContact>
              {name}: {phone}
              <Button type="button" onClick={() => deleteItem(id)}>
                Delete
              </Button>
            </PContact>
          </Li>
        );
      })}
    </Ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
