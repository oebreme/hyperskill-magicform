let cards = [];

function updateFieldToStorage(event) {
    let field = event.srcElement.id;
    localStorage.setItem(field, document.getElementById(field).value);
}

function clearField(field) {
    document.getElementById(field).value = '';
}

function clearForm() {
    const formFields = [
        'first-name',
        'last-name',
        'email',
        'phone',
        'company',
        'address',
    ];
    for (const field of formFields) {
        clearField(field);
    }
}

function submitListener(intervalId_toCancel) {
    document.getElementById('submit-button').addEventListener('click', () => {
        sendForm();
        clearForm();
        clearInterval(intervalId_toCancel);
    });
}

function sync() {
    return setInterval(() => {
        console.log("Interval")
        let currentInputs = readAllFieldsFromDOM();
        let savedInputs = readAllFieldsFromLocalStorage_forSync();

        if (currentInputs.firstName !== savedInputs.firstName && savedInputs.firstName !== null) {
            localStorage.setItem('first-name', savedInputs.firstName);
            document.getElementById('first-name').value = savedInputs.firstName;
            console.log("first-name changed");
        }
        if (currentInputs.lastName !== savedInputs.lastName && savedInputs.lastName !== null) {
            localStorage.setItem('last-name', savedInputs.lastName);
            document.getElementById('last-name').value = savedInputs.lastName;
        }
        if (currentInputs.email !== savedInputs.email && savedInputs.email !== null) {
            localStorage.setItem('email', savedInputs.email);
            document.getElementById('email').value = savedInputs.email;
        }
        if (currentInputs.phone !== savedInputs.phone && savedInputs.phone !== null) {
            localStorage.setItem('phone', savedInputs.phone);
            document.getElementById('phone').value = savedInputs.phone;
        }
        if (currentInputs.company !== savedInputs.company && savedInputs.company !== null) {
            localStorage.setItem('company', savedInputs.company);
            document.getElementById('company').value = savedInputs.company;
        }
        if (currentInputs.address !== savedInputs.address && savedInputs.address !== null) {
            localStorage.setItem('address', savedInputs.address);
            document.getElementById('address').value = savedInputs.address;
        }
    }, 200)
}

function init() {
    console.log("hallo");

    if (localStorage.getItem('card-list') === null) {
        localStorage.setItem('card-list', JSON.stringify([]));
    }

    let intervalId = sync();

    readAllFieldsFromLocalStorage();
    retrieveCardsFromLocalStorage();
    submitListener(intervalId);
}


function historyInit() {
    if (localStorage.getItem('card-list') === null) {
        localStorage.setItem('card-list', JSON.stringify([]));
    }
    retrieveCardsFromLocalStorage();
    createNewHistoryCard_InDOM();
}

function readAllFieldsFromLocalStorage_forSync() {
    return {
        firstName: localStorage.getItem('first-name'),
        lastName: localStorage.getItem('last-name'),
        email: localStorage.getItem('email'),
        phone: localStorage.getItem('phone'),
        company: localStorage.getItem('company'),
        address: localStorage.getItem('address')
    }
}


function readAllFieldsFromLocalStorage() {
    const formFields = [
        'first-name',
        'last-name',
        'email',
        'phone',
        'company',
        'address',
    ];
    for (const field of formFields) {
        readFieldFromLocalStorage(field);
    }
}

function readFieldFromLocalStorage(field) {
    document.getElementById(field).value = localStorage.getItem(field);
}

function readAllFieldsFromDOM() {
    return {
        firstName: readFieldFromDOM('first-name'),
        lastName: readFieldFromDOM('last-name'),
        email: readFieldFromDOM('email'),
        phone: readFieldFromDOM('phone'),
        company: readFieldFromDOM('company'),
        address: readFieldFromDOM('address')
    }
}

function readFieldFromDOM(field) {
    return document.getElementById(field).value;
}

function saveCardsToLocalStorage() {
    localStorage.setItem('card-list', JSON.stringify(cards));
}

function retrieveCardsFromLocalStorage() {
    if (cards === null) {
        localStorage.setItem('card-list', JSON.stringify([{}]));
    } else {
        cards = JSON.parse(localStorage.getItem('card-list'));
    }
}

