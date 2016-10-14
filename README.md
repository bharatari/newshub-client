# <a href='http://www.arimilli.io'><img src='http://www.arimilli.io/logo/newshub-client.png' height='80'></a>

The client implementation of the NewsHub project built on React and Redux.

# Project Conventions

## Structure

Layouts are pure components that provide a common structure to multiple views.

Containers are general-use containers. Containers that are linked to routes and views go in the routes folder.

A "page" or "route" in the application is made up of a route (container component), a view (dumb component) and (usually) an associated set of styles (with CSS Modules).

## Naming Conventions

Under each folder, there's no need to append the type of file. Under Route, for example, you don't need to have HomeRoute, ProductRoute, all you need is Home, Product. Outside of this context, each file is known as its name with the type of file appended to it.

React Components are UpperCamelCase, while others are lowerCamelCase.

## License

Copyright (c) 2015 Bharat Arimilli
