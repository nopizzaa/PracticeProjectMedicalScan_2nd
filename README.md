# 2nd Practice Project
Second practice project for MedicalScan Kft.
## Initial task:

For this task, you'll need to learn how to use the Jitsi API by going through the documentation provided at https://jitsi.github.io/handbook/docs/category/developer-guide. Once you've familiarized yourself with the API, your objective is to create a simple web application (Angular) that utilizes this API. Here's a basic outline of what you need to do:

1. **API Familiarization (Estimated Time: 1 hour):**
    * Go through the documentation provided by Jitsi to understand the features and functionalities offered by their API.
    * Pay close attention to how to integrate and use the API within a web application.

2. **Web Application Development (Estimated Time: 3 hours):**
    * Set up a new web application project
    * Integrate the Jitsi API into your web application according to the documentation.
    * Create a simple user interface that allows users to interact with the Jitsi features exposed by the API.
    * Test the functionality of your web application to ensure that it works as expected.


3. **Documentation and Submission (Estimated Time: 30 minutes):**
    * Document any challenges you faced during the development process and how you overcame them.
    * Provide clear instructions on how to run your web application locally.
    * Submit your completed task within the designated timeframe.

Remember, the primary goal of this task is to demonstrate your ability to learn and use a new API within a limited time frame. Focus on understanding the basics and implementing a functional web application that showcases your ability to integrate and utilize the Jitsi API effectively. Good luck!

## Build and run:
The following applications are necessary to build and run the project:
- [Node.js](https://nodejs.org/) (Least version: 14.x)
- [Angular CLI](https://angular.io/cli) (Project was generated with Angular version 17.3.0.)
- Git
1. Clone this repository.
   ```bash
   git clone https://github.com/nopizzaa/PracticeProjectMedicalScan_2nd.git
2. Open JitsiApiClient directiory.
   ```bash
   cd JitsiApiClient
3. Install npm dependencies.
   ```bash
   npm install
4. Run with:
   ```bash
   ng serve
5. Navigate to [http://localhost:4200/](http://localhost:4200/)
## Logs:
- (eng) I first tried to run the Jitsi Meet application locally in a dockerized environment, following the instructions from the appropriate Jitsi repository ([link](https://github.com/jitsi/docker-jitsi-meet)). I modifying the docker-compose.yml and env files based on the documentation. Unfortunately, prosody XMPP server elements of the docker stack had refused the connection on localhost domain due to an SSL error. It seems that only communication via HTTPS with the other components of Jitsi is supported, and due to time constraints, I decided to abandon this deployment method for now. Although this solution seemed appealing due to the controlled environment and server logs.

- (hun) Jitsi Meet alkalmazást először lokálisan, dockerizált környezetben próbáltam futtatni. Követtem a Jitsi megfelelő repositoryának instrukcióit ([link](https://github.com/jitsi/docker-jitsi-meet)), módosítottam a docker-compose.yml és env fájlokat a dokumentáció alapján. Viszont sajnálatos módon a docker stack egyik elemét, a Prosody XMPP szervert nem sikerült localhost domainen futtatnom SSL hiba miatt. Letsencrypt segítségével lehetet ki lehetett volna küszöbölni a hibát, mivel úgy tűnik sajnos csak HTTPS-en keresztül kommunikál a Jitsi többi komponensével. Az időkorlát miatt úgy döntöttem, hogy ezt a futtatási módot most elvetem. Pedig a kontrolláltabb környezet miatt vonzónak tűnt ez a megoldás.

<hr>

- (eng) During the implementation of JitsiMeetJS, I encountered an interesting error: `Connection Failed (Logger.js:125 [modules/xmpp/strophe.util.js] <Object.i.Strophe.log>: Strophe: request id 2.2 error 0 happened).` Unfortunately, due to this issue, I was only able to implement the Jitsi iFrame API within the available time, and I couldn't find a solution to this error. It's possible that this functionality is not available in the public Jitsi API. I also attempted to utilize the configuration of a existing Vue.js-based project ([link](https://github.com/jurcello/jitsi-vue-tutorial)) that also uses this API, but I encountered the same error message.

- (hun) A JitsiMeetJS implementációja során egy érdekes hibába ütköztem: `Connection Failed (Logger.js:125 [modules/xmpp/strophe.util.js] <Object.i.Strophe.log>: Strophe: request id 2.2 error 0 happened)`. Ezt a hibát sajnos rendelkezésre álló idő alatt nem sikerült megoldanom így csak a Jitsi iFrame API-t használtam a feladat során. Lehet, hogy a `lib-jitsi-meet API (low level)` API egyáltalán nem érhető el a publikusan? Megpróbáltam egy Vue.js alapú projekt ([link](https://github.com/jurcello/jitsi-vue-tutorial)) konfigurációját felhasználni, amely szintén ezt az API-t használja, de ugyanazt a hibaüzenetet kaptam.