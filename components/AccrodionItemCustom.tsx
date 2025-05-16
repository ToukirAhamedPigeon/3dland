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
  }
const AccrodionItemCustom = ({title, Component, value}:CustomAccrodionItemProps) => {
  return (
    <AccordionItem value={value}>
        <AccordionTrigger className='accordion-trigger-custom'>{title}</AccordionTrigger>
        <AccordionContent>
            <Component/>
        </AccordionContent>
    </AccordionItem>
  )
}

export default AccrodionItemCustom
