//Login
export const login = 'login';
export const loginAzureAD = 'loginAzureAD';

//Users
export const searchAD = 'searchAD';

// Employees
export const getEmployees = 'getEmployees';
export const getClientsSlim = 'getClientsSlim';

// Projects
export const addProject = 'addProject';
export const editProject = 'editProject';

// Reponsible person
export const createResponsiblePerson = 'createResponsiblePerson';
export const editResponsiblePerson = 'editResponsiblePerson';

// Quarter talks
export const editQuarterTalk = 'editQuarterTalk';
export const deleteQuaterTalk = 'deleteQuaterTalk';
export const reactivateQuaterTalk = 'reactivateQuaterTalk';

export const errorsBlackList = ['loginAzureAD'];

export const succOperationsWhiteObject = {
  //Login
  loggedIn: {
    pl: 'Zalogowano pomyślnie!',
    en: 'Logged in successfully!'
  },
  // Projects
  addProject: {
    pl: 'Projekt został pomyślnie dodany',
    en: 'Project has been succesfully added'
  },
  editProject: {
    pl: 'Projekt został pomyślnie edytowany',
    en: 'Project has been succesfully modified'
  },

  // Reponsible person
  createResponsiblePerson: {
    pl: 'Osoba odpowiedzialna została pomyślnie dodana',
    en: 'Responsible person has been succesfully added'
  },
  editResponsiblePerson: {
    pl: 'Pomyślnie edytowano dane osoby odpowiedzialnej',
    en: 'Responsible person data has been succesfully edited'
  },

  // Quarter talks
  editQuarterTalk: {
    pl: 'Zaznaczona rozmowa kwartalna została pomyślnie edytowana',
    en: 'Marked quarter talk has been succesfully edited'
  },
  deleteQuaterTalk: {
    pl: 'Status rozmowy kwartalnej został zmieniony na usunięty',
    en: 'Quarter talk status has been succesfully changed into deleted'
  },
  reactivateQuaterTalk: {
    pl: 'Status rozmowy kwartalnej został zmieniony na aktywny',
    en: 'Quarter talk status has been succesfully changed into active'
  }
};

export const warnOperationsWhiteObject = {
  choosePreferedRoles: {
    pl: 'Wybierz preferowaną role.',
    en: 'Choose prefered role.'
  }
};

export const failOperationsWhiteObject = {
  networkError: {
    pl: 'Brak połączenia z serwerem.',
    en: 'Server Error'
  },
  azureADAuthentication: {
    pl: 'Wystąpił problem podczas autoryzacji z Azure AD!',
    en: 'Problem has occured during Azure AD authorization!'
  }
};
