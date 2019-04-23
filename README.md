Employee Management App
========================

## Installation Instructions:

Note: This is for running the app in Windows 10 64bit Environment

1. Download the recommended version of NodeJS from this site: https://nodejs.org/en/
2. Download MongoDB from this site(https://www.mongodb.com/download-center/community) and install it "as a Service"
3. Open a command prompt or powershell and install Angular CLI with this command: ```npm install -g @angular/cli```
4. Download git from this page: https://git-scm.com/download/win
5. Open again a command prompt then go to any directory that you want (e.g. ```cd C:/path/chosen```)
6. Clone this repository using ```git clone https://github.com/kdvsolis/EmployeeManagementApp.git```
7. In the same command prompt, do ```cd ./EmployeeManagementApp``` then do command ```npm update```

## App Usage:

1. Open command prompt then do ```cd C:/path/to/directory``` 
2. Run app using command ```npm start``` 
3. Open a browser then go to page http://localhost:3000
4. Login with the app with user/pass of root/root
5. You will be redirected to Employee list page that looks like this: 
![Main Page](https://raw.githubusercontent.com/kdvsolis/EmployeeManagementApp/master/screenshots/landingpage.png)
6. As shown on the image above, you can click the purple "+" icon to add new employee and it will direct you to this page as shown below:
![Sample form](https://raw.githubusercontent.com/kdvsolis/EmployeeManagementApp/master/screenshots/registerpage.png)
7. It will show you the newly registered employee
![New profile](https://raw.githubusercontent.com/kdvsolis/EmployeeManagementApp/master/screenshots/newprofile.png)
8. As shown on the image above, you can click the purple "+" icon to add new employee time in out records and it will direct you to this page as shown below:
![New Entry Log](https://raw.githubusercontent.com/kdvsolis/EmployeeManagementApp/master/screenshots/addnewlog.png)
9. It should show you this page with new entry:
![Detail Entry Log](https://raw.githubusercontent.com/kdvsolis/EmployeeManagementApp/master/screenshots/profilepage.png)
10. Now going back with the main page by clicking "Employees" in the left most corner, you can either view, edit or delete profile shown in the buttons at the right most of the table:
![Main Page 2](https://raw.githubusercontent.com/kdvsolis/EmployeeManagementApp/master/screenshots/landingpage2.png)



## References:
https://medium.com/@maheshkariya/mean-stack-angular-6-crud-web-application-8c92ae93690f
https://www.toptal.com/angular/angular-6-jwt-authentication