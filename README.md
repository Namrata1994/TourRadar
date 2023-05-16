## How to Run the script?
Step1: Create a Directory
Step2: Clone Git Repository to the mentioned folder
Step3: Open Command Prompt
Step4: change directory to the path where the Repository is cloned.
Step5: Run Command npm init playwright@latest
        √ Do you want to use TypeScript or JavaScript? · JavaScript
        √ Where to put your end-to-end tests? · tests This folder has dummy test cases
        √ Add a GitHub Actions workflow? (y/N) · false
        √ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true

Step6: Run npx playwright test TourRadar.spec.js --headed

Follow https://playwright.dev/docs/intro for details

