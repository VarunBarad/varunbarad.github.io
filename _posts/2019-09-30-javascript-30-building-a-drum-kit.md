---
layout: post
title:  "JavaScript 30 - Building a Drum Kit"
date:   2019-09-30 12:00:00 +0530
categories:
  - "programming"
  - "web"
  - "javascript-30"
---

I started the JavaScript30 challenge from Wes Bos today and learnt how to build a simple drum-kit. 

<!-- end excerpt -->

[Wes Bos][wes-bos-website]{:target="_blank"} has created a [course][js-30-website]{:target="_blank"} to get you confident in your JS skills in 30 days. In it you work on a new project daily for 30 days and in each project you make something using vanilla JS without any frameworks or libraries.

Today I started the challenge and first project was to make a drum-kit where different sounds are played based on the keyboard button you press. And the corresponding button gets highlighted on screen.

The key concepts I learned from today's challenge were:

- Setting event-listeners with JS
- Working with keyboard events and identifying key-codes
- Playing audio and restarting the audio when it is already playing
- How to sync JS code with CSS transitions
- What value `this` takes inside the event listener function

## Setting event-listeners with JS

The syntax for this is very simple

```javascript
<target-element>.addEventListener('<event-name>', <function-to-call-when-event-is-fired>);
```

You can find a list of supported events [here][js-dom-events-list]{:target="_blank"} but beware, the complete list of events is too large and you might never need to use most of them.

## Working with keyboard events and identifying key-codes

```javascript
function handleKeyDownEvent(event) {
    console.log(event.keyCode);
}

window.addEventListener('keydown', handleKeyDownEvent);
```

Here we attach an event-listener for the `keydown` event to the `window` object since we want to capture the events across our whole web-page.
Then we find out which key was pressed based on the `keyCode` value passed via the fired event.

Wes has created a [nifty little website (https://keycode.info)][keycode-info-website]{:target="_blank"} which we can use to find the corresponding `keyCode` for any key.

## Playing audio and restarting the audio when it is already playing

In this project we have a set of buttons on the screen corresponding to different keys on the keyboard. And each button has a corresponding `<audio>` element on the page. The goal is to play the corresponding audio when a valid key is pressed on the keyboard.

So after detecting which key is pressed using the `keyCode` attribute, we select the corresponding `<audio>` element using a pre-specified `data-key` attribute in HTML and call the `audioElement.play();` method on it.

```javascript
let audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
audioElement.currentTime = 0;
audioElement.play();
```

In the above code-block you might have observed that I set the `current-time` of that element to `0` before calling `play` on it. This is done because when an `audio` is still playing (that is it has not finished) and we call `.play()` on it, this new call gets ignored. Therefore we reset the play-time for that particular audio element so that it correctly registers and plays 2 consecutive commands of the same key.

## How to sync JS code with CSS transitions

When a key is pressed, we highlight the corresponding button for a short duration on the screen while playing sound for it. To highlight the button, we just add a class `playing` to it which scales it up and changes the border a bit. The second part of that is to remove the `playing` class as soon as the transition is finished so as to return the button to normal state.

For this I initially thought of using `setTimeout` with the same time-out as that mentioned in CSS as transition duration. Wes pointed out the flaw in it is that when we decide to update the transition duration we would need to make sure to update it in both the places (in CSS and in JS).

So a better way to synchronize CSS transitions with JS is again to use __events__. Here we specifically use `transitionend` event on the buttons like below.

```javascript
function removeButtonHighlight(event) {
    if (event.propertyName === 'transform') {
        this.classList.remove('playing');
    }
}
document.querySelectorAll('.keys').forEach(button => {
    button.addEventListener('transitionend', removeButtonHighlight);
});
```

In above code, we select each button and then add the `transitionend` event-listener for it so now it will call `removeButtonHighlight` only and exactly when any transition on any of those buttons ends.

After that we simply remove the `playing` class from that button so that it returns back to its original/normal state. You might have noticed that I have put a check of `event.propertyName === 'transform'`. I would suggest you try and remove that check and `console.log` the event to find out why I might have put that check in.

## What value `this` takes inside the event-listener function

One of the toughest concept to learn and correctly understand in JS is `this` or more specifically, what `this` means at different points of execution in our code.

In the last code-block you have noticed that I simply did `this.classList.remove('playing')` instead of trying to select that particular element using any other method.

It is so because in that particular case the value of `this` is whatever object the function `removeButtonHighlight` has been called.

So when we attach an event-listener on each of our button and on triggering of those events, they call `removeButtonHighlight` with the context of that particular button. So there `this` is referring directly to the button on which the event listener has been triggered.

## Conclusion

Hope I have been able to explain what I learned in today's challenge. Hit me up on twitter [@varun_barad][varun-twitter]{:target="_blank"} in case you haven't understood something from this article or you have something new for me to learn.

In any case, don't forget to check out the [JavaScript30 challenge][js-30-website]{:target="_blank"} from Wes Bos. It is an awesome way to get some JS confidence.

[wes-bos-website]: https://wesbos.com
[js-30-website]: https://javascript30.com
[js-dom-events-list]: https://developer.mozilla.org/en-US/docs/Web/Events
[keycode-info-website]: https://keycode.info
[varun-twitter]: https://twitter.com/varun_barad
