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
npm install webpack -g
```
*This makes the webpack command available.*

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
webpack ./entry.js bundle.js
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
webpack ./entry.js bundle.js
```

Update your browser window and you should see the text `It works from content.js.`

#### Step 3:

We want to add a CSS file to our application.

webpack can only handle JavaScript natively, so we need the `css-loader` to process CSS files. We also need the `style-loader` to apply the styles in the CSS file.

Run `npm install css-loader style-loader` to install the loaders. (They need to be installed locally, without `-g`) This will create a `node_modules` folder for you, in which the loaders will live.

Let’s use them:

add `style.css`

```js
body {
    background: yellow;
}
```

update `entry.js`

```js
+ require("!style!css!./style.css");
document.write(require("./content.js"));
```

Recompile and update your browser to see your application with yellow background.

#### Step 4:

We don’t want to write such long requires `require("!style!css!./style.css");`

We can bind file extensions to loaders so we just need to write: `require("./style.css")`

update `entry.js`

```js
- require("!style!css!./style.css");
+ require("./style.css");
  document.write(require("./content.js"));
```

Run the compilation with:

```js
webpack ./entry.js bundle.js --module-bind 'css=style!css'
```

> Some environments may require double quotes: –module-bind “css=style!css”

You should see the same result.