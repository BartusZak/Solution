// Employees
export const getEmployees = 'getEmployees';
export const getEmployeeById = 'getEmployeeById';
export const getEmployeeCapacity = 'getEmployeeCapacity'
export const getEmployeesAndManagers = 'getEmployeesAndManagers'
export const getOnBoardsByEmployeeId = 'getOnBoardsByEmployeeId';
export const getEmployeeContact = 'getEmployeeContact';
export const getEmployeeSkills = 'getEmployeeSkills';
export const addEmployee = 'addEmployee';
export const addOnBoardEmployee = 'addOnBoardEmployee';
export const deleteOnBoardEmployee = 'deleteOnBoardEmployee';
export const deleteEmployee = 'deleteEmployee';
export const editSkills = 'updateSkills';
export const editForeignLanguages = 'editForeignLanguages';
export const editSkype = 'editSkype';
export const editOnBoardEmployee = 'editOnBoardEmployee';
export const editEmployee = 'editEmployee';
export const reactivateEmployee = 'reactivateEmployee';

// Projects
export const addProject = 'addProject';

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
export const getClients = 'getClients';
export const addClient = 'addClient';
export const deleteClient = 'deleteClient';
export const editInfoClient = 'editInfoClient';
export const reactivateClient = 'reactivateClient';

//Certificates
export const getCertificates = 'getCertificates';
export const addCertificate = 'addCertificate';
export const editCertificate = 'editCertificate';
export const deleteCertificate = 'deleteCertificate';

//Feedbacks
export const getFeedbacksByEmployee = 'getFeedbacksByEmployee';
export const getFeedbacksbyEmployeeInProject = 'getFeedbacksbyEmployeeInProject';
export const addFeedback = 'addFeedback'; 
export const editFeedback = 'editFeedback';
export const deleteFeedback = 'deleteFeedback';

//sharedEmployees
export const getSharedEmployeesForManager = 'getSharedEmployeesForManager';
export const addSharedEmployee = 'addSharedEmployee';
export const deleteSharedEmployee = 'deleteSharedEmployee';

//Users
export const getUserById = 'getUserById'; 
export const getUserByAdSearch = 'getUserByAdSearch';
export const addUser = 'addUser';
export const searchUsers = 'searchUsers'; 
export const searchRequestsUsers = 'searchRequestsUsers';
export const deleteUser = 'deleteUser';
export const deleteUserRequest = 'deleteUserRequest';
export const editUserRoles = 'editUserRoles';
export const reactivateUser = 'reactivateUser';

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
  
  addClient: {pl: "Pomyślnie dodano klienta", en: "Client has been succesfully added"},
  editInfoClient: {pl: 'Pomyślnie edytowano klienta', en: 'Client has been succesfully edited'},
  reactivateClient: {pl: 'Pomyślnie przywrócono klienta', en: 'Client has been successfully reactivated'},

  addCertificate: {pl:'Certyfikat został pomyślnie dodany', en: 'Certificate has been successfully added'},
  editCertificate: {pl: 'Certyfikat został pomyślnie edytowany', en: 'Certificate has been successfully edited'},  
  deleteCertificate: {pl: 'Certyfikat został pomyślnie usunięty', en: 'Certificate has been successfully deleted'},

  addFeedback: {pl: 'Opinia została dodana pomyślnie', en: 'Feedback has been succesfully added'}, 
  editFeedback: {pl: 'Opinia została edytowana pomyślnie', en: 'Feedback has been succesfully edited'},
  deleteFeedback: {pl: 'Opinia została usunięta pomyślnie', en: 'Feedback has been succesfully deleted'},

  addUser: {pl: 'Użytkownik został dodany pomyślnie', en: 'User has been successfully added'},
  editUserRoles: {pl: 'Pomyślnie edytowano role użytkownika', en: 'User roles have been successfully edited'},
  reactivateUser: {pl: 'Pomyślnie reaktywowano użytkownika', en: 'User has been successfully reactivated'},
  deleteUser: {pl: 'Pomyślnie usunięto użytkownika', en: 'User has been successfully deleted'}
}
