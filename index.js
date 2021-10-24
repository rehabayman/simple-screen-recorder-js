
$("#record-btn").click(async function () {
  // display sharing options [entire screen, window or tab]
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  });

  // needed for better browser support
  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
    ? "video/webm; codecs=vp9"
    : "video/webm";

  let mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime
  });

  // store the recorded data
  let chunks = [];
  mediaRecorder.addEventListener('dataavailable', function (e) {
    chunks.push(e.data)
  });

  // when user stops recording, download the video and play it in a video control
  mediaRecorder.addEventListener('stop', function () {
    let blob = new Blob(chunks, {
      type: chunks[0].type
    });
    let url = URL.createObjectURL(blob);

    $('.video').attr('src', url);
    $('.video').removeAttr('hidden');

    let a = document.createElement('a');
    a.href = url;
    a.download = `video-${Date.now()}.webm`;
    a.click();
  });

  // we have to start the recorder manually
  mediaRecorder.start();
});