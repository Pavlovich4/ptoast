ptoast is a light weight Javascript package for toast notification using tailwindcss

## How to use
This package require tailwindcss so don't forget to install tailwindcss and configure it
##### install package from npm
```bash
npm install p-toast 
#or
yarn install p-toast
```
##### Import module to your script
```javascript
import {toast} from 'p-toast';
```
##### Add to `tailwind.config.js` file
```diff
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    +"./node_modules/p-toast/src/*.ts"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

##### Use
```javascript
toast.success('My title', 'My first toast !!');
toast.error('My title', 'My first toast !!');
```
##### Use with own options
```javascript
toast.withOptions({
    duration: 5000, // default,
    position: 'top-right'
    /*...*/
}).success();
//or
toast.options = {
    duration: 5000, // default,
    position: 'top-right'
    /*...*/
}
```

### Animation
By default, the toast won't be animated. If you want to add some animation to the toast you need to add this to you js :

```javascript
import 'p-toast/ptoast.css'
```

##### Available options are : `slideUp`, `slideDown`, `slideRight`, `slideLeft`, `fadeIn`
you can add them via the default option like this `toast.withOptions({animation: 'slidUp'})`
## Progress Bar
By default, each toast you'll fire will show a progress bar. If you want to disable this just use the option `progress` like this
`toast.withOptions({progress: false})...`

## Close button
By default, each toast has a close button. To disable it do this :
`toast.withOptions({close: false})...`


##### Available methods
- `success`to fire success toast
- `warning`to fire warning toast
- `info`to fire blue toast
- `error`to fire error toast
- `withOptions` to define toast options
    - `duration` in ms: define the number of seconds the toast should be shown (default to 5000ms)
    - `position`: the `position` of the toast (available : `top-right`, `top-left`, `bottom-right`, `bottom-left`)

## TODO

- ⏳Should stop/pause the progress if hover
- ⏳add more options
- ⏳Add prettier