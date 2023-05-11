import React, { useRef } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

const VideoProcessor = () => {
  const operationRef = useRef();
  const fileInputRef = useRef();

  const processVideo = async (file, operation) => {
    const name = file.name;

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    ffmpeg.FS("writeFile", name, await fetchFile(file));

    if (operation === "transcode") {
      await ffmpeg.run("-i", name, "output.mp4");
      const data = ffmpeg.FS("readFile", "output.mp4");
      // TODO: do something with data
    } else if (operation === "screenshot") {
      await ffmpeg.run(
        "-i",
        name,
        "-ss",
        "00:00:01.000",
        "-vframes",
        "1",
        "output.png"
      );
      const data = ffmpeg.FS("readFile", "output.png");
      // TODO: do something with data
    } else {
      throw new Error(`Invalid operation: ${operation}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const operation = operationRef.current.value;
    const file = fileInputRef.current.files[0];

    if (file) {
      await processVideo(file, operation);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select ref={operationRef} defaultValue="transcode">
        <option value="transcode">Transcode</option>
        <option value="screenshot">Screenshot</option>
      </select>
      <input type="file" ref={fileInputRef} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default VideoProcessor;
