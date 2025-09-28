# Slash Command Deployment
This directory contains the code for the GitHub action that allows for slash command deployment from GitHub. To make any changes to the action code, make sure to run `npm install` to install all the required dependencies, and then run `ncc build index.js` to compile the code into the `dist` directory. This will require `ncc` to be installed globally, which can be achieved through running `npm i -g @vercel/ncc`

### Local Deployment
To deploy slash commands locally, run `npm run local`\
Again, make sure to run `npm install` to install all required dependencies.