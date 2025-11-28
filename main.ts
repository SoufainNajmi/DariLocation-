// Définition des interfaces
interface ModalElements {
    loginBtn: HTMLButtonElement | null;
    registerBtn: HTMLButtonElement | null;
    loginModal: HTMLElement | null;
    registerModal: HTMLElement | null;
    closeModalButtons: NodeListOf<HTMLButtonElement>;
    switchToRegister: HTMLAnchorElement | null;
    switchToLogin: HTMLAnchorElement | null;
}

interface FormElements {
    loginForm: HTMLFormElement | null;
    registerForm: HTMLFormElement | null;
}

interface MobileElements {
    mobileMenu: HTMLElement | null;
    navLinks: HTMLElement | null;
    authButtons: HTMLElement | null;
}

// Initialisation des éléments
const modals: ModalElements = {
    loginBtn: document.getElementById('loginBtn') as HTMLButtonElement,
    registerBtn: document.getElementById('registerBtn') as HTMLButtonElement,
    loginModal: document.getElementById('loginModal'),
    registerModal: document.getElementById('registerModal'),
    closeModalButtons: document.querySelectorAll('.close-modal') as NodeListOf<HTMLButtonElement>,
    switchToRegister: document.getElementById('switchToRegister') as HTMLAnchorElement,
    switchToLogin: document.getElementById('switchToLogin') as HTMLAnchorElement
};

const forms: FormElements = {
    loginForm: document.getElementById('loginForm') as HTMLFormElement,
    registerForm: document.getElementById('registerForm') as HTMLFormElement
};

const mobile: MobileElements = {
    mobileMenu: document.querySelector('.mobile-menu'),
    navLinks: document.querySelector('.nav-links'),
    authButtons: document.querySelector('.auth-buttons')
};

// Fonctions utilitaires
const showModal = (modal: HTMLElement | null): void => {
    if (modal) {
        modal.style.display = 'flex';
    }
};

const hideModal = (modal: HTMLElement | null): void => {
    if (modal) {
        modal.style.display = 'none';
    }
};

const hideAllModals = (): void => {
    hideModal(modals.loginModal);
    hideModal(modals.registerModal);
};

// Gestion des modales
const initializeModals = (): void => {
    // Ouvrir les modales
    modals.loginBtn?.addEventListener('click', (): void => {
        showModal(modals.loginModal);
    });

    modals.registerBtn?.addEventListener('click', (): void => {
        showModal(modals.registerModal);
    });

    // Fermer les modales
    modals.closeModalButtons.forEach((button: HTMLButtonElement): void => {
        button.addEventListener('click', hideAllModals);
    });

    // Basculer entre les modales
    modals.switchToRegister?.addEventListener('click', (e: Event): void => {
        e.preventDefault();
        hideModal(modals.loginModal);
        showModal(modals.registerModal);
    });

    modals.switchToLogin?.addEventListener('click', (e: Event): void => {
        e.preventDefault();
        hideModal(modals.registerModal);
        showModal(modals.loginModal);
    });

    // Fermer en cliquant à l'extérieur
    window.addEventListener('click', (e: MouseEvent): void => {
        if (e.target === modals.loginModal) {
            hideModal(modals.loginModal);
        }
        if (e.target === modals.registerModal) {
            hideModal(modals.registerModal);
        }
    });
};

// Filtrage des propriétés
const initializeFilters = (): void => {
    const filterButtons = document.querySelectorAll('.filter-btn') as NodeListOf<HTMLButtonElement>;

    filterButtons.forEach((button: HTMLButtonElement): void => {
        button.addEventListener('click', (): void => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach((btn: HTMLButtonElement): void => {
                btn.classList.remove('active');
            });
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Dans une application réelle, vous filtreriez les propriétés ici
            alert(`Filtrage par: ${button.textContent}`);
        });
    });
};

// Gestion des formulaires
const initializeForms = (): void => {
    forms.loginForm?.addEventListener('submit', (e: Event): void => {
        e.preventDefault();
        alert('Connexion en cours...');
        // Dans une application réelle, vous enverriez les données au serveur
        hideModal(modals.loginModal);
    });

    forms.registerForm?.addEventListener('submit', (e: Event): void => {
        e.preventDefault();
        alert('Inscription en cours...');
        // Dans une application réelle, vous enverriez les données au serveur
        hideModal(modals.registerModal);
    });
};

// Menu mobile
const initializeMobileMenu = (): void => {
    mobile.mobileMenu?.addEventListener('click', (): void => {
        if (mobile.navLinks && mobile.authButtons) {
            const isNavVisible = mobile.navLinks.style.display === 'flex';
            mobile.navLinks.style.display = isNavVisible ? 'none' : 'flex';
            mobile.authButtons.style.display = isNavVisible ? 'none' : 'flex';
        }
    });

    // Ajuster l'affichage pour le mobile au redimensionnement
    window.addEventListener('resize', (): void => {
        if (mobile.navLinks && mobile.authButtons) {
            if (window.innerWidth > 768) {
                mobile.navLinks.style.display = 'flex';
                mobile.authButtons.style.display = 'flex';
            } else {
                mobile.navLinks.style.display = 'none';
                mobile.authButtons.style.display = 'none';
            }
        }
    });
};

// Recherche dans la hero section
const initializeSearch = (): void => {
    const searchButton = document.querySelector('.search-box .btn-primary') as HTMLButtonElement;
    const searchInput = document.querySelector('.search-box input') as HTMLInputElement;
    const typeSelect = document.querySelector('.search-box select:nth-of-type(1)') as HTMLSelectElement;
    const budgetSelect = document.querySelector('.search-box select:nth-of-type(2)') as HTMLSelectElement;

    searchButton?.addEventListener('click', (): void => {
        const searchTerm = searchInput?.value || '';
        const propertyType = typeSelect?.value || '';
        const maxBudget = budgetSelect?.value || '';
        
        alert(`Recherche:\nVille: ${searchTerm}\nType: ${propertyType}\nBudget: ${maxBudget} DH`);
    });
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', (): void => {
    initializeModals();
    initializeFilters();
    initializeForms();
    initializeMobileMenu();
    initializeSearch();
    
    console.log('DariLocation - Application initialisée avec TypeScript');
});

// Gestion des erreurs globales
window.addEventListener('error', (e: ErrorEvent): void => {
    console.error('Erreur globale:', e.error);
});