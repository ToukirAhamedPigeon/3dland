'use client'
import { hightlightsSlides } from '@/constants'
import { pauseImg, playImg, replayImg } from '@/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'

const VideoCarousel = () => {
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

    const [loadedData, setLoadedData]=useState([]);

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;
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
    useEffect(() => {
        const currentProgress = 0;
        let span = videoSpanRef.current;
        if(span[videoId]){
            //animate the progress of the video
            let anim = gsap.to(span[videoId],{
                onUpdate: () => {

                },
                onComplete: () => {

                }
            })
        }
    }, [videoId, startPlay])
  return (
    <>
        <div className="flex items-center">
            {hightlightsSlides.map((list,i)=>(
                <div key={list.id} id="slider" className='sm:pr-20 pr-10'>
                    <div className="video-carousel_container">
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                            <video
                                id="video"
                                playsInline={true}
                                preload='auto'
                                muted
                                key={list.video}
                                ref={(el) => {videoRef.current[i] = el}}
                                onPlay={()=>{setVideo((prevVideo) => ({
                                    ...prevVideo, isPlaying:true
                                }))}}
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
                {videoRef.current.map((_,i)=>(
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
                />
            </button>
        </div>
    </>
  )
}

export default VideoCarousel
