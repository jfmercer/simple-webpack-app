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
