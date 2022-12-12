# REACT NATIVE

## Overview

- [Native Components / Core Components](https://reactnative.dev/docs/intro-react-native-components)
- React runtime combined with native components allows rendering native components on Mobile while still using React to control state and update views.

## Helpful Resources

- [New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
  - [Old Architecture](https://levelup.gitconnected.com/wait-what-happens-when-my-react-native-application-starts-an-in-depth-look-inside-react-native-5f306ef3250f) (still interesting)

## Expo

- [introduction](https://docs.expo.dev/introduction/expo/)
  - A set of tools that allows building React Native apps
- Starting up with Expo very easy
- Easy to find components and implement them
- Most components support Web too, however I had some problems with the permissions when trying to use them on Firefox
- Unclear if it is worth any restrictions that come down the road, or whether we would just prefer to have greater control over the building, requirements.


## Bare

- Separate configs for Android and iOS.
  - For example, permissions for Android are defined in `AndroidManifest.xml`
  - Have to learn the respective Android and iOS conventions
  - The bundler `Metro` still takes care of bundling the Javascript code into a native app, so not too involved
- Most components are specialized for use on mobile
  - It's possible to swap out Web components using the `Platform` module



## Cons

- [React Native is not the Future](https://blog.standardnotes.com/40921/no-react-native-is-not-the-future)
