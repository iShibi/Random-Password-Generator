import { Component } from 'react';

class App extends Component {
    state = {
        password: '',
        passwordLength: '16'
    }

    render() {
        return (
            <div className='container'>
                <input ref={(pass) => this.pass = pass} type='text' className='password-field' placeholder='Random Password Will Appear Here...' value={this.state.password} readOnly></input>
                <div className='user-input'>
                    <input type='number' id='pass-len' className='password-length' min='16' max='32' value={this.state.passwordLength} onChange={() => this.passwordLengthHandler()}></input>
                    <button type='submit' className='generate-button' onClick={() => this.passwordHandler(this.state.passwordLength)}>Generate</button>
                    <button type='button' className='copy-button' onClick={() => this.copyPassword()}>Copy</button>
                    <button type='button' className='reset-button' onClick={() => this.resetHandler()}>Reset</button>
                </div>
            </div>
        );
    }

    passwordLengthHandler() {
        const lengthField = document.getElementById('pass-len');
        const passwordLength = lengthField.value;
        this.setState({ passwordLength: passwordLength });
    }

    passwordHandler(passwordLength) {
        const password = this.passwordGenerator(passwordLength);
        this.setState({ password: password });
    }

    copyPassword() {
        const el = this.pass;
        el.focus();
        el.select();
        document.execCommand('copy');
        el.blur();
    }

    resetHandler() {
        this.setState({ password: '', passwordLength: '16' });
    }

    passwordGenerator(passwordLength) {
        let password = '';
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        const specialChar = '#$%&()*+-./:;<=>?@[\]^_{}';

        password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
        let limit = passwordLength - 2;
        for (let i = 0; i < limit; i++) {
            let choice = Math.floor(Math.random() * 4);
            if (choice === 0) {
                password += specialChar[Math.floor(Math.random() * specialChar.length)];
            } else if (choice === 1) {
                password += digits[Math.floor(Math.random() * digits.length)];
            } else if (choice === 2) {
                password += upperCase[Math.floor(Math.random() * upperCase.length)];
            } else {
                password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
            }
        }
        password += upperCase[Math.floor(Math.random() * upperCase.length)];

        return password;
    }
}

export default App;