const translations = {
  locale: "pl",
  TranslationsSwitch: {
    CHANGE_LANGUAGE: 'Język'
  },
  EmployeeInformations: {
    LoadEmployeeDetailsProblem: 'Wystapił problem podczas ładowania szczegółów pracownika. Spróbuj ponownie klikając w poniższy przycisk',
    Status: 'status',
    LeadSupervisor: 'główny przełożony',
    Localization: 'lokalizacja',
    Team: 'zespół',
    CheckOnboards: 'sprawdź onboardy',
    AllSupervisors: 'wszyscy przełożeni'
  },
  EmployeeFeedbacks: {
    FeedbacksProblem: 'Wystąpił problem podczas wczytywania opini o pracowniku. Spróbuj ponownie klikając w poniższy przycisk',
    Feedbacks: 'opinie',
    Project: 'Project',
    EmptyFeedbacks: 'Ten pracownik nie ma jeszcze opinii'
  },
  EmployeeOnboards: {
    Onboards: 'Onboardy',
    OnboardsProblem: 'Wystąpił problem podczas ładowania danych. Spróbuj ponownie klikając w poniższy przycisk'
  },
  EmployeeProjects: {
    Projects: 'projekty',
    EmployeeProjectsProblem: 'Wystąpił problem podczas ładowania listy projektów pracownika. Spróbuj ponownie klikając poniższy przycisk',
    RoleInProject: 'rola w projekcie',
    StartDate: 'data rozpoczęcia',
    EndDate: 'data zakończenia',
    GoTo: 'SZCZEGÓŁY'
  },
  EmployeeSkills: {
    Skills: 'umiejętności',
    EmptySkills: 'Brak przypisanych umiejętności',
    SkillLevel: 'poziom umiejętności',
    Experience: 'doświadczenie',
    Years: 'lat',
    Year: 'rok',
    ManageSkills: 'ZARZĄDZAJ'
  },
  ProjectTeam: {
    ProjectTeam: 'Uczestnicy projektu',
    ProjectTeamEmpty: 'Ten projekt nie posiada uczestników',
    SinceLabel: 'od',
    ToLabel: 'do',
    AddMember: 'DODAJ PRACOWNIKA'
  },
  ProjectSkills: {
    ProjectSkills: 'Lista umiejętności',
    SkillsListEmpty: 'Lista umiejętności w tym projekcie jest pusta',
    OpenManagement: 'ZARZĄDZAJ',
    SkillLevel: 'poziom umiejętności'
  },
  ManagerContent: {
    LoadingSkillsProblem: 'Wystapił problem podczas ładowania umiejętności...',
    EmptySkills: 'Lista umiejętności jest pusta',
    ManageSkillsLabel: 'Zarządzaj umiejętnościami',
    EmptyFilteringMessage: 'Brak rezultatów dla podanej wartości...',
    FinishButton: 'ZAPISZ',
    FilterPlaceholder: 'zacznij pisać, aby znaleźć umiejętność...',
    SkillLevel: 'poziom umiejętności'
  },
  ProjectPhases: {
    ProjectPhases: 'Fazy projektu',
    EmptyPhases: 'Brak faz dla tego projektu',
    StartDate: 'data rozpoczęcia',
    EstimatedEndDate: 'przewidziana data zakończenia',
    Status: 'status'
  },
  ProjectInformations: {
    StartDate: 'data rozpoczęcia',
    EstimatedEndDate: 'przewidziana data zakończenia',
    Client: 'klient',
    Cloud: 'chmura',
    ResponsiblePerson: 'Osoba odpowiedzialna',
    FirstName: 'imię',
    LastName: 'nazwisko',
    PhoneNumber: 'numer telefonu',
    ProjectOwners: 'Właściciele projektu',
    EditProject: 'EDYTUJ PROJEKT',
    AddPhase: 'DODAJ FAZE PROJEKTU',
    ShareProject: 'UDOSTĘPNIJ',
    ActivateProject: 'AKTYWUJ PROJEKT',
    DeleteProject: 'USUŃ PROJEKT',
    CloseProject: 'ZAMKNIJ PROJEKT',
    deleted: 'usunięty',
    closed: 'zamknięty',
    inactive: 'nieaktywny',
    active: 'aktywny'
  },
  ShareProjectForm: {
    ManagersToShareLabel: 'udostępnij pracownkom',
    ManagersProvidedLabel: 'udostępniono pracownikom',
    Share: 'UDOSTĘPNIJ',
    Deny: 'ANULUJ',
    TypePlaceholder: 'zacznij pisać...',
    EmptyFilterDestinationManagers: 'Brak wyników dla podanej wartości...',
    EmptyAddedManagers: 'Nie dodano pracowników. Możesz dodać nowych wybierając z listy',
    LoadDestinationManagersProblem: 'Wystąpił problem podczas ładowania pracowników. Spróbuj ponownie...',
    LoadSharedManagersProblem: 'Wystąpił problem podczas pobierania pracowników. Wybierz osoby, którym chcesz udostępnić projekt'
  },
  EmployeeProjectForm: {
    AddEmployeeToProject: 'Dodaj pracownika do projektu',
    Role: 'rola',
    StartDate: 'data rozpoczęcia',
    EndDate: 'data zakończenia',
    AddEmployee: 'DODAJ PRACOWNIKA',
    CloseAdding: 'ZAKOŃCZ DODAWANIE',
    ResponsibilitiesInProject: 'obowiązki w projekcie',
    AddResponsibilityPlaceholder: 'dodaj obowiązek',
    Capacity: 'długość etatu',
    Employee: 'pracownik'
  },
  EmployeeSearcher: {
    EmployeeSearcherPlaceholder: 'zacznij pisać aby rozpocząć wyszukiwanie...',
    EmployeeSearcherOwnersPlaceholder: 'dodaj właściciela...',
    Employee: 'znajdź pracownika *',
    EmptyEmployeeQuery: 'Nie znaleziono pracowników o podanych parametrach'
  },
  DragAndDrop: {
    DroppedMessage: 'Pliki zostały upuszczone',
    TooManyFilesError: 'Upuszczono za dużo plików. Limit to '
  },
  PhaseProjectForm: {
    Step: 'Krok',
    firstStepTitleForPhases: 'Wypełnij szczegóły fazy projektu',
    secondStepTitleForPhases: 'Uzupełnij informacje o kliencie dla fazy projektu',
    firstStepTitleForProjects: 'Uzupełnij szczegóły projektu',
    secondStepTitleForProjects: 'Wypełnij informacje o kliencie',
    name: 'nazwa',
    description: 'opis',
    startDate: 'data rozpoczęcia',
    endDate: 'data zakończenia',
    client: 'klient',
    cloud: 'chmura',
    responsiblePerson: 'osoba odpowiedzialna',
    EmptyResponsiblePersonsInSelect: 'nie wybrano osoby odpowiedzialnej...'
  },
  ResponsiblePersonForm: {
    client: 'klient',
    firstName: 'imię',
    lastName: 'nazwisko',
    email: 'adres email',
    phoneNumber: 'numer telefonu',
    modalHeaderAdd: 'Dodaj nową osobę odpowiedzialną',
    modalHeaderEdit: 'Edytuj dane osoby odpowiedzialnej'
  },
  LoginContainer: {
    EnterUsername: 'Podaj login',
    EnterPassword: 'Podaj hasło',
    Login: 'Zaloguj',
    Forgot: 'Zapomniałeś',
    Password: 'hasła',
    CloseModalMessage:
      'Czy na pewno nie chcesz wybrać preferowanych roli w serwisie ? \nTej operacji nie można powtórzyć !',
    ChooseRoles: 'Wybierz preferowane role w serwisie'
  },
  NotFound404: {
    PageNotFound: 'Nie znaleziono strony',
    PageNotFoundText: 'Nie chcesz tutaj być...'
  },
  TopBar: {
    Logout: 'Wyloguj'
  },
  LeftMenu: {
    Users: 'Użytkownicy',
    Employees: 'Pracownicy',
    Clients: 'Klienci',
    Projects: 'Projekty',
    Assign: 'Przypisz',
    Stats: 'Statystyki',
    Skills: 'Umiejętności',
    Reports: 'Raporty',
    ImportCV: 'Import CV',
    Info: 'Info'
  },
  PreferedRoles: {
    ChooseRoles: 'Wybierz preferowane role w serwisie',
    SavedSuccessfully: 'Poprawnie zapisano wybrane role',
    Save: 'Zapisz'
  },
  SmoothTable: {
    Search: 'Szukaj',
    DeleteFilters: 'Usuń filtry',
    ShowDeleted: 'Usunięte',
    Deleted: 'Usunięty',
    ShowNotActivated: 'Nieaktywowane',
    ShowActivated: 'Aktywne',
    ShowAll: 'Wszystkie',
    Today: 'Dzisiaj',
    NoDataOrResults: 'Brak danych bądź wyników',
    Reports: 'Raporty',
    EmployeeIsNotActivated: 'Pracownik jest nieaktywny!'
  },
  StatsContainer: {
    DevLocalization: 'Lokalizacja Pracowników',
    EmployeesWithoutProjects: 'Pracownicy bez projektów',
    Without: 'BEZ',
    With: 'Z',
    ActiveProjects: 'Aktywne Projekty',
    Active: 'Aktywne',
    Archive: 'Archiwalne',
    EmployeesFTE: 'FTE Pracowników',
    UnUsed: 'Wolne',
    Used: 'Zajęte',
    Remote: 'ZDALNIE',
    Others: 'INNE',
    ToFill: 'DO UZUPEŁNIENIA'
  },
  UsersList: {
    Add: 'Dodaj',
    Name: 'Imię',
    Surname: 'Nazwisko',
    Email: 'Email',
    Phone: 'Telefon',
    Date: 'Data',
    userId: 'Id Użytkownika',
    ReactivateUserImperativus: 'Reaktywuj użytkownika',
    ReactivateUserInfinitive: 'reaktywować użytkownika',
    UserReactivated: 'Użytkownik został reaktywowany',
    DeleteUserImperativus: 'Usuń użytkownika',
    DownloadCV: 'Pobierz CV',
    DeleteUserInfinitive: 'usunąć użytkownika',
    DeleteUserRequestImperativus: 'Usuń prośbę o utworzenie konta',
    DeleteUserRequestInfinitive: 'Usunąć prośbę o utworzenie konta',
    UserDeleted: 'Użytkownik został usunięty',
    UserRequestDeleted:
      'Prośba o utworzenie konta użytkownika została usunięta',
    EditUserImperativus: 'Edytuj użytkownika',
    DeleteEdit: 'Opcje',
    DeleteAdd: 'Opcje',
    AddUserWhenRequestImperativus: 'Dodaj użytkownika'
  },
  ClientsContainer: {
    Add: 'Dodaj',
    Name: 'Nazwa',
    Options: 'Opcje',
    DeleteClient: 'Usuń Klienta',
    EditClient: 'Edytuj Klienta',
    ReactivateClient: 'Reaktywuj Klienta',
    SaveClient: 'Zapisz Klienta',
    ClientRemoved: 'Klient został usunięty',
    ClientReactivated: 'Klient został reaktywowany',
    Removing: 'zamierzasz usunąć klienta',
    RemovingCloud: 'zamierzasz usunąć chmurę',
    ReactivatingCloud: 'zamierzasz reaktywować chmurę',
    Reactivating: 'zamierzasz reaktywować klienta',
    CloudReactivated: 'Chmura została reaktywowana',
    Search: 'Szukaj',
    ClientsNotFound: 'Brak klientów',
    Activated: 'Aktywne',
    NotActivated: 'Nieaktywne',
    ClientCloudsList: 'Lista Chmur Klienta',
    AddCloud: 'Dodaj Chmurę',
    CloudsNotFound: 'Nie znaleziono żadnej chmury.',
    CloudName: 'Nazwa Chmury',
    NoClientDescription: 'Brak opisu Klienta',
    CloudRemoved: 'Chmura została usunięta',
    ResponsiblePersonList: 'Lista Osób Odpowiedzialnych',
    ResponsiblePersonNotFound: 'Nie znaleziono żadnych rekordów.',
    InsertCloudName: 'Wpisz nazwę chmury..',
    FirstName: 'Imię',
    LastName: 'Nazwisko',
    Email: 'Email',
    PhoneNumber: 'Numer Telefonu',
    Insert: 'Wprowadź',
    AddResponsiblePerson: 'Dodaj Osobę Odpowiedzialną',
    ResponsiblePersonAdded: 'Dodano Osobę Odpowiedzialną.',
    CloudAdded: 'Dodano Chmurę.',
    EditCloud: 'Edytuj Chmurę',
    Save: 'Zapisz',
    CloudEdited: 'Edytowano szczegóły Chmury.',
    ResponsiblePersonEdited: 'Edytowano szczegóły Osoby Odpowiedzialnej.',
    EditResponsiblePerson: 'Edytuj Osobę Odpowiedzialną',
    ReactivatingResponsiblePerson: 'Reaktywować Osobę Odpowiedzialną',
    ResponsiblePersonReactivated: 'Osoba Odpowiedzialna została Aktywowana.',
    RemovingResponsiblePerson: 'Usunąć Osobę Odpowiedzialną',
    ResponsiblePersonRemoved: 'Odpowiedzialna Osoba została dezaktywowana.',
    showDeleted: 'Pokaż usunięte',
    showActive: 'Pokaż aktywne',
    NewInputLabel: 'Nazwa Pola',
    NewInputValue: 'Wartośc Pola',
    AddInput: 'Dodaj pole'
  },
  AddClient: {
    Add: 'Dodaj',
    Edit: 'Edytuj',
    Client: 'Klienta',
    ClientName: 'Nazwa Klienta',
    ClientDescription: 'Opis Klienta',
    ClientAddedSuccess: 'Klient został dodany.',
    ClientEditedSuccess: 'Szczegóły Klienta zostały zaktualizowane.',
    Save: 'Zapisz'
  },
  ProjectsList: {
    Add: 'Dodaj',
    DeleteOwnerFuture:
      'Usunąć {{ownerFullName}} jako właściciela projektu o numerze {{projectName}}',
    OwnerHasBeenDeleted: 'Właściciel został usunięty',
    ChangeSkillSettingsFuture:
      'Zmienić ustawienia umiejętności projektu o numerze {{projectId}}',
    SettingsHaveBeenSaved: 'Ustawienia zostały zapisane',
    ProjectName: 'Nazwa projektu',
    Client: 'Klient',
    StartDate: 'Data rozpoczęcia',
    EndDate: 'Data zakończenia',
    Status: 'Status',
    Activated: 'Aktywny',
    NotActivated: 'Nieaktywny',
    Closed: 'Zamknięty',
    SelectStatus: 'Wybierz status...',
    CloseProjectImperativus: 'Zamknij projekt',
    CloseProjectInfinitive: 'Zamknąć projekt',
    ProjectClosed: 'Projekt został zamknięty',
    ReactivateProjectImperativus: 'Reaktywuj projekt',
    ReactivateProjectInfinitive: 'Reaktywować projekt',
    ProjectReactivated: 'Projekt został reaktywowany',
    DeleteProjectImperativus: 'Usuń projekt',
    DeleteProjectInfinitive: 'usunąć projekt',
    ProjectDeleted: 'Projekt został usunięty',
    EditProject: 'Edytuj projekt',
    DeactivateDeleteEdit: 'Deaktywuj/Usuń/Edytuj',
    SeeMore: 'Zobacz więcej',
    Deleted: 'Usunięte'
  },
  EmployeesList: {
    Name: 'Imię',
    Surname: 'Nazwisko',
    Position: 'Stanowisko',
    Location: 'Lokalizacja',
    Status: 'Status',
    AccountActive: 'Aktywny',
    AccountInactive: 'Nieaktywny',
    SelectStatus: 'Wybierz status...',
    DownloadEmployeeCVInWordFormat: 'Pobierz CV.docx',
    DownloadEmployeeCVInPdfFormat: 'Pobierz CV.pdf',
    CheckUserProfile: 'Przeglądaj profil użytkownika',
    Options: 'Opcje',
    ActivateEmployee: 'Aktywuj pracownika',
    EmployeeHasBeenActivated: 'Pracownik został Aktywowany.',
    ActivateEmployeeInfinitive: 'aktywować pracownika',
    DeleteEmployee: 'Usuń pracownika',
    DeleteEmployeeInfinitive: 'usunąć pracownika',
    EmployeeHasBeenDeleted: 'Pracownik został Usunięty.'
  },
  EmployeeDetails: {
    Close: 'Zamknij',
    Edit: 'Edytuj',
    EmployeeDetails: 'Szczegóły Pracownika',
    Active: 'Aktywny',
    NotActive: 'Nieaktywny',
    Deleted: 'Usunięty',
    Details: 'Szczegóły',
    Localization: 'Lokalizacja',
    Phone: 'Telefon',
    Superiors: 'Przełożeni',
    EmailMissing: "Brak email'a",
    RoleMissing: 'Brak roli',
    NoLevel: 'Brak poziomu',
    CallSkype: 'Zadzwoń Skype',
    CallBusinessSkype: 'Zadzwoń Skype for Business',
    InsertSkypeId: 'Wpisz SkypeId',
    SkypeIdUpdated: 'Zaktualizowano SkypeId',
    Activate: 'Aktywuj',
    BeforeYouChangeStatus: 'Zanim zmnienisz status!',
    BeforeYouChangeStatusContent: `Zmiana statusów pracownika polega na przypisaniu mu wymiaru czasu
              pracy oraz poziomu doświadczenia. Pamiętaj, że możesz także
              zmienić jego status na <b>Usunięty</b> co spowoduje zablokowanie
              możliwości edycji. Zmiana statusu na <b>Aktywny</b> pozwoli na
              ponowną zmiane danych tego pracownika.`,
    Save: 'Zapisz',
    Delete: 'Usuń',
    ActiveProjects: 'Aktywne Projekty',
    Skills: 'Umiejętności',
    Missing: 'Brak',
    Assignments: 'Przypisania',
    ProfilePhoto: 'Zdjęcie profilowe',
    EmployeeCV: 'CV Pracownika',
    DownloadEmployeeCVInWordFormat: 'Pobierz CV.docx',
    DownloadEmployeeCVInPdfFormat: 'Pobierz CV.pdf'
  },
  EmployeeOnBoards: {
    Client: 'Klient',
    ClientPlaceHolder: 'Wybierz klienta',
    Cloud: 'Chmura',
    CloudPlaceHolder: 'Wybierz chmurę',
    StartDate: 'Data rozpoczęcia',
    EndDate: 'Data zakończenia',
    Options: 'Opcje',
    Edit: 'Edytuj',
    EditingTitle: "Edytowanie onBoard'u pracownika",
    AddingTitle: "Dodawanie onBoard'u pracownika",
    Delete: 'Usuń',
    Deleting: 'Usuwanie',
    SuccesfullDelete: 'Pomyślnie usunięto',
    DeleteAgreed: 'Czy napewno chcesz usunąć onBoard',
    Add: 'Dodaj',
    Update: 'Aktualizuj',
    Title: 'OnBoard',
    AddingError: 'Wystąpił błąd podczas dodawania onBoardu pracownika',
    UpdatingError: 'Wystąpił błąd podczas aktualizowania onBoardu pracownika',
    ShowAll: 'Pokaż wszystkie',
    ShowActive: 'Pokaż tylko aktywne przypisania'
  },
  List: {
    Search: 'wpisz, aby wyszukać...',
    Sort: 'Sortuj',
    Filters: 'Filtr',
    NoResults: 'Brak wyników',
    Default: 'Bez filtrowania'
  },
  Quaters: {
    Add: 'Dodaj',
    Active: 'Aktywny',
    NotActive: 'Nieaktywny',
    QuarterTalk: 'Rozmowa kwartalna',
    QuaterTalks: 'Rozmowy kwartalne',
    Missing: 'Brak',
    Deleted: 'Usuniętych',
    Active: 'Aktywnych',
    Delete: 'Usuń',
    DeleteQuarterTalkConfirmation:
      'Czy jestes pewny, że chcesz usunąć rozmowę?',
    OperationSuccessful: 'Pomyślnie wykonano operację',
    QuarterTalkAdded: 'Pomyślnie dodano rozmowę kwartalną',
    QuarterTalkActivated: 'Aktywowano rozmowę kwartalną',
    QuarterTalkHeader: 'Panel rozmów kwartalnych',
    QuarterTalkSubHeader: 'aktualnie przeglądany użytkownik',
    PlanQuarter: 'Zaplanuj rozmowę',
    AddQuarter: 'Dodaj rozmowę',
    ClearHistory: 'Wyczyść historię',
    EmptyQuarterTalk: 'Ta rozmowa kwartalna nie posiada żadnych odpowiedzi',
    SuccDeletedQuarter: 'Wybrana przez Ciebie rozmowa została usunięta',
    SpeechState: 'Przebieg rozmowy',
    Next: 'Przejdź',
    Employee: 'Pracownik',
    Deny: 'Anuluj',
    MakeSureYouWantDeleteQuarter:
      'Czy jesteś pewny, że chcesz usunąć tą rozmowę kwartalną?',
    AddQuarterTalk: 'Dodaj rozmowę kwartalną',
    Options: 'Opcje',
    AddQuestion: 'Dodaj pytanie',
    QuestionMenage: 'Zarządzaj pytaniami',
    ChooseQuestionHeader: 'Wybierz pytania do wypełnienia',
    CheckAll: 'Zaznacz wszystkie',
    UncheckAll: 'Odznacz wszystkie',
    Start: 'Rozpocznij',
    SuccDeleteQuestion: 'Pomyślnie usunięto pytanie',
    Date: 'Data',
    Quarter: 'Kwartał',
    Question: 'pytanie',
    QuestionContent: 'Treść pytania...',
    ChooseOrSelectQuarter: 'wpisz lub wybierz kwartał...',
    SuccAddedQuarter: 'Pomyślnie utworzono rozmowę kwartalną',
    QuarterItemSubHeader: 'przeprowadził',
    Reactivate: 'Reaktywuj',
    Conduct: 'przeprowadzi',
    Year: 'Rok',
    PlannedDate: 'Planowana data',
    PlannedHour: 'Planowana godzina',
    YearHolder: 'wybierz lub wpisz planowany rok...',
    Language: 'pl',
    Minutes: 'minuty',
    QuarterTalksDetails: 'Szczegóły rozmowy kwartalnej',
    Plan: 'Zaplanuj',
    SuccPlannedQuarter: 'Pomyślnie zaplanowano rozmowę kwartalną',
    SugestedHours: 'Proponowane godziny',
    From: 'od',
    To: 'do',
    OccupiedDates: 'Zajęte daty',
    CallCalendar: 'Kalendarz rozmów',
    Choosen: 'Wybrane',
    NotChoosen: 'Nie wybrane',
    Deleted: 'Usunięte',
    NotDeleted: 'Nie usunięte',
    Empty: 'Brak rozmów kwartalnych',
    startQuarterTranslation: 'Wypełnij pytania',
    NoAnswers: 'Ta rozmową się jeszcze nie odbyła',
    Populate: 'Uzupełnij rozmowę',
    ConfirmQuestions: 'Zatwierdź pytania',
    ForQuarter: 'za',
    In: 'w',
    InYear: 'roku',
    DoneQuarter: 'Ta rozmowa została przeprowadzona',
    IncomingQuarter: 'Ta rozmowa dopiero się odbędzie',
    PeopleToTalkWith: 'Osoba przeprowadzająca rozmowę',
    DownloadTalkInDoc: 'Pobierz rozmowę w formacie .doc',
    QuarterTalkDate: 'Data przeprowadzenia rozmowy',
    PlannedQuarterTalkDate: 'Planowana data odbycia rozmowy',
    DeleteMarked: 'Usuń zaznaczone',
    MakeSureYouWantDeleteQuestion:
      'Czy jestes pewny ze chcesz usunac zaznaczone pytania ?',
    DeletedQuarter: 'Ta rozmowa kwartalna jest usunięta'
  },
  EditQuestion: {
    EditingHeaderModal: 'Aktualnie edytujesz zaznaczone pytanie',
    Confirm: 'Potwierdź',
    Answer: 'Odpowiedź',
    InsertAnswer: 'wprowadź odpowiedź na pytanie'
  },
  EmployeeTable: {
    AddedBy: 'Dodany przez',
    Project: 'Projekt',
    Role: 'Rola',
    StartDate: 'Data rozpoczęcia',
    EndDate: 'Data zakoczenia',
    EmptyAssignments: 'Puste przypisania'
  },
  ActivateCheckbox: {
    ShowDeleted: 'Pokaż usunięte'
  },
  EmployeeCertificates: {
    Add: 'Dodaj',
    Name: 'Nazwa',
    Description: 'Opis',
    Date: 'Data',
    Options: 'Opcje',
    Edit: 'Edytuj',
    Delete: 'Usuń',
    Title: 'Certyfikaty',
    Deleting: 'Usunąć certyfikat',
    SuccesfullDelete: 'Pomyślnie usunięto certyfikat'
  },
  EmployeeAddCertificate: {
    Add: 'Dodaj',
    Name: 'Nazwa certifikatu',
    Description: 'Opis',
    Date: 'Data',
    CertificateAddedSuccessfully: 'Certyfikat dodany poprawnie',
    CertificateEditedSuccessfully: 'Certyfikat edytowamy poprawnie',
    AddingCertificate: 'Dodawanie certyfikatu',
    EditingCertificate: 'Edytowanie certyfikatu',
    Edit: 'Zapisz'
  },
  ShareEmployeesModal: {
    ShareEmployees: 'Udostępnij pracowników',
    ChooseEmployeesToShare: 'Wybierz pracowników do udostępnienia',
    ChooseLeader: 'Wybierz lidera',
    SharedEmployees: 'Udostępnieni pracownicy',
    Search: 'Wyszukaj',
    StopSharing: 'Przestań udostępniać',
    Employees: 'Pracownicy',
    ShareTeam: 'Udostępnij team',
    Share: 'Udostępnij'
  },
  ImportCVContainer: {
    Name: 'Nazwa',
    Size: 'Rozmiar',
    LastModifiedDate: 'Data ostatniej modyfikacji',
    Actions: 'Akcje',
    SelectFiles: 'Wybierz pliki',
    DropHere: 'Przeciągnij pliki lub wciśnij przycisk poniżej.',
    OnlyDocx: 'Akceptowane są jedynie pliki z rozszerzeniem .docx',
    Import: 'Importuj',
    Imported: 'Zaimportowano',
    Result: 'Rezultat importu'
  },
  Confirmation: {
    YouAreAboutTo: 'Właśnie chcesz',
    AreYouSure: 'Jesteś pewien?',
    ActionRollbackWarning: 'Cofnięcie tej akcji może być niemożliwe',
    Accept: 'AKCEPTUJ',
    Deny: 'ANULUJ',

  },
  ResultBlock: {
    OperationSuccessful: 'Operacja wykonana pomyślnie',
    BadRequest: 'Nieprawidłowe dane',
    Unauthorized: 'Błąd autoryzacji',
    Forbidden: 'Brak dostępu',
    NotFound: 'Nie znaleziono ścieżki!',
    NotAcceptable: 'Nieakceptowalne dane',
    InternalServerError: 'Wewnętrzny błąd serwera',
    NotImplemented: 'Funkcjonalność jeszcze nie istnieje',
    ServiceUnavailable: 'Serwer niedostępny',
    GatewayTimeout: 'Brak odpowiedzi',
    UnexpectedError: 'Nieoczekiwany błąd',
    ErrorModel: 'Model błędu',
    Error: 'Błąd',
    OK: ''
  },
  AddProjectOwner: {
    Owners: 'Właściciele',
    AddProjectOwner: 'Dodaj właściciela projektu.',
    ChooseAnOwner: 'Wybierz właściciela projektu.',
    EmployeeNotFound: 'Nie znaleziono pracownika.',
    ProjectOwnerHasBeenAdded: 'Właściciel został dodany.',
    Delete: 'Usuń',
    Cancel: 'Anuluj',
    DeleteYourselfeMessage:
      'Czy na pewno chcesz się usunąć z listy właścicieli projektu ?'
  },
  AddProjectScreen: {
    AddProject: 'Dodaj Projekt',
    Next: 'Dalej',
    Insert: 'Wpisz',
    Name: 'Imię',
    Surname: 'Nazwisko',
    Phone: 'Telefon',
    SelectPeopleToContact: 'Wybierz Ludzi do kontaktu',
    ProjectHasBeenAdded: 'Projekt został dodany. Jesteś przekierowywany...',
    Back: 'Cofnij',
    ResponsiblePerson: 'Odpowiedzialna Osoba',
    ProjectName: 'Nazwa projektu',
    CannotContainSpecial: 'Nazwa projektu nie może zawierać znaków specjalnych',
    Description: 'Opis',
    Client: 'Klient',
    Cloud: 'Wybierz chmure',
    ContactPerson: 'Osoba do kontaktu',
    StartDate: 'Data rozpoczęcia',
    EndDate: 'Data zakończenia',
    ProjectAddedSuccessfully: 'Projekt dodano pomyślnie',
    Add: 'Dodaj',
    CloudPlaceHolder: 'wpisz własną lub wybierz chmure z listy',
    ClientPlaceHolder: 'wpisz własnego klienta lub wybierz z listy',
    ContactPerson: 'Wybierz lub dodaj osobę do kontaktu'
  },
  ResponsiblePersonBlock: {
    NameNoSpecial: 'Imię nie może zawierać znaków specjalnych ani cyfr.',
    SurnameNoSpecial: 'Nazwisko nie może zawierać znaków specjalnych ani cyfr.',
    EmailToBeValid:
      'Adres email powinien mieć odpowiednią strukturę, np. me@mydomain.com.',
    NumberValid: 'Numer telefonu powinien zawierać od 9 do 11 cyfr.',
    Back: 'Wróć',
    ResponsiblePerson: 'Osoba odpowiedzialna',
    ProjectHasBeenEdited: 'Projekt został pomyślnie edytowany'
  },
  ProjectRowUnfurl: {
    OwnersList: 'Lista właścicieli',
    ProjectId: 'ID Projektu',
    Description: 'Opis',
    CurrentlyNoSkillsAssigned: 'Obecnie brak przypisanych umiejętności',
    EditSkills: 'Edytuj umiejętności',
    Add: 'Dodaj',
    Save: 'Zapisz',
    More: 'Więcej'
  },
  SkillsSelect: {
    AddNew: 'Dodaj nowy',
    AddingEllipsis: 'Dodawanie',
    Error: 'Błąd'
  },
  EditUserDetails: {
    Confirm: 'Potwierdź',
    RolesSuccessfullyEdited: 'Role edytowano pomyślnie',
    UserSuccesfullyAdded: 'Pomyślnie dodano użytkownika'
  },
  StageOne: {
    getUserByAdSearch: 'Wyszukaj użytkownika w AD',
    UserNotFoundInAD: 'Nie znaleziono użytkownika w AD',
    Next: 'Dalej',
    HasAccount: 'Ten użytkownik posiada już konto w serwisie',
    SelectUser: 'Wybierz użytkownika'
  },
  StageTwo: {
    AddRoles: 'Dodaj role!',
    Back: 'Powrót',
    UserAddedSuccessfully: 'Użytkownik dodany pomyślnie',
    Add: 'Dodaj'
  },
  UserDetailsBlock: {
    UserData: 'Szczegóły użytkownika',
    Name: 'Imię',
    Surname: 'Nazwisko',
    Email: 'Email',
    Phone: 'Telefon',
    Roles: 'Role',
    EditRoles: 'Edycja ról'
  },
  UserRoleAssigner: {
    Developer: 'Developer',
    TeamLeader: 'Team Leader',
    HumanResources: 'Human Resources',
    Tradesman: 'Tradesman',
    Administrator: 'Administrator'
  },
  LoggedInUser: {
    LoggedIn: 'Zalogowany'
  },
  ProjectDetailContainer: {
    Active: 'Aktywny',
    Inactive: 'Nieaktywny',
    EditProject: 'Edytuj projekt',
    Overview: 'Pogląd',
    Client: 'Klient',
    Deleted: 'Usunięty',
    StartDate: 'Rozpoczęty',
    EstimatedEndDate: 'Przewidywany na',
    Name: 'Imię',
    Surname: 'Nazwisko',
    PhoneNumber: 'Nr. telefonu',
    Email: 'Email',
    Owners: 'Właściciele',
    Description: 'Opis',
    Cancel: 'Anuluj',
    Add: 'Dodaj',
    Save: 'Zapisz',
    Edit: 'Edytuj',
    DeleteOwnerFuture:
      'Usunąć {{ownerFullName}} jako właściciela projektu o nazwie {{projectName}}',
    OwnerHasBeenDeleted: 'Właściciel został usunięty',
    ResponsiblePerson: 'Osoba odpowiedzialna',
    Yes: 'Tak',
    No: 'Nie',
    Deactivate: 'Deaktywuj',
    Delete: 'Usuń',
    Close: 'Zamknij',
    Reactivate: 'Reaktywuj',
    CloseProjectInfinitive: 'Zamknąć projekt',
    ProjectClosed: 'Projekt został zamknięty',
    DeleteProjectInfinitive: 'Usunąć projekt',
    ProjectDeleted: 'Projekt został usunięty',
    ReactivateProjectInfinitive: 'Reaktywować projekt',
    ProjectReactivated: 'Projekt został reaktywowany'
  },

  TeamMember: {
    AssignedCapacity: 'Przypisany na etat',
    ProjectRole: 'Rola w projekcie',
    Seniority: 'Poziom pracownika',
    AddedBy: 'Dodany przez',
    ResponsibleFor: 'Odpowiedzialny za',
    Begun: 'Rozpoczął',
    Ends: 'Zakończy'
  },
  SkillsContainer: {
    Deletion: 'Usuwanie',
    Info1:
      "Ten proces jest permanentny. Usuwa wpis z bazy danych i wszystkich powiązanych miejsc.",
    Info2: "Cofnięcie tej akcji jest niemożliwe.",
    SuccessfullyDeleted: "Pomyślnie usunięto umiejętność",
    AllSkills: "Wszystkie umiejętności",
    AddSkillName: "wpisz nazwę nowej umiejętności ...",
    EnterSkillName: "wpisz nazwę umiejętności ...",
    SkillExists: "Ta umiejętność już istnieje",
    SkillName: "Nazwa umiejętności",
    TypeSearch: "wyszukaj umiejętności ...",
    TypeAdd: "podaj nazwę nowej umiejętności ...",
    LoadingSkills: "Ładowanie umiejętności"
  },
  SkillList: {
    DeleteSkill: "Usuń umiejętność",
    EditSkill: "Edytuj umiejętność",
    DeleteSkillQuestion: "Czy na pewno chcesz usunąć skill ",
    SuccessfullyDeletedSkill: "Pomyślnie usunięto skill",
    SkillLenghtError: "Nazwa umiejętności nie może być dłuższa niż 100 znaków",
    NoResults: "Brak wyników dla tego ciągu znaków",
    SaveChanges: "Zapisz zmiany",
    CloseEdit: "Zamknij edycję"
  },
  EmployeesForSkill: {
    EmployeesWithSkill: "Pracownicy posiadający wybraną umiejętność",
    SortingBy: "SORTUJ",
    YearsOfExp: "lata doświadczenia",
    SkillLvl: "poziom umiejętności",
    ChooseOption: "wybierz opcję"
  },
  EmployeeCard: {
    KnowledgeLvl: "wiedzy o wybranej umiejętności",
    More: "WIĘCEJ",
    In: "w",
  },
  FileInput: {
    ChooseFile: 'Wybierz plik',
    WrongFileType: 'Zły format pliku',
    FileIsTooBig: 'Za duży plik',
    WrongAspectRatio: 'Obrazek ma złe proporcje'
  },
  SideProgressBar: {
    Notifications: 'Powiadomienia',
    SuccessFullyGeneratedReport: 'Pomyślnie wygenerowano raport',
    Read: 'Odczytane',
    Unread: 'Nieodczytane',
    Hour: 'godzinę',
    Hours: 'godziny',
    HoursPl: 'godzin',
    Ago: 'temu',
    Day: 'dzien',
    Days: 'dni',
    Month: 'Miesiąc',
    Months: 'miesięcy',
    MonthsPl: 'miesiące',
    Year: 'Rok',
    Years: 'lata',
    OneMinute: 'Minutę',
    Minutes: 'minuty',
    MinutesPl: 'minut',
    MarkAllAsRead: 'Oznacz wszystkie jako przeczytane',
    DeleteAll: 'Usuń wszystkie',
    NoNotifications: 'Nie masz żadnych powiadomień.',
    Tack: 'Zmień pozycję ikony powiadomień'
  },
  Skills: {
    SaveChanges: 'Zapisz zmiany',
    InsertSkillName: 'wpisz nazwę umiejętności...',
    AddSkillToProject: 'Dodaj umiejętność do projektu',
    HideAdded: 'Ukryj dodane',
    ShowAdded: 'Pokaż dodane',
    NoResults: 'Brak wyników dla tego ciągu znaków',
    Confirm: 'Zatwierdź',
    ThatProjectDoesntHavaAnySkillAssigned:
      'Ten projekt nie ma żadnych przypisanych umiejętności.',
    AddSkillsToProject: 'Dodaj umiejętności do projektu'
  },
  Skill: {
    SkillName: 'Nazwa umiejętności',
    YearsOfExperience: 'Lata doświadczenia',
    PutYear: 'Dodaj rok',
    PopYear: 'Zmniejsz o rok',
    DeleteSkill: 'Usuń umiejętność',
    ChangedThings: 'Ta umiejętność jest zmieniona',
    SkillLevel: 'Poziom umiejętności'
  },
  ProjectTeamTable: {
    Add: 'Dodaj',
    Feedback: 'Opinia',
    AddFeedbackPlaceholder: 'dodaj opinię o pracowniku...',
    EditFeedbackPlaceholder: 'edytuj opinię o pracowniku...',
    StartDate: 'Data rozpoczęcia',
    EndDate: 'Data zakończenia',
    AddedBy: 'Dodany do projektu przez',
    Responsibilities: 'Lista obowiązków',
    AddFeedback: 'Dodaj opinię o pracowniku',
    EditFeedback: 'Edytuj opinię o pracowniku',
    FeedbacksList: 'Lista opini o pracowniku',
    DeleteFeedback: 'Usuń opinię',
    FeedbackDeleted: 'Feedback usunięty pomyślnie',
    AreYouSureYouWantToDeleteFeedback: 'Czy na pewno chesz usunąć feedback?',
    Delete: 'Usuń',
    Cancel: 'Anuluj',
    NoFeedbacks: 'Brak opini o tym pracowniku',
    ShowFeedbacks: 'Zobacz opinie',
    AddFeedbackShort: 'Dodaj opinię',
    EditFeedbackShort: 'Edytuj opinię',
    FeedbackAdded: 'Pomyślnie dodano opinie',
    FeedbackEdited: 'Pomyślnie edytowano opinie',
    Author: 'Autor',
    DaysAgo: 'dni temu',
    OnDate: 'w dniu',
    GoIntoEmployeeDetails: 'Przejdź do szczegółów pracownika',
    DeleteAssignment: 'Usuń przypisanie',
    EditAssignment: 'Edytuj przypisanie'
  },
  ShareProject: {
    ShareProject: 'Udostępnij projekt',
    Confirm: 'Zatwierdź',
    ChangesSaved: 'Zmiany zostały zapisane',
    NotFound: 'Nie znaleziono',
    SelectPersons: 'Wybierz osoby',
    Shared: 'Udostępnione'
  },
  Info: {
    YourRoleIs: 'Twoja rola to',
    RoleError: 'Ups, coś poszło nie tak....',
    SearchingUsersAccounts: 'Wyszukiwanie Kont Użytkowników',
    EditingUsersRoles: 'Edytowanie Roli Użytkowników',
    SearchingAD: 'Wyszukiwanie Pracowników w Active Directory',
    AddingUser: 'Dodawanie Kont Użytkowników',
    ReactivatingUser: 'Reaktywowanie Kont Użytkowników',
    DeletingUserRequest: 'Usuwanie próśb o Konto Użytkowników',
    DeletingUser: 'Usuwanie Kont Użytkowników',
    SearchingProjects: 'Wyszukiwanie Projektów',
    AddingProject: 'Dodawanie projektu',
    EditingProject: 'Edytowanie projektu',
    ProjectDetails: 'Szczegóły projektu',
    AddingProjectOwners: 'Dodawanie właścicieli projektu',
    DeletingProjectOwners: 'Usuwanie właścicieli projektu',
    ClosingProject: 'Zamykanie projektu',
    ReactivatingProject: 'Reaktywacja projektu',
    SettingProjectSkills: 'Ustawianie umiejętności w projekcie',
    DeletingProject: 'Usuwanie projektu',
    GettingSuggestedEmployees: 'Pobieranie sugerowanych pracowników',
    GettingListOfClients: 'Wyświetlanie Listy Klientów',
    AddingClient: 'Dodawanie Klientów',
    DeletingClient: 'Usuwanie Klientów',
    EditingClient: 'Edytowanie Klientów',
    ReactivatingClient: 'Reaktywowanie Klientów',

    GettingEmployeeAssignments: "Pobieranie przypisania pracownika",
    GettingProjectAssignments: "Pobieranie przypisania projektu",
    AddingAssignment: "Przypisanie pracownika do projektu",
    EditingAssignment: "Edytowanie przypisania",
    DeletingAssignment: "Usuwanie przypisania",

    GettingEmployeeCertificates: 'Pobieranie certyfikatów pracownika',
    EditingCertificate: 'Edytowanie certyfikatu',
    AddingCertificate: 'Dodawanie certyfikatu',
    DeletingCertificate: 'Usuwanie certyfikatu',

    AddingCloud: 'Dodawanie chmury',
    EditingCloud: 'Edytowanie chmury',
    DeletingCloud: 'Usuwanie chmury',
    ReactivatingCloud: 'Reaktywacja chmury',

    ImportingCV: 'Importowanie CV',

    GettingEmployee: 'Pobieranie danych pracownika',
    GettingEmployeeCapacity: 'Pobieranie obłożenia pracownika',
    GettingEmployeesAndManagers: 'Pobieranie danych pracowników i menadżerów',
    GettingEmployeeOnboards: 'Pobieranie onboardów pracownika',
    GettingEmploContact: 'Pobieranie kontaktu do pracownika z Emplo',
    GettingEmploSkills: 'Pobieranie umiejętności pracownika z Emplo',
    SearchingEmployees: 'Wyszukiwanie pracownikow',
    AddingEmployees: 'Dodawanie pracowników',
    AddingEmployeeOnboard: 'Dodawanie onboardu pracownikowi',
    DeletingEmployeeOnboard: 'Usuwanie onboardu pracownikowi',
    DeletingEmployee: 'Usuwanie pracownika',
    SettingEmployeeSkills: 'Ustawienie umiejętności pracownikowi',
    SettingEmployeeFLanguages: 'Ustawienie języków obcych pracownikowi',
    SettingEmployeeSkype: 'Ustawienie nazwy Skype pracownikowi',
    EditingEmployeeOnboard: 'Edytowanie onboardu pracownika',
    ReactivatingEmployee: 'Reaktywacja pracownika',

    GetFeedbackByEmployee: 'Pobieranie feedbacków pracownika',
    GetFeedbackByEmployeeInProject: 'Pobieranie feedbacków pracownika w projekcie',
    AddFeedback: 'Dodawanie feedbacku',
    DeleteFeedback: 'Usuwanie feedbacku',

    LoginGDrive: 'Logowanie do usługi GDrive',
    GenerateShareLinkGDrive: 'Generowanie linku do udostępnienia w usłudze Google Drive',
    GetFoldersGDrive: 'Pobieranie folderów w usłudze Google Drive',
    DeleteFolderGDrive: 'Usuwanie folderów w usłudze Google Drive',
    UpdateFolderGDrive: 'Aktualizacja folderów w usłudze Google Drive',
    CreateFolderGDrive: 'Dodawanie folderów w usłudze Google Drive',
    UploadFolderGDrive: 'Wysyłanie folderu do usługi Google Drive',

    DeleteNotifications:'Usuwanie powiadomień',
    GetAllNotifications:'Pobieranie wszystkich powiadomień',
    MarkAsReadNotification:'Oznaczanie powiadomień jako przeczytane',

    GetRedirectLinkOneDrive: 'Pobieranie linku do przekierowania do usługi OneDrive',
    SendQueryToAuthOneDrive: 'Wysyłanie query do autoryzacji w usłudze OneDrive',
    RefreshTokenOneDrive: 'Odświeżanie tokena w usłudze OneDrive',
    GenerateShareLinkOneDrive: 'Generowanie linku do udostępnienia w usłudze OneDrive',
    GetFoldersOneDrive: 'Pobieranie folderow w usłudze OneDrive',
    CreateFolderOneDrive: 'Dodawnia folderu w usłudze OneDrive',
    DeleteFolderOneDrive: 'Usuwanie folderu w usłudze OneDrive',
    UpdateFolderOneDrive: 'Aktualizacja folderu w usłudze OneDrive',
    UploadFileOneDrive: 'Wysyłanie plików do usługi OneDrive',

    EditQuarterTalk: 'Edytowanie rozmów kwartalnych',
    GetQuarterTalkForEmployee: 'Pobieranie rozmow kwartalnych pracownikowi',
    GetQuarterTalkReservedDates: 'Pobieranie zarezerwowanych dat na rozmowy kwartalne',
    AddQuarterTalk: 'Dodawanie rozmów kwartalnych',
    PlanQuarterTalk: 'Planowanie rozmów kwartalnych',
    AddQuestion: 'Dodawanie pytania do rozmowy kwartalnej',
    DeleteQuestion: 'Usuwanie pytania z rozmowy kwartalnej',
    ReactivateQuarterTalk: 'Reaktywacja rozmowy kwartalnej',
    DeleteQuarterTalk: 'Usuwanie rozmowy kwartalnej',
    GenerateQuarterTalkDoc: 'Generowanie pliku .doc z rozmową kwartalną',
    GetQuestions: 'Pobieranie pytań',

    GenerateReport: 'Generowanie raportu',
    GenerateCv: 'Generowanie CV pracownika',
    GenerateCvWord: 'Generowanie CV pracownika w formacie .doc',
    GetFeedback: 'Pobieranie feedbacków',
    GetCv: 'Pobieranie CV',
    GetTeams: 'Pobieranie zespołów',
    GetReportExcel: 'Pobieranie raportu w formacie .xlsx',
    GetReportZip: 'Pobieranie raportu w formacie .zip',
    GetRecentReports: 'Pobieranie najczęściej generowanych raportów',
    UnfavoriteReport: 'Usuwanie raportu z ulubionych',

    GetResponsiblePersonByClientId: 'Pobieranie osób odpowiedzialnych u klienta',
    GetResponsiblePersonById: 'Pobieranie osoby odpowiedzialnej',
    EditResponsiblePerson: 'Edytowanie osoby odpowiedzialnej',
    AddResponsiblePerson: 'Dodawanie osoby odpowiedzialnej',
    DeleteResponsiblePerson: 'Usuwanie osoby odpowiedzialnej',
    ReactivateResponsiblePerson: 'Reaktywacja osoby odpowiedzialnej',

    GetAllSkills: 'Pobieranie wszystkich umiejętności',
    GetSkillById: 'Pobieranie pojedynczej umiejetności',
    AddSkill: 'Dodawanie umiejętności',
    DeleteSkill: 'Usuwanie umiejętności',
    EditSkill: 'Edycja umiejętności',

    GetStats: 'Pobieranie statystyk',

    GetAllRoles: 'Pobieranie ról',
    AddRole: 'Dodawanie roli',
    EditRole: 'Edytowanie roli',
    DeleteRole: 'Usuwanie roli',

    ShareProject: 'Udostępnianie projektu',
    GetManagersSharedProject: 'Pobranie menadżerów udostępnionego projektu',
    GetAlreadySharedManagers: 'Pobieranie udostępnionych managerów',

    AddWorkExperience: 'Dodawanie doświadczenie',
    GetWorkExperience: 'Pobieranie doświadczenia',
    EditWorkExperience: 'Edycja doświadczenia',
    DeleteWorkExperience: 'Usuwanie doświadczenia',
    GetWorkExperienceByEmployeeId: 'Pobieranie doświadczenia pracownika'
  },
  ReportsCloudView: {
    LoadingAccountDataPrompt:
      'Trwa pobieranie zawartości chmury. Proszę czekać...',
    ActualPath: 'Aktualna ścieżka',
    AddFolder: 'Dodaj folder',
    Create: 'Stwórz',
    WriteFolderName: 'wpisz nazwę folderu...',
    Back: 'Cofnij',
    ThisFolderIsEmpty: 'Ten folder jest pusty...',
    Refresh: 'Odśwież',
    AreYouSureToDelete: 'Czy jesteś pewny, że chcesz usunać ten folder',
    Delete: 'Usuń',
    Deny: 'Anuluj',
    SuccCreatedFolder: 'Folder pomyślnie utworzony',
    SuccEditedFolder: 'Folder został pomyślnie edytowany',
    SuccDeletedFolder: 'Folder został usunięty',
    SuccAddedFile: 'Pilk został pomyślnie dodany'
  },
  FilePicker: {
    SelectFileToAdd: 'wybierz plik do dodania...',
    Send: 'Prześlij'
  },
  Files: {
    Sort: 'Sortuj',
    Deny: 'Anuluj',
    Confirm: 'Potwierdź',
    OpenFolder: 'Przejdź do tego folderu',
    DeleteFolder: 'Usuń ten folder',
    Edit: 'Edytuj',
    ChooseFolderForLink: 'Stwórz link do udostępnienia',
    Type: 'Typ',
    Size: 'Rozmiar',
    Path: 'Ścieżka',
    Open: 'Otwórz',
    ChooseFolderToGenerate: 'Wybierz ten folder, aby wygenerować raport'
  },
  ReportsContainer: {
    FavReports: 'Ulubione raporty',
    LastReports: 'Ostatnie raporty',
    Back: 'Wróć'
  },
  ReportsNavigation: {
    FirstPage: 'Wybierz drużyny',
    SecondPage: 'Wybierz rodzaj chmury',
    GDrivePage: 'Wybierz folder docelowy z twojego dysku Google Drive',
    OneDrivePage: 'Wybierz folder docelowy z twojego dysku One Drive',
    SearchTeamPlaceholder: 'wpisz nazwę drużyny...',
    Generate: 'Generuj',
    Teams: 'Drużyny',
    Folders: 'Foldery',
    AddItems: 'dodano',
    FoundItems: 'znaleziono',
    First: 'pierwszy',
    Secondly: 'drugi',
    LastStepName: 'ostatni',
    StepName: 'etap generowania raportów'
  },
  ReportsContent: {
    NotFoundResults: 'Brak wyników dla podanego ciągu znaków',
    AllTeams: 'Lista drużyn',
    NumberOfEmployees: 'Liczba pracowników'
  },
  ReportsPresets: {
    Page: 'Strona',
    SelectThisTeams: 'Wybierz',
    Delete: 'Usuń',
    Team: 'Drużyna'
  },
  GenerateReportModal: {
    GenerateReportModalTitle: 'Wybierz ilość stron dla poszczególnych drużyn',
    Delete: 'Delete',
    Employees: 'Liczba pracowników',
    Identity: 'Identyfikator',
    Size: 'Rozmiar',
    Name: 'Nazwa',
    CreationDate: 'Data utworzenia',
    Path: 'Ścieżka',
    ClickHere: 'Kliknij tutaj',
    FirstInfo:
      'Aby wygenerować raport musisz wybrać folder docelowy. Folder docelowy znajdziesz na jednym z dysków umieszczonych w GoogleDrive lub OneDrive.',
    SecondInfo: 'aby przejść dalej',
    EmployeesInDay: 'Tylko pracownicy dostępni w dniu',
    AddFav: 'Dodaj ten raport do ulubionych',
    SuccGenReport: 'Raport został pomyślnie wygenerowany',
    GenReport: 'Generuj raport',
    CurrentCreatedLink: 'Link został utworzony',
    CreatingLink: 'Link do udostępnienia jest tworzony',
    CreatedLink: 'Stworzony link do udostępnienia',
    OpenIn: 'Otwórz w',
    Open: 'Otwórz',
    Close: 'Zamknij',
  }
};

export default translations;
