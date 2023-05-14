const { test, expect } = require('@playwright/test');

exports.LoginPage = class LoginPage{

    constructor(page){
        this.page=page
    }

}