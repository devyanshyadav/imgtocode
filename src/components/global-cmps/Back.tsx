'use client'
import React from 'react'
import DevButton from '../dev-components/dev-button'
import useZustStore from '@/lib/zust-store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const GoBack = () => {
   const {reset , code}=useZustStore()

   const animateReverse=()=>{
    gsap.to('.PromptContainer',{
        x:'0%',
        duration:0
      })

      gsap.to('.UploadContainer',{
        x:'0%',
        duration:0

      })

      gsap.to('.CodePlayground',{
        scale:0,
        duration:0

      })
      gsap.to('.CodePlayground',{
        display:'none',
        duration:0
      })
      gsap.to(".MainContainer", {
        display: "grid",
        duration:0
      });
   }
   const handleClear=()=>{
    reset()
    animateReverse()
   }
      return (
   (code) ? <DevButton onClick={handleClear}>Back</DevButton> : null
  )
}

export default GoBack