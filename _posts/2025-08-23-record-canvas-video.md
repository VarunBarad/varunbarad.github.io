---
tags:
  - post
layout: post
title: "📝 Record HTML &lt;canvas&gt; video using JavaScript"
summary: "TIL: How to record a video of the HTML canvas element using JavaScript"
date: 2025-08-23T16:14:07+0530
categories:
  - "til"
  - "blaugust-2025"
  - "javascript"
  - "programming"
---

You can record a `canvas` element into a video without requiring any screen-recording permissions from the user. We use the `canvas.captureStream` and `MediaRecorder` API to do that.

## Setup

Our example has a canvas, two buttons (to start and stop the recording) and a status message. We record the video of canvas and then download it once the recording is finished.

```javascript
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;

const canvas = document.getElementById('gameCanvas');
const buttonStartRecording = document.getElementById('startRecord');
const buttonStopRecording = document.getElementById('stopRecord');
const status = document.getElementById('status');
```

## Start recording

We get the video stream from a canvas with `canvas.captureStream` and specify our desired FPS there. Then we feed it to the `MediaRecorder` instance. Lastly, when the media-recorder receives the stop command, it will start downloading the recorded video.

```javascript
const startRecording = async () => {
	try {
		// Request a stream at 30 FPS
		const stream = canvas.captureStream(30);
		
		mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
		recordedChunks = [];
		
		mediaRecorder.addEventListener('dataavailable', (event) => {
			if (event.data.size > 0) {
				recordedChunks.push(event.data);
			}
		});
		
		mediaRecorder.addEventListener('stop', () => {
			downloadRecording();
		});
		
		mediaRecorder.start();
		isRecording = true;
		
		updateUi();
	} catch (error) {
		console.error('Error starting recording:', error);
		alert('Error starting recording:', error.message);
	}
};

buttonStartRecording.addEventListener('click', startRecording);
```

## Stopping the recording

We simply ask the `mediaRecorder` to stop recording, and it fires the `stop` event on itself which then triggers the download.

```javascript
const stopRecording = () => {
	if (mediaRecorder && isRecording) {
		mediaRecorder.stop();
		isRecording = false;
		updateUi();
	}
};

buttonStopRecording.addEventListener('click', stopRecording);
```

## Downloading the video

We add an invisible `<a>` element and then click it.

```javascript
const downloadRecording = () => {
	if (recordedChunks.length === 0) {
		alert('No recording data available!');
		return;
	}
	
	const blob = new Blob(recordedChunks, { type: 'video/webm' });
	
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	
	a.download = `canvas-recording-${Date.now()}.webm`;
	
	document.body.appendChild(a);
	a.click();
	
	setTimeout(() => {
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, 100);
	
	recordedChunks = [];
};
```
