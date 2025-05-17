import React from 'react'
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  type CustomAccrodionItemProps = {
    title: string;
    value: string;
    Component: React.ComponentType;
    contentClass?:string;
  }
const AccrodionItemCustom = ({title, Component, value, contentClass="h-screen"}:CustomAccrodionItemProps) => {
  return (
    <AccordionItem value={value}>
        <AccordionTrigger className='accordion-trigger-custom'>{title}</AccordionTrigger>
        <AccordionContent className={contentClass}>
            <Component/>
        </AccordionContent>
    </AccordionItem>
  )
}

export default AccrodionItemCustom
