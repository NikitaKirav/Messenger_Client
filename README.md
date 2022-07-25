# Messenger. Client part.

![screenshot of Messenger](https://kirav.ru/images/articles/images_for_github/messenger_client/20220722152800screen-messenger-min.jpg)

This project is an example of [Messenger](https://kirav.ru/works/messenger/). It had educational purposes and now you can see a result in my code here. 
This is a big learning project with a lot of complex stuff. I take ideas from modern messengers and social networks and try to repeat the result as fully as possible.

At this moment it has the following opportunities:
1) Registration and login pages. You can register in system and see how it works.
2) Profile page with a posts list. You can upload your avatar and edit its frames. Edit status and user's information. You can add your post to any user's profile. Add likes or dislikes.
3) User's list page. You can follow and unfollow any user.
4) User's chat list. Here, you can find all your chats and follow the ones.

Project uses the following technologies:
- [x] Frontend: React + Redux, Sagas, TypeScript
- [ ] Backend: NodeJS + Express + Mongoose
- [ ] Database: MongoDb

Frontend and Backend part have unit and integration tests.

- [x] - current repository

Also you can find Dockerfile.prod in the project. You may use it if you like, it saves a lot of time.
This project was prepared with another big project [KiravRu_WebApi](https://github.com/NikitaKirav/KiravRu_WebApi). There you can find a file docker-compose.yml, nginx.conf and also some useful bash scripts (for Deployment Automation and getting free ssl for your site).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/works/messenger](http://localhost:3000/works/messenger) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