function sendForm() {
    let newSubmission = readAllFieldsFromDOM();
    cards.push(newSubmission);


    saveCardsToLocalStorage();


    console.log(cards);
}


function setInputsToEmpty() {
    localStorage.removeItem('first-name')
    localStorage.removeItem('last-name')
    localStorage.removeItem('email')
    localStorage.removeItem('phone')
    localStorage.removeItem('company')
    localStorage.removeItem('address')
}

function removeCard_givenId(index) {
    cards.splice(index, 1);

    saveCardsToLocalStorage();

    setInputsToEmpty();

    location.reload();
}

function createNewHistoryCard_InDOM() {
    // Get Parent-Container
    const container = document.getElementById('history-card-container');


    // Loop Start
    let index = 0;
    for (const card of cards) {

        // create a card
        const cardDiv = document.createElement('div');
        cardDiv.className = 'submit-history-card';
        cardDiv.id = index.toString();


        // First name Start
        const firstName_Container = document.createElement('div');
        firstName_Container.className = 'display-history-container';

        const firstName_label = document.createElement('label');
        firstName_label.innerText = 'First name';
        firstName_Container.appendChild(firstName_label);

        const firstName_text = document.createElement('p');
        firstName_text.textContent = card.firstName;
        firstName_text.className = 'card-first-name';
        firstName_Container.appendChild(firstName_text);

        cardDiv.appendChild(firstName_Container)
        // First name End


        // Last name Start
        const lastName_Container = document.createElement('div');
        lastName_Container.className = 'display-history-container';

        const lastName_label = document.createElement('label');
        lastName_label.innerText = 'Last name';
        lastName_Container.appendChild(lastName_label);

        const lastName_text = document.createElement('p');
        lastName_text.textContent = card.lastName;
        lastName_text.className = 'card-last-name';
        lastName_Container.appendChild(lastName_text);

        cardDiv.appendChild(lastName_Container)
        // Last name End


        // Email Start
        const email_Container = document.createElement('div');
        email_Container.className = 'display-history-container';

        const email_label = document.createElement('label');
        email_label.innerText = 'Email';
        email_Container.appendChild(email_label);

        const email_text = document.createElement('p');
        email_text.textContent = card.email;
        email_text.className = 'card-email';
        email_Container.appendChild(email_text);

        cardDiv.appendChild(email_Container)
        // Email End


        // Phone Start
        const phone_Container = document.createElement('div');
        phone_Container.className = 'display-history-container';

        const phone_label = document.createElement('label');
        phone_label.innerText = 'Phone';
        phone_Container.appendChild(phone_label);

        const phone_text = document.createElement('p');
        phone_text.textContent = card.phone;
        phone_text.className = 'card-phone'
        phone_Container.appendChild(phone_text);

        cardDiv.appendChild(phone_Container)
        // Phone End


        // Company Start
        const company_Container = document.createElement('div');
        company_Container.className = 'display-history-container';

        const company_label = document.createElement('label');
        company_label.innerText = 'Company';
        company_Container.appendChild(company_label);

        const company_text = document.createElement('p');
        company_text.textContent = card.company;
        company_text.className = 'card-company';
        company_Container.appendChild(company_text);

        cardDiv.appendChild(company_Container)
        // Company End


        // Address Start
        const address_Container = document.createElement('div');
        address_Container.className = 'display-history-container';

        const address_label = document.createElement('label');
        address_label.innerText = 'Address';
        address_Container.appendChild(address_label);

        const address_text = document.createElement('p');
        address_text.textContent = card.address;
        address_text.className = 'card-address';
        address_Container.appendChild(address_text);

        cardDiv.appendChild(address_Container)
        // Address End


        // Delete Button Start
        const delete_button = document.createElement('button');
        delete_button.innerText = 'Delete';
        delete_button.className = 'delete-button delete-button-style';
        delete_button.addEventListener('click', () => {
            removeCard_givenId(index);
        })
        cardDiv.appendChild(delete_button);
        // Delete Button End



        // Add Card to Parent-Container
        container.appendChild(cardDiv)
        index++;
    }
    index = 0;
    // Loop End
}