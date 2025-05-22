'use client' //ensure client component
import { hightlightsSlides } from '@/constants' //importing static video slide data
import { pauseImg, playImg, replayImg } from '@/utils'; // importing video controll button icon images
import ScrollTrigger from 'gsap/dist/ScrollTrigger' // importing Scrolltrigger Plugin to trigger animation while scrolling the page
import { useGSAP } from '@gsap/react'; // importing useGSAP hook to perform gsap animations
import gsap from 'gsap'; // importing gsap to configure gsap animation options
import React, { useEffect, useRef, useState } from 'react' // importing React and it's build in hooks to performing state management and work with references

gsap.registerPlugin(ScrollTrigger); // register ScrollTrigger plugin with gsap to work together

const VideoCarousel = () => { // Initialize Component
    const scope = useRef(null) // Defining Scope reference to make the scope workable with gsap
    const videoRef      = useRef<(HTMLVideoElement | null)[]>([]); // Array of video references of the slider to control the video functionalitiies with the references
    const videoDivRef   = useRef<(HTMLSpanElement  | null)[]>([]); // Array of video slider indicator container div reference to controll to indicate which video is playing  
    const videoSpanRef  = useRef<(HTMLElement      | null)[]>([]); // Array of video slider indicator reference to controll the animation of a certain video indicator
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const [video, setVideo] = useState({ 
        isEnd: false, // By default video is not ended
        startPlay: false, // By default video start playing is false
        videoId:0, // By default videoId 0 means no video is assigned
        isLastVideo:false, // By default the video is not the last one
        isPlaying:false // By default the video is not playing
    }) // initialize a state variable for current active video with default options 

    const [loadedData, setLoadedData] = useState<{ index: number; duration: number; width: number; height: number }[]>([]); // State variable to set current active video related informations and metadata

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video; //destructuring all keys from current video to use them as independent variable
       // Trigger this function after a video End. If current video index is not the last one, Auto play next video when current ends.
       const handleVideoEnd = (i: number) => {
        // console.log('handleVideoEnd');
        if (i !== hightlightsSlides.length - 1) {
            // Move to next video if the video is not last video
            setVideo(prev => ({
                ...prev, // all properties of current active video 
                videoId: i + 1, // change current active video by assaigning next video Id
                isPlaying: true // ensure new assigned video is playing 
            })); // setting next video to state variable 
        } else {
            // Stop playing video carousel if Last video ended
            setVideo(prev => ({
                ...prev, // all properties of current active video  
                isLastVideo: true, // defining the current active video is the last video
                isPlaying: false // ensure current active video is not playing
            }));
        }
    }

   // Play the current video when videoId and loaded data change
    useEffect(() => {   
        // console.log('useEffect Play Current Video');   
        const videoEl = videoRef.current[videoId]; //set video element from video Reference Array
        if (videoEl) { // if videoEL Exists
            videoEl.currentTime = 0; // Reset to start by defining currentTime of video element to 0.
            // videoEl.play().catch(e => console.error("Auto-play failed:", e)); // Play the video element
            setVideo(prev => ({
                ...prev, // copy all previous video properties
                isPlaying: true, // set the video playing is true
                startPlay: true // set the video start true 
            })); // Set current video data to video state variable 
        }
    }, [videoId, loadedData]); // Play the current video when videoId and loaded data change

    //configure useGSAP Animation properties
    useGSAP(
        () => {
        if (scrollTriggerRef.current) {
            scrollTriggerRef.current.kill();
        }
          videoRef.current.forEach((video, i) => { //for each elements in video reference Array configure useGSAP Animation with a loop
            if (!video) return; // if state variable video is not null 
            if (video===videoRef.current[videoId]){ // if videoRef video of videoId and video state variable current video is same
                scrollTriggerRef.current = ScrollTrigger.create({ // Set up a animation with ScrollTrigger Plugin 
                trigger: video, // Animation will play when scrollbar reach to the video reference in jsx
                start: 'top 60%',       // Start animation after inter 60% of reference
                end: 'bottom 40%',     // End animation after passing bottom 40% of the reference
                onEnter:  () => video.play(), // when scrollbar enter into the trigger point for first time video should start playing
                onEnterBack: () => {
                    if (video.paused) {
                        video.play();
                    }
                }, // when scrollbar enter into the trigger point again video should start playing again
                onLeave:  () => video.pause(),  // when scrollbar leave the trigger point first time video should pause
                onLeaveBack: () => video.pause(),   // when scrollbar leave the trigger point again video should pause again
                });
            }
          });
        },
        { scope, dependencies: [videoId] } // ➜ selectors & triggers stay inside this subtree, animation will happen if videoId changes. videoId is a destructured property from video state variable
      );
      // Perform video pause or play when the destructured properties of video state variable like startPaly, videoId, isPlaying or state variable video meta loaded data changes
    useEffect(() => {
        // console.log('useEffect Perform Play Pause');   
        const videoEl = videoRef.current[videoId]; // defining video element from video reference array from jsx
        if(videoEl && loadedData.length>3){ // if video element exist
            if(!isPlaying){ // if property isPlaying of video state variable changed and set to false 
                videoEl.pause(); // then video should pause
            }
            else{ // if property isPlaying of video state variable changed and set to true 
                startPlay && videoEl.play(); // then if startPlay is also true then video should play
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]) // Perform video pause or play when the destructured properties of video state variable like startPaly, videoId, isPlaying or state variable video meta loaded data changes

    // on video metadata loaded set the metadata to the state variable loadedData
    const handleLoadedMetadata = (
        index: number,
        e: React.SyntheticEvent<HTMLVideoElement, Event>
      ) => {
        // console.log('handleLoadedMetadata');  
        // ⚠️ Don't keep the SyntheticEvent itself – extract what you need NOW
        const thisVideo = e.currentTarget;   
        // console.log('thisVideo',thisVideo);        // the <video> element
        setLoadedData(prev => [
          ...prev,
          {
            index,
            duration: thisVideo.duration,
            width: thisVideo.videoWidth,
            height: thisVideo.videoHeight,
          },
        ]);
      };
    
    //handle animations of video indicators under the video if destructured videoId or startPlay properties of video state variable change 
    useEffect(() => {
        // console.log('useEffect progressbar');  
        let currentProgress = 0; //define currentProgress of video with default value 0
        let span = videoSpanRef.current; // assign span the current video indicator
        if(span[videoId]){ // if span of current video indicator exists
            //animate the progress of the video
            // Create a GSAP tween that targets the indicator <span>
            // associated with the currently playing video
            let anim = gsap.to(span[videoId],{ //start animation of the current video indicator with gsap tergetting the video indicator span
                onUpdate: () => { //on every frame update under tween animation
                    const progress = Math.ceil( anim.progress() *100); // calculating progress percent according to animation time duration
                    if(progress !== currentProgress){  // if new calculated progress is not equal to previous calculated progress
                        currentProgress = progress; // change the current progress
                        gsap.to(videoDivRef.current[videoId],{ //trigger animation to the video indicator container and increse it's width depend on device width this will show the incomplete 100% down part of the indicator. 
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '8vw' : '4vw',
                        })
                        gsap.to(span[videoId],{ //trigger animation to the video indicator and increse it's width depend on currentProgress Percentage and set a different background Color. 
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                onComplete: () => { // on Complete the tween animation set the video indicator state
                    if(isPlaying){ //if Carousol isPlaying  
                        gsap.to(videoDivRef.current[videoId],{ // animate and shrink the progress bar container div size to 12 px 
                            width: '12px'
                        })
                        gsap.to(span[videoId],{
                            backgroundColor: '#afafaf' //and change the background color of the span
                        })
                    }
                }
            })
            if(videoId === 0){ // That avoids ambiguity between “first video” and “none selected. videoId can not be zero ever. Except No video is assigned to current Video
                anim.restart(); // If condition is true,  animation will start again
            }
    //             Normally, GSAP animations play based on time.
    // But here, you're telling the GSAP animation to follow the video’s playback progress, frame-by-frame — not its own timeline.
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId]?.currentTime! / hightlightsSlides[videoId].videoDuration)
            }
            if(videoRef.current[videoId]){ //Checks if the current video element exists:
                videoRef.current[videoId].addEventListener('timeupdate',animUpdate) //This attaches a listener for the timeupdate event, which is fired by HTML <video> elements every time the currentTime changes during playback — usually about 4–5 times per second, depending on the browser.
            }
            if(isPlaying){ // when isPlaying
                gsap.ticker.add(animUpdate) //Adds your animUpdate function to GSAP’s ticker.
            }
            else{
                gsap.ticker.remove(animUpdate) //Removes animUpdate from the ticker. Stops the updates — usually done when the video is paused or stopped
            }
        }
    }, [videoId, startPlay])

    //handle pause/play/restart button click
    const handleProcess = (type:string, index?:number) => {
        // console.log('handleProcess');  
        switch(type){
            case 'video-reset':
                setVideo((prevVideo) => ({
                    ...prevVideo, isEnd:false, isLastVideo:false, videoId:0
                }))
                break;
            case 'play':
                setVideo((prevVideo) => ({
                    ...prevVideo, isPlaying:!prevVideo.isPlaying
                }))
                break;
            case 'pause':
                setVideo(prev => ({
                    ...prev,
                    isPlaying: false
                }));
                break;
            default:
                return video;
        }
    }
  return (
    <>
        <div ref={scope} className="flex items-center" id="video">
            {hightlightsSlides.map((list,i)=>(
                <div key={list.id} id="slider" className='sm:pr-20 pr-10'>
                    <div className="video-carousel_container">
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                            <video
                                id={`video-${i}`}
                                playsInline={true}
                                preload='auto'
                                muted
                                key={list.video}
                                ref={(el) => {videoRef.current[i] = el}}
                                onPlay={()=>{
                                        setVideo((prevVideo) => ({
                                        ...prevVideo, isPlaying:true
                                    }))
                                }}
                                onEnded={() => handleVideoEnd(i)}
                                onLoadedMetadata={(e)=> handleLoadedMetadata(i,e)}
                                suppressHydrationWarning
                            >
                                <source  src={list.video} type="video/mp4"/>
                            </video>
                        </div>
                        <div className="absolute top-12 left-[5%] z-10">
                            {list.textLists.map((text)=>(
                                <p key={text} className='md:text-2xl text-xl font-medium'>
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {hightlightsSlides.map((_,i)=>(
                    <span 
                        key={i}
                        ref={(el) => {videoDivRef.current[i] = el}}
                        className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                    >
                        <span className="absolute h-full w-full rounded-full" ref={(el) => {videoSpanRef.current[i] =el}} />  
                    </span>
                ))}
            </div>
            <button className="control-btn cursor-pointer">
                <img 
                    src={isLastVideo? replayImg : !isPlaying ? playImg : pauseImg}
                    alt={isLastVideo? 'replay' : !isPlaying ? 'play' : 'pause'}
                    onClick={isLastVideo ? ()=> handleProcess('video-reset')
                        : !isPlaying ? ()=> handleProcess('play')
                        : ()=> handleProcess('pause')
                    }
                />
            </button>
        </div>
    </>
  )
}

export default VideoCarousel
