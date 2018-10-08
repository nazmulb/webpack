# webpack

## What is webpack?
webpack is a module bundler for modern JavaScript applications. webpack takes modules with dependencies and generates static assets representing those modules.

<img src="https://raw.githubusercontent.com/nazmulb/webpack/master/what-is-webpack.png" alt="webpack - module bundler" width="500" />

## What are the advantages of webpack?

- It can bundle both sync and async modules dependencies.
- It will give one single js file so browser can cache the file and performance will be improved.
- Keep initial loading time low.
- Using it's loader you can transpiling ES6, ReactJS, ect to javascript so that browser could understand.
- Ability to integrate 3rd-party libraries as modules.
- It has watcher which automatically build when any source code changes.
- webpack-dev-server binds a small express server on localhost:8080 which serves your static assets as well as the bundle (compiled automatically). It automatically updates the browser page when a bundle is recompiled (SockJS).
- Suited for big projects

## Work with webpack:

### Install webpack

You need to have <a href="https://nodejs.org/en/">node.js</a> installed.

```js
npm install webpack --save-dev
```

If you're using webpack v4 or later, you'll need to install the CLI.

```js
npm install webpack-cli --save-dev
```

#### Step 1:

Start with a empty directory. Create these files:

add `entry.js`

```js
document.write("It works.");
```

add `index.html`

```js
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
    </body>
</html>
```

Then run the following:

```js
../node_modules/.bin/webpack --mode development ./entry.js bundle.js
```

It will compile your file and create a bundle file. Open `index.html` in your browser. It should display `It works`.

#### Step 2:

Next, we will move some code into an extra file.

add `content.js`

```js
module.exports = "It works from content.js.";
```

update `entry.js` ( - means remove, + means add the code)
```js
- document.write("It works."); // remove this code
+ document.write(require("./content.js")); //add this code
```

And recompile with:

```js
../node_modules/.bin/webpack --mode development ./entry.js bundle.js
```

Update your browser window and you should see the text `It works from content.js.`

#### Step 3:

We want to add a CSS file to our application.

webpack can only handle JavaScript natively, so we need the `css-loader` to process CSS files. We also need the `style-loader` to apply the styles in the CSS file.

Run `npm install css-loader style-loader --save` to install the loaders. (They need to be installed locally, without `-g`) This will create a `node_modules` folder for you, in which the loaders will live.

Let’s use them:

add `style.css`

```js
body {
    background: yellow;
}
```

update `entry.js`

```js
+ require("!style-loader!css-loader!./style.css");
document.write(require("./content.js"));
```

Recompile and update your browser to see your application with yellow background.

#### Step 4:

We don’t want to write such long requires `require("!style-loader!css-loader!./style.css");`

We can bind file extensions to loaders so we just need to write: `require("./style.css")`

update `entry.js`

```js
- require("!style-loader!css-loader!./style.css");
+ require("./style.css");
  document.write(require("./content.js"));
```

Run the compilation with:

```js
../node_modules/.bin/webpack --mode development ./entry.js bundle.js --module-bind 'css=style-loader!css-loader'
```

> Some environments may require double quotes: –module-bind “css=style-loader!css-loader”

You should see the same result.

#### Step 5:

We want to move the config options into a config file:

add `webpack.config.js`

```js
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};
```

Now we can just run:

```js
../node_modules/.bin/webpack --mode development
```

- The entry point tells webpack where to start. You can think of your application's entry point as the **contextual root** or **the first file to kick off your app**.
- Once you've bundled all of your assets together, you still need to tell webpack **where** to bundle your application. The webpack output property tells webpack **how to treat bundled code**.
- Loaders are special modules webpack uses to ‘load’ other modules (written in another language) into JavaScript (that webpack understands).
  - `module.rules`: Allows you to specify several loaders within your webpack configuration. Each item can have these properties:
      - `test`: A condition that must be met
      - `exclude`: A condition that must not be met
      - `include`: An array of paths or files where the imported files will be transformed by the loader
      - `loader`: A string of “!” separated loaders
      - `options`: Options for the loader

More info about <a href="https://webpack.js.org/concepts/">core concepts</a> and <a href="https://webpack.js.org/configuration/">configuration</a>.

##### Watch mode:

We don’t want to manually recompile after every change…

```js
../node_modules/.bin/webpack --mode development --watch
```
Webpack can cache unchanged modules and output files between compilations.

##### Development Server: for more click <a href="https://webpack.js.org/configuration/dev-server/">here</a>

The development server is even better.

```js
npm install webpack-dev-server --save-dev
```

```js
../node_modules/.bin/webpack-dev-server --mode development
```

This binds a small express server on `localhost:8080` which serves your static assets as well as the bundle (compiled automatically). It automatically updates the browser page when a bundle is recompiled (SockJS). Open `http://localhost:8080/` in your browser.

> The dev server uses webpack’s watch mode. It also prevents webpack from emitting the resulting files to disk. Instead it keeps and serves the resulting files from memory.

#### Transpiling `ES6` using `babel-loader`. Click <a href="https://github.com/nazmulb/webpack/tree/master/transpiling_es2015">here</a>.

Thanks!