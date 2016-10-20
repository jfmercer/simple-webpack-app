# simple-webpack-app
An example of a simple webpack application

### Description
This project is a walkthrough of a very simple webpack configuration that
demonstrates some of webpack's most powerful features. The final product is not
a true webapp, but rather a tiny proof-of-concept with a remarkably sophicated
setup.

### Introduction
`git` is employed here not as simply an historian but also as a pedagogue. Each
commit and its associated tag are steps in the process of learning webpack bit
by bit.

#### Step One: Demonstrate simplest config possible
At a bare minimum, webpack must be installed, there must be an entry
file and an output file. This step installs the single required
dependency, `webpack`, and provides both an entry file and output
file. Simply run `webpack` to see the output file, `bundle.js`. Then
`node bundle.js` will print output to the terminal.

Here are some helpful flags to learn more about each build:

* `--display-modules`
* `--display-chunks`
* `--profile`
* `--watch`

#### Step Two: Demonstrate simple module bundling

For the sake of observing module bundling, `require-me.js` is created,
required by `main.js`, and then bundled by webpack into `bundle.js`. Take a look
inside of `bundle.js` to see how `main.js` and `require-me.js` are bundled
together. Finally, note that webpack protects our code from polluting global
scope. If you want to attach variables to the global scope, you have to tell
webpack explicitly to do so.

#### Step Three: Create a sustainable directory structure

Source code, bundled/built/output code, and configurations all have
their own directories now. Additionally, `webpack-validator` now
validates the webpack configuration.

Note that, after running webpack, there is no HTML in our build! This is
not a mistake: webpack simply does not know about the HTML yet or how to
load it.

#### Step Four: Load HTML

By default, webpack bundles javascript. To get it to load other
filetypes, loaders and plugins must be used. In this commit, `html-loader`
tells webpack how to load HTML files, and `html-webpack-plugin`
injects scripts and links into `index.html` so that they do not have to
be loaded manually. Note that there are no `<script>` tags in the HTML
source file, but they are injected after the build.

#### Step Five: Add ES6 Support

`babel` & the `babel-loader` add support for ES6. Note that `main.js`
now uses `import` rather than `require()`. Test files are excluded from
webpack for the time being because they will be loaded later in a
separate test configuration.

#### Step Six: Pre-load eslint

`eslint` runs as a webpack preLoader. That is, linting is done before
the build, properly speaking, begins.

#### Step Seven, Part I: Observe CSS loading failure

After adding some very complex css rules to our project, and importing
them via our main file, the build fails. Why? It is because webpack does
not natively understand the CSS filetype. We must tell webpack to use
one or more loaders to handle CSS.

#### Step Seven, Part II: Load CSS

By using the style and css loaders, our project can now load CSS.
However, these styles remain embedded in `main.js`. How can the styles
be extracted into their own file?

#### Step Seven, Part III: Extract CSS

The `ExtractTextPlugin` is necessary to extract our styles from `main.js` and
place them in their own file.

#### Step Eight, Part I: Create button component

Using jQuery and Mustache, our app now has a reusable button component.
However, our `main.js` file has ballooned up to 292K! Surely there is a
way to shrink this . . .

#### Step Eight, Part II: Split off button chunk

Using webpack's `require.ensure`, we can split off our fat button from
`main.js`. Now, `main.js` has "lost weight" because the jQuery code
was split off into our button chunk (`1.1.js`). This blurs the line
between our relatively volatile application code and our relatively
stable vendor code. Could we cleanly separate vendor and application
code and, at the same time, reduce the size of our application? Hmm . . .

#### Step Eight, Part III: Create vendor chunk

Many good things were accomplished in this commit. First, all vendor
code now goes to a `vendor` entry so that our application code is cleanly
separated from third party libraries. Secondly, by using the
CommonChunksPlugin, we have created a manifest file which "starts the
whole application and contains the dependency information needed by it"
(SurviveJS - Webpack, p. 40). We'll need this later to help with
caching.

Unfortunately, our `build/` still weighs in at 312K. Isn't there room for
further improvement? Let's look at additional optimizations.

#### Step Eight, Part IV: Create a prod build

A number of optimization plugins were added to optimize our build. It
dropped from 312K to 112K as a result. Not bad! Because optimizations
take time & extend our wait for the build, it makes sense to separate
them into their own prod build in `webpack.prod.js`.

This leaves two separate, but important, questions unanswered. First,
how can we cache our assets in the client's browser so as to reduce, as
much as possible, frequent downloads as the app evolves? Secondly,
rather than re-run the prod build everytime we make a small change,
wouldn't it be better simply to have a separate dev build that shows our
changes instantly?

### Step Nine: Add Hashes for Cache Busting

Our built assets now have hashes appended to their names. This will help
greatly in cache busting as well as in optimizing UX by reducing
download times and frequencies. Our fairly stable--and fat--`vendor` file will
retain the same hash over many, many builds and thus will rarely need to
be redownloaded. In contrast, our small but volatile `main` file will
get a new hash will every update to the app, and so the user's browser
will also download the up-to-date copy.
