'use client'
import { hightlightsSlides } from '@/constants'
import { pauseImg, playImg, replayImg } from '@/utils';
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const scope = useRef(null)
    const videoRef      = useRef<(HTMLVideoElement | null)[]>([]);
    const videoSpanRef  = useRef<(HTMLElement      | null)[]>([]);
    const videoDivRef   = useRef<(HTMLSpanElement  | null)[]>([]);
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId:0,
        isLastVideo:false,
        isPlaying:false
    })

    const [loadedData, setLoadedData]=useState<React.SyntheticEvent<HTMLVideoElement, Event>[]>([]);

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;
       // Auto play next video when current ends
       const handleVideoEnd = (i: number) => {
        if (i !== hightlightsSlides.length - 1) {
            // Move to next video
            setVideo(prev => ({
                ...prev,
                videoId: i + 1,
                isPlaying: true
            }));
        } else {
            // Last video ended
            setVideo(prev => ({
                ...prev,
                isLastVideo: true,
                isPlaying: false
            }));
        }
    }

    // Play the current video when videoId changes
    useEffect(() => {
        if (loadedData.length > 0) {
            const videoEl = videoRef.current[videoId];
            if (videoEl) {
                videoEl.currentTime = 0; // Reset to start
                videoEl.play().catch(e => console.error("Auto-play failed:", e));
                setVideo(prev => ({
                    ...prev,
                    isPlaying: true,
                    startPlay: true
                }));
            }
        }
    }, [videoId, loadedData]);
    useGSAP(
        () => {
          videoRef.current.forEach((video, i) => {
            if (!video) return;
            if (video===videoRef.current[videoId]){
                ScrollTrigger.create({
                trigger: video,
                start: 'top 60%',       // adjust to taste
                end: 'bottom 40%',
                onEnter:  () => video.play(),
                onEnterBack: () => video.play(),
                onLeave:  () => video.pause(),
                onLeaveBack: () => video.pause(),
                });
            }
          });
        },
        { scope, dependencies: [videoId] } // ➜ selectors & triggers stay inside this subtree
      );
    useEffect(() => {
        const videoEl = videoRef.current[videoId];
        if(videoEl && loadedData.length > 3 ){
            if(!isPlaying){
                videoEl.pause();
            }
            else{
                startPlay && videoEl.play(); 
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    const handleLoadedMetadata = (index:number,e:React.SyntheticEvent<HTMLVideoElement, Event>) => setLoadedData((prevData) => [...prevData,e]);
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if(span[videoId]){
            //animate the progress of the video
            let anim = gsap.to(span[videoId],{
                onUpdate: () => {
                    const progress = Math.ceil( anim.progress() *100);
                    if(progress !== currentProgress){
                        currentProgress = progress;
                        gsap.to(videoDivRef.current[videoId],{
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '8vw' : '4vw',
                        })
                        gsap.to(span[videoId],{
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                onComplete: () => {
                    if(isPlaying){
                        gsap.to(videoRef.current[videoId],{
                            width: '12px'
                        })
                        gsap.to(span[videoId],{
                            backgroundColor: '#afafaf'
                        })
                    }
                }
            })
            if(videoId === 0){
                anim.restart();
            }
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId]?.currentTime! / hightlightsSlides[videoId].videoDuration)
            }
            if(videoRef.current[videoId]){
                videoRef.current[videoId].addEventListener('timeupdate',animUpdate)
            }
            if(isPlaying){
                gsap.ticker.add(animUpdate)
            }
            else{
                gsap.ticker.remove(animUpdate)
            }
        }
    }, [videoId, startPlay])

    const handleProcess = (type:string, index?:number) => {
        switch(type){
            // case 'video-end':
            //     setVideo((prevVideo) => ({
            //         ...prevVideo, isEnd:true, isPlaying:true, startPlay:true, videoId:index!==null && index!==undefined?(index+1):0
            //     }))
            //     break;
            // case 'video-last':
            //     setVideo((prevVideo) => ({
            //         ...prevVideo, isLastVideo:true
            //     }))
            //     break;
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
                                onLoadedMetadata={(e)=>handleLoadedMetadata(i,e)}
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
            <button className="control-btn">
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
