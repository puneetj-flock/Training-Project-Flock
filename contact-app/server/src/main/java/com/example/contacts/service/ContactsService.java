package com.example.contacts.service;

import com.example.contacts.db.ContactsDB;
import com.example.contacts.model.ContactDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ContactsService {

  @Autowired
  private ContactsDB contactsDB;

  public List<ContactDetails> getContacts(Integer userId) {
    // System.out.println("Reached Here get contact\n");
    // Integer userId = authDB.checkAuth(authorization);
    return contactsDB.getContacts(userId);
  }

  public ContactDetails addContact(Integer userId, ContactDetails contact) {
    // System.out.println(userId);
    contact.setUserId(userId);
    return contactsDB.addContact(contact);
  }

  public void deleteContact(Integer userId, Integer contactId) {
    // Integer userId = authDB.checkAuth(authorization);
    contactsDB.deleteContact(userId, contactId);
  }

  public void updateContact(Integer userId, ContactDetails contact) {
    contact.setUserId(userId);
    contactsDB.updateContact(contact);
  }
}
