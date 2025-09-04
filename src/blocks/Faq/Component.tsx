'use client'

import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FaqBlock as FaqBlockProps } from '@/payload-types'
import { useLocale } from '@payloadcms/ui/providers/Locale'

import {
  HelpCircle,
  Info,
  Calendar,
  Globe,
  Mail,
  Phone,
  CreditCard,
  User,
  Settings,
  Clock,
  Truck,
  BookOpen,
} from 'lucide-react'

type Props = FaqBlockProps & {}

export function FaqThree(props: Props) {
  const faqItems = props.items
  const locale = useLocale()

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'help-circle':
        return <HelpCircle className="m-auto size-4" />
      case 'info':
        return <Info className="m-auto size-4" />
      case 'calendar':
        return <Calendar className="m-auto size-4" />
      case 'globe':
        return <Globe className="m-auto size-4" />
      case 'mail':
        return <Mail className="m-auto size-4" />
      case 'phone':
        return <Phone className="m-auto size-4" />
      case 'credit-card':
        return <CreditCard className="m-auto size-4" />
      case 'user':
        return <User className="m-auto size-4" />
      case 'settings':
        return <Settings className="m-auto size-4" />
      case 'clock':
        return <Clock className="m-auto size-4" />
      case 'truck':
        return <Truck className="m-auto size-4" />
      case 'book-open':
        return <BookOpen className="m-auto size-4" />
      default:
        return null
    }
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="md:w-1/3">
            <RichText
              className="prose p-0 prose-h2:text-3xl prose-p:text-muted-foreground prose-a:text-foreground sticky top-20"
              data={props.header}
            />
          </div>
          <div className="md:w-2/3">
            {faqItems && Array.isArray(faqItems) && faqItems.length > 0 ? (
              <Accordion type="multiple" className="w-full space-y-2">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.id ?? `item-${index + 1}`}
                    value={item.id ?? `item-${index + 1}`}
                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b"
                  >
                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6">{item.icon && renderIcon(item.icon)}</div>
                        <span className="text-base">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <RichText data={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div>Keine FAQ-Items verfügbar</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
