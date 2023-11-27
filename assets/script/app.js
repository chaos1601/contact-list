'use strict';

import Contact from './Contact.js';

const contactsList = document.querySelector('.contactsList');
const form = document.querySelector('.contactForm');
const contactNumberElement = document.querySelector('.contactNumber');
const name = document.getElementById('nameInput');
const city = document.getElementById('cityInput');
const email = document.getElementById('emailInput');

const contacts = [];

function listContacts() {
  contactsList.innerHTML = '';

  contacts.forEach((contact, index) => {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');

    const name = document.createElement('p');
    name.textContent = `Name: ${contact.name}`;

    const city = document.createElement('p');
    city.textContent = `City: ${contact.city}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${contact.email}`;

    contactDiv.appendChild(name);
    contactDiv.appendChild(city);
    contactDiv.appendChild(email);

    // Add delete functionality
    contactDiv.onclick = () => {
      contacts.splice(index, 1);
      listContacts();
    };

    contactsList.prepend(contactDiv);
  });
}

// Update the text content of the contact number element
function updateContactNumber() {
    contactNumberElement.innerHTML = `Total Contacts: ${contacts.length}`;
    if (contacts.length === 0) {
        contactNumberElement.innerText = `Total Contacts: 0`;
    }
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve input values
    const enteredName = name.value;
    const enteredCity = city.value;
    const enteredEmail = email.value;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Create a new Contact instance
    const newContact = new Contact(enteredName, enteredCity, enteredEmail);
    contacts.unshift(newContact);

    // Update the contact list and contact number display
    listContacts();
    updateContactNumber();

    form.reset();
});

const express = require('express');
const app = express();

// Serve static files from the 'assets' directory
app.use('/assets', express.static('assets', {
    // Specify the correct MIME type for JavaScript files
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    },
}));