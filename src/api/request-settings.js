// Employees
export const getEmployees = 'getEmployees';

// Projects
export const getProjects = 'getProjects';

// Quarter talks
export const editQuarterTalk = 'editQuarterTalk';
export const deleteQuaterTalk = 'deleteQuaterTalk';
export const reactivateQuaterTalk = 'reactivateQuaterTalk';

// Assignments
export const getAssignmentByEmployee = 'getAssignmentByEmployee';
export const getAssignmentByProject = 'getAssignmentByProject';
export const addAssignment = 'addAssignment';
export const deleteAssignment = 'deleteAssignment';
export const editAssignment = 'editAssignment';

//Notifications
export const getAllNotification = 'getAllNotification';
export const deleteNotifications = 'deleteNotifications';
export const deleteAllNotifications = 'deleteAllNotifications';
export const markNotificationAsRead = 'markNotificationAsRead';
export const markAllNotificationAsRead = 'markAllNotificationAsRead';

//Clients
export const addClient = 'addClient';
export const deleteClient = 'deleteClient';
export const editInfoClient = 'editInfoClient';
export const reactivateClient = 'reactivateClient';

export const errorsBlackList = [

];

export const succOperationsWhiteObject = {
  getProjects: {pl: 'Projekt został pomyślnie dodany', en: 'Project has been succesfully added'},

  editQuarterTalk: {pl: 'Zaznaczona rozmowa kwartalna została pomyślnie edytowana', en: 'Marked quarter talk has been succesfully edited'},
  deleteQuaterTalk: {pl: 'Status rozmowy kwartalnej został zmieniony na usunięty', en: 'Quarter talk status has been succesfully changed into deleted'},
  reactivateQuaterTalk: {pl: 'Status rozmowy kwartalnej został zmieniony na aktywny', en: 'Quarter talk status has been succesfully changed into active'},

  addAssignment: {pl: 'Pomyślnie dodano pracownika do projektu', en: 'Successfully added the employee to the project'},
  deleteAssignment: {pl: 'Pomyślnie usunięto przypisanie pracownika', en: 'Successfully deleted employee assignment'},
  editAssignment: {pl: 'Pomyślnie edytowano przypisanie pracownika', en: 'Successfully edited employee assignment'},

  deleteNotifications: {pl: 'Pomyślnie usunięto powiadomienie', en: 'Successfully deleted notification'},
  deleteAllNotifications: {pl: 'Pomyślnie usunięto powiadomienia', en: 'Successfully deleted notifications'},
  markNotificationAsRead: {pl:'', en:''},
  markAllNotificationAsRead: {pl:'', en:''},
  
  addClient: {pl: "Pomyślnie dodano klienta", en: "Successfully added client"},
  editInfoClient: {pl: 'Pomyślnie edytowano klienta', en: 'Successfully edited client'},
  reactivateClient: {pl: 'Pomyślnie przywrócono klienta', en: 'Successfully reactivated client'}

}
