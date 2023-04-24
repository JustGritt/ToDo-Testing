class User {

    constructor(email, firstName, lastName, birthDate) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    isMailValid() {
        return this.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) !== null;
    }

    isAbove13() {
        return this.birthDate < new Date().setFullYear(new Date().getFullYear() - 13);
    }
}

export default User;