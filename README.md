# Application for repeated practice of learned content

This is an applicaton for repeated practice of learned content. The application has a main page at the path: "/". On the main page there is a brief description of the 
application. To access the application users need to register and then log in.
After loggin in, users can view topics by clicking on them. Users can write questions regarding the topic that they clicked.
Users can also write question answer options to the questions. Users can mark if the answer option it is correct or not by checking a checkbox.
If the users want to take a quiz it is possible by clicking on the link "Quiz" in the nav bar or by accessing the path "/quiz". The user must be logged in to access 
the quiz. If the user tries to access the path "/quiz" or the path "/topics" while not logged in, the user is redirected to the path "/auth/login".
On the main page the user can access the statistics by clicking the link. This shows the application statistics, meaning the amount of topics, the amount of questions
and the amount of answers.

To run the application locally: Run the command "docker-compose up" in the terminal.

Access the application using a browser: http://localhost:7777/

Then run the automatic tests: The tests can be found in the file tests.spec.js that is in the folder "tests" that is in the folder e2e-playwright.

Run the tests by opening up another terminal and paste in the command: 

docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf

To log in as an admin use the credentials:

email: admin@admin.com
pw: 123456