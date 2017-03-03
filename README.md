# webpack

#### What is webpack?
webpack is a module bundler for modern JavaScript applications. webpack takes modules with dependencies and generates static assets representing those modules.

<img src="https://raw.githubusercontent.com/nazmulb/webpack/master/what-is-webpack.png" alt="webpack - module bundler" width="400" />

#### What are the advantages of webpack?

- It can bundle both sync and async modules dependencies.
- It will give one single js file so browser can cache the file and performance will be improved.
- Keep initial loading time low.
- Using it's loader you can transpiling ES6, ReactJS, ect to javascript so that browser could understand.
- Ability to integrate 3rd-party libraries as modules.
- It has watcher which automatically build when any source code changes.
- webpack-dev-server binds a small express server on localhost:8080 which serves your static assets as well as the bundle (compiled automatically). It automatically updates the browser page when a bundle is recompiled (SockJS).
- Suited for big projects
