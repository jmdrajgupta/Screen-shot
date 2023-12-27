const screenshotBtn=document.querySelector("#src-btn"),
 screenshotPreview=document.querySelector(".src-preview"),
CloseBtn= screenshotPreview.querySelector("#close-btn");
const captureScreen= async()=>{
    try{
        //asking permission to use a media input to record curent tab
        const stream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab:true});
        const video= document.createElement("video");

        video.addEventListener("loadedmetadata",()=>{
            const canvas= document.createElement("canvas");  
            const ctx=  canvas.getContext("2d");

            //passing video height width as canvas width height
            canvas.width=video.videoWidth;
            canvas.video=video.videoHeight;
            
            video.play(); //playing the video so the drawn image wint be black or blank


        
            // drawing an image from captured video stream
            ctx.drawImage(video,0,0,canvas.width,canvas.height);
            stream.getVideoTracks()[0].stop(); // terminating first video track of the screen

            //passing canvas data url as screenshot preview src
           screenshotPreview.querySelector("img").src=canvas.toDataURL();
           screenshotPreview.classList.add("show");
        });
        video.srcObject=stream;
        // assign capture stream data as video source object
        console.log(stream);
    }
    catch(error){
      alert("Failed To Capture Screenshot");

    }

}

CloseBtn.addEventListener("click",()=>           screenshotPreview.classList.toggle("show")

)
screenshotBtn.addEventListener("click",captureScreen);