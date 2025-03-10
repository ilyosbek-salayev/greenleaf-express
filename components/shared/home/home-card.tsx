import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import './index.css'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type CardItem = {
  title: string
  link: { text: string; href: string }
  items: {
    name: string
    items?: string[]
    image: string
    href: string
  }[]
}

export function HomeCard({ cards }: { cards: CardItem[] }) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {cards.map((card) => (
        <Card key={card.title} className='rounded-lg flex flex-col shadow-md'>
          <CardContent className='p-4 flex-1'>
            <h3 className='text-lg font-semibold mb-3 text-gray-800'>{card.title}</h3>
            <div className='grid grid-cols-2 gap-2'>
              {card.items.map((item) => (
                <Link key={item.name} href={item.href} className='flex flex-col items-center'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    className='aspect-square object-cover rounded-md'
                    height={80} width={80} // Mobil uchun kichikroq
                  />
                  <p className='text-center text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis w-24'>
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
          {card.link && (
            <CardFooter>
              <Link href={card.link.href} className='mt-2 text-green-600 hover:underline text-sm'>
                {card.link.text}
              </Link>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
