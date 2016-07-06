# NewsHub Client

# Project Structure

Layouts are pure components that provide a common structure to multiple views.

Containers are general-use containers. Containers that are linked to routes and views go in the routes folder.

A "page" in the application is made up of a route (Container component) and a view (dumb component).

Under each folder, there's no need to append the type of file. Under Route, for example, you don't need to have HomeRoute, ProductRoute, all you need is Home, Product. Outside of this context, each file is known as its name with the type of file appended to it.

React Components are UpperCamelCase, while others are lowerCamelCase.
