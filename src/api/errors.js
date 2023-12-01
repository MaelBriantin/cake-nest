export const convertApiError = (codeError) => {
    switch (codeError){
        case 'auth/email-already-exists':
            return 'Cette adresse mail est déjà utilisée.'
        case 'auth/email-already-in-use':
            return 'Cette adresse mail est déjà utilisée.'
        case 'auth/invalid-email':
            return "L'email fourni n'est pas valide ou est déjà attribué."
        case 'auth/user-not-found':
            return 'Nous n\'avons trouvé aucun utilisateur avec ces informations de connexion.'
        case 'auth/invalid-credential':
            return 'Inormations de connexion incorrectes'
        case 'auth/invalid-password':
            return 'Le mot de passe doit contenir au moins 6 caractères'
        case 'auth/weak-password':
            return 'Le mot de passe doit contenir au moins 6 caractères'
        default:
            return 'Oups... Nous rencontrons un problème. Veuillez réessayer plus tard.'
    }
}